'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

export default function Cookies() {
  const [isPurging, setIsPurging] = useState(false);
  const [showFlash, setShowFlash] = useState(false);
  const router = useRouter();
  const { signOut } = useAuth();

  const blockedTrackers = [
    'META PIXEL',
    'GOOGLE AD SENSE',
    'LINKEDIN INSIGHTS',
    'TIKTOK EVENTS',
  ];

  const cookies = [
    {
      name: 'session_token',
      type: 'HTTP Only / Secure',
      purpose: 'Maintains your secure connection to the API. Deleted upon logout.',
      status: 'REQUIRED',
      statusColor: 'text-green-600',
    },
    {
      name: 'ctrl_config',
      type: 'Local Storage',
      purpose: 'Remembers your last selected Tone (e.g., Lowercase) and visual theme settings.',
      status: 'OPTIONAL',
      statusColor: 'text-yellow-600',
    },
    {
      name: '__stripe_mid',
      type: 'Third-Party (Functional)',
      purpose: 'Fraud detection and payment security. Required for Pro transactions.',
      status: 'REQUIRED',
      statusColor: 'text-green-600',
    },
  ];

  const handlePurge = async () => {
    setIsPurging(true);
    setShowFlash(true);

    localStorage.clear();
    sessionStorage.clear();

    document.cookie.split(';').forEach((c) => {
      const eqPos = c.indexOf('=');
      const name = eqPos > -1 ? c.substr(0, eqPos).trim() : c.trim();
      if (name && !name.startsWith('__stripe')) {
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
      }
    });

    await signOut();

    setTimeout(() => {
      router.push('/');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F4F4F0]">
      {showFlash && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
          <p className="font-['SpaceMono'] text-2xl font-bold text-[#1A1A1A]">
            STORAGE CLEARED
          </p>
        </div>
      )}

      <div className="mx-auto max-w-4xl px-6 py-16 md:px-12 lg:px-16">
        <div className="mb-16">
          <h1 className="mb-4 font-['PPEditorialNew'] text-5xl font-extralight text-[#1A1A1A] md:text-6xl lg:text-7xl">
            Local Persistence.
          </h1>
          <p className="font-['PPEditorialNew'] text-lg italic text-[#1A1A1A] opacity-70">
            We use storage for utility, not surveillance. No tracking pixels. No advertising IDs. No data brokering.
          </p>
        </div>

        <div className="mb-12 border border-solid border-[#1A1A1A] bg-white p-6 md:p-8">
          <p className="mb-4 font-['SpaceMono'] text-xs uppercase text-[#1A1A1A] opacity-50">
            EXTERNAL SIGNAL BLOCKING: ACTIVE.
          </p>
          <div className="hidden space-y-2 md:block">
            {blockedTrackers.map((tracker) => (
              <div key={tracker} className="flex items-center gap-3">
                <span className="font-['SpaceMono'] text-sm text-[#FF3333]">✕</span>
                <span className="font-['SpaceMono'] text-sm text-[#1A1A1A] line-through opacity-50">
                  {tracker}
                </span>
              </div>
            ))}
          </div>
          <div className="md:hidden">
            <p className="font-['SpaceMono'] text-sm text-[#1A1A1A]">
              TRACKERS: 0 DETECTED
            </p>
          </div>
        </div>

        <div className="mb-12 space-y-4">
          <h2 className="mb-6 font-['SpaceMono'] text-sm uppercase text-[#1A1A1A] opacity-50">
            ALLOWED STORAGE
          </h2>
          {cookies.map((cookie, index) => (
            <div
              key={cookie.name}
              className="border border-solid border-[#1A1A1A] bg-white p-6 md:p-8"
            >
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <p className="mb-2 font-['SpaceMono'] text-sm font-bold uppercase text-[#1A1A1A]">
                    {cookie.name}
                  </p>
                  <p className="font-['SpaceMono'] text-xs uppercase text-[#1A1A1A] opacity-50">
                    {cookie.type}
                  </p>
                </div>
                <span className={`font-['SpaceMono'] text-xs font-bold uppercase ${cookie.statusColor}`}>
                  {cookie.status}
                </span>
              </div>
              <p className="font-['PPEditorialNew'] text-sm italic text-[#1A1A1A] opacity-70">
                {cookie.purpose}
              </p>
            </div>
          ))}
        </div>

        <div className="border border-solid border-[#FF3333] bg-transparent p-6 md:p-8">
          <p className="mb-4 font-['SpaceMono'] text-xs uppercase text-[#1A1A1A] opacity-50">
            PURGE PROTOCOL
          </p>
          <p className="mb-6 font-['PPEditorialNew'] text-sm italic text-[#1A1A1A] opacity-70">
            Clear all local storage and cookies. You will be logged out and redirected to the homepage.
          </p>
          <button
            onClick={handlePurge}
            disabled={isPurging}
            className="w-full border-2 border-solid border-[#FF3333] bg-transparent px-6 py-4 font-['SpaceMono'] text-sm font-bold uppercase text-[#FF3333] transition-colors hover:bg-[#FF3333] hover:text-white disabled:opacity-50"
          >
            {isPurging ? 'PURGING...' : 'PURGE LOCAL STORAGE'}
          </button>
        </div>
      </div>
    </div>
  );
}

