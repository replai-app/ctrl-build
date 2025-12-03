import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

const getModePrompt = (mode: string) => {
  const modePrompts: Record<string, string> = {
    Standard: 'Refine this text to sound more natural and human-like while maintaining its original meaning. Add subtle nuance and improve the flow.',
    Academic: 'Refine this text for an academic audience. Maintain formal tone while improving clarity, precision, and scholarly expression.',
    Executive: 'Refine this text for executive communication. Make it concise, impactful, and professional while preserving key information.',
  };
  return modePrompts[mode] || modePrompts.Standard;
};

export async function POST(request: NextRequest) {
  try {
    const { text, mode } = await request.json();

    if (!text || !text.trim()) {
      return NextResponse.json(
        { error: 'Text is required' },
        { status: 400 }
      );
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'Gemini API key not configured' },
        { status: 500 }
      );
    }

    const modelName = process.env.GEMINI_MODEL || 'gemini-2.5-flash';

    const prompt = `You are a professional text editor. Your task is to refine text to make it more natural and human-like.

Mode: ${getModePrompt(mode)}

IMPORTANT INSTRUCTIONS:
- Return ONLY the refined text
- Every word must be complete with all letters
- Do not skip or omit any characters
- Do not include explanations, notes, or metadata
- Do not include the word "undefined"
- Ensure the first letter of every word is present

Original text to refine:
${text}

Refined text:`;

    const model = genAI.getGenerativeModel({ 
      model: modelName,
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    if (!response) {
      return NextResponse.json(
        { error: 'No response from Gemini API' },
        { status: 500 }
      );
    }
    
    let refinedText = '';
    try {
      refinedText = response.text() || '';
    } catch (error) {
      return NextResponse.json(
        { error: 'Failed to extract text from response' },
        { status: 500 }
      );
    }
    
    if (!refinedText || refinedText.length === 0) {
      return NextResponse.json(
        { error: 'Empty response from Gemini API' },
        { status: 500 }
      );
    }
    
    refinedText = refinedText.trim();
    
    if (refinedText.toLowerCase().includes('refined text:')) {
      const parts = refinedText.split(/refined text:/i);
      refinedText = parts[parts.length - 1]?.trim() || refinedText;
    }
    
    refinedText = refinedText.replace(/undefined/gi, '').trim();
    
    const metadataMarkers = [
      'i made the following',
      'changes to refine',
      'here are the changes',
      'refined version:',
      'original text:',
    ];
    
    const lines = refinedText.split('\n');
    refinedText = lines
      .filter(line => {
        const lowerLine = line.toLowerCase().trim();
        return !metadataMarkers.some(marker => lowerLine.includes(marker)) &&
               !lowerLine.match(/^\d+\.\s*/) &&
               !lowerLine.startsWith('*') &&
               !lowerLine.startsWith('-') &&
               lowerLine !== 'undefined' &&
               lowerLine.length > 0;
      })
      .join('\n')
      .trim();
    
    refinedText = refinedText.replace(/\s*undefined\s*/gi, ' ').trim();
    
    const corruptionIndicators = [
      /[a-z][A-Z]/g,
      /[A-Z][a-z][A-Z]/g,
      /undefined/gi,
    ];
    
    const isCorrupted = corruptionIndicators.some(pattern => pattern.test(refinedText)) ||
                       refinedText.length < text.length * 0.5;
    
    if (isCorrupted && refinedText.includes('undefined')) {
      refinedText = refinedText.replace(/undefined/gi, '').trim();
    }

    if (!refinedText || refinedText.length < 10) {
      return NextResponse.json(
        { error: 'Response appears corrupted or empty. Please try again.' },
        { status: 500 }
      );
    }

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user) {
      const wordCount = refinedText.split(/\s+/).filter(word => word.length > 0).length;
      
      await supabase
        .from('refinement_history')
        .insert({
          user_id: user.id,
          input_text: text,
          output_text: refinedText,
          tone: mode || 'Standard',
          word_count: wordCount,
        });
    }

    return NextResponse.json({ text: refinedText });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: `Failed to process text: ${errorMessage}` },
      { status: 500 }
    );
  }
}
