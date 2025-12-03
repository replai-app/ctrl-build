'use client';

import { useState, useEffect } from 'react';
import type { User } from '@supabase/supabase-js';
import { getApiEndpoint } from '@/lib/api-client';

interface ProfileHistoryProps {
  user: User;
}

interface HistoryItem {
  id: string;
  timestamp: string;
  input: string;
  output: string;
  tone: string;
  created_at: string;
}

export default function ProfileHistory({ user }: ProfileHistoryProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch(getApiEndpoint('/api/history'));
        if (response.ok) {
          const data = await response.json();
          const formattedHistory = (data.history || []).map((item: any) => ({
            id: item.id,
            timestamp: new Date(item.created_at).toLocaleString('en-US', {
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              hour12: false,
            }).replace(',', ''),
            input: item.input_text,
            output: item.output_text,
            tone: item.tone?.toUpperCase() || 'STANDARD',
            created_at: item.created_at,
          }));
          setHistory(formattedHistory);
        }
      } catch (error) {
        console.error('Error fetching history:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const getSnippet = (text: string) => {
    const words = text.split(' ');
    return words.slice(0, 10).join(' ') + (words.length > 10 ? '...' : '');
  };

  return (
    <div className="p-8 md:p-12">
      <div className="mb-12">
        <h1 className="mb-2 font-['PPEditorialNew'] text-4xl font-extralight text-[#1A1A1A]">
          History Log
        </h1>
        <p className="font-['SpaceMono'] text-xs uppercase text-[#1A1A1A] opacity-50">
          PAST REFINEMENTS
        </p>
      </div>

      <div className="space-y-0 border border-solid border-[#1A1A1A] bg-white">
        {history.length === 0 && !isLoading && (
          <div className="border-b border-dashed border-[#1A1A1A] p-6">
            <p className="font-['SpaceMono'] text-sm text-[#1A1A1A] opacity-50">
              NO REFINEMENTS YET
            </p>
          </div>
        )}
        {history.map((item, index) => (
          <div key={item.id}>
            <div className="border-b border-dashed border-[#1A1A1A]">
              <div
                onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                className="w-full p-4 text-left transition-colors hover:bg-[#F4F4F0] cursor-pointer md:p-6"
              >
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between md:gap-4">
                  <div className="flex flex-1 flex-col gap-2 md:flex-row md:items-center md:gap-4">
                    <span className="font-['SpaceMono'] text-xs uppercase text-[#1A1A1A] opacity-70">
                      [{item.timestamp}]
                    </span>
                    <span className="font-['SpaceMono'] text-xs text-[#1A1A1A]">
                      {getSnippet(item.input)}
                    </span>
                    <span className="hidden font-['SpaceMono'] text-xs uppercase text-[#1A1A1A] opacity-50 md:block">
                      [{item.tone}]
                    </span>
                  </div>
                  <button
                    onClick={async (e) => {
                      e.stopPropagation();
                      try {
                        const response = await fetch(getApiEndpoint('/api/restore'), {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ historyId: item.id }),
                        });
                        if (response.ok) {
                          const data = await response.json();
                          window.location.href = `/?restore=${encodeURIComponent(data.text)}`;
                        }
                      } catch (error) {
                        console.error('Error restoring:', error);
                      }
                    }}
                    className="hidden border border-solid border-[#1A1A1A] bg-transparent px-4 py-2 font-['SpaceMono'] text-xs uppercase text-[#1A1A1A] transition-colors hover:bg-[#1A1A1A] hover:text-white md:block"
                  >
                    [ RESTORE ]
                  </button>
                </div>
              </div>
              <button
                onClick={async (e) => {
                  e.stopPropagation();
                  try {
                    const response = await fetch('/api/restore', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ historyId: item.id }),
                    });
                    if (response.ok) {
                      const data = await response.json();
                      window.location.href = `/?restore=${encodeURIComponent(data.text)}`;
                    }
                  } catch (error) {
                    console.error('Error restoring:', error);
                  }
                }}
                className="w-full border-t border-dashed border-[#1A1A1A] bg-transparent px-4 py-3 font-['SpaceMono'] text-xs uppercase text-[#1A1A1A] transition-colors hover:bg-[#1A1A1A] hover:text-white md:hidden"
              >
                [ RESTORE ]
              </button>
            </div>
            {expandedId === item.id && (
              <div className="border-t border-dashed border-[#1A1A1A] bg-[#F4F4F0] p-6">
                <div className="mb-4">
                  <p className="mb-2 font-['SpaceMono'] text-xs uppercase text-[#1A1A1A] opacity-50">
                    INPUT:
                  </p>
                  <p className="font-['SpaceMono'] text-sm text-[#1A1A1A]">{item.input}</p>
                </div>
                <div>
                  <p className="mb-2 font-['SpaceMono'] text-xs uppercase text-[#1A1A1A] opacity-50">
                    OUTPUT:
                  </p>
                  <p className="font-['PPEditorialNew'] text-sm text-[#1A1A1A]">{item.output}</p>
                </div>
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="border-b border-dashed border-[#1A1A1A] p-6">
            <p className="font-['SpaceMono'] text-sm text-[#1A1A1A] blink-cursor">
              LOADING
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
