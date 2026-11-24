import React from 'react';
import { portfolioConfig } from '../../data/portfolio.config';
import { Badge } from '../ui/Badge';
import { useScrollReveal } from '../../hooks/useScrollReveal';

export const SkillsMatrix: React.FC = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="skills" className="py-700 sm:py-800 bg-surface-950 border-b border-border-subtle">
      <div className="max-w-6xl mx-auto px-200">
        <div
          ref={ref}
          className={`max-w-[680px] mb-500 space-y-100 motion-base ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-200'
          }`}
        >
          <Badge variant="highlight" className="mb-50">
            Systems Capability
          </Badge>
          <h2 className="heading-3 text-white">
            Technical arsenal and infrastructure stack
          </h2>
          <p className="body-3 text-[#A1A1A1]">
            Curated toolsets and platforms battle tested in production environments across physical servers, hypervisors, and multi cloud fabrics.
          </p>
        </div>

        {/* 5 Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-300">
          {portfolioConfig.skillCategories.map((cat, idx) => (
            <div
              key={idx}
              className="bg-surface-850 border border-border-subtle rounded-2xl p-300 space-y-200"
            >
              <h3 className="title-3 text-white border-b border-border-subtle pb-100 flex items-center justify-between">
                <span>{cat.category}</span>
                <span className="caption-5 font-mono text-[#888888]">
                  0{idx + 1}
                </span>
              </h3>

              <div className="space-y-150">
                {cat.skills.map((skill, sIdx) => (
                  <div key={sIdx} className="space-y-50">
                    <div className="flex items-center justify-between">
                      <span className="title-4 text-[#EDEDED] font-medium">
                        {skill.name}
                      </span>
                      <span className="caption-5 font-mono text-[#717171] uppercase">
                        {skill.level}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-25">
                      {skill.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="caption-5 font-mono bg-surface-800 text-[#9E9E9E] px-50 py-[1px] rounded border border-border-subtle"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
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
