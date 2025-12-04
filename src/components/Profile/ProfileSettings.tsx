'use client';

import { useState } from 'react';
import type { User } from '@supabase/supabase-js';

interface ProfileSettingsProps {
  user: User;
  onSignOut: () => void;
}

type Mode = 'Standard' | 'Academic' | 'Executive' | 'Epistolary' | 'Dialectic' | 'Minimalist' | 'LOWERCASE';

export default function ProfileSettings({ user, onSignOut }: ProfileSettingsProps) {
  const [defaultTone, setDefaultTone] = useState<Mode>('Standard');

  const allModes: Mode[] = ['Standard', 'Academic', 'Executive', 'Epistolary', 'Dialectic', 'Minimalist', 'LOWERCASE'];

  const getModeLabel = (mode: Mode) => {
    if (mode === 'Epistolary') return 'PERSONAL';
    if (mode === 'Dialectic') return 'POLEMIC';
    if (mode === 'Minimalist') return 'BREVITY';
    return mode.toUpperCase();
  };

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
            DEFAULT MODE
          </p>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
            {allModes.map((mode) => (
              <button
                key={mode}
                onClick={() => setDefaultTone(mode)}
                className={`w-full px-4 py-3 font-['SpaceMono'] text-xs uppercase transition-colors ${
                  defaultTone === mode
                    ? 'bg-[#1A1A1A] text-white'
                    : 'border border-solid border-[#1A1A1A] bg-transparent text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white'
                }`}
                style={{ borderRadius: '0px' }}
              >
                {getModeLabel(mode)}
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
