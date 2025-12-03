'use client';

import { useState, useEffect, useRef } from 'react';
import { Lock, Cpu, Prohibit } from 'phosphor-react';
import Link from 'next/link';

export default function ZeroLog() {
  const [traceResult, setTraceResult] = useState<string | null>(null);
  const [isTracing, setIsTracing] = useState(false);
  const [showSignature, setShowSignature] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const animationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile && animationRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && !hasAnimated) {
            setHasAnimated(true);
          }
        },
        { threshold: 0.5 }
      );
      observer.observe(animationRef.current);
      return () => observer.disconnect();
    }
  }, [isMobile, hasAnimated]);

  const handleTrace = async () => {
    setIsTracing(true);
    setTraceResult(null);

    const steps = [
      'Scanning logs...',
      'Searching DB...',
      'Searching Backups...',
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setTraceResult(steps[i]);
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));
    setTraceResult('ERROR 404: NO RECORDS FOUND.');
    setIsTracing(false);
  };

  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-[800px] border border-solid border-[#00FF00] p-8 md:p-12">
        <section className="mb-16">
          <h1 className="mb-4 font-['PPEditorialNew'] text-[80px] font-extralight leading-tight text-[#1A1A1A]">
            RAM-Only Processing.
          </h1>
          <p className="mb-12 font-['PPEditorialNew'] text-xl leading-relaxed text-[#1A1A1A]">
            We cannot sell what we do not have. Our architecture is designed to have no memory.
          </p>

          <div ref={animationRef} className="mb-8 flex flex-col items-center">
            <div className="relative mb-4 flex h-32 w-full items-center justify-center border border-solid border-[#1A1A1A] bg-[#F4F4F0]">
              <div className="absolute left-8 flex h-16 w-16 items-center justify-center rounded-full border-2 border-dashed border-[#1A1A1A] font-['SpaceMono'] text-xs uppercase">
                DATA
              </div>
              <div className="flex-1 text-center">
                <div className="mx-auto mb-2 flex h-20 w-20 items-center justify-center border-2 border-solid border-[#0047FF] bg-[#0047FF]/10 font-['SpaceMono'] text-xs uppercase animate-pulse">
                  MEMORY
                </div>
              </div>
              <div className="absolute right-8 flex h-16 w-16 items-center justify-center">
                {isMobile && !hasAnimated ? (
                  <div className="h-4 w-4 rounded-full border-2 border-dashed border-[#1A1A1A]" />
                ) : (
                  <div className="relative h-8 w-8">
                    {[...Array(12)].map((_, i) => {
                      const angle = (i / 12) * Math.PI * 2;
                      const radius = 16;
                      const x = Math.cos(angle) * radius;
                      const y = Math.sin(angle) * radius;
                      return (
                        <div
                          key={i}
                          className="absolute left-1/2 top-1/2 h-1 w-1 bg-[#1A1A1A]"
                          style={{
                            transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
                            animation: isMobile
                              ? `fragment 0.6s ease-out ${i * 0.05}s forwards`
                              : `fragment 0.6s ease-out ${(i * 0.05 + (Date.now() / 2000) % 2)}s infinite`,
                            opacity: 0,
                          }}
                        />
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
            <p className="font-['SpaceMono'] text-xs uppercase text-[#1A1A1A]">
              STATUS: EPHEMERAL // PERSISTENCE: 0ms
            </p>
          </div>
        </section>

        <section className="mb-16">
          <div className="space-y-12">
            <div className="flex gap-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-solid border-[#1A1A1A]">
                <Lock size={24} className="text-[#1A1A1A]" weight="bold" />
              </div>
              <div>
                <h3 className="mb-2 font-['SpaceMono'] text-sm font-bold uppercase text-[#1A1A1A]">
                  Phase 01: Ingress (TLS 1.3)
                </h3>
                <p className="font-['PPEditorialNew'] text-base leading-relaxed text-[#1A1A1A]">
                  Your text is encrypted in transit using TLS 1.3. Even if intercepted, the packet payload is indecipherable garbage.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-solid border-[#1A1A1A]">
                <Cpu size={24} className="text-[#1A1A1A]" weight="bold" />
              </div>
              <div>
                <h3 className="mb-2 font-['SpaceMono'] text-sm font-bold uppercase text-[#1A1A1A]">
                  Phase 02: Processing (The Black Box)
                </h3>
                <p className="font-['PPEditorialNew'] text-base leading-relaxed text-[#1A1A1A]">
                  The text enters the GPU VRAM for the duration of the inference (approx. 400ms). It exists only as floating-point tensors in volatile memory.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-solid border-[#1A1A1A]">
                <Prohibit size={24} className="text-[#1A1A1A]" weight="bold" />
              </div>
              <div>
                <h3 className="mb-2 font-['SpaceMono'] text-sm font-bold uppercase text-[#1A1A1A]">
                  Phase 03: The Shredder (RAM Flush)
                </h3>
                <p className="font-['PPEditorialNew'] text-base leading-relaxed text-[#1A1A1A]">
                  Once the HTTP response is sent back to your browser, the memory block is overwritten. No database entry is created. No log file is written. The input ceases to exist.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <button
            onClick={handleTrace}
            disabled={isTracing}
            className="w-full border border-solid border-[#1A1A1A] bg-transparent px-8 py-4 font-['SpaceMono'] text-sm font-bold uppercase text-[#1A1A1A] transition-colors hover:bg-[#1A1A1A] hover:text-white disabled:opacity-50"
          >
            [ TRACE MY IP ]
          </button>
          {traceResult && (
            <div className="mt-4 border border-solid border-[#1A1A1A] bg-[#F4F4F0] p-4 font-['SpaceMono'] text-sm text-[#1A1A1A]">
              <pre className="whitespace-pre-wrap">{traceResult}</pre>
            </div>
          )}
        </section>

        <section className="border-t border-solid border-[#1A1A1A] bg-[#1A1A1A] p-8 text-white">
          <h2 className="mb-4 font-['SpaceMono'] text-xs uppercase text-white/70">
            // WARRANT CANARY
          </h2>
          <div className="mb-4 flex items-center gap-2">
            <span className="font-['SpaceMono'] text-xs uppercase text-green-500 animate-pulse">
              ACTIVE
            </span>
          </div>
          <p className="mb-6 font-['PPEditorialNew'] text-base leading-relaxed text-white">
            As of {currentDate}, `ctrl-build` has NOT received any National Security Letters, gag orders, or warrants from any government agency demanding user data. If this section disappears, assume the system is compromised.
          </p>
          {showSignature ? (
            <div className="font-['SpaceMono'] text-xs text-white/70">
              <p className="mb-2">PGP SIGNATURE:</p>
              <pre className="break-all text-[10px]">
                -----BEGIN PGP SIGNATURE-----
                iQIzBAABCAAdFiEEXAMPLE1234567890ABCDEF1234567890
                ABCDEF1234567890ABCDEF1234567890ABCDEF1234567890
                ABCDEF1234567890ABCDEF1234567890ABCDEF1234567890
                ABCDEF1234567890ABCDEF1234567890ABCDEF1234567890
                =ABCD
                -----END PGP SIGNATURE-----
              </pre>
            </div>
          ) : (
            <button
              onClick={() => setShowSignature(true)}
              className="font-['SpaceMono'] text-xs uppercase text-white/70 underline transition-colors hover:text-white"
            >
              [ VIEW SIGNATURE ]
            </button>
          )}
        </section>
      </div>

      {isMobile && (
        <div className="sticky bottom-0 left-0 right-0 z-40 border-t border-solid border-[#1A1A1A] bg-white p-4">
          <Link
            href="/"
            className="flex w-full items-center justify-center gap-2 border border-solid border-[#1A1A1A] bg-transparent px-6 py-3 font-['SpaceMono'] text-sm font-bold uppercase text-[#1A1A1A] transition-colors hover:bg-[#1A1A1A] hover:text-white"
          >
            ← WORKSPACE
          </Link>
        </div>
      )}
    </div>
  );
}
