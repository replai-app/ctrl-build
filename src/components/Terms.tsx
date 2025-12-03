'use client';

import { useState, useEffect, useRef } from 'react';
import { Hash, FilePdf } from 'phosphor-react';
import Link from 'next/link';

export default function Terms() {
  const [activeSection, setActiveSection] = useState('summary');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hoveredHash, setHoveredHash] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return;

      const sections = [
        'summary',
        'definitions',
        'license',
        'conduct',
        'limitations',
        'payment',
        'termination',
      ];

      const scrollPosition = window.scrollY + 200;
      const contentTop = contentRef.current.offsetTop;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop - contentTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }

      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCopyLink = async (sectionId: string) => {
    const url = `${window.location.origin}/terms#${sectionId}`;
    await navigator.clipboard.writeText(url);
    setHoveredHash(null);
  };

  const handleExportPDF = () => {
    window.print();
  };

  const sections = [
    { id: 'definitions', number: '01', title: 'Definitions' },
    { id: 'license', number: '02', title: 'License Grant' },
    { id: 'conduct', number: '03', title: 'User Conduct' },
    { id: 'limitations', number: '04', title: 'AI Limitations' },
    { id: 'payment', number: '05', title: 'Payment & Refund' },
    { id: 'termination', number: '06', title: 'Termination' },
  ];

  return (
    <div className="min-h-screen bg-[#F4F4F0]">
      <div className="fixed top-0 left-0 right-0 z-50 h-0.5 bg-[#0047FF]" style={{ width: `${scrollProgress}%` }} />

      {isMobile && (
        <div className="sticky top-0 z-40 border-b border-solid border-[#1A1A1A] bg-[#F4F4F0]">
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="flex w-full items-center justify-between p-4 font-['SpaceMono'] text-xs uppercase text-[#1A1A1A]"
          >
            <span>TABLE OF CONTENTS</span>
            <span>{showMobileMenu ? '−' : '+'}</span>
          </button>
          {showMobileMenu && (
            <nav className="border-t border-solid border-[#1A1A1A] p-4">
              <a
                href="#summary"
                onClick={() => setShowMobileMenu(false)}
                className="block py-2 font-['SpaceMono'] text-xs uppercase text-[#1A1A1A] opacity-70 transition-colors hover:text-[#0047FF]"
              >
                EXECUTIVE SUMMARY
              </a>
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
                PROTOCOL INDEX
              </h2>
              <div className="mb-6 space-y-2 font-['SpaceMono'] text-xs text-[#1A1A1A] opacity-70">
                <p>VERSION: 1.0.4</p>
                <p>UPDATED: 2025-12-03</p>
                <p>STATUS: ACTIVE</p>
              </div>
            </div>

            <nav className="flex-1 space-y-1">
              <a
                href="#summary"
                className={`block py-2 font-['SpaceMono'] text-xs uppercase transition-colors ${
                  activeSection === 'summary'
                    ? 'text-[#0047FF]'
                    : 'text-[#1A1A1A] opacity-70 hover:text-[#0047FF]'
                }`}
              >
                EXECUTIVE SUMMARY
              </a>
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
            <div className="mb-8 flex items-center justify-end">
              <button
                onClick={handleExportPDF}
                className="flex items-center gap-2 border border-solid border-[#1A1A1A] bg-transparent px-4 py-2 font-['SpaceMono'] text-xs uppercase text-[#1A1A1A] transition-colors hover:bg-[#1A1A1A] hover:text-white"
              >
                <FilePdf size={16} />
                EXPORT PDF
              </button>
            </div>

            <section id="summary" className="mb-16">
              <div className="mb-8 border border-solid border-[#1A1A1A] bg-white p-6">
                <p className="mb-4 font-['SpaceMono'] text-xs uppercase text-[#1A1A1A] opacity-50">
                  // EXECUTIVE SUMMARY
                </p>
                <p className="font-['PPEditorialNew'] text-base leading-relaxed text-[#1A1A1A]">
                  You own the output. We do not log your text. We cannot guarantee 100% detection evasion because detection algorithms change daily. Use ethically.
                </p>
              </div>
            </section>

            <section id="definitions" className="mb-16 scroll-mt-8">
              <div className="mb-4 flex items-center gap-3">
                <h2
                  className="font-['PPEditorialNew'] text-3xl font-extralight text-[#1A1A1A]"
                  onMouseEnter={() => setHoveredHash('definitions')}
                  onMouseLeave={() => setHoveredHash(null)}
                >
                  {hoveredHash === 'definitions' && (
                    <button
                      onClick={() => handleCopyLink('definitions')}
                      className="mr-2 inline-block text-[#0047FF] transition-colors hover:opacity-70"
                    >
                      <Hash size={20} />
                    </button>
                  )}
                  <span className="font-['SpaceMono'] text-sm font-normal">SECTION 01.</span> Definitions
                </h2>
              </div>
              <div className="font-['PPEditorialNew'] text-sm leading-relaxed text-[#1A1A1A] lg:max-w-[65ch] lg:font-['SpaceMono']">
                <p className="mb-4">
                  <strong>"Service"</strong> refers to the ctrl-build platform, including all software, APIs, and related services provided by Sequence Labs.
                </p>
                <p className="mb-4">
                  <strong>"User"</strong> means any individual or entity that accesses or uses the Service.
                </p>
                <p className="mb-4">
                  <strong>"Input"</strong> refers to text data submitted by the User to the Service for processing.
                </p>
                <p className="mb-4">
                  <strong>"Output"</strong> refers to the processed text returned by the Service to the User.
                </p>
              </div>
            </section>

            <section id="license" className="mb-16 scroll-mt-8">
              <div className="mb-4 flex items-center gap-3">
                <h2
                  className="font-['PPEditorialNew'] text-3xl font-extralight text-[#1A1A1A]"
                  onMouseEnter={() => setHoveredHash('license')}
                  onMouseLeave={() => setHoveredHash(null)}
                >
                  {hoveredHash === 'license' && (
                    <button
                      onClick={() => handleCopyLink('license')}
                      className="mr-2 inline-block text-[#0047FF] transition-colors hover:opacity-70"
                    >
                      <Hash size={20} />
                    </button>
                  )}
                  <span className="font-['SpaceMono'] text-sm font-normal">SECTION 02.</span> License Grant
                </h2>
              </div>
              <div className="font-['PPEditorialNew'] text-sm leading-relaxed text-[#1A1A1A] lg:max-w-[65ch] lg:font-['SpaceMono']">
                <p className="mb-4">
                  Subject to these Terms, Sequence Labs grants you a limited, non-exclusive, non-transferable license to access and use the Service for your personal or internal business purposes.
                </p>
                <p className="mb-4">
                  You retain all ownership rights to your Input and Output. Sequence Labs does not claim any ownership interest in your content.
                </p>
                <p className="mb-4">
                  You may not: (a) reverse engineer, decompile, or disassemble the Service; (b) use the Service for any illegal purpose; (c) attempt to gain unauthorized access to the Service.
                </p>
              </div>
            </section>

            <section id="conduct" className="mb-16 scroll-mt-8">
              <div className="mb-4 flex items-center gap-3">
                <h2
                  className="font-['PPEditorialNew'] text-3xl font-extralight text-[#1A1A1A]"
                  onMouseEnter={() => setHoveredHash('conduct')}
                  onMouseLeave={() => setHoveredHash(null)}
                >
                  {hoveredHash === 'conduct' && (
                    <button
                      onClick={() => handleCopyLink('conduct')}
                      className="mr-2 inline-block text-[#0047FF] transition-colors hover:opacity-70"
                    >
                      <Hash size={20} />
                    </button>
                  )}
                  <span className="font-['SpaceMono'] text-sm font-normal">SECTION 03.</span> User Conduct
                </h2>
              </div>
              <div className="font-['PPEditorialNew'] text-sm leading-relaxed text-[#1A1A1A] lg:max-w-[65ch] lg:font-['SpaceMono']">
                <p className="mb-4">
                  You agree to use the Service in compliance with all applicable laws and regulations. You will not use the Service to:
                </p>
                <ul className="mb-4 ml-6 list-disc space-y-2">
                  <li>Generate content that violates intellectual property rights</li>
                  <li>Create misleading or fraudulent content</li>
                  <li>Circumvent academic integrity policies in violation of institutional rules</li>
                  <li>Process content that is illegal, harmful, or violates third-party rights</li>
                </ul>
                <p className="mb-4">
                  Sequence Labs reserves the right to suspend or terminate your access to the Service if you violate these terms.
                </p>
              </div>
            </section>

            <section id="limitations" className="mb-16 scroll-mt-8">
              <div className="mb-4 flex items-center gap-3">
                <h2
                  className="font-['PPEditorialNew'] text-3xl font-extralight text-[#1A1A1A]"
                  onMouseEnter={() => setHoveredHash('limitations')}
                  onMouseLeave={() => setHoveredHash(null)}
                >
                  {hoveredHash === 'limitations' && (
                    <button
                      onClick={() => handleCopyLink('limitations')}
                      className="mr-2 inline-block text-[#0047FF] transition-colors hover:opacity-70"
                    >
                      <Hash size={20} />
                    </button>
                  )}
                  <span className="font-['SpaceMono'] text-sm font-normal">SECTION 04.</span> Algorithmic Probability & Liability
                </h2>
              </div>
              <div className="font-['PPEditorialNew'] text-sm leading-relaxed text-[#1A1A1A] lg:max-w-[65ch] lg:font-['SpaceMono']">
                <p className="mb-4">
                  The Service utilizes probabilistic language models to restructure input. While we aim for adversarial resilience, ctrl-build does not guarantee immunity from third-party detection (Turnitin, GPTZero).
                </p>
                <p className="mb-4">
                  The User acknowledges that algorithmic detection is an evolving adversarial field. Detection systems are continuously updated, and what may evade detection today may not do so tomorrow.
                </p>
                <p className="mb-4">
                  Sequence Labs makes no warranties regarding the effectiveness of the Service in evading any specific detection system or algorithm.
                </p>
              </div>
            </section>

            <section id="payment" className="mb-16 scroll-mt-8">
              <div className="mb-4 flex items-center gap-3">
                <h2
                  className="font-['PPEditorialNew'] text-3xl font-extralight text-[#1A1A1A]"
                  onMouseEnter={() => setHoveredHash('payment')}
                  onMouseLeave={() => setHoveredHash(null)}
                >
                  {hoveredHash === 'payment' && (
                    <button
                      onClick={() => handleCopyLink('payment')}
                      className="mr-2 inline-block text-[#0047FF] transition-colors hover:opacity-70"
                    >
                      <Hash size={20} />
                    </button>
                  )}
                  <span className="font-['SpaceMono'] text-sm font-normal">SECTION 05.</span> Data Retention & Privacy
                </h2>
              </div>
              <div className="bg-green-50/30 border border-solid border-green-200/50 p-6 font-['PPEditorialNew'] text-sm leading-relaxed text-[#1A1A1A] lg:max-w-[65ch] lg:font-['SpaceMono']">
                <p className="mb-4">
                  Input data is processed in ephemeral memory. Upon session termination, all syntax data is cryptographically shredded. We do not train models on User Input.
                </p>
                <p className="mb-4">
                  Sequence Labs does not log, store, or retain your Input text beyond the immediate processing session. Output data is only stored if you explicitly save it to your account.
                </p>
                <p className="mb-4">
                  We implement industry-standard encryption and security measures to protect your data during transmission and processing.
                </p>
              </div>
            </section>

            <section id="termination" className="mb-16 scroll-mt-8">
              <div className="mb-4 flex items-center gap-3">
                <h2
                  className="font-['PPEditorialNew'] text-3xl font-extralight text-[#1A1A1A]"
                  onMouseEnter={() => setHoveredHash('termination')}
                  onMouseLeave={() => setHoveredHash(null)}
                >
                  {hoveredHash === 'termination' && (
                    <button
                      onClick={() => handleCopyLink('termination')}
                      className="mr-2 inline-block text-[#0047FF] transition-colors hover:opacity-70"
                    >
                      <Hash size={20} />
                    </button>
                  )}
                  <span className="font-['SpaceMono'] text-sm font-normal">SECTION 06.</span> Termination
                </h2>
              </div>
              <div className="font-['PPEditorialNew'] text-sm leading-relaxed text-[#1A1A1A] lg:max-w-[65ch] lg:font-['SpaceMono']">
                <p className="mb-4">
                  You may terminate your account at any time by contacting support or using the account termination feature in your profile settings.
                </p>
                <p className="mb-4">
                  Sequence Labs may suspend or terminate your access to the Service immediately, without prior notice, if you violate these Terms or engage in fraudulent or illegal activity.
                </p>
                <p className="mb-4">
                  Upon termination, your right to use the Service will cease immediately. All provisions of these Terms that by their nature should survive termination shall survive.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>

      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-solid border-[#1A1A1A] bg-[#F4F4F0] p-4">
          <div className="flex gap-4">
            <button className="flex-1 border border-solid border-[#1A1A1A] bg-transparent px-6 py-3 font-['SpaceMono'] text-sm font-bold uppercase text-[#1A1A1A] transition-colors hover:bg-[#1A1A1A] hover:text-white">
              DECLINE
            </button>
            <button className="flex-1 border border-solid border-[#1A1A1A] bg-[#1A1A1A] px-6 py-3 font-['SpaceMono'] text-sm font-bold uppercase text-white transition-colors hover:bg-[#0047FF] hover:border-[#0047FF]">
              I ACKNOWLEDGE
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
