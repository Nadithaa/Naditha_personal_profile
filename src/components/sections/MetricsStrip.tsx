import React from 'react';
import { portfolioConfig } from '../../data/portfolio.config';
import { Badge } from '../ui/Badge';
import { useScrollReveal } from '../../hooks/useScrollReveal';

export const MetricsStrip: React.FC = () => {
  const { ref, isVisible } = useScrollReveal();
  const stackCards = portfolioConfig.expertiseStack || [];

  return (
    <section id="overview" className="py-600 sm:py-800 border-y border-border-subtle bg-surface-950">
      <div className="max-w-6xl mx-auto px-200 sm:px-400">
        {/* Section Header */}
        <div
          ref={ref}
          className={`mb-400 sm:mb-500 space-y-100 motion-base ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-200'
          }`}
        >
          <Badge variant="highlight">
            Core Expertise
          </Badge>
          <h2 className="heading-3 text-white">
            Tech Stack
          </h2>
          <p className="body-3 text-[#A1A1A1] max-w-2xl">
            Production platforms, infrastructure as code, enterprise virtualization, and security tooling deployed at scale.
          </p>
        </div>

        {/* 2x2 Order Grid with Generous Spacing */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-400 sm:gap-500 motion-base ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-400'
          }`}
        >
          {stackCards.map((card, idx) => (
            <div
              key={idx}
              className="group relative bg-surface-850/95 hover:bg-surface-800/95 border border-border-strong hover:border-[#00f0ff]/50 rounded-2xl p-400 sm:p-500 flex flex-col justify-between transition-all duration-300 shadow-xl hover:shadow-[0_12px_40px_rgba(0,0,0,0.6)] min-h-[220px] sm:min-h-[240px] overflow-hidden"
            >
              {/* Subtle top cyan ambient glow line on hover */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00f0ff]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div>
                {/* Category Overline with Active Indicator */}
                <div className="caption-4 text-[#00f0ff] font-mono uppercase tracking-wider flex items-center gap-2 font-semibold mb-2">
                  <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-pulse" />
                  {card.category}
                </div>

                {/* Card Headline - Prominent & Punchy */}
                <h3 className="heading-4 sm:title-1 text-white font-bold tracking-tight mb-3">
                  {card.headline}
                </h3>
              </div>

              {/* Tags / Items: Crisp Bullet Tags with Generous Spacing */}
              <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-border-subtle/80 mt-auto">
                {card.items.map((item, iIdx) => (
                  <span
                    key={iIdx}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-mono text-[#E4E4E7] bg-surface-900/80 hover:bg-surface-750 border border-white/10 hover:border-[#00f0ff]/40 rounded-lg px-3 py-1.5 transition-all duration-200 cursor-default shadow-sm"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff]/80" />
                    <span>{item}</span>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MetricsStrip;
