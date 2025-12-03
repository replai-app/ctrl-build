'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function NotFound() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, [isMobile]);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 100);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const [noiseText, setNoiseText] = useState('404');

  useEffect(() => {
    if (!isMobile) {
      const chars = '█▓▒░▄▀▌▐▬▮▯▰▱▲△▴▵▶▷▸▹►▻▼▽▾▿◀◁◂◃◄◅◆◇◈◉◊○◌◍◎●◐◑◒◓◔◕◖◗◘◙◚◛◜◝◞◟◠◡◢◣◤◥◦◧◨◩◪◫◬◭◮◯';
      const interval = setInterval(() => {
        setNoiseText(
          '404'
            .split('')
            .map((char) => {
              if (char === ' ') return ' ';
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join('')
        );
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isMobile]);

  return (
    <div
      className="relative min-h-screen bg-black text-white"
      style={{
        cursor: isMobile ? 'default' : 'none',
        backgroundColor: isMobile ? '#1A1A1A' : '#000000',
      }}
    >
      <div
        className="absolute inset-0 border-2 border-solid border-[#FF3333] transition-opacity"
        style={{
          animation: 'pulseBorder 2s ease-in-out infinite',
        }}
      />

      {!isMobile && (
        <>
          <div
            className="pointer-events-none fixed inset-0 z-50"
            style={{
              background: `radial-gradient(circle 400px at ${mousePosition.x}px ${mousePosition.y}px, transparent 0%, transparent 35%, rgba(26, 26, 26, 0.8) 50%, rgba(26, 26, 26, 0.95) 70%, #000000 100%)`,
            }}
          />
          <div
            className="pointer-events-none fixed z-40"
            style={{
              left: `${mousePosition.x - 10}px`,
              top: `${mousePosition.y - 10}px`,
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              boxShadow: '0 0 20px rgba(255, 255, 255, 0.2)',
            }}
          />
        </>
      )}

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center p-8">
        <div className="relative mb-8 text-center">
          <div
            className={`font-['SpaceMono'] text-[20vw] font-bold leading-none ${
              glitchActive ? 'glitch-effect' : ''
            }`}
            style={{
              WebkitTextStroke: '2px white',
              textStroke: '2px white',
              color: 'transparent',
              fontFamily: 'monospace',
              letterSpacing: '0.1em',
            }}
          >
            {isMobile ? '404' : noiseText}
          </div>
        </div>

        <div className="mb-8 text-center">
          <h1 className="mb-4 font-['PPEditorialNew'] text-[32px] font-light italic leading-tight text-white">
            SIGNAL LOST.
          </h1>
          <p className="font-['SpaceMono'] text-sm text-[#888888]">
            The directory you attempted to access has been unmounted or does not exist.
          </p>
        </div>

        <Link
          href="/"
          className="mb-16 border border-solid border-white bg-white px-8 py-4 font-['SpaceMono'] text-sm font-bold uppercase text-black transition-colors hover:bg-[#FF3333] hover:text-white"
        >
          REBOOT SYSTEM
        </Link>

        <div
          className={`absolute font-['SpaceMono'] text-[10px] text-[#888888] ${
            isMobile ? 'right-4 top-4' : 'bottom-4 left-4'
          }`}
        >
          <pre className="whitespace-pre-wrap">
            {`ERR_CODE: 0x00000404
PATH: /undefined
STACK_TRACE: NULL
MEMORY_DUMP: ABORTED`}
          </pre>
        </div>
      </div>
    </div>
  );
}
