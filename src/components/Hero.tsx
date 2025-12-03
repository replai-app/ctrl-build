'use client';

import { useState, useEffect, useRef } from 'react';
import { Gear } from 'phosphor-react';
import { getApiEndpoint } from '@/lib/api-client';

export default function Hero() {
  const [inputValue, setInputValue] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [mode, setMode] = useState('Standard');
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  const [showH1, setShowH1] = useState(true);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const [isDockCollapsed, setIsDockCollapsed] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 530);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (inputValue.length > 0) {
      setShowPlaceholder(false);
      setShowH1(false);
    } else {
      setShowPlaceholder(true);
      setShowH1(true);
    }
  }, [inputValue]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const restoreText = params.get('restore');
    if (restoreText) {
      const decoded = decodeURIComponent(restoreText);
      setOutputText(decoded);
      setShowH1(false);
      window.history.replaceState({}, '', '/');
    }
  }, []);

  const handleInputClick = () => {
    setShowPlaceholder(false);
    setShowH1(false);
    if (textareaRef.current) {
      textareaRef.current.focus();
      setIsFocused(true);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
    setShowPlaceholder(false);
    setShowH1(false);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleReconstruct = async () => {
    if (!inputValue.trim()) return;

    setIsProcessing(true);
    setOutputText('');
    setIsDockCollapsed(true);

    try {
      const response = await fetch(getApiEndpoint('/api/reconstruct'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: inputValue,
          mode: mode,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Failed to process text: ${response.status}`);
      }

      const data = await response.json();
      
      if (!data.text) {
        throw new Error('No text returned from API');
      }
      
      let processedText = data.text.trim();
      
      processedText = processedText.replace(/undefined/gi, '').trim();
      
      if (!processedText) {
        throw new Error('Received empty or invalid text from API');
      }

      let currentIndex = 0;

      const typeWriter = () => {
        if (currentIndex >= processedText.length) {
          setIsProcessing(false);
          return;
        }

        const char = processedText[currentIndex];
        if (char) {
          setOutputText((prev) => prev + char);
          currentIndex++;
          const delay = Math.random() < 0.1 ? 100 : 30;
          setTimeout(typeWriter, delay);
        } else {
          setIsProcessing(false);
        }
      };

      typeWriter();
    } catch (error) {
      console.error('Error reconstructing text:', error);
      setIsProcessing(false);
      const errorMessage = error instanceof Error ? error.message : 'Failed to process text';
      setOutputText(`Error: ${errorMessage}. Please check your API key and try again.`);
    }
  };

  const lineCount = inputValue.split('\n').length || 1;
  const minLines = showPlaceholder ? 2 : Math.max(lineCount, 10);
  const lines = Array.from({ length: minLines }, (_, i) => i + 1);

  return (
    <section
      id="workspace"
      className="relative flex h-[calc(100vh-64px)] w-full flex-col overflow-hidden lg:flex-row"
    >
      <div
        className="relative flex h-1/2 w-full flex-shrink-0 flex-col bg-white md:h-[45%] lg:h-full lg:w-1/2"
        onClick={handleInputClick}
      >
        <div className="flex h-full w-full">
          <div className="flex-shrink-0 px-4 py-6 text-right font-['SpaceMono'] text-xs leading-6 text-[#CCCCCC]">
            {lines.map((line) => (
              <div key={line} className="h-6">
                {String(line).padStart(2, '0')}
              </div>
            ))}
          </div>
          <div className="relative flex-1 px-4 py-6">
            {showPlaceholder && inputValue.length === 0 ? (
              <div className="font-['SpaceMono'] text-sm leading-6 text-[#CCCCCC]">
                <div>// WAITING FOR INPUT STREAM...</div>
                <div className="inline-flex items-center">
                  // READY TO PARSE SYNTAX.
                  {cursorVisible && (
                    <span
                      className="ml-1 inline-block h-6 w-[1.2em] bg-[#1A1A1A]"
                    />
                  )}
                </div>
              </div>
            ) : (
              <textarea
                ref={textareaRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onFocus={handleFocus}
                onBlur={handleBlur}
                className="h-full w-full resize-none border-none bg-transparent font-['SpaceMono'] text-sm leading-6 text-[#1A1A1A] outline-none"
                placeholder=""
                style={{ caretColor: '#1A1A1A' }}
              />
            )}
          </div>
        </div>
      </div>

      <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-[#1A1A1A] lg:block" />
      <div className="absolute left-0 top-[45%] hidden h-px w-full bg-[#1A1A1A] md:block lg:hidden" />

      <div className="relative flex h-1/2 w-full flex-shrink-0 flex-col bg-[#F4F4F0] md:h-[55%] lg:h-full lg:w-1/2">
        <div className="relative flex h-full w-full items-center justify-center px-8 py-6">
            <h1
            className={`absolute font-['PPEditorialNew'] text-[32px] font-extralight leading-tight text-[#1A1A1A] transition-opacity duration-500 md:text-[48px] lg:text-[72px] ${
              showH1 && outputText.length === 0 ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            style={{ fontWeight: 200 }}
            aria-label="CTRL — BUILD: Restore the cadence of human thought"
          >
            Restore the cadence of human thought.
          </h1>
          <div
            ref={outputRef}
            className={`h-full w-full overflow-y-auto font-['PPEditorialNew'] text-base leading-relaxed text-[#1A1A1A] transition-opacity duration-500 lg:text-lg ${
              showH1 && outputText.length === 0 ? 'opacity-0' : 'opacity-100'
            }`}
          >
            {outputText}
            {isProcessing && outputText.length === 0 && (
              <span className="font-['SpaceMono'] text-sm text-[#1A1A1A]/60">
                INJECTING NUANCE...
              </span>
            )}
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 lg:hidden">
          {isDockCollapsed ? (
            <button
              onClick={() => setIsDockCollapsed(false)}
              className="flex h-12 w-12 items-center justify-center border border-solid border-[#1A1A1A] bg-[#F4F4F0] shadow-[8px_8px_0px_#1A1A1A] transition-all duration-300"
            >
              <Gear size={24} weight="bold" className="text-[#1A1A1A]" />
            </button>
          ) : (
            <div className="border border-solid border-[#1A1A1A] bg-[#F4F4F0] px-6 py-4 shadow-[8px_8px_0px_#1A1A1A] transition-all duration-300">
              <div className="flex flex-col items-center gap-4">
                <div className="flex items-center gap-0 border border-solid border-[#1A1A1A]">
                  {['Standard', 'Academic', 'Executive'].map((m) => (
                    <button
                      key={m}
                      onClick={() => setMode(m)}
                      className={`border-r border-solid border-[#1A1A1A] px-3 py-2 font-['SpaceMono'] text-[10px] uppercase last:border-r-0 ${
                        mode === m
                          ? 'bg-[#1A1A1A] text-white'
                          : 'bg-transparent text-[#1A1A1A]'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
                <button
                  onClick={handleReconstruct}
                  disabled={!inputValue.trim() || isProcessing}
                  className="bg-[#0047FF] px-8 py-3 font-['SpaceMono'] text-sm font-bold uppercase text-white transition-all hover:border hover:border-solid hover:border-[#0047FF] hover:bg-white hover:text-[#0047FF] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? 'INJECTING NUANCE...' : 'RECONSTRUCT'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="fixed bottom-8 left-1/2 z-10 hidden -translate-x-1/2 lg:absolute lg:bottom-12 lg:block">
        <div className="border border-solid border-[#1A1A1A] bg-[#F4F4F0] px-6 py-4 shadow-[8px_8px_0px_#1A1A1A]">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-0 border border-solid border-[#1A1A1A]">
              {['Standard', 'Academic', 'Executive'].map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`border-r border-solid border-[#1A1A1A] px-3 py-2 font-['SpaceMono'] text-[10px] uppercase last:border-r-0 ${
                    mode === m
                      ? 'bg-[#1A1A1A] text-white'
                      : 'bg-transparent text-[#1A1A1A]'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
            <button
              onClick={handleReconstruct}
              disabled={!inputValue.trim() || isProcessing}
              className="bg-[#0047FF] px-8 py-3 font-['SpaceMono'] text-sm font-bold uppercase text-white transition-all hover:border hover:border-solid hover:border-[#0047FF] hover:bg-white hover:text-[#0047FF] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? 'INJECTING NUANCE...' : 'RECONSTRUCT'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

