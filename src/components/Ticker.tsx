'use client';

export default function Ticker() {
  const tickerItems = [
    { text: 'SYSTEM: OPERATIONAL', type: 'system', font: 'mono', size: 'sm', weight: 'normal', hasDot: true },
    { text: '//', type: 'separator', font: 'mono', size: 'sm', weight: 'normal' },
    { text: 'PROCESSING: READY', type: 'system', font: 'mono', size: 'sm', weight: 'normal' },
    { text: '//', type: 'separator', font: 'mono', size: 'sm', weight: 'normal' },
    { text: 'analyzing cadence patterns...', type: 'human', font: 'editorial', size: 'base', weight: 'italic' },
    { text: '//', type: 'separator', font: 'mono', size: 'sm', weight: 'normal' },
    { text: 'BYPASS: SUCCESSFUL', type: 'system', font: 'mono', size: 'sm', weight: 'normal' },
    { text: '//', type: 'separator', font: 'mono', size: 'sm', weight: 'normal' },
    { text: 'restoring syntax variance...', type: 'human', font: 'editorial', size: 'base', weight: 'italic' },
    { text: '//', type: 'separator', font: 'mono', size: 'sm', weight: 'normal' },
    { text: 'LATENCY: 42ms', type: 'metric', font: 'mono', size: 'sm', weight: 'normal' },
    { text: '//', type: 'separator', font: 'mono', size: 'sm', weight: 'normal' },
    { text: 'MAKE IT READ LIKE YOU.', type: 'value', font: 'mono', size: 'sm', weight: 'bold' },
  ];

  const duplicatedItems = [...tickerItems, ...tickerItems];

  return (
    <div className="relative z-20 h-12 w-full border-y border-solid border-[#1A1A1A] bg-white overflow-hidden cursor-help">
      <div className="group flex h-full items-center whitespace-nowrap animate-[marquee_20s_linear_infinite] hover:[animation-play-state:paused] max-md:animate-[marquee_24s_linear_infinite]">
        {duplicatedItems.map((item, index) => {
          const isSeparator = item.type === 'separator';
          const isHuman = item.type === 'human';
          const isBold = item.weight === 'bold';
          const hasDot = (item as any).hasDot;
          
          return (
            <span
              key={index}
              className={`mx-8 inline-flex items-center gap-2 px-2 py-1 transition-colors hover:bg-[#1A1A1A] hover:text-white ${
                isHuman
                  ? `font-['PPEditorialNew'] text-base italic lowercase`
                  : `font-['SpaceMono'] text-sm uppercase ${isBold ? 'font-bold' : ''}`
              } leading-none text-[#1A1A1A]`}
            >
              {hasDot && (
                <span className="h-1 w-1 rounded-full bg-green-500" style={{ width: '4px', height: '4px' }} />
              )}
              {item.text}
            </span>
          );
        })}
      </div>
    </div>
  );
}

