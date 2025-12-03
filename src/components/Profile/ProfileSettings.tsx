'use client';

import { useState } from 'react';
import type { User } from '@supabase/supabase-js';

interface ProfileSettingsProps {
  user: User;
  onSignOut: () => void;
}

export default function ProfileSettings({ user, onSignOut }: ProfileSettingsProps) {
  const [defaultTone, setDefaultTone] = useState<'STANDARD' | 'ACADEMIC' | 'EXECUTIVE'>('STANDARD');

  return (
    <div className="p-8 md:p-12">
      <div className="mb-12">
        <h1 className="mb-2 font-['PPEditorialNew'] text-4xl font-extralight text-[#1A1A1A]">
          Settings
        </h1>
        <p className="font-['SpaceMono'] text-xs uppercase text-[#1A1A1A] opacity-50">
          PREFERENCES & CONFIGURATION
        </p>
      </div>

      <div className="space-y-8">
        <div className="border border-solid border-[#1A1A1A] bg-white p-4 md:p-8">
          <p className="mb-4 font-['SpaceMono'] text-xs uppercase text-[#1A1A1A] opacity-50">
            DEFAULT TONE
          </p>
          <div className="flex flex-col gap-2 md:flex-row">
            {(['STANDARD', 'ACADEMIC', 'EXECUTIVE'] as const).map((tone) => (
              <button
                key={tone}
                onClick={() => setDefaultTone(tone)}
                className={`w-full px-4 py-3 font-['SpaceMono'] text-xs uppercase transition-colors md:w-auto md:px-6 ${
                  defaultTone === tone
                    ? 'bg-[#1A1A1A] text-white'
                    : 'border border-solid border-[#1A1A1A] bg-transparent text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white'
                }`}
                style={{ borderRadius: '0px' }}
              >
                {tone}
              </button>
            ))}
          </div>
        </div>

        <div className="block border-t border-solid border-[#1A1A1A] pt-8 md:hidden">
          <button
            onClick={onSignOut}
            className="w-full border border-solid border-[#1A1A1A] bg-transparent px-6 py-3 font-['SpaceMono'] text-sm font-bold uppercase text-[#FF3333] transition-colors hover:bg-[#1A1A1A] hover:text-white"
            style={{ borderRadius: '0px' }}
          >
            TERMINATE SESSION
          </button>
        </div>
      </div>
    </div>
  );
}
