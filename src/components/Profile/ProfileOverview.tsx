'use client';

import { useState, useEffect, useRef } from 'react';
import type { User } from '@supabase/supabase-js';

interface ProfileOverviewProps {
  user: User;
}

interface ActivityData {
  activity_date: string;
  word_count: number;
  refinement_count: number;
}

interface StatsData {
  quota: number;
  savedTime: string;
  avgVariance: number;
  activity: ActivityData[];
}

export default function ProfileOverview({ user }: ProfileOverviewProps) {
  const [copied, setCopied] = useState<string | null>(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);
  const copiedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/stats');
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const days = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    return date.toISOString().split('T')[0];
  });

  const getActivityLevel = (date: string) => {
    if (!stats?.activity) return 0;
    const activity = stats.activity.find(a => a.activity_date === date);
    if (!activity || activity.word_count === 0) return 0;
    
    const maxWords = Math.max(...stats.activity.map(a => a.word_count || 0), 1);
    const ratio = activity.word_count / maxWords;
    
    if (ratio < 0.2) return 1;
    if (ratio < 0.4) return 2;
    if (ratio < 0.6) return 3;
    if (ratio < 0.8) return 4;
    return 5;
  };

  const handleCopy = (text: string, id: string, event: React.MouseEvent) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setCursorPosition({ x: event.clientX, y: event.clientY });
    setTimeout(() => setCopied(null), 800);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (copied) {
        setCursorPosition({ x: e.clientX, y: e.clientY });
      }
    };

    if (copied) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [copied]);

  return (
    <div className="p-8 md:p-12">
      <div className="mb-12">
        <h1 className="mb-2 font-['PPEditorialNew'] text-4xl font-extralight text-[#1A1A1A]">
          Overview
        </h1>
        <p className="font-['SpaceMono'] text-xs uppercase text-[#1A1A1A] opacity-50">
          SYSTEM STATUS & METRICS
        </p>
      </div>

      <div className="mb-12 hidden md:block">
        <h2 className="mb-4 font-['SpaceMono'] text-xs uppercase text-[#1A1A1A]">ACTIVITY HEATMAP</h2>
        <div className="grid grid-cols-30 gap-1">
          {days.map((day, index) => {
            const level = getActivityLevel(day);
            const opacity = level === 0 ? 0.1 : Math.min(0.2 + (level - 1) * 0.15, 1);
            const date = new Date(day);
            return (
              <div
                key={index}
                className="aspect-square border border-solid border-[#1A1A1A]"
                style={{
                  backgroundColor: level === 0 ? '#E5E5E5' : `rgba(0, 71, 255, ${opacity})`,
                }}
                title={date.toLocaleDateString()}
              />
            );
          })}
        </div>
      </div>

      <div className="mb-8 block md:hidden">
        <p className="font-['SpaceMono'] text-xs uppercase text-[#1A1A1A]">
          ACTIVITY LEVEL: {stats && stats.activity && stats.activity.length > 0 ? 'HIGH' : 'LOW'}
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="border border-solid border-[#1A1A1A] bg-white p-6">
            <p className="mb-2 font-['SpaceMono'] text-2xl font-bold text-[#1A1A1A] blink-cursor">
              LOADING
            </p>
            <p className="font-['SpaceMono'] text-xs uppercase text-[#1A1A1A] opacity-50">
              QUOTA
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div
            className="cursor-pointer border border-solid border-[#1A1A1A] bg-white p-6 transition-colors hover:bg-[#F4F4F0]"
            onClick={(e) => handleCopy(`${stats?.quota.toLocaleString() || 0} / UNLIMITED`, 'quota', e)}
          >
            <p className="mb-2 font-['SpaceMono'] text-2xl font-bold text-[#1A1A1A]">
              {stats?.quota.toLocaleString() || 0} / UNLIMITED
            </p>
            <p className="font-['SpaceMono'] text-xs uppercase text-[#1A1A1A] opacity-50">
              QUOTA
            </p>
          </div>

          <div
            className="cursor-pointer border border-solid border-[#1A1A1A] bg-white p-6 transition-colors hover:bg-[#F4F4F0]"
            onClick={(e) => handleCopy(`~${stats?.savedTime || '0.0'} HOURS`, 'time', e)}
          >
            <p className="mb-2 font-['SpaceMono'] text-2xl font-bold text-[#1A1A1A]">
              ~{stats?.savedTime || '0.0'} HOURS
            </p>
            <p className="font-['SpaceMono'] text-xs uppercase text-[#1A1A1A] opacity-50">
              SAVED TIME
            </p>
          </div>

          <div
            className="cursor-pointer border border-solid border-[#1A1A1A] bg-white p-6 transition-colors hover:bg-[#F4F4F0]"
            onClick={(e) => handleCopy(`${stats?.avgVariance || 94}%`, 'variance', e)}
          >
            <p className="mb-2 font-['SpaceMono'] text-2xl font-bold text-[#1A1A1A]">
              {stats?.avgVariance || 94}%
            </p>
            <p className="font-['SpaceMono'] text-xs uppercase text-[#1A1A1A] opacity-50">
              AVG. VARIANCE
            </p>
          </div>
        </div>
      )}

      {copied && (
        <div
          ref={copiedRef}
          className="pointer-events-none fixed z-50 font-['SpaceMono'] text-xs text-[#0047FF]"
          style={{
            left: `${cursorPosition.x + 10}px`,
            top: `${cursorPosition.y + 10}px`,
            transform: 'translate(0, 0)',
          }}
        >
          COPIED
        </div>
      )}
    </div>
  );
}

