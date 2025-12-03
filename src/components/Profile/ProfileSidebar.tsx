'use client';

import type { User } from '@supabase/supabase-js';

type ProfileView = 'overview' | 'history' | 'subscription' | 'api' | 'settings';

interface ProfileSidebarProps {
  user: User;
  activeView: ProfileView;
  onViewChange: (view: ProfileView) => void;
  onSignOut: () => void;
}

function generateSigil(email: string): string {
  const hash = email.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const patterns = [
    'M4 4h8v8H4z',
    'M8 4l-4 4 4 4 4-4-4-4z',
    'M4 8h8M8 4v8',
    'M4 4l4 4-4 4M12 4l-4 4 4 4',
  ];
  return patterns[hash % patterns.length];
}

export default function ProfileSidebar({
  user,
  activeView,
  onViewChange,
  onSignOut,
}: ProfileSidebarProps) {
  const sigilPath = generateSigil(user.email || '');

  const menuItems: { id: ProfileView; label: string; mobileLabel?: string }[] = [
    { id: 'overview', label: 'OVERVIEW' },
    { id: 'history', label: 'HISTORY LOG', mobileLabel: 'HISTORY' },
    { id: 'subscription', label: 'SUBSCRIPTION', mobileLabel: 'BILLING' },
    { id: 'api', label: 'API KEYS' },
    { id: 'settings', label: 'SETTINGS' },
  ];

  return (
    <>
      <aside className="hidden w-[280px] border-r border-solid border-[#1A1A1A] bg-[#F4F4F0] md:block">
        <div className="sticky top-0 flex h-screen flex-col">
          <div className="border-b border-solid border-[#1A1A1A] p-6">
            <div className="mb-4 flex h-16 w-16 items-center justify-center border border-solid border-[#1A1A1A] bg-white">
              <svg width="32" height="32" viewBox="0 0 16 16" className="text-[#1A1A1A]">
                <path d={sigilPath} fill="currentColor" />
              </svg>
            </div>
            <div className="space-y-1 font-['SpaceMono'] text-xs">
              <p className="uppercase text-[#1A1A1A]">
                USER_ID: <span className="opacity-70">{user.email}</span>
              </p>
              <p className="uppercase text-[#1A1A1A]">
                PLAN: <span className="text-[#0047FF]">PRO</span>
              </p>
            </div>
          </div>

          <nav className="flex-1 space-y-1 p-4">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={`w-full px-4 py-3 text-left font-['SpaceMono'] text-xs uppercase transition-colors ${
                  activeView === item.id
                    ? 'bg-[#1A1A1A] text-white'
                    : 'text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="border-t border-solid border-[#1A1A1A] p-4">
            <button
              onClick={onSignOut}
              className="w-full px-4 py-3 text-left font-['SpaceMono'] text-xs uppercase text-[#1A1A1A] transition-colors hover:text-[#FF3333]"
            >
              TERMINATE SESSION
            </button>
          </div>
        </div>
      </aside>

      <div className="sticky top-12 z-40 border-b border-solid border-[#1A1A1A] bg-[#F4F4F0] md:hidden max-[567px]:top-14">
        <div className="flex overflow-x-auto">
          {menuItems
            .filter((item) => item.id !== 'api')
            .map((item) => (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={`whitespace-nowrap border-b-2 px-4 py-3 font-['SpaceMono'] text-xs uppercase transition-colors ${
                  activeView === item.id
                    ? 'border-[#1A1A1A] text-[#1A1A1A]'
                    : 'border-transparent text-[#1A1A1A] opacity-60'
                }`}
              >
                {item.mobileLabel || item.label}
              </button>
            ))}
        </div>
      </div>
    </>
  );
}
