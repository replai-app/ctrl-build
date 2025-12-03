'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

export const dynamic = 'force-dynamic';

function ResetPasswordForm() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
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
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/login');
      }
    };
    checkSession();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const { error: updateError } = await supabase.auth.updateUser({
        password: password,
      });

      if (updateError) {
        setError(updateError.message);
        setIsSubmitting(false);
        return;
      }

      setIsSuccess(true);
      setTimeout(() => {
        router.push('/');
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F4F4F0] px-6">
      <div className="w-full max-w-md">
        <div className="mb-8">
          <p className="mb-2 font-['SpaceMono'] text-xs uppercase text-[#1A1A1A] opacity-50">
            // RESET PROTOCOL
          </p>
          <h2 className="mb-2 font-['PPEditorialNew'] text-[32px] font-extralight leading-tight text-[#1A1A1A]">
            Set New Access Key.
          </h2>
          <p className="font-['PPEditorialNew'] text-base text-[#1A1A1A] opacity-70">
            Enter your new password below.
          </p>
        </div>

        {isSuccess ? (
          <div className="rounded-none border border-solid border-green-500 bg-green-50 p-6 font-['SpaceMono'] text-sm text-green-700">
            <p className="mb-4 font-bold uppercase">PASSWORD UPDATED</p>
            <p className="text-xs opacity-70">Redirecting to workspace...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="password"
                className="mb-2 block font-['SpaceMono'] text-xs uppercase text-[#1A1A1A]"
              >
                NEW ACCESS_KEY
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                minLength={8}
                className="h-14 w-full rounded-none border border-solid border-[#1A1A1A] bg-white px-4 font-['SpaceMono'] text-sm text-[#1A1A1A] outline-none transition-colors focus:border-[#0047FF]"
                style={{ borderRadius: '0px' }}
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block font-['SpaceMono'] text-xs uppercase text-[#1A1A1A]"
              >
                CONFIRM ACCESS_KEY
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                minLength={8}
                className="h-14 w-full rounded-none border border-solid border-[#1A1A1A] bg-white px-4 font-['SpaceMono'] text-sm text-[#1A1A1A] outline-none transition-colors focus:border-[#0047FF]"
                style={{ borderRadius: '0px' }}
              />
            </div>

            {error && (
              <p className="font-['SpaceMono'] text-xs text-red-500">{error}</p>
            )}

            <button
              type="submit"
              disabled={!password || !confirmPassword || isSubmitting}
              className="h-14 w-full rounded-none bg-[#1A1A1A] px-6 font-['SpaceMono'] text-sm font-bold uppercase text-white transition-all hover:bg-white hover:text-[#1A1A1A] disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ borderRadius: '0px' }}
            >
              {isSubmitting ? 'UPDATING...' : 'UPDATE ACCESS KEY'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-[#F4F4F0]">
        <p className="font-['SpaceMono'] text-sm text-[#1A1A1A]">LOADING...</p>
      </div>
    }>
      <ResetPasswordForm />
    </Suspense>
  );
}
