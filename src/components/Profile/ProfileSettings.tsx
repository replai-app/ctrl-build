'use client';

import { useState, useEffect } from 'react';
import type { User } from '@supabase/supabase-js';
import type { SupabaseClient } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/client';

interface ProfileSettingsProps {
  user: User;
  onSignOut: () => void;
}

type Mode = 'Standard' | 'Academic' | 'Executive' | 'Epistolary' | 'Dialectic' | 'Minimalist' | 'LOWERCASE';

export default function ProfileSettings({ user, onSignOut }: ProfileSettingsProps) {
  const [defaultTone, setDefaultTone] = useState<Mode>('Standard');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  let supabase: SupabaseClient | undefined;
  try {
    supabase = createClient();
  } catch (error) {
  }

  const allModes: Mode[] = ['Standard', 'Academic', 'Executive', 'Epistolary', 'Dialectic', 'Minimalist', 'LOWERCASE'];

  const getModeLabel = (mode: Mode) => {
    if (mode === 'Epistolary') return 'PERSONAL';
    if (mode === 'Dialectic') return 'POLEMIC';
    if (mode === 'Minimalist') return 'BREVITY';
    return mode.toUpperCase();
  };

  useEffect(() => {
    const loadDefaultMode = async () => {
      if (!supabase || !user) {
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('default_mode')
          .eq('id', user.id)
          .single();

        if (error && error.code !== 'PGRST116') {
          console.error('Error loading default mode:', error);
        } else if (data?.default_mode) {
          setDefaultTone(data.default_mode as Mode);
        }
      } catch (error) {
        console.error('Error loading default mode:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDefaultMode();
  }, [user, supabase]);

  const handleModeChange = async (mode: Mode) => {
    setDefaultTone(mode);
    
    if (!supabase || !user) return;

    setSaving(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          default_mode: mode,
          updated_at: new Date().toISOString(),
        }, {
          onConflict: 'id'
        });

      if (error) {
        console.error('Error saving default mode:', error);
        const { data } = await supabase
          .from('profiles')
          .select('default_mode')
          .eq('id', user.id)
          .single();
        if (data?.default_mode) {
          setDefaultTone(data.default_mode as Mode);
        }
      }
    } catch (error) {
      console.error('Error saving default mode:', error);
    } finally {
      setSaving(false);
    }
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
                onClick={() => handleModeChange(mode)}
                disabled={loading || saving}
                className={`w-full px-4 py-3 font-['SpaceMono'] text-xs uppercase transition-colors ${
                  defaultTone === mode
                    ? 'bg-[#1A1A1A] text-white'
                    : 'border border-solid border-[#1A1A1A] bg-transparent text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white'
                } ${loading || saving ? 'opacity-50 cursor-not-allowed' : ''}`}
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
