'use client';

import { useState, useEffect } from 'react';
import type { User } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/client';
import { getUserTier, getTierFeatures } from '@/lib/user-tier';

interface ProfileSubscriptionProps {
  user: User;
}

export default function ProfileSubscription({ user }: ProfileSubscriptionProps) {
  const [tier, setTier] = useState<'free' | 'pro'>('free');

  useEffect(() => {
    const loadTier = async () => {
      try {
        const supabase = createClient();
        const { data: profile } = await supabase
          .from('profiles')
          .select('subscription_tier')
          .eq('id', user.id)
          .single();
        setTier(getUserTier(profile));
      } catch (error) {
      }
    };
    loadTier();
  }, [user.id]);

  const features = getTierFeatures(tier);

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

      <div className="space-y-8">
        <div className="border border-solid border-[#1A1A1A] bg-white p-8">
          <div className="mb-8 border-b border-dashed border-[#1A1A1A] pb-6">
            <p className="mb-2 font-['SpaceMono'] text-xs uppercase text-[#1A1A1A] opacity-50">
              CURRENT PLAN
            </p>
            <p className={`font-['SpaceMono'] text-2xl font-bold ${tier === 'pro' ? 'text-[#0047FF]' : 'text-[#1A1A1A]'}`}>
              {tier === 'pro' ? 'PRO' : 'FREE'}
            </p>
          </div>

          <div className="mb-8 space-y-4">
            <div className="flex items-center justify-between border-b border-dashed border-[#1A1A1A] pb-2">
              <span className="font-['SpaceMono'] text-xs uppercase text-[#1A1A1A] opacity-50">
                DAILY_QUOTA
              </span>
              <span className="font-['SpaceMono'] text-sm font-bold text-[#1A1A1A]">
                {features.dailyQuota === 'unlimited' ? 'UNLIMITED' : features.dailyQuota + ' WORDS'}
              </span>
            </div>
            <div className="flex items-center justify-between border-b border-dashed border-[#1A1A1A] pb-2">
              <span className="font-['SpaceMono'] text-xs uppercase text-[#1A1A1A] opacity-50">
                LATENCY
              </span>
              <span className="font-['SpaceMono'] text-sm font-bold text-[#1A1A1A]">
                {features.latency.toUpperCase()}
              </span>
            </div>
            <div className="flex items-center justify-between border-b border-dashed border-[#1A1A1A] pb-2">
              <span className="font-['SpaceMono'] text-xs uppercase text-[#1A1A1A] opacity-50">
                CADENCE_ENGINE
              </span>
              <span className="font-['SpaceMono'] text-sm font-bold text-[#1A1A1A]">
                {features.cadenceEngine === 'max_variance' ? 'MAX_VARIANCE' : 'ENABLED'}
              </span>
            </div>
            <div className="flex items-center justify-between border-b border-dashed border-[#1A1A1A] pb-2">
              <span className="font-['SpaceMono'] text-xs uppercase text-[#1A1A1A] opacity-50">
                API_ACCESS
              </span>
              <span className="font-['SpaceMono'] text-sm font-bold text-[#1A1A1A]">
                {features.apiAccess ? 'INCLUDED' : 'DENIED'}
              </span>
            </div>
          </div>

          {tier === 'free' ? (
            <button className="w-full border border-solid border-[#1A1A1A] bg-[#0047FF] px-6 py-3 font-['SpaceMono'] text-sm font-bold uppercase text-white transition-colors hover:bg-[#0033CC]">
              UPGRADE TO PRO
            </button>
          ) : (
            <div className="space-y-4">
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
              <button className="w-full border border-solid border-[#1A1A1A] bg-transparent px-6 py-3 font-['SpaceMono'] text-sm font-bold uppercase text-[#1A1A1A] transition-colors hover:bg-[#1A1A1A] hover:text-white">
                MANAGE BILLING
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
