import React from 'react';
import { portfolioConfig } from '../../data/portfolio.config';
import { Badge } from '../ui/Badge';
import { Check } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

export const Architecture: React.FC = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="process" className="py-700 sm:py-800 bg-surface-950 border-b border-border-subtle">
      <div className="max-w-6xl mx-auto px-200">
        <div
          ref={ref}
          className={`max-w-[680px] mb-500 space-y-100 motion-base ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-200'
          }`}
        >
          <Badge variant="highlight" className="mb-50">
            Engineering Principles
          </Badge>
          <h2 className="heading-3 text-white">
            How I design and build systems
          </h2>
          <p className="body-3 text-[#A1A1A1]">
            The three phase engineering lifecycle I follow to ensure infrastructure is resilient against failure, secured by architecture, and automated for continuous delivery.
          </p>
        </div>

        {/* 3 Step Process Grid (Rule B3 nested radius, B4 flat) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-300">
          {portfolioConfig.processes.map((proc) => (
            <div
              key={proc.number}
              className="bg-surface-850 border border-border-subtle rounded-2xl p-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-200">
                  <span className="heading-4 font-mono font-bold text-white/40">
                    {proc.number}
                  </span>
                  <span className="caption-5 font-mono text-[#888888] uppercase border border-border-subtle rounded px-50 py-[2px]">
                    Step {proc.number}
                  </span>
                </div>

                <h3 className="title-1 text-white mb-100">
                  {proc.title}
                </h3>
                <p className="body-5 text-[#888888] mb-300">
                  {proc.description}
                </p>
              </div>

              {/* Tactics list */}
              <div className="pt-200 border-t border-border-subtle space-y-75">
                <div className="caption-5 font-mono text-[#717171] uppercase tracking-wider mb-50">
                  My Core Deliverables
                </div>
                {proc.tactics.map((tactic, idx) => (
                  <div key={idx} className="flex items-start gap-50 caption-2 text-[#B0B0B0]">
                    <Check className="w-3.5 h-3.5 text-[#4ADE80] shrink-0 mt-[2px]" />
                    <span>{tactic}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
