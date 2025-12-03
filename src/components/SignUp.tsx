'use client';

import { useState, useEffect } from 'react';
import { Eye, EyeSlash } from 'phosphor-react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailValid, setEmailValid] = useState<boolean | null>(null);
  const [passwordValid, setPasswordValid] = useState<boolean | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    setIsFormVisible(true);
  }, []);

  useEffect(() => {
    if (email.length > 0) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setEmailValid(emailRegex.test(email));
    } else {
      setEmailValid(null);
    }
  }, [email]);

  useEffect(() => {
    if (password.length > 0) {
      setPasswordValid(password.length >= 8);
    } else {
      setPasswordValid(null);
    }
  }, [password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailValid || !passwordValid) return;

    setIsSubmitting(true);
    setError(null);
    
    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (signUpError) {
        setError(signUpError.message);
        setIsSubmitting(false);
        return;
      }

      if (data.user) {
        setIsSubmitting(false);
        setShowSuccess(true);
        
        setTimeout(() => {
          router.push('/');
        }, 2000);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative flex h-screen w-full overflow-hidden">
      <div className="hidden h-full w-[40%] bg-[#1A1A1A] md:block">
        <div className="flex h-full items-center justify-center">
          <h1
            className="font-['PPEditorialNew'] text-[clamp(48px,8vh,120px)] leading-none text-white opacity-20"
            style={{
              fontWeight: 200,
              WebkitTextStroke: '1px white',
              transform: 'rotate(-90deg)',
              whiteSpace: 'nowrap',
            }}
          >
            OWN YOUR SYNTAX.
          </h1>
        </div>
      </div>

      <div className="absolute left-0 top-0 h-full w-full border-l-0 border-solid border-[#1A1A1A] bg-[#F4F4F0] md:left-[40%] md:w-[60%] md:border-l">
        <div className="mx-auto h-full max-w-full px-6 md:px-0">
          <div
            className={`flex h-full flex-col justify-start pt-24 transition-transform duration-700 ease-out md:justify-center md:w-[85%] md:pl-[15%] md:pt-0 ${
              isFormVisible ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            <div className="mb-8 md:mb-8">
              <p className="mb-2 font-['SpaceMono'] text-xs uppercase text-[#1A1A1A] opacity-50">
                // ACCESS PROTOCOL
              </p>
              <h2 className="mb-2 font-['PPEditorialNew'] text-[32px] font-extralight leading-tight text-[#1A1A1A]">
                Initialize Identity.
              </h2>
              <p className="font-['PPEditorialNew'] text-base text-[#1A1A1A] opacity-70">
                Save cadence history and unlock higher word limits.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
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

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block font-['SpaceMono'] text-xs uppercase text-[#1A1A1A]"
                >
                  USER_ID (EMAIL)
                </label>
                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="editor@sequence.lab"
                    className="h-14 w-full rounded-none border border-solid border-[#1A1A1A] bg-white px-4 font-['SpaceMono'] text-sm text-[#1A1A1A] outline-none transition-colors focus:border-[#0047FF]"
                    style={{ borderRadius: '0px' }}
                  />
                  {emailValid !== null && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                      {emailValid ? (
                        <div className="h-2 w-2 rounded-full bg-green-500" />
                      ) : (
                        <div className="h-2 w-2 bg-red-500" />
                      )}
                    </div>
                  )}
                </div>
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
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="h-14 w-full rounded-none border border-solid border-[#1A1A1A] bg-white px-4 font-['SpaceMono'] text-sm text-[#1A1A1A] outline-none transition-colors focus:border-[#0047FF]"
                    style={{ borderRadius: '0px' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#1A1A1A]"
                  >
                    {showPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
                  </button>
                  {passwordValid !== null && (
                    <div className="absolute right-12 top-1/2 -translate-y-1/2">
                      {passwordValid ? (
                        <div className="h-2 w-2 rounded-full bg-green-500" />
                      ) : (
                        <div className="h-2 w-2 bg-red-500" />
                      )}
                    </div>
                  )}
                </div>
                {password.length > 0 && !passwordValid && (
                  <p className="mt-2 font-['SpaceMono'] text-xs text-[#1A1A1A] opacity-70">
                    REQUIREMENT: MIN 8 CHARACTERS.
                  </p>
                )}
                {error && (
                  <p className="mt-2 font-['SpaceMono'] text-xs text-red-500">
                    {error}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={!emailValid || !passwordValid || isSubmitting}
                className="h-14 w-full rounded-none bg-[#0047FF] px-6 font-['SpaceMono'] text-sm font-bold uppercase text-white transition-all hover:border hover:border-solid hover:border-[#0047FF] hover:bg-white hover:text-[#0047FF] disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ borderRadius: '0px' }}
              >
                {isSubmitting ? 'ESTABLISHING...' : 'ESTABLISH CONNECTION'}
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

              <div className="pt-4 text-center">
                <p className="font-['SpaceMono'] text-xs text-[#1A1A1A] opacity-70">
                  EXISTING USER? ::{' '}
                  <Link href="/login" className="underline hover:text-[#0047FF]">
                    LOGIN SEQUENCE
                  </Link>
                </p>
                <p className="mt-2 font-['SpaceMono'] text-xs text-[#1A1A1A] opacity-70">
                  <Link href="/recover" className="underline hover:text-[#0047FF]">
                    RECOVER KEY?
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>

      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1A1A1A]">
          <p className="font-['SpaceMono'] text-2xl font-bold uppercase text-green-500" style={{ animation: 'blinkTwice 1s ease-in-out' }}>
            IDENTITY VERIFIED
          </p>
        </div>
      )}

      <Link
        href="/"
        className="absolute left-6 top-6 z-10 flex h-10 w-10 items-center justify-center font-['SpaceMono'] text-2xl text-[#1A1A1A] transition-colors hover:text-[#0047FF] md:hidden"
      >
        ←
      </Link>
    </div>
  );
}

