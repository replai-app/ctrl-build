'use client';

import { useState, useEffect, useRef } from 'react';
import { CheckCircle, Shield } from 'phosphor-react';
import Link from 'next/link';

export default function Privacy() {
  const [activeSection, setActiveSection] = useState('diagram');
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [redactedTerms, setRedactedTerms] = useState<Set<string>>(new Set());
  const [dotPosition, setDotPosition] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      const sensitiveTerms = ['IP Address', 'Payment Details', 'Email Address', 'User ID'];
      setRedactedTerms(new Set(sensitiveTerms));
    } else {
      setRedactedTerms(new Set());
    }
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) return;

    const animateDot = () => {
      setDotPosition((prev) => {
        const newPos = prev + 0.3;
        if (newPos >= 100) {
          return 0;
        }
        return newPos;
      });
      animationRef.current = requestAnimationFrame(animateDot);
    };

    animationRef.current = requestAnimationFrame(animateDot);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isMobile]);

  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return;

      const sections = ['diagram', 'collection', 'training', 'processors', 'cookies', 'rights'];

      const scrollPosition = window.scrollY + 200;
      const contentTop = contentRef.current.offsetTop;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop - contentTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleReveal = (term: string) => {
    if (!isMobile) {
      setRedactedTerms((prev) => {
        const newSet = new Set(prev);
        newSet.delete(term);
        return newSet;
      });
    }
  };

  const handleDownloadReport = () => {
    const content = `// CTRL-BUILD DATA EXPORT
// USER: [ID]
// LOGS FOUND: 0
// ARCHIVES: 0
// SYSTEM CLEAN.`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ctrl-build-data-export.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const renderTerm = (term: string) => {
    if (redactedTerms.has(term)) {
      return (
        <span
          className="cursor-pointer bg-[#1A1A1A] px-2 text-[#1A1A1A] transition-all hover:bg-transparent hover:text-[#1A1A1A]"
          onMouseEnter={() => handleReveal(term)}
        >
          {term}
        </span>
      );
    }
    return <span>{term}</span>;
  };

  const sections = [
    { id: 'collection', number: '01', title: 'Data Collection (Minimal)' },
    { id: 'training', number: '02', title: 'The "No-Training" Pact' },
    { id: 'processors', number: '03', title: 'Third-Party Processors' },
    { id: 'cookies', number: '04', title: 'Cookie Policy (Session Only)' },
    { id: 'rights', number: '05', title: 'User Rights (GDPR/CCPA)' },
  ];

  return (
    <div className="min-h-screen bg-[#F4F4F0]">
      {isMobile && (
        <div className="sticky top-0 z-40 border-b border-solid border-[#1A1A1A] bg-[#F4F4F0]">
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="flex w-full items-center justify-between p-4 font-['SpaceMono'] text-xs uppercase text-[#1A1A1A]"
          >
            <span>JUMP MENU</span>
            <span>{showMobileMenu ? '−' : '+'}</span>
          </button>
          {showMobileMenu && (
            <nav className="border-t border-solid border-[#1A1A1A] p-4">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  onClick={() => setShowMobileMenu(false)}
                  className={`block py-2 font-['SpaceMono'] text-xs uppercase transition-colors ${
                    activeSection === section.id
                      ? 'text-[#0047FF]'
                      : 'text-[#1A1A1A] opacity-70 hover:text-[#0047FF]'
                  }`}
                >
                  {section.number}. {section.title}
                </a>
              ))}
            </nav>
          )}
        </div>
      )}

      <div className="flex">
        <aside className="hidden w-[25%] border-r border-solid border-[#1A1A1A] bg-[#F4F4F0] lg:block">
          <div className="sticky top-0 flex h-screen flex-col overflow-y-auto p-8">
            <div className="mb-8">
              <h2 className="mb-6 font-['SpaceMono'] text-xs uppercase text-[#1A1A1A]">
                PRIVACY SETTINGS
              </h2>
              <div className="mb-6 space-y-2 font-['SpaceMono'] text-xs">
                <p className="text-green-600">LOGGING: DISABLED</p>
                <p className="text-green-600">TRAINING: DISABLED</p>
                <p className="text-[#1A1A1A]">ENCRYPTION: AES-256</p>
              </div>
            </div>

            <nav className="flex-1 space-y-1">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className={`block py-2 font-['SpaceMono'] text-xs uppercase transition-colors ${
                    activeSection === section.id
                      ? 'text-[#0047FF]'
                      : 'text-[#1A1A1A] opacity-70 hover:text-[#0047FF]'
                  }`}
                >
                  {section.number}. {section.title}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        <div ref={contentRef} className="flex-1 overflow-y-auto pt-16 lg:pt-0">
          <div className="mx-auto max-w-4xl px-6 py-12 md:px-12 lg:px-16">
            <section id="diagram" className="mb-16">
              <div className="mb-8">
                <h1 className="mb-4 font-['PPEditorialNew'] text-5xl font-extralight leading-tight text-[#1A1A1A]">
                  Privacy Policy
                </h1>
                <p className="mb-8 font-['PPEditorialNew'] text-2xl font-extralight text-[#1A1A1A]">
                  The Zero-Log Guarantee
                </p>
              </div>

              {isMobile ? (
                <div className="border border-solid border-[#1A1A1A] bg-white p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="font-['SpaceMono'] text-xs uppercase text-[#1A1A1A]">
                      [ USER INPUT ]
                    </span>
                    <span className="font-['SpaceMono'] text-xs">→</span>
                    <span className="font-['SpaceMono'] text-xs uppercase text-[#1A1A1A]">
                      [ PROCESSING ]
                    </span>
                    <span className="font-['SpaceMono'] text-xs">→</span>
                    <span className="font-['SpaceMono'] text-xs uppercase text-[#1A1A1A]">
                      [ NULL ]
                    </span>
                  </div>
                  <p className="font-['SpaceMono'] text-xs text-[#1A1A1A] opacity-70">
                    Data resides in memory only for the duration of the HTTP request (~400ms). No persistence. No training.
                  </p>
                </div>
              ) : (
                <div className="border border-solid border-[#1A1A1A] bg-white p-8">
                  <div className="relative mb-4 flex items-center justify-between">
                    <div className="relative flex w-full items-center">
                      <div className="flex h-12 w-12 items-center justify-center border border-solid border-[#1A1A1A] bg-[#F4F4F0] font-['SpaceMono'] text-xs uppercase text-[#1A1A1A]">
                        USER INPUT
                      </div>
                      <div className="relative flex-1 border-t-2 border-dashed border-[#1A1A1A]">
                        {dotPosition < 50 && (
                          <div
                            className="absolute -top-1 h-2 w-2 rounded-full bg-[#0047FF] transition-opacity"
                            style={{
                              left: `${(dotPosition / 50) * 100}%`,
                              opacity: dotPosition >= 45 ? 0 : 1,
                            }}
                          />
                        )}
                      </div>
                      <div className="flex h-12 w-12 items-center justify-center border border-solid border-[#1A1A1A] bg-[#F4F4F0] font-['SpaceMono'] text-xs uppercase text-[#1A1A1A]">
                        PROCESSING
                      </div>
                      <div className="relative flex-1 border-t-2 border-dashed border-[#1A1A1A]">
                        {dotPosition >= 50 && dotPosition < 100 && (
                          <div
                            className="absolute -top-1 h-2 w-2 rounded-full bg-[#0047FF] transition-opacity"
                            style={{
                              left: `${((dotPosition - 50) / 50) * 100}%`,
                              opacity: dotPosition >= 95 ? 0 : 1,
                            }}
                          />
                        )}
                      </div>
                      <div className="flex h-12 w-12 items-center justify-center border border-solid border-[#1A1A1A] bg-black font-['SpaceMono'] text-xs uppercase text-white">
                        NULL
                      </div>
                    </div>
                  </div>
                  <p className="font-['SpaceMono'] text-xs text-[#1A1A1A] opacity-70">
                    Data resides in memory only for the duration of the HTTP request (~400ms). No persistence. No training.
                  </p>
                </div>
              )}
            </section>

            <section id="collection" className="mb-16 scroll-mt-8">
              <h2 className="mb-4 font-['PPEditorialNew'] text-3xl font-extralight text-[#1A1A1A]">
                <span className="font-['SpaceMono'] text-sm font-normal">SECTION 01.</span> Data Collection (Minimal)
              </h2>
              <div className="font-['SpaceMono'] text-sm leading-relaxed text-[#1A1A1A] lg:max-w-[65ch]">
                <p className="mb-4">
                  We collect minimal data necessary to provide the Service. This includes your {renderTerm('Email Address')} for account creation, {renderTerm('Payment Details')} processed securely through Stripe (we do not store card information), and your {renderTerm('IP Address')} for security purposes only.
                </p>
                <p className="mb-4">
                  We do not collect browsing history, device fingerprints, or any data beyond what is explicitly required for Service functionality.
                </p>
              </div>
            </section>

            <section id="training" className="mb-16 scroll-mt-8">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center border border-solid border-[#1A1A1A]">
                  <Shield size={24} className="text-[#0047FF]" weight="fill" />
                </div>
                <h2 className="font-['PPEditorialNew'] text-3xl font-extralight text-[#1A1A1A]">
                  <span className="font-['SpaceMono'] text-sm font-normal">SECTION 02.</span> Model Training
                </h2>
              </div>
              <div className="font-['SpaceMono'] text-sm leading-relaxed text-[#1A1A1A] lg:max-w-[65ch]">
                <blockquote className="mb-4 border-l-4 border-solid border-[#0047FF] pl-4 italic">
                  "We do not use your Input or Output to train, fine-tune, or improve our internal models. Your intellectual property remains yours. We are a processor, not a collector."
                </blockquote>
                <p className="mb-4">
                  This is not a marketing promise—it is a technical constraint. Our architecture processes text in ephemeral memory and discards it immediately after generating output. There is no data pipeline that could feed into a training dataset.
                </p>
                <p className="mb-4">
                  We use third-party LLM APIs (Google Gemini) for processing, but we do not send your data to any service that uses it for training purposes.
                </p>
              </div>
            </section>

            <section id="processors" className="mb-16 scroll-mt-8">
              <h2 className="mb-4 font-['PPEditorialNew'] text-3xl font-extralight text-[#1A1A1A]">
                <span className="font-['SpaceMono'] text-sm font-normal">SECTION 03.</span> Third-Party Subprocessors
              </h2>
              <div className="font-['SpaceMono'] text-sm leading-relaxed text-[#1A1A1A] lg:max-w-[65ch]">
                <p className="mb-4">We use the following third-party services to operate the platform:</p>
                <div className="mb-4 border border-solid border-[#1A1A1A] bg-white">
                  <div className="grid grid-cols-1 divide-y divide-solid divide-[#1A1A1A] md:grid-cols-3 md:divide-y-0 md:divide-x">
                    <div className="p-4">
                      <p className="mb-2 font-bold uppercase">Google (Gemini)</p>
                      <p className="text-xs opacity-70">LLM Processing (Ephemeral)</p>
                    </div>
                    <div className="p-4">
                      <p className="mb-2 font-bold uppercase">Stripe</p>
                      <p className="text-xs opacity-70">Payment Processing (PCI Compliant)</p>
                    </div>
                    <div className="p-4">
                      <p className="mb-2 font-bold uppercase">Cloudflare</p>
                      <p className="text-xs opacity-70">Hosting & Edge Functions</p>
                    </div>
                  </div>
                </div>
                <p className="mb-4">
                  All subprocessors are bound by strict data processing agreements that prohibit training or long-term storage of user data.
                </p>
              </div>
            </section>

            <section id="cookies" className="mb-16 scroll-mt-8">
              <h2 className="mb-4 font-['PPEditorialNew'] text-3xl font-extralight text-[#1A1A1A]">
                <span className="font-['SpaceMono'] text-sm font-normal">SECTION 04.</span> Cookie Policy (Session Only)
              </h2>
              <div className="font-['SpaceMono'] text-sm leading-relaxed text-[#1A1A1A] lg:max-w-[65ch]">
                <p className="mb-4">We set the following cookies:</p>
                <div className="mb-4 space-y-2 border border-solid border-[#1A1A1A] bg-white p-4">
                  <div className="flex items-center justify-between border-b border-dashed border-[#1A1A1A] pb-2">
                    <span className="font-mono text-xs">session_token</span>
                    <span className="text-xs opacity-70">Authentication (Essential)</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-dashed border-[#1A1A1A] pb-2">
                    <span className="font-mono text-xs">history_cache</span>
                    <span className="text-xs opacity-70">Local Storage (User Device Only)</span>
                  </div>
                </div>
                <p className="mb-4 font-bold">
                  Note: We do not use tracking pixels (Meta, TikTok) or advertising cookies.
                </p>
              </div>
            </section>

            <section id="rights" className="mb-16 scroll-mt-8">
              <h2 className="mb-4 font-['PPEditorialNew'] text-3xl font-extralight text-[#1A1A1A]">
                <span className="font-['SpaceMono'] text-sm font-normal">SECTION 05.</span> User Rights (GDPR/CCPA)
              </h2>
              <div className="font-['SpaceMono'] text-sm leading-relaxed text-[#1A1A1A] lg:max-w-[65ch]">
                <p className="mb-4">
                  Under GDPR and CCPA, you have the right to:
                </p>
                <ul className="mb-4 ml-6 list-disc space-y-2">
                  <li>Access your data (though we store minimal data)</li>
                  <li>Request deletion of your account and associated data</li>
                  <li>Export your data (see button below)</li>
                  <li>Opt out of data processing (though our processing is essential for Service delivery)</li>
                </ul>
                <p className="mb-4">
                  To exercise these rights, contact us at contact@ctrl-build.com or use the account deletion feature in your profile settings.
                </p>
              </div>
            </section>

            <div className="mb-16 flex justify-center">
              <button
                onClick={handleDownloadReport}
                className="border border-solid border-[#1A1A1A] bg-transparent px-8 py-4 font-['SpaceMono'] text-sm font-bold uppercase text-[#1A1A1A] transition-colors hover:bg-[#1A1A1A] hover:text-white"
              >
                [ DOWNLOAD DATA REPORT ]
              </button>
            </div>
          </div>
        </div>
      </div>

      {isMobile && (
        <div className="sticky bottom-0 left-0 right-0 z-40 border-t border-solid border-[#1A1A1A] bg-[#F4F4F0] p-4">
          <p className="text-center font-['SpaceMono'] text-xs uppercase text-[#1A1A1A] opacity-70">
            LAST UPDATED: 2025-12-03
          </p>
        </div>
      )}
    </div>
  );
}
