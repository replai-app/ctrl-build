'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function Footer() {
  const [currentTime, setCurrentTime] = useState('');
  const [isAtBottom, setIsAtBottom] = useState(false);
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getUTCHours()).padStart(2, '0');
      const minutes = String(now.getUTCMinutes()).padStart(2, '0');
      const seconds = String(now.getUTCSeconds()).padStart(2, '0');
      setCurrentTime(`UTC ${hours}:${minutes}:${seconds}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!footerRef.current) return;

      const footer = footerRef.current;
      const footerTop = footer.offsetTop;
      const footerHeight = footer.offsetHeight;
      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY;

      const isBottom = scrollY + windowHeight >= footerTop + footerHeight - 50;
      setIsAtBottom(isBottom);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <footer ref={footerRef} className="overflow-x-hidden border-t border-solid border-[#0047FF] bg-[#1A1A1A] text-white">
      <div className="mx-auto max-w-full px-8 py-16 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="font-['SpaceMono'] text-sm">
            <p className="mb-4 font-bold uppercase">CTRL — BUILD</p>
            <p className="mb-4 text-xs opacity-70">© 2025 SEQUENCE LABS.</p>
            <p className="text-xs opacity-70">{currentTime}</p>
          </div>

          <div className="font-['SpaceMono'] text-sm">
            <p className="mb-4 text-xs uppercase opacity-50">DIRECTORY</p>
            <nav className="space-y-2">
              <a href="#workspace" className="block min-h-[48px] py-2 transition-colors hover:text-[#0047FF] md:min-h-0" style={{ cursor: 'text' }}>
                Workspace
              </a>
              <a href="#manifesto" className="block min-h-[48px] py-2 transition-colors hover:text-[#0047FF] md:min-h-0" style={{ cursor: 'text' }}>
                Manifesto
              </a>
              <a href="#ledger" className="block min-h-[48px] py-2 transition-colors hover:text-[#0047FF] md:min-h-0" style={{ cursor: 'text' }}>
                Ledger
              </a>
              <Link href="/api" className="block min-h-[48px] py-2 transition-colors hover:text-[#0047FF] md:min-h-0" style={{ cursor: 'text' }}>
                API Documentation
              </Link>
            </nav>
          </div>

          <div className="font-['SpaceMono'] text-sm">
            <p className="mb-4 text-xs uppercase opacity-50">PROTOCOLS</p>
            <nav className="space-y-2">
              <Link href="/terms" className="block min-h-[48px] py-2 transition-colors hover:text-[#0047FF] md:min-h-0" style={{ cursor: 'text' }}>
                Terms of Service
              </Link>
              <Link href="/privacy" className="block min-h-[48px] py-2 transition-colors hover:text-[#0047FF] md:min-h-0" style={{ cursor: 'text' }}>
                Privacy Policy
              </Link>
              <Link href="/zero-log" className="block min-h-[48px] py-2 font-bold transition-colors hover:text-[#0047FF] md:min-h-0" style={{ cursor: 'text' }}>
                Zero-Log Guarantee
              </Link>
            </nav>
          </div>

          <div className="font-['SpaceMono'] text-sm">
            <p className="mb-4 text-xs uppercase opacity-50">SIGNALS</p>
            <nav className="space-y-2">
              <a href="https://twitter.com/ctrlbuild" target="_blank" rel="noopener noreferrer" className="block min-h-[48px] py-2 transition-colors hover:text-[#0047FF] md:min-h-0" style={{ cursor: 'text' }}>
                X / Twitter
              </a>
              <a href="https://github.com/ctrl-build" target="_blank" rel="noopener noreferrer" className="block min-h-[48px] py-2 transition-colors hover:text-[#0047FF] md:min-h-0" style={{ cursor: 'text' }}>
                GitHub
              </a>
              <a href="mailto:contact@ctrl-build.com" className="block min-h-[48px] py-2 transition-colors hover:text-[#0047FF] md:min-h-0" style={{ cursor: 'text' }}>
                Email Support
              </a>
            </nav>
          </div>
        </div>

        <div className="mt-24 border-t border-solid border-white/10 pt-16">
          <div className="flex flex-col items-start overflow-hidden md:items-center">
            <h2
              className={`font-['PPEditorialNew'] text-[48px] leading-none transition-all md:text-[72px] lg:text-[clamp(72px,12vw,180px)] ${
                isAtBottom ? 'text-white' : 'text-transparent'
              }`}
              style={{
                fontWeight: 200,
                WebkitTextStroke: '1px white',
                textStroke: '1px white',
                letterSpacing: '-0.03em',
              }}
            >
              <span className="block md:inline">RESTORE</span>
              <span className="block md:inline md:ml-4">NUANCE.</span>
            </h2>
          </div>
          <div className="mt-12 text-center">
            <p className="font-['SpaceMono'] text-xs text-white/50">
              designed and developed by{' '}
              <a
                href="https://monk.haus"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-[#0047FF]"
                style={{ cursor: 'text' }}
              >
                monk
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

