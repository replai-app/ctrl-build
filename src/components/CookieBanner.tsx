'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const acknowledged = localStorage.getItem('cookie_acknowledged');
    if (!acknowledged) {
      setIsVisible(true);
    }
  }, []);

  const handleAcknowledge = () => {
    localStorage.setItem('cookie_acknowledged', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full border-t border-solid border-[#1A1A1A] bg-[#1A1A1A] p-3 md:bottom-4 md:left-4 md:w-auto md:max-w-md md:border md:border-solid md:border-[#1A1A1A]">
      <div className="mb-2 md:mb-3">
        <p className="mb-1 font-['SpaceMono'] text-[10px] uppercase text-white opacity-70 md:mb-2 md:text-xs">
          // SYSTEM STORAGE
        </p>
        <p className="font-['SpaceMono'] text-[10px] text-white md:text-xs">
          This interface uses local storage for authentication and payment security. No advertising trackers are loaded.
        </p>
      </div>
      <div className="flex flex-col gap-2 md:flex-row">
        <button
          onClick={handleAcknowledge}
          className="bg-white px-3 py-1.5 font-['SpaceMono'] text-[10px] font-bold uppercase text-[#1A1A1A] transition-colors hover:bg-[#F4F4F0] md:px-4 md:py-2 md:text-xs"
        >
          [ ACKNOWLEDGE ]
        </button>
        <Link
          href="/cookies"
          className="border border-solid border-white bg-transparent px-3 py-1.5 text-center font-['SpaceMono'] text-[10px] uppercase text-white underline transition-colors hover:bg-white hover:text-[#1A1A1A] md:px-4 md:py-2 md:text-xs"
        >
          [ VIEW MANIFEST ]
        </Link>
      </div>
    </div>
  );
}

