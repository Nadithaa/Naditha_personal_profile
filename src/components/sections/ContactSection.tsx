import React, { useState } from 'react';
import { Copy, Check, ArrowUpRight } from 'lucide-react';
import { portfolioConfig } from '../../data/portfolio.config';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { GithubIcon, LinkedinIcon } from '../ui/Icons';
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard';

interface ContactSectionProps {
  onCopySuccess: (msg: string) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onCopySuccess }) => {
  const { isCopied, copy } = useCopyToClipboard();
  const [formSent, setFormSent] = useState(false);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleCopyEmail = async () => {
    const success = await copy(
      portfolioConfig.email,
      `Copied ${portfolioConfig.email} to clipboard.`
    );
    if (success) {
      onCopySuccess(`Copied ${portfolioConfig.email} to clipboard.`);
    }
  };

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoUrl = `mailto:${portfolioConfig.email}?subject=${encodeURIComponent(
      subject || `Infrastructure Opportunity for ${portfolioConfig.name}`
    )}&body=${encodeURIComponent(message)}`;
    window.location.href = mailtoUrl;
    setFormSent(true);
  };

  return (
    <section id="contact" className="py-700 sm:py-800 bg-surface-950">
      <div className="max-w-6xl mx-auto px-200">
        <div className="max-w-4xl mx-auto bg-surface-850 border border-border-strong rounded-3xl p-300 sm:p-500 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-400">
            {/* Left Column: Direct Pitch & Identity */}
            <div className="space-y-300 flex flex-col justify-between">
              <div className="space-y-150">
                <Badge variant="highlight">
                  Get In Touch
                </Badge>
                <h2 className="heading-3 text-white">
                  Let us connect and talk systems
                </h2>
                <p className="body-3 text-[#A1A1A1]">
                  Whether you have an opening on your infrastructure team, need hands-on cloud migration expertise, or want to discuss hardware projects, feel free to reach out directly.
                </p>
              </div>

              {/* Verified Contact Card */}
              <div className="bg-surface-800 border border-border-subtle rounded-xl p-200 space-y-100">
                <div className="caption-5 font-mono text-[#888888] uppercase tracking-wider">
                  Direct Email Address
                </div>
                <div className="flex items-center justify-between gap-50">
                  <span className="title-4 font-mono text-white select-all">
                    {portfolioConfig.email}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="p-50 text-[#888888] hover:text-white rounded hover:bg-surface-700 focus:outline-none focus:ring-2 focus:ring-white transition-colors"
                    aria-label="Copy email address"
                  >
                    {isCopied ? (
                      <Check className="w-4 h-4 text-[#4ADE80]" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
                <div className="caption-5 text-[#717171] pt-50 border-t border-border-subtle/60 flex items-center gap-50">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80]" />
                  <span>I typically reply within 24 hours</span>
                </div>
              </div>

              {/* Social Channels */}
              <div className="flex items-center gap-100 pt-50">
                <a
                  href={portfolioConfig.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="caption-3 font-mono text-[#A1A1A1] hover:text-white flex items-center gap-50 focus:ring-2 focus:ring-white rounded p-25 transition-colors"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
                <span className="text-[#313131]">·</span>
                <a
                  href={portfolioConfig.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="caption-3 font-mono text-[#A1A1A1] hover:text-white flex items-center gap-50 focus:ring-2 focus:ring-white rounded p-25 transition-colors"
                >
                  <LinkedinIcon className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>

            {/* Right Column: Pre-filled Direct Message Form */}
            <div className="bg-surface-800 border border-border-subtle rounded-2xl p-300">
              <form onSubmit={handleSendEmail} className="space-y-200">
                <div className="space-y-50">
                  <label htmlFor="subject" className="caption-3 font-mono text-[#A1A1A1]">
                    Opportunity / Inquiry Focus
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Senior DevOps Role or Cloud Project"
                    className="w-full bg-surface-950 border border-border-subtle rounded-lg px-100 py-75 text-sm text-white placeholder-[#666666] focus:outline-none focus:ring-2 focus:ring-white font-mono"
                  />
                </div>

                <div className="space-y-50">
                  <label htmlFor="message" className="caption-3 font-mono text-[#A1A1A1]">
                    Message to Naditha
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your infrastructure needs, timeline, or team role..."
                    className="w-full bg-surface-950 border border-border-subtle rounded-lg px-100 py-75 text-sm text-white placeholder-[#666666] focus:outline-none focus:ring-2 focus:ring-white font-mono resize-none"
                  />
                </div>

                <div className="pt-50">
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    className="w-full justify-center"
                    icon={<ArrowUpRight className="w-4 h-4" />}
                  >
                    Send Email Message
                  </Button>
                </div>

                {formSent && (
                  <p className="caption-4 text-[#4ADE80] font-mono text-center">
                    Mail client opened. Looking forward to connecting with you.
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
