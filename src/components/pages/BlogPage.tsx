import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Compass, 
  Calendar, 
  Clock, 
  ArrowUpRight, 
  Search, 
  Sparkles,
  BookOpen
} from 'lucide-react';
import { portfolioConfig } from '../../data/portfolio.config';
import { BlogPostItem } from '../../types';
import { YoutubeIcon } from '../ui/Icons';

interface BlogPageProps {
  onBackToHome: () => void;
  onSelectArticle: (post: BlogPostItem) => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({ onBackToHome, onSelectArticle }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('all');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const blogPosts = portfolioConfig.blogPosts || [];
  const petProjects = portfolioConfig.petProjects || [];

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = selectedTag === 'all' || post.category.toLowerCase().includes(selectedTag.toLowerCase());
    return matchesSearch && matchesTag;
  });

  return (
    <div className="min-h-screen bg-surface-950 text-[#EDEDED] font-sans selection:bg-surface-700 selection:text-white flex flex-col">
      {/* Top Sticky Header */}
      <header className="sticky top-0 z-50 bg-surface-950/90 backdrop-blur-md border-b border-border-subtle px-4 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-xs font-mono text-white/80 hover:text-[#00f0ff] px-3 py-1.5 rounded-lg bg-surface-850 hover:bg-surface-800 border border-white/10 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>← Back to Portfolio</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-pulse" />
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-white">
              {portfolioConfig.name} // Field Blog & Lab
            </span>
          </div>

          <a
            href="https://youtube.com/@nadithagallella"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FF0000]/15 hover:bg-[#FF0000]/25 text-[#FF0000] border border-[#FF0000]/40 text-xs font-mono transition-colors"
          >
            <YoutubeIcon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">YouTube Academy</span>
          </a>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-12 space-y-12">
        {/* Page Hero */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-850 border border-white/10 text-xs font-mono uppercase tracking-wider text-[#00f0ff] font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Dedicated Engineering Publications & Hobby Projects</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
            Field Notes, Cloud Academy & Hardware Blueprints
          </h1>
          <p className="text-base sm:text-lg text-[#A1A1A1] leading-relaxed">
            In-depth documentation of my systems engineering work, YouTube video series on AWS cloud architectures, custom ESP32 hardware revisions, and zero-downtime migration runbooks.
          </p>
        </div>

        {/* Featured Section: Hobby & Pet Project Highlights */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-border-subtle pb-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Compass className="w-5 h-5 text-[#00f0ff]" />
              <span>Hobby & Pet Project Highlights</span>
            </h2>
            <span className="font-mono text-xs text-[#888888]">
              {petProjects.length} Active Tracks
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {petProjects.map((project) => (
              <div
                key={project.id}
                className="bg-surface-900 border border-border-subtle rounded-2xl p-6 flex flex-col justify-between space-y-4 hover:border-[#00f0ff]/40 transition-all shadow-xl hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span
                      className="text-xs font-mono px-2.5 py-0.5 rounded-full border font-semibold"
                      style={{
                        borderColor: `${project.accentColor}50`,
                        color: project.accentColor,
                        backgroundColor: `${project.accentColor}15`,
                      }}
                    >
                      {project.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white leading-snug">
                    {project.title}
                  </h3>
                  <p className="text-xs text-[#A1A1AA] leading-relaxed">
                    {project.tagline}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 space-y-3">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 3).map((t, idx) => (
                      <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-800 text-[#888888]">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    {project.links.map((link, lIdx) => (
                      <a
                        key={lIdx}
                        href={link.url}
                        target={link.isExternal ? '_blank' : '_self'}
                        rel="noreferrer"
                        className="text-xs font-mono text-[#00f0ff] hover:underline flex items-center gap-1 font-semibold"
                      >
                        <span>{link.label}</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Articles Archive */}
        <div className="space-y-6 pt-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-subtle pb-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#38bdf8]" />
              <span>Technical Articles & Architecture Postmortems</span>
            </h2>

            {/* Search Input */}
            <div className="relative max-w-xs w-full">
              <Search className="w-4 h-4 text-[#888888] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                id="blog-search"
                name="search"
                type="text"
                aria-label="Search articles"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-surface-900 border border-white/10 rounded-xl pl-9 pr-4 py-1.5 text-xs font-mono text-white placeholder-[#888888] focus:border-[#00f0ff] focus:outline-none"
              />
            </div>
          </div>

          {/* Filter Tags */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: 'All Domains' },
              { id: 'cloud', label: 'Cloud & IaC' },
              { id: 'virtualization', label: 'Virtualization & Linux' },
              { id: 'hardware', label: 'Hardware & IoT' },
              { id: 'network', label: 'Zero-Trust Network' },
              { id: 'siem', label: 'SIEM & Compliance' },
            ].map((tag) => (
              <button
                key={tag.id}
                onClick={() => setSelectedTag(tag.id)}
                className={`px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider transition-all border ${
                  selectedTag === tag.id
                    ? 'bg-[#00f0ff]/20 border-[#00f0ff] text-[#00f0ff] font-bold'
                    : 'bg-surface-900 border-white/10 text-[#888888] hover:text-white hover:border-white/20'
                }`}
              >
                {tag.label}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                onClick={() => onSelectArticle(post)}
                className="group bg-surface-900 hover:bg-surface-850 border border-border-subtle hover:border-[#00f0ff]/50 rounded-2xl p-6 cursor-pointer transition-all duration-200 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="space-y-2 max-w-3xl">
                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
                    <span className="text-[#00f0ff] font-bold">{post.volume}</span>
                    <span className="text-[#888888]">{post.category}</span>
                    <span className="text-white/20">•</span>
                    <span className="text-[#888888] flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </span>
                    <span className="text-white/20">•</span>
                    <span className="text-[#888888] flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-[#00f0ff] transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-[#A1A1A1] line-clamp-2">
                    {post.subtitle}
                  </p>
                </div>

                <div className="shrink-0 flex items-center gap-2 text-xs font-mono text-[#00f0ff] group-hover:translate-x-1 transition-transform">
                  <span>Read Article</span>
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Page Footer */}
      <footer className="border-t border-border-subtle py-8 text-center text-xs font-mono text-[#71717A]">
        {portfolioConfig.name} • {portfolioConfig.roleTitle}
      </footer>
    </div>
  );
};

export default BlogPage;
