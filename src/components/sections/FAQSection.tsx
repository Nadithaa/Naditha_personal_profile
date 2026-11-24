import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { portfolioConfig } from '../../data/portfolio.config';
import { Badge } from '../ui/Badge';
import { useScrollReveal } from '../../hooks/useScrollReveal';

export const FAQSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(portfolioConfig.faqs[0]?.id || null);
  const { ref, isVisible } = useScrollReveal();

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-700 sm:py-800 bg-surface-950 border-b border-border-subtle">
      <div className="max-w-6xl mx-auto px-200">
        <div
          ref={ref}
          className={`max-w-[680px] mb-500 space-y-100 motion-base ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-200'
          }`}
        >
          <Badge variant="highlight" className="mb-50">
            Frequently Asked Questions
          </Badge>
          <h2 className="heading-3 text-white">
            Technical and operational questions
          </h2>
          <p className="body-3 text-[#A1A1A1]">
            Clear answers regarding architecture decisions, migration guarantees, security policies, and team onboarding.
          </p>
        </div>

        {/* Accordion List (Rule B3 nested radius, B4 flat backgrounds) */}
        <div className="max-w-3xl mx-auto space-y-100">
          {portfolioConfig.faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-surface-850 border border-border-subtle rounded-xl overflow-hidden transition-colors hover:border-border-strong"
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full p-200 text-left flex items-center justify-between gap-100 focus:outline-none focus:ring-2 focus:ring-white"
                >
                  <span className="title-3 text-[#EDEDED] font-medium">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#888888] shrink-0 transition-transform duration-300 ease-base-curve ${
                      isOpen ? 'rotate-180 text-white' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-200 pb-200 pt-50 border-t border-border-subtle/60 text-[#A1A1A1] body-5 leading-relaxed motion-base">
                    <p>{faq.answer}</p>
                    <div className="mt-100 pt-75 flex items-center gap-50 caption-5 font-mono text-[#717171]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80]" />
                      <span>Category: {faq.category}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
