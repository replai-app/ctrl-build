'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Eye, EyeSlash } from 'phosphor-react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const supabase = createClient();
  
  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  useEffect(() => {
    setIsFormVisible(true);
    if (emailInputRef.current) {
      emailInputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (error && passwordInputRef.current) {
      setIsShaking(true);
      passwordInputRef.current.value = '';
      setPassword('');
      
      if ('vibrate' in navigator && window.innerWidth < 768) {
        navigator.vibrate([100, 50, 100]);
      }
      
      setTimeout(() => {
        setIsShaking(false);
        setError(false);
      }, 300);
    }
  }, [error]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setIsSubmitting(true);
    setError(false);
    setErrorMessage(null);

    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setError(true);
        setErrorMessage(signInError.message);
        setIsSubmitting(false);
        if (passwordInputRef.current) {
          passwordInputRef.current.placeholder = 'ERROR: INVALID KEY';
        }
        return;
      }

      if (data.user) {
        setIsSubmitting(false);
        setShowSuccess(true);
        setTimeout(() => {
          router.push('/');
        }, 500);
      }
    } catch (err) {
      setError(true);
      setErrorMessage(err instanceof Error ? err.message : 'An error occurred');
      setIsSubmitting(false);
      if (passwordInputRef.current) {
        passwordInputRef.current.placeholder = 'ERROR: INVALID KEY';
      }
    }
  };

  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden lg:flex-row">
      <div className="hidden h-[25%] w-full border-b border-solid border-[#1A1A1A] bg-[#1A1A1A] md:block md:h-[25%] md:w-full md:border-b lg:h-full lg:w-[40%] lg:border-b-0">
        <div className="flex h-full items-center justify-center overflow-hidden">
          <h1
            className="font-['PPEditorialNew'] text-[clamp(32px,6vh,80px)] leading-none text-white opacity-20 md:text-[clamp(48px,8vh,120px)] lg:rotate-[-90deg]"
            style={{
              fontWeight: 200,
              WebkitTextStroke: '1px white',
              whiteSpace: 'nowrap',
              animation: isDesktop ? 'driftUpDesktop 60s linear infinite' : 'driftUp 60s linear infinite',
            }}
          >
            RESUME CADENCE.
          </h1>
        </div>
      </div>

      <div className="relative h-full w-full border-l-0 border-solid border-[#1A1A1A] bg-[#F4F4F0] md:h-[75%] md:border-l md:border-b-0 lg:absolute lg:left-[40%] lg:h-full lg:w-[60%]">
        <div className="mx-auto h-full max-w-full px-6 md:px-12 lg:px-0">
          <div
            className={`flex h-full flex-col justify-start pt-24 transition-transform duration-700 ease-out md:justify-center md:pt-0 lg:w-[85%] lg:pl-[15%] ${
              isFormVisible ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            <div className="mb-8 md:mb-8">
              <p className="mb-2 font-['SpaceMono'] text-xs uppercase text-[#1A1A1A] opacity-50">
                // SECURITY CHECKPOINT
              </p>
              <h2 className="mb-2 font-['PPEditorialNew'] text-[32px] font-extralight leading-tight text-[#1A1A1A]">
                Resume Session.
              </h2>
              <p className="mb-2 font-['SpaceMono'] text-xs uppercase text-green-500">
                SYSTEM READY.
              </p>
              <p className="font-['PPEditorialNew'] text-base text-[#1A1A1A] opacity-70">
                Enter credentials to decrypt your workspace.
              </p>
            </div>

            <form 
              ref={formRef} 
              onSubmit={handleSubmit} 
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e as any);
                }
              }}
              className="space-y-6 pb-20 md:pb-0"
            >
              <button
                type="button"
                className="flex h-14 w-full items-center justify-center gap-3 rounded-none border border-solid border-[#1A1A1A] bg-transparent px-6 font-['SpaceMono'] text-sm font-bold uppercase text-[#1A1A1A] transition-colors hover:bg-[#1A1A1A] hover:text-white md:hidden"
                style={{ borderRadius: '0px' }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#1A1A1A"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#1A1A1A"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#1A1A1A"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#1A1A1A"/>
                </svg>
                Google Authentication
              </button>

              <div className="relative md:hidden">
                <div className="absolute inset-0 flex items-center">
                  <div className="h-px w-full bg-[#1A1A1A] opacity-20"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-[#F4F4F0] px-4 font-['SpaceMono'] text-xs uppercase text-[#1A1A1A] opacity-50">
                    OR
                  </span>
                </div>
              </div>

              <button
                type="button"
                className="hidden h-14 w-full items-center justify-center gap-3 rounded-none border border-solid border-[#1A1A1A] bg-transparent px-6 font-['SpaceMono'] text-sm font-bold uppercase text-[#1A1A1A] transition-colors hover:bg-[#1A1A1A] hover:text-white md:flex"
                style={{ borderRadius: '0px' }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#1A1A1A"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#1A1A1A"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#1A1A1A"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#1A1A1A"/>
                </svg>
                Google Authentication
              </button>

              <div className="relative hidden md:block">
                <div className="absolute inset-0 flex items-center">
                  <div className="h-px w-full bg-[#1A1A1A] opacity-20"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-[#F4F4F0] px-4 font-['SpaceMono'] text-xs uppercase text-[#1A1A1A] opacity-50">
                    OR
                  </span>
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block font-['SpaceMono'] text-xs uppercase text-[#1A1A1A]"
                >
                  IDENTIFICATION
                </label>
                  <input
                    ref={emailInputRef}
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="editor@sequence.lab"
                    autoFocus
                    className="h-14 w-full rounded-none border border-solid border-[#1A1A1A] bg-white px-4 font-['SpaceMono'] text-base text-[#1A1A1A] outline-none transition-colors focus:border-[#0047FF] md:text-sm"
                    style={{ borderRadius: '0px' }}
                  />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block font-['SpaceMono'] text-xs uppercase text-[#1A1A1A]"
                >
                  ACCESS_KEY
                </label>
                <div className="relative">
                  <input
                    ref={passwordInputRef}
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (passwordInputRef.current && passwordInputRef.current.placeholder === 'ERROR: INVALID KEY') {
                        passwordInputRef.current.placeholder = '••••••••••••';
                      }
                    }}
                    placeholder="••••••••••••"
                    className={`h-14 w-full rounded-none border border-solid border-[#1A1A1A] bg-white px-4 pr-[60px] font-['SpaceMono'] text-base text-[#1A1A1A] outline-none transition-all focus:border-[#0047FF] md:pr-32 md:text-sm ${
                      isShaking ? 'animate-shake' : ''
                    }`}
                    style={{ borderRadius: '0px' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center text-[#1A1A1A] transition-colors hover:text-[#0047FF] md:hidden"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeSlash size={24} /> : <Eye size={24} />}
                  </button>
                  <Link
                    href="/recover"
                    className="absolute right-4 top-1/2 -translate-y-1/2 hidden whitespace-nowrap font-['SpaceMono'] text-xs uppercase text-[#1A1A1A] opacity-70 transition-colors hover:text-[#0047FF] hover:opacity-100 md:block"
                  >
                    [ RECOVER? ]
                  </Link>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-28 top-1/2 -translate-y-1/2 hidden whitespace-nowrap font-['SpaceMono'] text-xs uppercase text-[#1A1A1A] opacity-70 transition-colors hover:text-[#0047FF] hover:opacity-100 md:block"
                  >
                    [ SHOW ]
                  </button>
                </div>
                <Link
                  href="/recover"
                  className="mt-2 block py-4 font-['SpaceMono'] text-xs uppercase text-[#1A1A1A] opacity-70 transition-colors hover:text-[#0047FF] hover:opacity-100 md:hidden"
                >
                  [ RECOVER? ]
                </Link>
                {error && (
                  <p className="mt-2 font-['SpaceMono'] text-xs text-red-500">
                    ERROR: CREDENTIAL MISMATCH.
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={!email || !password || isSubmitting}
                className="fixed bottom-0 left-0 right-0 z-40 h-14 w-full rounded-none bg-[#1A1A1A] px-6 font-['SpaceMono'] text-sm font-bold uppercase text-white transition-all hover:border hover:border-solid hover:border-[#1A1A1A] hover:bg-white hover:text-[#1A1A1A] disabled:opacity-50 disabled:cursor-not-allowed md:relative md:bottom-auto md:left-auto md:right-auto md:z-auto"
                style={{ borderRadius: '0px' }}
              >
                {showSuccess ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    ACCESS GRANTED
                  </span>
                ) : isSubmitting ? (
                  'AUTHENTICATING...'
                ) : (
                  'AUTHENTICATE'
                )}
              </button>

              <div className="pt-4 text-center md:hidden">
                <p className="font-['SpaceMono'] text-xs text-[#1A1A1A] opacity-70">
                  NO ID FOUND? ::{' '}
                  <Link href="/signup" className="underline hover:text-[#0047FF]">
                    INITIALIZE
                  </Link>
                </p>
              </div>

              <div className="hidden pt-4 text-center md:block">
                <p className="font-['SpaceMono'] text-xs text-[#1A1A1A] opacity-70">
                  NO PROTOCOL FOUND? ::{' '}
                  <Link href="/signup" className="underline hover:text-[#0047FF]">
                    SIGN UP
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>

      {showSuccess && (
        <div className="fixed inset-0 z-50 bg-[#F4F4F0]">
        </div>
      )}

      <Link
        href="/"
        className="absolute left-0 top-0 z-10 flex min-h-[72px] min-w-[72px] items-center justify-center font-['SpaceMono'] text-[24px] text-[#1A1A1A] transition-colors hover:text-[#0047FF] md:hidden"
        style={{ padding: '24px' }}
      >
        ←
      </Link>
      
      <Link
        href="/"
        className="absolute left-8 top-8 z-10 hidden font-['SpaceMono'] text-sm text-[#1A1A1A] transition-colors hover:text-[#0047FF] lg:block"
      >
        ← HOME
      </Link>
    </div>
  );
}

