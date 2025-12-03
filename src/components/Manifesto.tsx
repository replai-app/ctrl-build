'use client';

import { useState, useEffect, useRef } from 'react';

export default function Manifesto() {
  const [isHovered, setIsHovered] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const section = sectionRef.current;
      const sectionTop = section.offsetTop;
      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY;

      const triggerPoint = sectionTop - windowHeight + windowHeight * 0.3;
      
      if (scrollY >= triggerPoint && !isVisible) {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isVisible]);

  const bodyText = [
    "Artificial Intelligence is a statistical compression of the internet. By definition, it gravitates toward the average. It smoothes out the edges, flattens the rhythm, and removes the friction that makes writing feel human.",
    "We built ctrl-build not to deceive, but to *reconstruct*. We break the predictable patterns of probability. We inject the stutters, the sprints, and the sudden pauses that define biological thought. We do not just humanize the text; we restore the *cadence* of the author."
  ];

  return (
    <section
      id="manifesto"
      ref={sectionRef}
      className={`manifesto-section border-y border-solid border-white bg-[#1A1A1A] py-20 transition-colors duration-300 md:py-[120px] lg:py-40 ${
        isHovered ? 'lg:bg-[#111111]' : 'bg-[#1A1A1A]'
      }`}
      onMouseEnter={() => {
        if (window.innerWidth >= 1024) {
          setIsHovered(true);
        }
      }}
      onMouseLeave={() => {
        if (window.innerWidth >= 1024) {
          setIsHovered(false);
        }
      }}
    >
      <div className="mx-auto w-full px-6 md:w-[80%] lg:mx-auto lg:w-1/2">
        <div
          className={`mb-8 text-center font-['SpaceMono'] text-xs uppercase leading-none text-[#F4F4F0] opacity-50 transition-all md:text-sm ${
            isVisible ? 'opacity-50 translate-y-0' : 'opacity-0 translate-y-5'
          } ${isHovered ? 'lg:text-white lg:opacity-100' : ''}`}
          style={{ transitionDelay: '0s', transitionDuration: '800ms', letterSpacing: '0.05em' }}
        >
          // PHILOSOPHY OF DESIGN
        </div>

        <h2
          className={`mb-12 text-left font-['PPEditorialNew'] text-[48px] leading-[110%] text-[#F4F4F0] transition-all md:text-[64px] md:leading-[100%] md:text-left lg:text-[96px] lg:leading-[95%] lg:text-left ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          } ${isHovered ? 'lg:text-white' : 'text-[#F4F4F0]'}`}
          style={{ fontWeight: 200, letterSpacing: '-0.03em', transitionDelay: '0s', transitionDuration: '800ms' }}
        >
          <span className="block">The algorithm<br />craves the median.</span>
          <span className="block">You shouldn't.</span>
        </h2>

        <div className="space-y-8 text-left font-['PPEditorialNew'] text-lg leading-[160%] transition-colors duration-300 md:text-2xl md:text-left lg:text-2xl lg:text-left">
          {bodyText.map((paragraph, pIndex) => {
            const delay = 0.2 + pIndex * 0.2;
            return (
              <p
                key={pIndex}
                className={`transition-all ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                } ${isHovered ? 'lg:text-white' : 'text-[#F4F4F0]'}`}
                style={{ transitionDelay: `${delay}s`, transitionDuration: '800ms' }}
                dangerouslySetInnerHTML={{
                  __html: paragraph
                    .replace(/\*(.*?)\*/g, '<em class="font-[\'PPEditorialNew\'] italic">$1</em>')
                    .replace(/ctrl-build/g, '<code class="font-[\'SpaceMono\'] text-base">ctrl-build</code>')
                }}
              />
            );
          })}
        </div>

        <div
          className={`mt-16 text-left font-['SpaceMono'] text-xs uppercase leading-none text-[#F4F4F0] opacity-50 transition-all md:mt-24 md:text-left lg:mt-24 lg:text-right ${
            isVisible ? 'opacity-50 translate-y-0' : 'opacity-0 translate-y-5'
          } ${isHovered ? 'lg:text-white lg:opacity-100' : ''}`}
          style={{ transitionDelay: '0.6s', transitionDuration: '800ms' }}
        >
          — THE EDITOR
        </div>
      </div>
    </section>
  );
}
