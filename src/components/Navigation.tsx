'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';

export default function Navigation() {
  const [isScrolling, setIsScrolling] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isInWorkspace, setIsInWorkspace] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const accountRef = useRef<HTMLDivElement>(null);
  const { user, loading, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolling(currentScrollY > 0);

      const workspaceElement = document.getElementById('workspace');
      const activeElement = document.activeElement;
      const isWorkspaceActive = workspaceElement && 
        (workspaceElement.contains(activeElement) || 
         activeElement?.tagName === 'INPUT' || 
         activeElement?.tagName === 'TEXTAREA');

      setIsInWorkspace(!!isWorkspaceActive);

      if (window.innerWidth <= 767) {
        if (isWorkspaceActive) {
          setIsNavVisible(true);
        } else {
          if (currentScrollY > lastScrollY && currentScrollY > 50) {
            setIsNavVisible(false);
          } else if (currentScrollY < lastScrollY) {
            setIsNavVisible(true);
          }
        }
      } else {
        setIsNavVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    const handleFocus = () => {
      const activeElement = document.activeElement;
      const workspaceElement = document.getElementById('workspace');
      const isWorkspaceActive = workspaceElement && 
        (workspaceElement.contains(activeElement) || 
         activeElement?.tagName === 'INPUT' || 
         activeElement?.tagName === 'TEXTAREA');
      
      if (window.innerWidth <= 767 && isWorkspaceActive) {
        setIsNavVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('focusin', handleFocus);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('focusin', handleFocus);
    };
  }, [lastScrollY]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (accountRef.current && !accountRef.current.contains(event.target as Node)) {
        setIsAccountOpen(false);
      }
    };

    if (isAccountOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isAccountOpen]);

  const handleSignOut = async () => {
    await signOut();
    setIsAccountOpen(false);
  };

  const tickerItems = [
    'SYSTEM: ONLINE',
    'LATENCY: 12ms',
    'API STATUS: HEALTHY',
    'PROCESSING: READY',
  ];

  const duplicatedTicker = [...tickerItems, ...tickerItems];

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 border-b border-solid border-[#1A1A1A] bg-[#F4F4F0]/95 backdrop-blur-sm transition-transform duration-300 ease-in-out h-16 max-[767px]:h-12 max-[567px]:h-14"
      style={{
        transform: isNavVisible ? 'translateY(0)' : 'translateY(-100%)',
      }}
    >
      <div className="mx-auto h-full max-w-full px-8">
        <div className="flex h-full items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center">
              <img
                src="/images/logo.png"
                alt="CTRL — BUILD"
                className="h-8 max-[567px]:h-6"
              />
            </Link>
          </div>

          <div className="hidden flex-1 items-center justify-center overflow-hidden lg:flex">
            <div className="flex animate-[ticker_30s_linear_infinite] whitespace-nowrap">
              {duplicatedTicker.map((item, index) => (
                <span
                  key={index}
                  className="mx-8 font-['SpaceMono'] text-xs leading-none text-[#1A1A1A]/60"
                >
                  {item} //
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-8 max-[567px]:gap-4">
            <Link
              href="/api"
              className="hidden group relative block min-h-[48px] font-['SpaceMono'] text-xs leading-none text-[#1A1A1A] transition-all md:block md:min-h-0 max-[767px]:hidden"
            >
              <span className="relative z-10 block px-2 py-3 transition-colors group-hover:text-white">
                API
              </span>
              <span className="absolute inset-0 bg-[#1A1A1A] opacity-0 transition-opacity group-hover:opacity-100" />
            </Link>
            {!loading && (
              <>
                {user ? (
                  <div ref={accountRef} className="relative">
                    <button
                      onClick={() => setIsAccountOpen(!isAccountOpen)}
                      className="group relative block min-h-[48px] min-w-[48px] font-['SpaceMono'] text-xs leading-none text-[#1A1A1A] transition-all md:min-h-0 md:min-w-0 max-[567px]:p-4"
                    >
                      <span className="relative z-10 flex h-full min-h-[48px] items-center justify-center px-3 py-3 transition-colors group-hover:text-white md:min-h-0 md:block md:px-2">
                        <span className="hidden max-[567px]:inline">ACC</span>
                        <span className="max-[567px]:hidden">ACCOUNT</span>
                      </span>
                      <span className="absolute inset-0 bg-[#1A1A1A] opacity-0 transition-opacity group-hover:opacity-100" />
                    </button>
                    {isAccountOpen && (
                      <div className="absolute right-0 top-full mt-1 w-48 border border-solid border-[#1A1A1A] bg-[#F4F4F0] shadow-[8px_8px_0px_#1A1A1A]">
                        <div className="p-2">
                          <div className="mb-2 border-b border-solid border-[#1A1A1A] pb-2">
                            <p className="font-['SpaceMono'] text-xs uppercase text-[#1A1A1A] opacity-70">
                              {user.email}
                            </p>
                          </div>
                          <Link
                            href="/profile"
                            onClick={() => setIsAccountOpen(false)}
                            className="block px-3 py-2 font-['SpaceMono'] text-xs uppercase text-[#1A1A1A] transition-colors hover:bg-[#1A1A1A] hover:text-white"
                          >
                            VIEW PROFILE
                          </Link>
                          <button
                            onClick={handleSignOut}
                            className="w-full px-3 py-2 text-left font-['SpaceMono'] text-xs uppercase text-red-600 transition-colors hover:bg-[#1A1A1A] hover:text-white"
                          >
                            TERMINATE SESSION
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="group relative block min-h-[48px] min-w-[48px] font-['SpaceMono'] text-xs leading-none text-[#1A1A1A] transition-all md:min-h-0 md:min-w-0 max-[567px]:p-4"
                    >
                      <span className="relative z-10 flex h-full min-h-[48px] items-center justify-center px-3 py-3 transition-colors group-hover:text-white md:min-h-0 md:block md:px-2">
                        <span className="hidden max-[567px]:inline">LOGIN</span>
                        <span className="max-[567px]:hidden">LOG IN</span>
                      </span>
                      <span className="absolute inset-0 bg-[#1A1A1A] opacity-0 transition-opacity group-hover:opacity-100" />
                    </Link>
                    <Link
                      href="/signup"
                      className="group relative block min-h-[48px] min-w-[48px] font-['SpaceMono'] text-xs leading-none text-[#1A1A1A] transition-all md:min-h-0 md:min-w-0 max-[567px]:p-4"
                    >
                      <span className="relative z-10 flex h-full min-h-[48px] items-center justify-center px-3 py-3 transition-colors group-hover:text-[#0047FF] md:min-h-0 md:block md:px-2 max-[567px]:h-[30px] max-[567px]:w-[40px] max-[567px]:flex max-[567px]:items-center max-[567px]:justify-center max-[567px]:border max-[567px]:border-solid max-[567px]:border-[#1A1A1A] max-[567px]:p-0">
                        <span className="max-[567px]:inline md:hidden">PRO</span>
                        <span className="hidden min-[568px]:max-md:inline md:hidden">GET PRO</span>
                        <span className="hidden md:inline">INITIALIZE PRO</span>
                      </span>
                      <span className="absolute inset-0 bg-[#1A1A1A] opacity-0 transition-opacity group-hover:opacity-100 max-[567px]:hidden" />
                    </Link>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      {isScrolling && (
        <div className="absolute bottom-0 left-0 h-0.5 w-full bg-[#0047FF]" />
      )}
    </nav>
  );
}
