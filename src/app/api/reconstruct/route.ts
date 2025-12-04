import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

const getModePrompt = (mode: string) => {
  const modePrompts: Record<string, string> = {
    Standard: 'Refine this text to sound more natural and human-like while maintaining its original meaning. Add subtle nuance and improve the flow.',
    Academic: 'Refine this text for an academic audience. Maintain formal tone while improving clarity, precision, and scholarly expression.',
    Executive: 'Refine this text for executive communication. Make it concise, impactful, and professional while preserving key information.',
    Epistolary: 'Refine this text in a warm, direct, first-person voice. Make it feel personal and slightly vulnerable. Vary sentence length to mimic a speaking voice. Use "I" statements naturally. This is for cover letters, personal emails, artist statements, and manifestos.',
    Dialectic: 'Refine this text to be persuasive, logical, and sharp with strong contrasts. Prioritize rhetorical devices like antithesis and rhetorical questions. Make it feel like it has a strong opinion. This is for opinion pieces, debate prep, critical essays, and legal arguments.',
    Minimalist: 'Refine this text to be Hemingway-esque: short, punchy, with no adverbs. Aggressively prune the text, stripping away all fluff to leave only the bones. Use the fewest words possible while preserving meaning. This is for UX copy, landing page headers, and fast-paced newsletters.',
    LOWERCASE: 'Refine this text in a high-competence, low-effort style. Force all text to lowercase with zero capitalization. Use periods where they naturally belong (end of sentences, abbreviations). Use soft punctuation (line breaks or commas) only for rapid-fire thoughts or lists. Strip out corporate language like "synergy," "circling back," and "delighted to." Be direct and use the fewest words possible to convey meaning. Fix any dictation errors. This mimics the Alt-Twitter or Dev aesthetic - natural, lowercase, but grammatically sound.',
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
    
    // Post-process LOWERCASE mode
    if (mode === 'LOWERCASE') {
      // Force lowercase
      refinedText = refinedText.toLowerCase();
      
      // Strip corporate language
      const corporateTerms = [
        /\bsynergy\b/gi,
        /\bcircling back\b/gi,
        /\bdelighted to\b/gi,
        /\bleverage\b/gi,
        /\bparadigm\b/gi,
        /\bdisrupt\b/gi,
        /\binnovative solution\b/gi,
        /\bthink outside the box\b/gi,
        /\bvalue proposition\b/gi,
        /\bstreamline\b/gi,
        /\boptimize\b/gi,
        /\bscalable\b/gi,
        /\bcircle back\b/gi,
        /\btouch base\b/gi,
        /\bdeep dive\b/gi,
        /\bgame changer\b/gi,
        /\bwin-win\b/gi,
      ];
      
      corporateTerms.forEach(term => {
        refinedText = refinedText.replace(term, '');
      });
      
      // Clean up extra whitespace but preserve sentence structure and periods
      refinedText = refinedText.replace(/\s+/g, ' ').trim();
      refinedText = refinedText.replace(/\s+\./g, '.');
      refinedText = refinedText.replace(/\.\s*\./g, '.');
      
      // Keep periods where they belong - the AI prompt handles natural flow
      // We just ensure lowercase, remove corporate speak, and clean up spacing
    }
    
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
