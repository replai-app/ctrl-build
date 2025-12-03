'use client';

import type { User } from '@supabase/supabase-js';

interface ProfileSubscriptionProps {
  user: User;
}

export default function ProfileSubscription({ user }: ProfileSubscriptionProps) {
  return (
    <div className="p-8 md:p-12">
      <div className="mb-12">
        <h1 className="mb-2 font-['PPEditorialNew'] text-4xl font-extralight text-[#1A1A1A]">
          Subscription
        </h1>
        <p className="font-['SpaceMono'] text-xs uppercase text-[#1A1A1A] opacity-50">
          BILLING & PLAN MANAGEMENT
        </p>
      </div>

      <div className="border border-solid border-[#1A1A1A] bg-white p-8">
        <div className="mb-8 border-b border-dashed border-[#1A1A1A] pb-6">
          <p className="mb-2 font-['SpaceMono'] text-xs uppercase text-[#1A1A1A] opacity-50">
            CURRENT PLAN
          </p>
          <p className="font-['SpaceMono'] text-2xl font-bold text-[#0047FF]">PRO</p>
        </div>

        <div className="mb-8 space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-['SpaceMono'] text-sm uppercase text-[#1A1A1A]">
              MONTHLY RATE
            </span>
            <span className="font-['SpaceMono'] text-sm font-bold text-[#1A1A1A]">
              $12.00 / MO
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-['SpaceMono'] text-sm uppercase text-[#1A1A1A]">
              NEXT BILLING DATE
            </span>
            <span className="font-['SpaceMono'] text-sm text-[#1A1A1A]">
              {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
            </span>
          </div>
        </div>

        <button className="w-full border border-solid border-[#1A1A1A] bg-transparent px-6 py-3 font-['SpaceMono'] text-sm font-bold uppercase text-[#1A1A1A] transition-colors hover:bg-[#1A1A1A] hover:text-white">
          MANAGE BILLING
        </button>
      </div>
    </div>
  );
}
