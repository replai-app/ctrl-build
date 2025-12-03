'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Ledger() {
  const [isProHovered, setIsProHovered] = useState(false);
  const [isProButtonHovered, setIsProButtonHovered] = useState(false);

  const currentDate = new Date().toISOString().split('T')[0];

  return (
    <section id="ledger" className="border-b border-solid border-[#1A1A1A] bg-[#F4F4F0]">
      <div className="grid grid-cols-1 divide-y divide-solid divide-[#1A1A1A] md:grid-cols-2 md:divide-y-0 md:divide-x">
        <div className="order-2 bg-white p-8 font-['SpaceMono'] text-sm text-[#1A1A1A] md:order-1 md:p-12">
          <div className="mb-8 border-b border-dashed border-[#1A1A1A] pb-4">
            <p className="uppercase">INVOICE #001 // GUEST</p>
            <p className="mt-2 opacity-50">DATE: {currentDate}</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="uppercase">DAILY_QUOTA</span>
              <span className="hidden flex-grow border-b border-dotted border-[#1A1A1A] mx-2 md:block"></span>
              <span className="uppercase">500 WORDS</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="uppercase">LATENCY</span>
              <span className="hidden flex-grow border-b border-dotted border-[#1A1A1A] mx-2 md:block"></span>
              <span className="uppercase">STANDARD</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="uppercase">CADENCE_ENGINE</span>
              <span className="hidden flex-grow border-b border-dotted border-[#1A1A1A] mx-2 md:block"></span>
              <span className="uppercase">ENABLED</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="uppercase">API_ACCESS</span>
              <span className="hidden flex-grow border-b border-dotted border-[#1A1A1A] mx-2 md:block"></span>
              <span className="uppercase">DENIED</span>
            </div>
          </div>

          <div className="mt-12 border-t border-dashed border-[#1A1A1A] pt-4">
            <div className="flex items-center justify-between font-bold">
              <span className="uppercase">TOTAL: 0.00 / MO</span>
            </div>
          </div>

          <Link
            href="/signup"
            className="mt-8 flex h-14 w-full items-center justify-center border border-solid border-[#1A1A1A] bg-transparent px-6 font-['SpaceMono'] text-sm font-bold uppercase text-[#1A1A1A] transition-colors hover:bg-[#1A1A1A] hover:text-white"
          >
            [ START SESSION ]
          </Link>
        </div>

        <div
          className="order-1 relative overflow-hidden border-b border-dashed border-[#666666] bg-[#1A1A1A] p-8 font-['SpaceMono'] text-sm text-white md:order-2 md:border-b-0 md:p-12"
          onMouseEnter={() => setIsProHovered(true)}
          onMouseLeave={() => setIsProHovered(false)}
        >
          <div className="absolute right-6 top-6 h-2 w-2 animate-pulse rounded-full bg-[#0047FF] md:right-12 md:top-12"></div>

          <div className={`mb-8 border-b border-dashed border-[#666666] pb-4 animated-dash border-bottom ${isProHovered ? 'animate' : ''}`} style={{ color: '#666666' }}>
            <p className="uppercase">INVOICE #002 // PRO</p>
            <p className="mt-2 text-[#0047FF]">STATUS: RECOMMENDED</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="uppercase">DAILY_QUOTA</span>
              <span className="hidden flex-grow border-b border-dotted border-[#666666] mx-2 md:block"></span>
              <span className="uppercase">UNLIMITED</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="uppercase">LATENCY</span>
              <span className="hidden flex-grow border-b border-dotted border-[#666666] mx-2 md:block"></span>
              <span className="uppercase">PRIORITY</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="uppercase">CADENCE_ENGINE</span>
              <span className="hidden flex-grow border-b border-dotted border-[#666666] mx-2 md:block"></span>
              <span className="uppercase">MAX_VARIANCE</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="uppercase">API_KEYS</span>
              <span className="hidden flex-grow border-b border-dotted border-[#666666] mx-2 md:block"></span>
              <span className="uppercase">INCLUDED</span>
            </div>
          </div>

          <div className={`mt-12 border-t border-dashed border-[#666666] pt-4 animated-dash border-top ${isProHovered ? 'animate' : ''}`} style={{ color: '#666666' }}>
            <div className="flex items-center justify-between font-bold">
              <span className="text-xl uppercase">TOTAL: 12.00 / MO</span>
            </div>
          </div>

          <Link
            href="/signup"
            onMouseEnter={() => setIsProButtonHovered(true)}
            onMouseLeave={() => setIsProButtonHovered(false)}
            className="mt-8 flex h-14 w-full items-center justify-center rounded-none bg-[#0047FF] px-6 font-['SpaceMono'] text-sm font-bold uppercase tracking-wide text-white transition-all hover:bg-white hover:text-[#0047FF]"
            style={{ transform: isProButtonHovered ? 'scale(1)' : 'scale(0.98)' }}
          >
            {isProButtonHovered ? 'CONFIRM TRANSACTION' : 'INITIALIZE PRO'}
          </Link>
        </div>
      </div>
    </section>
  );
}

