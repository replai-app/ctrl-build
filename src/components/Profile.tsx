'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import ProfileSidebar from './Profile/ProfileSidebar';
import ProfileOverview from './Profile/ProfileOverview';
import ProfileHistory from './Profile/ProfileHistory';
import ProfileSubscription from './Profile/ProfileSubscription';
import ProfileAPIKeys from './Profile/ProfileAPIKeys';
import ProfileSettings from './Profile/ProfileSettings';

type ProfileView = 'overview' | 'history' | 'subscription' | 'api' | 'settings';

export default function Profile() {
  const [activeView, setActiveView] = useState<ProfileView>('overview');
  const { user, loading, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F4F4F0]">
        <p className="font-['SpaceMono'] text-sm text-[#1A1A1A]">LOADING_</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#F4F4F0] md:flex-row">
      <ProfileSidebar
        user={user}
        activeView={activeView}
        onViewChange={setActiveView}
        onSignOut={signOut}
      />
      <div className="flex-1 overflow-y-auto pt-[96px] md:pt-0 max-[567px]:pt-[104px]">
        {activeView === 'overview' && <ProfileOverview user={user} />}
        {activeView === 'history' && <ProfileHistory user={user} />}
        {activeView === 'subscription' && <ProfileSubscription user={user} />}
        {activeView === 'api' && <ProfileAPIKeys user={user} />}
        {activeView === 'settings' && <ProfileSettings user={user} onSignOut={signOut} />}
      </div>
    </div>
  );
}
