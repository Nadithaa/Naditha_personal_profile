import React from 'react';
import { ArrowUp, Mail } from 'lucide-react';
import { portfolioConfig } from '../../data/portfolio.config';
import { GithubIcon, LinkedinIcon } from '../ui/Icons';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-surface-950 border-t border-border-subtle pt-600 pb-400 text-[#888888]">
      <div className="max-w-6xl mx-auto px-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-400 pb-500 border-b border-border-subtle">
          {/* Identity Column */}
          <div className="md:col-span-2 space-y-100">
            <div className="flex items-center gap-75 text-white">
              <div className="w-6 h-6 rounded-full bg-surface-800 border border-border-subtle flex items-center justify-center font-mono text-xs font-semibold text-white">
                NG
              </div>
              <span className="title-3 font-mono font-semibold tracking-tight text-white">
                {portfolioConfig.name}
              </span>
              <span className="caption-5 font-mono text-[#888888] border-l border-border-subtle pl-50">
                Personal Portfolio
              </span>
            </div>
            <p className="body-5 text-[#888888] max-w-sm">
              {portfolioConfig.roleTitle}. Passionate about hands-on systems reliability, firewall perimeters, and physical IoT telemetry.
            </p>
            <div className="flex items-center gap-75 pt-50">
              <a
                href={portfolioConfig.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="p-50 rounded-lg text-[#888888] hover:text-white hover:bg-surface-800 transition-colors focus:ring-2 focus:ring-white focus:outline-none"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={portfolioConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="p-50 rounded-lg text-[#888888] hover:text-white hover:bg-surface-800 transition-colors focus:ring-2 focus:ring-white focus:outline-none"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${portfolioConfig.email}`}
                aria-label="Send direct email"
                className="p-50 rounded-lg text-[#888888] hover:text-white hover:bg-surface-800 transition-colors focus:ring-2 focus:ring-white focus:outline-none"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Core Domains Column */}
          <div className="space-y-75">
            <h4 className="title-5 uppercase font-mono text-white tracking-wider">
              Engineering Focus
            </h4>
            <ul className="space-y-50 body-6">
              <li>
                <a href="#projects" className="hover:text-white transition-colors">
                  AWS Cloud Migrations
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-white transition-colors">
                  Kubernetes and Docker
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-white transition-colors">
                  OPNsense and WireGuard
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-white transition-colors">
                  Hyper-V and Backup
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-white transition-colors">
                  ESP32 Hardware IoT
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-75">
            <h4 className="title-5 uppercase font-mono text-white tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-50 body-6">
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  About Me
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-white transition-colors">
                  Featured Projects
                </a>
              </li>
              <li>
                <a href="#articles" className="hover:text-white transition-colors">
                  Tech Articles & Field Notes
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  FAQ & Questions
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  Contact Me
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-300 flex flex-col sm:flex-row items-center justify-between gap-100 caption-4 text-[#717171]">
          <div>
            &copy; {new Date().getFullYear()} {portfolioConfig.name}. Designed and engineered with React, Vite, and Tailwind CSS.
          </div>
          <div className="flex items-center gap-200">
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-25 hover:text-white transition-colors focus:ring-2 focus:ring-white focus:outline-none rounded px-50 py-25"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
