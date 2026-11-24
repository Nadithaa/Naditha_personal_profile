import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { portfolioConfig } from '../../data/portfolio.config';

interface NavbarProps {
  onContactClick: () => void;
  onBlogClick?: () => void;
  onTerminalClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onContactClick, onBlogClick, onTerminalClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Lab', href: '#lab' },
    { label: 'Skills', href: '#skills' },
    { label: 'FAQ', href: '#faq' },
  ];

  // Track active section and scroll state
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 400);

      const sections = ['hero', 'about', 'overview', 'projects', 'lab', 'skills', 'faq', 'contact'];

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop - 120;
          const height = el.offsetHeight;
          if (scrollY >= top && scrollY < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-200 left-0 right-0 z-40 px-200 transition-all duration-500 ease-base-curve flex justify-center ${
        isScrolled
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 -translate-y-4 pointer-events-none'
      }`}
    >
      {/* Floating Compact Bar */}
      <nav
        aria-label="Floating Navigation"
        className="max-w-4xl w-full bg-surface-850/90 backdrop-blur-md border border-border-strong rounded-full px-100 py-50 flex items-center justify-between shadow-xl"
      >
        {/* Personal brand identity */}
        <a
          href="#hero"
          className="flex items-center gap-75 text-white hover:text-[#EDEDED] pl-100 py-50 rounded-full focus:outline-none focus:ring-2 focus:ring-white"
        >
          <div className="w-7 h-7 rounded-full bg-surface-800 border border-border-subtle flex items-center justify-center font-mono text-xs font-semibold text-white">
            NG
          </div>
          <span className="title-4 font-mono font-semibold tracking-tight text-white">
            {portfolioConfig.name}
          </span>
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-50">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <a
                key={link.href}
                href={link.href}
                className={`caption-1 px-100 py-50 rounded-full transition-colors ${
                  isActive
                    ? 'text-white bg-surface-700/60 font-semibold'
                    : 'text-[#888888] hover:text-white hover:bg-surface-800/40'
                } focus:outline-none focus:ring-2 focus:ring-white`}
              >
                {link.label}
              </a>
            );
          })}
          {onTerminalClick && (
            <button
              type="button"
              onClick={onTerminalClick}
              className="caption-1 px-75 py-[3px] rounded-full text-[#34d399] hover:text-white hover:bg-surface-800/60 transition-colors flex items-center gap-1 font-mono border border-[#34d399]/30 ml-25"
              title="Open Systems Interactive CLI Terminal (Ctrl+K)"
            >
              <span>CLI</span>
            </button>
          )}
          {onBlogClick && (
            <button
              type="button"
              onClick={onBlogClick}
              className="caption-1 px-75 py-[3px] rounded-full text-[#00f0ff] hover:text-white hover:bg-surface-800/60 transition-colors flex items-center gap-1 font-mono border border-[#00f0ff]/30 ml-25"
            >
              <span>Blog</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* CTA Button and Mobile Menu Toggle */}
        <div className="flex items-center gap-75 pr-50">
          <Button
            variant="primary"
            size="sm"
            onClick={onContactClick}
            className="hidden sm:inline-flex"
            icon={<ArrowUpRight className="w-3.5 h-3.5" />}
          >
            Get in touch
          </Button>

          <button
            type="button"
            aria-expanded={isOpen}
            aria-label="Toggle navigation menu"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-50 text-[#888888] hover:text-white rounded-full hover:bg-surface-800 focus:outline-none focus:ring-2 focus:ring-white transition-transform duration-300"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="md:hidden fixed inset-0 z-50 bg-surface-950/95 backdrop-blur-xl pointer-events-auto flex flex-col justify-between p-300 motion-base"
        >
          <div className="flex items-center justify-between border-b border-border-subtle pb-200">
            <span className="title-3 font-mono font-semibold text-white">
              {portfolioConfig.name}
            </span>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
              className="p-50 text-[#888888] hover:text-white rounded-full hover:bg-surface-800"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex flex-col gap-200 py-400">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="heading-4 text-[#A1A1A1] hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white rounded-lg p-50"
              >
                {link.label}
              </a>
            ))}
            {onBlogClick && (
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  onBlogClick();
                }}
                className="heading-4 text-left text-[#00f0ff] hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white rounded-lg p-50 flex items-center justify-between"
              >
                <span>Dedicated Blog</span>
                <ArrowUpRight className="w-5 h-5" />
              </button>
            )}
          </div>

          <div className="pt-200 border-t border-border-subtle flex flex-col gap-100">
            <Button
              variant="primary"
              size="lg"
              className="w-full justify-center"
              onClick={() => {
                setIsOpen(false);
                onContactClick();
              }}
            >
              Get in touch
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
