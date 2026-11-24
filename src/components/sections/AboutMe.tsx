import React from 'react';
import { portfolioConfig } from '../../data/portfolio.config';
import { Badge } from '../ui/Badge';
import { Terminal, Cpu, HardDrive, Shield, Check } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

export const AboutMe: React.FC = () => {
  const { ref, isVisible } = useScrollReveal();

  const highlightIcons = [
    <Cpu className="w-5 h-5 text-white" key="1" />,
    <HardDrive className="w-5 h-5 text-white" key="2" />,
    <Shield className="w-5 h-5 text-white" key="3" />,
  ];

  return (
    <section id="about" className="py-700 sm:py-800 bg-surface-950 border-b border-border-subtle">
      <div className="max-w-6xl mx-auto px-200">
        <div
          ref={ref}
          className={`grid grid-cols-1 lg:grid-cols-12 gap-500 motion-base ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-200'
          }`}
        >
          {/* Left Column: Personal Story & Philosophy (7 cols) */}
          <div className="lg:col-span-7 space-y-300">
            <div className="space-y-100">
              <Badge variant="highlight">
                Personal Background
              </Badge>
              <h2 className="heading-3 text-white">
                Engineering Philosophy: From Silicon to Cloud, End to End
              </h2>
              <p className="title-2 text-[#EDEDED] font-medium leading-snug">
                {portfolioConfig.about.bioLead}
              </p>
            </div>

            <div className="space-y-200 body-3 text-[#A1A1A1] leading-relaxed">
              {portfolioConfig.about.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* 3 Core Highlights */}
            <div className="space-y-200 pt-200 border-t border-border-subtle">
              {portfolioConfig.about.highlights.map((highlight, idx) => (
                <div key={idx} className="flex items-start gap-150">
                  <div className="w-8 h-8 rounded-lg bg-surface-850 border border-border-subtle flex items-center justify-center shrink-0 mt-25">
                    {highlightIcons[idx] || <Check className="w-4 h-4 text-white" />}
                  </div>
                  <div>
                    <h3 className="title-3 text-white font-medium">
                      {highlight.title}
                    </h3>
                    <p className="body-5 text-[#888888] mt-25">
                      {highlight.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Production Stack & Expertise (5 cols) */}
          <div className="lg:col-span-5">
            <div className="bg-surface-850 border border-border-strong rounded-2xl p-300 space-y-300 shadow-xl">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border-subtle pb-150">
                <div className="flex items-center gap-75">
                  <div className="w-6 h-6 rounded-full bg-surface-800 border border-border-subtle flex items-center justify-center">
                    <Terminal className="w-3 h-3 text-white" />
                  </div>
                  <span className="title-4 font-mono font-semibold text-white">
                    Production Stack & Expertise
                  </span>
                </div>
                <div className="flex items-center gap-2 font-mono text-[11px]">
                  <span className="text-[#00f0ff] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-pulse" />
                    Enterprise
                  </span>
                  <span className="text-[#717171]">|</span>
                  <span className="text-[#4ADE80] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80] animate-pulse" />
                    Production
                  </span>
                </div>
              </div>

              <p className="caption-2 text-[#888888]">
                Core platforms, infrastructure-as-code, and security tooling I use to architect, automate, and harden production environments.
              </p>

              {/* Stack Specs Grid */}
              <div className="space-y-150">
                {portfolioConfig.about.homelabSpecs.map((spec, idx) => (
                  <div
                    key={idx}
                    className="bg-surface-800 border border-border-subtle rounded-lg p-100"
                  >
                    <div className="caption-5 font-mono text-[#888888] uppercase tracking-wider">
                      {spec.label}
                    </div>
                    <div className="body-5 text-[#EDEDED] font-mono mt-25">
                      {spec.spec}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-150 border-t border-border-subtle caption-5 font-mono text-[#717171] flex flex-wrap items-center justify-between gap-2">
                <span>Scale: 150+ Prod VMs & Multi-Cloud Environments</span>
                <span>Compliance: SOC 2 | ISO 27001</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
