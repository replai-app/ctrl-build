'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function Recover() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();
  
  let supabase;
  try {
    supabase = createClient();
  } catch (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F4F4F0] px-6">
        <div className="w-full max-w-md">
          <p className="font-['SpaceMono'] text-sm text-red-500">
            ERROR: Supabase not configured
          </p>
        </div>
      </div>
    );
  }

  useEffect(() => {
    setIsFormVisible(true);
  }, []);

  useEffect(() => {
    if (isSubmitting) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 10;
        });
      }, 100);
      return () => clearInterval(interval);
    } else {
      setProgress(0);
    }
  }, [isSubmitting]);

  const handleRecover = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setError(null);
    setIsSubmitting(true);
    setProgress(0);

    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${location.origin}/auth/reset-password`,
    });

    if (resetError) {
      setError(resetError.message);
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(false);
    setProgress(100);
    setIsSuccess(true);

    setTimeout(() => {
      setIsFormVisible(false);
    }, 1000);
  };

  return (
    <div className="relative flex h-screen w-full overflow-hidden">
      <div className="hidden h-full w-[40%] bg-[#1A1A1A] md:block">
        <div className="flex h-full items-center justify-center">
          <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-64 w-64 rounded-full border border-white/10" style={{ animation: 'radarPulse 2s ease-out infinite' }} />
              <div className="absolute h-64 w-64 rounded-full border border-white/10" style={{ animation: 'radarPulse 2s ease-out infinite 0.5s' }} />
              <div className="absolute h-64 w-64 rounded-full border border-white/10" style={{ animation: 'radarPulse 2s ease-out infinite 1s' }} />
            </div>
            <p className="relative z-10 font-['SpaceMono'] text-xs uppercase text-white/10 blink-cursor">
              SEARCHING...
            </p>
          </div>
        </div>
      </div>

      <div className="absolute left-0 top-0 h-full w-full border-l-0 border-solid border-[#1A1A1A] bg-[#F4F4F0] md:left-[40%] md:w-[60%] md:border-l">
        <div className="mx-auto h-full max-w-full px-6 md:px-0">
          <div
            className={`flex h-full flex-col justify-start pt-24 transition-transform duration-500 ease-out md:justify-center md:w-[85%] md:pl-[15%] md:pt-0 ${
              isFormVisible ? 'translate-y-0' : 'translate-y-full'
            }`}
          >
            {!isSuccess ? (
              <>
                <div className="mb-8 md:mb-8">
                  <p className="mb-2 font-['SpaceMono'] text-xs uppercase text-[#1A1A1A] opacity-50">
                    // ACCESS RESTORATION
                  </p>
                  <h2 className="mb-2 font-['PPEditorialNew'] text-[32px] font-extralight leading-tight text-[#1A1A1A]">
                    Recover Key.
                  </h2>
                  <p className="font-['PPEditorialNew'] text-base text-[#1A1A1A] opacity-70">
                    Enter your identification to receive a secure reset link.
                  </p>
                </div>

                <form onSubmit={handleRecover} className="space-y-6 pb-20 md:pb-0">
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block font-['SpaceMono'] text-xs uppercase text-[#1A1A1A]"
                    >
                      USER_ID (EMAIL)
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="editor@sequence.lab"
                      required
                      className={`h-14 w-full rounded-none border bg-white px-4 font-['SpaceMono'] text-sm text-[#1A1A1A] outline-none transition-all focus:border-[#1A1A1A] ${
                        isSuccess ? 'border-green-500 border-solid' : 'border-solid border-[#1A1A1A]'
                      }`}
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                      style={{ borderRadius: '0px', borderWidth: isSuccess || isFocused ? '2px' : '1px' }}
                    />
                  </div>

                  {error && (
                    <p className="font-['SpaceMono'] text-xs text-red-500">
                      ERROR: {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting || !email}
                    className="fixed bottom-0 left-0 right-0 z-40 h-14 w-full overflow-hidden rounded-none bg-[#1A1A1A] px-6 font-['SpaceMono'] text-sm font-bold uppercase text-white transition-colors hover:bg-[#1A1A1A] disabled:opacity-50 disabled:cursor-not-allowed md:relative md:bottom-auto md:left-auto md:right-auto md:w-auto"
                    style={{ borderRadius: '0px' }}
                  >
                    <span className="relative z-10">
                      {isSubmitting
                        ? 'TRANSMITTING...'
                        : isSuccess
                        ? 'LINK DISPATCHED'
                        : 'INITIATE RESET SEQUENCE'}
                    </span>
                    {isSubmitting && (
                      <div
                        className="absolute inset-0 bg-green-500 transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    )}
                    {isSuccess && (
                      <div className="absolute inset-0 bg-green-500" />
                    )}
                  </button>

                  <div className="pt-4 text-center">
                    <Link
                      href="/login"
                      className="inline-block font-['SpaceMono'] text-xs uppercase text-[#1A1A1A] opacity-70 transition-all hover:opacity-100 hover:line-through"
                    >
                      [ ABORT / RETURN TO LOGIN ]
                    </Link>
                  </div>
                </form>
              </>
            ) : (
              <div className="text-center">
                <h3 className="mb-4 font-['PPEditorialNew'] text-4xl font-extralight text-[#1A1A1A]">
                  CHECK SECURE INBOX.
                </h3>
                <p className="mb-2 font-['SpaceMono'] text-sm text-[#1A1A1A]">
                  PACKET SENT :: CHECK SPAM FILTERS
                </p>
                <p className="font-['SpaceMono'] text-xs text-[#1A1A1A] opacity-70">
                  Link expires in 15 minutes.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Link
        href="/"
        className="absolute left-6 top-6 z-10 flex h-10 w-10 items-center justify-center font-['SpaceMono'] text-2xl text-[#1A1A1A] transition-colors hover:text-[#0047FF] md:hidden"
      >
        ←
      </Link>
    </div>
  );
}
