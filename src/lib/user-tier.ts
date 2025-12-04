export type UserTier = 'free' | 'pro';

export interface TierFeatures {
  dailyQuota: number | 'unlimited';
  latency: 'standard' | 'priority';
  cadenceEngine: 'enabled' | 'max_variance';
  apiAccess: boolean;
}

export const TIER_FEATURES: Record<UserTier, TierFeatures> = {
  free: {
    dailyQuota: 500,
    latency: 'standard',
    cadenceEngine: 'enabled',
    apiAccess: false,
  },
  pro: {
    dailyQuota: 'unlimited',
    latency: 'priority',
    cadenceEngine: 'max_variance',
    apiAccess: true,
  },
};

export function getUserTier(profile: { subscription_tier?: string | null } | null | undefined): UserTier {
  return profile?.subscription_tier === 'pro' ? 'pro' : 'free';
}

export function getTierFeatures(tier: UserTier): TierFeatures {
  return TIER_FEATURES[tier];
}

