import React, { useEffect, useRef, useState } from 'react';
import { portfolioConfig } from '../../data/portfolio.config';

export const TaglineReveal: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeWordIndex, setActiveWordIndex] = useState<number>(-1);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  // Split lines into individual words while maintaining punctuation
  const allWords = portfolioConfig.taglineRevealLines
    .join(' ')
    .split(' ')
    .filter(Boolean);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsReducedMotion(true);
      return;
    }

    let rafId: number | null = null;

    const handleScroll = () => {
      if (rafId) return;

      rafId = requestAnimationFrame(() => {
        if (!containerRef.current) {
          rafId = null;
          return;
        }

        const rect = containerRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Smooth reveal as the full-screen section glides into view
        const startTrigger = windowHeight * 0.82;
        const endTrigger = windowHeight * 0.22;

        if (rect.top <= startTrigger && rect.bottom >= endTrigger) {
          const progress = Math.min(
            1,
            Math.max(0, (startTrigger - rect.top) / (startTrigger - endTrigger))
          );
          const wordCount = allWords.length;
          const targetIndex = Math.floor(progress * (wordCount + 1));
          setActiveWordIndex(targetIndex);
        } else if (rect.top > startTrigger) {
          setActiveWordIndex(-1);
        } else if (rect.bottom < endTrigger) {
          setActiveWordIndex(allWords.length);
        }

        rafId = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [allWords.length]);

  return (
    <section
      id="tagline"
      className="min-h-screen min-h-[100dvh] py-600 sm:py-800 flex items-center justify-center bg-surface-950 border-b border-border-subtle relative overflow-hidden"
    >
      {/* Ambient Radial Spotlight Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(0, 240, 255, 0.08) 0%, rgba(20, 20, 25, 0) 70%)',
        }}
      />

      {/* Subtle Background Matrix Watermark */}
      <div className="absolute inset-0 pointer-events-none opacity-15 flex items-center justify-center select-none overflow-hidden">
        <span
          className="font-mono text-[16vw] font-black tracking-tighter text-transparent"
          style={{
            WebkitTextStroke: '1px rgba(255,255,255,0.1)',
          }}
        >
          PHILOSOPHY
        </span>
      </div>

      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={containerRef} className="max-w-5xl mx-auto text-center space-y-6 sm:space-y-8">
          {/* Overline Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-850/90 border border-white/10 text-xs sm:text-sm font-mono uppercase tracking-[0.2em] text-[#00f0ff] font-semibold shadow-md backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-pulse" />
            <span>Core Philosophy</span>
          </div>

          {/* Monumental Headline Typography Filling the Viewport */}
          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.18] sm:leading-[1.16] tracking-tight select-none">
            {allWords.map((word, index) => {
              const isLit = isReducedMotion || index <= activeWordIndex;
              return (
                <span
                  key={index}
                  style={{
                    transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
                  }}
                  className={`inline-block mr-[0.26em] transition-all duration-500 ${
                    isLit
                      ? 'text-white font-bold scale-100 drop-shadow-[0_0_35px_rgba(255,255,255,0.22)]'
                      : 'text-white/20 font-medium scale-[0.98]'
                  }`}
                >
                  {word}
                </span>
              );
            })}
          </h2>

          {/* Subtitle Telemetry Note */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-4 font-mono text-xs sm:text-sm text-[#888888]">
            <span>Infrastructure Support & Architecture</span>
            <span className="text-[#00f0ff] font-bold">•</span>
            <span>Cloud & Virtualization</span>
            <span className="text-[#00f0ff] font-bold">•</span>
            <span>Security Operations</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TaglineReveal;
