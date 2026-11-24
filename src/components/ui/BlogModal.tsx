import React, { useEffect, useState } from 'react';
import { X, Calendar, Clock, Bookmark, Terminal, Check, Copy, CheckCheck } from 'lucide-react';
import { BlogPostItem } from '../../types';
import { Badge } from './Badge';

interface BlogModalProps {
  post: BlogPostItem | null;
  onClose: () => void;
}

export const BlogModal: React.FC<BlogModalProps> = ({ post, onClose }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (post) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [post, onClose]);

  if (!post) return null;

  const handleCopyCode = () => {
    if (post.codeSnippet) {
      navigator.clipboard.writeText(post.codeSnippet.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="blog-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-surface-950/85 backdrop-blur-md overflow-y-auto animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-surface-900 border border-border-strong rounded-2xl p-5 sm:p-8 shadow-2xl text-left overflow-hidden my-auto max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Decorative Color Accent Bar */}
        <div
          className="absolute top-0 left-0 right-0 h-1.5"
          style={{
            background: `linear-gradient(90deg, ${post.color}, #00f0ff, transparent)`,
          }}
        />

        {/* Modal Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-border-subtle">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="highlight" className="font-mono text-xs">
                {post.volume}
              </Badge>
              <span className="font-mono text-xs px-2 py-0.5 rounded bg-surface-800 text-[#A1A1A1] border border-border-subtle">
                {post.tapeLabel}
              </span>
              <span
                className="font-mono text-xs px-2 py-0.5 rounded border"
                style={{
                  borderColor: `${post.color}40`,
                  color: post.color,
                  backgroundColor: `${post.color}15`,
                }}
              >
                {post.category}
              </span>
            </div>

            <h2 id="blog-modal-title" className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
              {post.title}
            </h2>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#888888] pt-1">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#00f0ff]" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#00f0ff]" />
                <span>{post.readTime}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Bookmark className="w-3.5 h-3.5 text-[#00f0ff]" />
                <span>Field Engineering Log</span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close article modal"
            className="p-1.5 text-[#888888] hover:text-white rounded-lg hover:bg-surface-800 transition-colors focus:ring-2 focus:ring-white focus:outline-none shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="space-y-6 py-5 overflow-y-auto pr-2 custom-scrollbar flex-1">
          {/* Subtitle / Teaser */}
          <p className="text-sm sm:text-base text-[#D4D4D8] italic border-l-2 pl-4 py-1 border-[#00f0ff]">
            {post.subtitle}
          </p>

          {/* Excerpt / Field Context */}
          <div className="bg-surface-950/60 border border-white/5 rounded-xl p-4 sm:p-5">
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#00f0ff] font-semibold mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff]" />
              Field Note Background
            </h3>
            <p className="text-sm text-[#A1A1AA] leading-relaxed">
              {post.excerpt}
            </p>
          </div>

          {/* Executive Summary */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#A1A1A1] font-semibold mb-2">
              Architectural Overview
            </h3>
            <p className="text-sm text-[#E4E4E7] leading-relaxed">
              {post.summary}
            </p>
          </div>

          {/* Key Engineering Takeaways */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#A1A1A1] font-semibold mb-3">
              Key Engineering Takeaways & Implementation Rules
            </h3>
            <div className="space-y-2.5">
              {post.keyTakeaways.map((takeaway, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 text-xs sm:text-sm text-[#D1D5DB] bg-surface-850/70 border border-border-subtle/80 rounded-lg p-3"
                >
                  <div className="p-0.5 rounded-full bg-[#34d399]/20 text-[#34d399] shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="leading-relaxed">{takeaway}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Code Snippet / Production Manifest */}
          {post.codeSnippet && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-xs font-mono text-[#A1A1A1]">
                  <Terminal className="w-3.5 h-3.5 text-[#00f0ff]" />
                  <span>{post.codeSnippet.filename}</span>
                </div>
                <button
                  onClick={handleCopyCode}
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-[#00f0ff] hover:text-white px-2 py-1 rounded bg-surface-800 hover:bg-surface-750 border border-white/10 transition-colors"
                >
                  {copied ? (
                    <>
                      <CheckCheck className="w-3 h-3 text-[#34d399]" />
                      <span className="text-[#34d399]">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="p-4 bg-surface-950 border border-border-strong rounded-xl text-xs font-mono text-[#38bdf8] overflow-x-auto leading-relaxed">
                <code>{post.codeSnippet.code}</code>
              </pre>
            </div>
          )}

          {/* Tech Stack Pills */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#888888] font-semibold mb-2">
              Technologies & Systems Referenced
            </h3>
            <div className="flex flex-wrap gap-2">
              {post.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="text-xs font-mono text-[#E4E4E7] bg-surface-800/80 border border-white/10 rounded-md px-2.5 py-1"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-border-subtle flex items-center justify-between">
          <span className="text-xs font-mono text-[#71717A]">
            DOCUMENT ID // {post.tapeLabel} • {post.year}
          </span>
          <button
            onClick={onClose}
            className="text-xs font-mono uppercase tracking-wider px-4 py-2 rounded-lg bg-surface-800 hover:bg-surface-750 text-white border border-border-subtle transition-colors"
          >
            Close Article
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogModal;
