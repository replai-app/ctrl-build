'use client';

import { useState, useEffect, useRef } from 'react';
import type { User } from '@supabase/supabase-js';

interface ProfileAPIKeysProps {
  user: User;
}

export default function ProfileAPIKeys({ user }: ProfileAPIKeysProps) {
  const [isRevealed, setIsRevealed] = useState(false);
  const [password, setPassword] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [copied, setCopied] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const copiedRef = useRef<HTMLDivElement>(null);

  const apiKey = 'sk_live_' + Array.from({ length: 48 }, () => 
    Math.random().toString(36).charAt(2)
  ).join('');

  const handleReveal = async () => {
    if (!password) return;
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setIsRevealed(true);
      setPassword('');
    }, 1000);
  };

  const handleCopy = (event: React.MouseEvent) => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setCursorPosition({ x: event.clientX, y: event.clientY });
    setTimeout(() => setCopied(false), 800);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (copied) {
        setCursorPosition({ x: e.clientX, y: e.clientY });
      }
    };

    if (copied) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [copied]);

  return (
    <div className="p-8 md:p-12">
      <div className="mb-12">
        <h1 className="mb-2 font-['PPEditorialNew'] text-4xl font-extralight text-[#1A1A1A]">
          API Keys
        </h1>
        <p className="font-['SpaceMono'] text-xs uppercase text-[#1A1A1A] opacity-50">
          DEVELOPER ACCESS
        </p>
      </div>

      <div className="block md:hidden">
        <div className="border border-solid border-[#1A1A1A] bg-[#1A1A1A] p-6 text-white">
          <p className="font-['SpaceMono'] text-xs uppercase">
            API MANAGEMENT RESTRICTED TO DESKTOP TERMINAL
          </p>
        </div>
      </div>

      <div className="hidden md:block">
        <div className="border border-solid border-[#1A1A1A] bg-[#1A1A1A] p-8">
          <div className="mb-6">
            <p className="mb-4 font-['SpaceMono'] text-xs uppercase text-white opacity-70">
              API SECRET KEY
            </p>
            {!isRevealed ? (
              <div className="space-y-4">
                <div className="relative">
                  <div className="h-14 w-full bg-[#0A0A0A] px-4 font-['SpaceMono'] text-sm text-white blur-sm">
                    {apiKey}
                  </div>
                </div>
                <div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password to reveal"
                    className="h-14 w-full border border-solid border-white bg-transparent px-4 font-['SpaceMono'] text-sm text-white outline-none transition-colors focus:border-[#0047FF]"
                    style={{ borderRadius: '0px' }}
                  />
                </div>
                <button
                  onClick={handleReveal}
                  disabled={!password || isVerifying}
                  className="h-14 w-full border border-solid border-white bg-transparent px-6 font-['SpaceMono'] text-sm font-bold uppercase text-white transition-colors hover:bg-white hover:text-[#1A1A1A] disabled:opacity-50"
                  style={{ borderRadius: '0px' }}
                >
                  {isVerifying ? 'VERIFYING...' : '[ REVEAL ]'}
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative">
                  <div className="h-14 w-full bg-[#0A0A0A] px-4 font-['SpaceMono'] text-sm text-white flex items-center">
                    {apiKey}
                  </div>
                </div>
                <button
                  onClick={handleCopy}
                  className="h-14 w-full border border-solid border-white bg-transparent px-6 font-['SpaceMono'] text-sm font-bold uppercase text-white transition-colors hover:bg-white hover:text-[#1A1A1A]"
                  style={{ borderRadius: '0px' }}
                >
                  COPY KEY
                </button>
                {copied && (
                  <div
                    ref={copiedRef}
                    className="pointer-events-none fixed z-50 font-['SpaceMono'] text-xs text-[#0047FF]"
                    style={{
                      left: `${cursorPosition.x + 10}px`,
                      top: `${cursorPosition.y + 10}px`,
                      transform: 'translate(0, 0)',
                    }}
                  >
                    COPIED
                  </div>
                )}
                <button
                  onClick={() => setIsRevealed(false)}
                  className="h-14 w-full border border-solid border-white bg-white px-6 font-['SpaceMono'] text-sm font-bold uppercase text-[#1A1A1A] transition-colors hover:bg-transparent hover:text-white"
                  style={{ borderRadius: '0px' }}
                >
                  HIDE KEY
                </button>
              </div>
            )}
          </div>
          <div className="border-t border-solid border-white/20 pt-6">
            <button className="h-14 w-full border border-solid border-white bg-transparent px-6 font-['SpaceMono'] text-sm font-bold uppercase text-white transition-colors hover:bg-white hover:text-[#1A1A1A]">
              GENERATE NEW SECRET
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
