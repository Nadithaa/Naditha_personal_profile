import React, { useState, useEffect } from 'react';
import { 
  Cpu, 
  Terminal, 
  GitBranch, 
  Compass, 
  ChevronLeft, 
  ChevronRight, 
  ArrowUpRight, 
  Play, 
  CheckCircle2, 
  Layers,
  BookmarkCheck,
  Code2
} from 'lucide-react';
import { portfolioConfig } from '../../data/portfolio.config';
import { BlogPostItem } from '../../types';
import { Badge } from '../ui/Badge';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { YoutubeIcon } from '../ui/Icons';

interface HobbyLabSlideshowProps {
  onOpenArticle: (post: BlogPostItem) => void;
  onOpenBlogPage?: () => void;
}

export const HobbyLabSlideshow: React.FC<HobbyLabSlideshowProps> = ({ onOpenArticle, onOpenBlogPage }) => {
  const { ref, isVisible } = useScrollReveal();
  const [activeSlideIdx, setActiveSlideIdx] = useState<number>(0);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  
  // Interactive Sub-States for specific slide cards
  const [activeEspRevisionIdx, setActiveEspRevisionIdx] = useState<number>(0);
  const [activeMigrationPhaseIdx, setActiveMigrationPhaseIdx] = useState<number>(0);
  const [activeTerminalTabIdx, setActiveTerminalTabIdx] = useState<number>(0);
  const [activeVideoEpisodeIdx, setActiveVideoEpisodeIdx] = useState<number>(0);

  const petProjects = portfolioConfig.petProjects || [];

  const filteredProjects = activeCategory === 'all'
    ? petProjects
    : petProjects.filter((p) => p.type === activeCategory);

  const numProjects = filteredProjects.length;

  // Ensure active index is within bounds when category changes
  useEffect(() => {
    setActiveSlideIdx(0);
  }, [activeCategory]);

  const nextSlide = () => {
    setActiveSlideIdx((prev) => (prev + 1) % numProjects);
  };

  const prevSlide = () => {
    setActiveSlideIdx((prev) => (prev - 1 + numProjects) % numProjects);
  };

  const currentProject = filteredProjects[activeSlideIdx] || filteredProjects[0];

  // Map category to icon
  const getCategoryIcon = (type: string) => {
    switch (type) {
      case 'youtube':
        return <YoutubeIcon className="w-3.5 h-3.5 text-[#FF0000]" />;
      case 'hardware':
        return <Cpu className="w-3.5 h-3.5 text-[#00f0ff]" />;
      case 'guide':
        return <Compass className="w-3.5 h-3.5 text-[#38bdf8]" />;
      case 'sysadmin':
        return <Terminal className="w-3.5 h-3.5 text-[#34d399]" />;
      case 'software':
        return <Code2 className="w-3.5 h-3.5 text-[#a78bfa]" />;
      default:
        return <Layers className="w-3.5 h-3.5 text-[#00f0ff]" />;
    }
  };

  const videoEpisodes = [
    { title: 'VPC Peering, Transit Gateway & WireGuard Mesh', duration: '24:18', level: 'Advanced' },
    { title: 'Deploying High-Availability Aurora PostgreSQL Replicas', duration: '18:45', level: 'Intermediate' },
    { title: 'Hardening IAM Roles & AWS Control Tower Governance', duration: '21:10', level: 'Advanced' },
  ];

  return (
    <section
      id="lab"
      className="py-16 sm:py-24 bg-[#090b0f] border-b border-border-subtle relative overflow-hidden select-none"
    >
      {/* Background ambient lighting */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full pointer-events-none opacity-15 blur-[120px]"
        style={{
          background: 'radial-gradient(circle, rgba(0, 240, 255, 0.25) 0%, rgba(255, 0, 0, 0.15) 50%, transparent 80%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div
          ref={ref}
          className={`flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-12 motion-base ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-200'
          }`}
        >
          <div className="space-y-3 max-w-2xl">
            <Badge variant="highlight" className="w-fit">
              <span>PET PROJECTS & HOBBY LAB</span>
            </Badge>
            <h2 className="heading-3 text-white tracking-tight">
              Hobby Projects, Cloud Academy & Hardware Lab
            </h2>
            <p className="body-3 text-[#A1A1A1]">
              A creative showcase reel of my weekend engineering projects—spanning YouTube AWS video tutorials, custom ESP32 PCB revisions, step-by-step cloud migration runbooks, and Linux kernel tuning.
            </p>
          </div>

          {/* Stepper Controls & External Blog Link */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 shrink-0">
            {onOpenBlogPage && (
              <button
                onClick={onOpenBlogPage}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-surface-850 hover:bg-surface-800 text-xs font-mono text-[#00f0ff] border border-[#00f0ff]/30 transition-all shadow-sm"
              >
                <BookmarkCheck className="w-3.5 h-3.5" />
                <span>Open Dedicated Blog ↗</span>
              </button>
            )}

            <div className="flex items-center gap-2">
              <button
                onClick={prevSlide}
                aria-label="Previous slide"
                className="w-10 h-10 rounded-full bg-surface-850 hover:bg-surface-800 text-white flex items-center justify-center border border-white/10 hover:border-[#00f0ff]/50 transition-colors shadow-md"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                aria-label="Next slide"
                className="w-10 h-10 rounded-full bg-surface-850 hover:bg-surface-800 text-white flex items-center justify-center border border-white/10 hover:border-[#00f0ff]/50 transition-colors shadow-md"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <span className="font-mono text-xs text-[#888888] px-2">
                {String(activeSlideIdx + 1).padStart(2, '0')} / {String(numProjects).padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-8 overflow-x-auto pb-2 custom-scrollbar">
          {[
            { id: 'all', label: 'All Projects (5)' },
            { id: 'youtube', label: 'YouTube AWS Channel', icon: <YoutubeIcon className="w-3.5 h-3.5 text-[#FF0000]" /> },
            { id: 'hardware', label: 'ESP32 PCB Lab', icon: <Cpu className="w-3.5 h-3.5 text-[#00f0ff]" /> },
            { id: 'guide', label: 'AWS Migration Runbook', icon: <Compass className="w-3.5 h-3.5 text-[#38bdf8]" /> },
            { id: 'sysadmin', label: 'Linux Admin & Tuning', icon: <Terminal className="w-3.5 h-3.5 text-[#34d399]" /> },
            { id: 'software', label: 'Open-Source Daemons', icon: <Code2 className="w-3.5 h-3.5 text-[#a78bfa]" /> },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono tracking-wider uppercase transition-all duration-200 border ${
                activeCategory === cat.id
                  ? 'bg-surface-800 border-[#00f0ff] text-white shadow-md'
                  : 'bg-surface-900/60 border-white/10 text-[#888888] hover:text-white hover:border-white/20'
              }`}
            >
              {cat.icon}
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Main Interactive Slide Showcase Card */}
        {currentProject && (
          <div className="relative w-full bg-surface-900/90 border border-border-strong rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-md overflow-hidden transition-all duration-300">
            {/* Top Glowing Ambient Highlight Line */}
            <div
              className="absolute top-0 left-0 right-0 h-1"
              style={{
                background: `linear-gradient(90deg, transparent, ${currentProject.accentColor}, transparent)`,
              }}
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Project Identity & Metadata */}
              <div className="lg:col-span-5 space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span
                      className="inline-flex items-center gap-1.5 font-mono text-xs px-2.5 py-0.5 rounded-full border font-semibold"
                      style={{
                        borderColor: `${currentProject.accentColor}50`,
                        color: currentProject.accentColor,
                        backgroundColor: `${currentProject.accentColor}15`,
                      }}
                    >
                      {getCategoryIcon(currentProject.type)}
                      <span>{currentProject.badge}</span>
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug">
                    {currentProject.title}
                  </h3>
                  <p className="text-sm sm:text-base text-[#D4D4D8] font-normal leading-relaxed">
                    {currentProject.tagline}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed border-l-2 border-white/10 pl-4 py-1">
                  {currentProject.description}
                </p>

                {/* Key Metrics Strip */}
                <div className="grid grid-cols-3 gap-3 border-y border-white/10 py-4">
                  {currentProject.metrics.map((m, mIdx) => (
                    <div key={mIdx}>
                      <div className="text-lg sm:text-xl font-bold font-mono text-white">
                        {m.value}
                      </div>
                      <div className="text-[10px] font-mono uppercase text-[#888888] mt-0.5">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tags & Action Buttons */}
                <div className="space-y-4 pt-2">
                  <div className="flex flex-wrap gap-1.5">
                    {currentProject.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[11px] font-mono px-2.5 py-0.5 rounded bg-surface-800 text-[#CCCCCC] border border-white/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    {currentProject.links.map((link, lIdx) => (
                      <a
                        key={lIdx}
                        href={link.url}
                        onClick={(e) => {
                          if (link.url === '#/blog' && onOpenBlogPage) {
                            e.preventDefault();
                            onOpenBlogPage();
                          }
                        }}
                        target={link.isExternal ? '_blank' : '_self'}
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider font-semibold transition-all shadow-lg duration-200"
                        style={{
                          backgroundColor: currentProject.accentColor,
                          color: '#000',
                        }}
                      >
                        <span>{link.label}</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    ))}

                    <button
                      onClick={() => {
                        const posts = portfolioConfig.blogPosts || [];
                        if (posts.length > 0) onOpenArticle(posts[0]);
                      }}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-surface-800 hover:bg-surface-750 text-white font-mono text-xs uppercase tracking-wider border border-white/15 transition-colors"
                    >
                      <Layers className="w-3.5 h-3.5 text-[#00f0ff]" />
                      <span>Read Deep-Dive</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column: Custom Interactive Preview Widget tailored to project type */}
              <div className="lg:col-span-7 bg-[#06070a] border border-white/10 rounded-2xl p-5 sm:p-7 shadow-inner overflow-hidden min-h-[420px] flex flex-col justify-between">
                {/* WIDGET 1: YouTube Video Player Preview Mockup */}
                {currentProject.type === 'youtube' && currentProject.media.videoPreview && (
                  <div className="space-y-4">
                    {/* Video Player Frame Mockup */}
                    <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-surface-950 border border-white/15 group shadow-2xl">
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                        style={{
                          backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.85) 100%), url(${currentProject.media.heroImage})`,
                        }}
                      />
                      {/* Play Button Overlay */}
                      <a
                        href={currentProject.media.videoPreview.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        <div className="w-16 h-16 rounded-full bg-[#FF0000] text-white flex items-center justify-center shadow-2xl transition-transform duration-300 group-hover:scale-110">
                          <Play className="w-7 h-7 fill-white ml-1" />
                        </div>
                      </a>

                      {/* Video Meta Badges */}
                      <div className="absolute top-3 left-3 flex items-center gap-2">
                        <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-[#FF0000] text-white uppercase tracking-wider flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                          YOUTUBE TECH UPDATE
                        </span>
                        <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-black/60 text-white backdrop-blur-md">
                          {currentProject.media.videoPreview.views}
                        </span>
                      </div>

                      <div className="absolute bottom-3 right-3 font-mono text-[11px] px-2 py-0.5 rounded bg-black/80 text-white">
                        {currentProject.media.videoPreview.duration}
                      </div>

                      <div className="absolute bottom-3 left-3 right-20 text-left">
                        <p className="text-sm sm:text-base font-bold text-white tracking-tight line-clamp-1 drop-shadow-md">
                          {videoEpisodes[activeVideoEpisodeIdx]?.title || currentProject.media.videoPreview.title}
                        </p>
                      </div>
                    </div>

                    {/* Interactive Episode Selector */}
                    <div className="space-y-2 pt-2">
                      <div className="text-xs font-mono text-[#888888] uppercase tracking-wider flex justify-between items-center">
                        <span>Select Tutorial Video:</span>
                        <span className="text-[#FF0000] font-bold">Latest AWS Cloud Walkthroughs</span>
                      </div>
                      <div className="space-y-1.5">
                        {videoEpisodes.map((ep, eIdx) => (
                          <div
                            key={eIdx}
                            onClick={() => setActiveVideoEpisodeIdx(eIdx)}
                            className={`p-2.5 rounded-xl border text-xs font-mono flex items-center justify-between cursor-pointer transition-all ${
                              activeVideoEpisodeIdx === eIdx
                                ? 'bg-[#FF0000]/15 border-[#FF0000]/50 text-white'
                                : 'bg-surface-850/60 border-white/5 text-[#A1A1A1] hover:bg-surface-800'
                            }`}
                          >
                            <div className="flex items-center gap-2 truncate">
                              <span className="text-[#FF0000] font-bold">0{eIdx + 1}.</span>
                              <span className="truncate">{ep.title}</span>
                            </div>
                            <span className="text-[11px] text-[#888888] shrink-0 ml-2">
                              {ep.duration}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* WIDGET 2: ESP32 Hardware Lab & Board Revision Gallery */}
                {currentProject.type === 'hardware' && currentProject.media.galleryImages && (
                  <div className="space-y-4">
                    {/* Revision Selector Tabs */}
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <div className="flex items-center gap-2">
                        {currentProject.media.galleryImages.map((img, rIdx) => (
                          <button
                            key={rIdx}
                            onClick={() => setActiveEspRevisionIdx(rIdx)}
                            className={`px-3 py-1 rounded-lg font-mono text-xs uppercase tracking-wider transition-all border ${
                              activeEspRevisionIdx === rIdx
                                ? 'bg-[#00f0ff]/20 border-[#00f0ff] text-[#00f0ff] font-bold'
                                : 'bg-surface-850/80 border-white/10 text-[#888888] hover:text-white'
                            }`}
                          >
                            {img.revision}
                          </button>
                        ))}
                      </div>
                      <span className="text-xs font-mono text-[#00f0ff] hidden sm:inline-block">
                        KiCad 8.0 • 0805 SMD
                      </span>
                    </div>

                    {/* Active Board Revision Photo Display */}
                    <div className="relative w-full h-56 sm:h-64 rounded-xl overflow-hidden border border-white/15 bg-surface-950 group">
                      <div
                        className="w-full h-full bg-cover bg-center transition-all duration-300"
                        style={{
                          backgroundImage: `url(${currentProject.media.galleryImages[activeEspRevisionIdx]?.url})`,
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex items-end p-4">
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#00f0ff] text-black font-bold uppercase">
                            {currentProject.media.galleryImages[activeEspRevisionIdx]?.revision}
                          </span>
                          <p className="text-xs sm:text-sm font-semibold text-white drop-shadow">
                            {currentProject.media.galleryImages[activeEspRevisionIdx]?.caption}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Live Hardware Design Notes */}
                    <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                      <div className="bg-surface-850/70 p-2.5 rounded-lg border border-white/5 space-y-1">
                        <span className="text-[#00f0ff] font-bold">Bus Interfaces:</span>
                        <p className="text-[#CCCCCC] text-[11px]">I2C BME280 (0x76) & INA219 Current Shunt</p>
                      </div>
                      <div className="bg-surface-850/70 p-2.5 rounded-lg border border-white/5 space-y-1">
                        <span className="text-[#00f0ff] font-bold">Power Regulation:</span>
                        <p className="text-[#CCCCCC] text-[11px]">Buck-converter 12V → 3.3V (&lt;15mV Ripple)</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* WIDGET 3: Step-by-Step AWS Migration Runbook */}
                {currentProject.type === 'guide' && currentProject.media.guideSteps && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <span className="font-mono text-xs text-[#38bdf8] font-bold flex items-center gap-1.5">
                        <Compass className="w-3.5 h-3.5" />
                        <span>Interactive 4-Phase Roadmap</span>
                      </span>
                      <span className="font-mono text-xs text-[#888888]">
                        Click any phase to preview:
                      </span>
                    </div>

                    {/* Phase Tabs */}
                    <div className="grid grid-cols-4 gap-2">
                      {currentProject.media.guideSteps.map((step, sIdx) => (
                        <button
                          key={sIdx}
                          onClick={() => setActiveMigrationPhaseIdx(sIdx)}
                          className={`p-2 rounded-xl text-center border font-mono text-xs transition-all ${
                            activeMigrationPhaseIdx === sIdx
                              ? 'bg-[#38bdf8]/20 border-[#38bdf8] text-white shadow-md'
                              : 'bg-surface-850/50 border-white/10 text-[#888888] hover:bg-surface-800'
                          }`}
                        >
                          <div className="font-bold text-[#38bdf8]">PHASE {step.stepNumber}</div>
                          <div className="text-[10px] truncate text-[#CCCCCC]">{step.duration}</div>
                        </button>
                      ))}
                    </div>

                    {/* Active Phase Details */}
                    {currentProject.media.guideSteps[activeMigrationPhaseIdx] && (
                      <div className="bg-surface-850/80 border border-white/10 rounded-xl p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold text-white text-sm">
                            {currentProject.media.guideSteps[activeMigrationPhaseIdx].title}
                          </h4>
                          <span className="text-xs font-mono px-2 py-0.5 rounded bg-surface-950 text-[#38bdf8] border border-[#38bdf8]/30">
                            {currentProject.media.guideSteps[activeMigrationPhaseIdx].duration}
                          </span>
                        </div>

                        <div className="space-y-2">
                          {currentProject.media.guideSteps[activeMigrationPhaseIdx].keyTasks.map((task, tIdx) => (
                            <div key={tIdx} className="flex items-start gap-2 text-xs text-[#D1D5DB]">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#38bdf8] shrink-0 mt-0.5" />
                              <span>{task}</span>
                            </div>
                          ))}
                        </div>

                        {currentProject.media.guideSteps[activeMigrationPhaseIdx].command && (
                          <div className="bg-surface-950 p-2.5 rounded-lg border border-white/5 font-mono text-xs text-[#38bdf8] overflow-x-auto">
                            <code>$ {currentProject.media.guideSteps[activeMigrationPhaseIdx].command}</code>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* WIDGET 4: Linux Sysadmin Terminal Simulator */}
                {currentProject.type === 'sysadmin' && currentProject.media.terminalLogs && (
                  <div className="space-y-4">
                    {/* Command Tabs */}
                    <div className="flex items-center gap-2 border-b border-white/10 pb-3 overflow-x-auto">
                      {currentProject.media.terminalLogs.map((log, tIdx) => (
                        <button
                          key={tIdx}
                          onClick={() => setActiveTerminalTabIdx(tIdx)}
                          className={`px-3 py-1 rounded-lg font-mono text-xs transition-all border whitespace-nowrap ${
                            activeTerminalTabIdx === tIdx
                              ? 'bg-[#34d399]/20 border-[#34d399] text-[#34d399] font-bold'
                              : 'bg-surface-850/60 border-white/5 text-[#888888] hover:text-white'
                          }`}
                        >
                          Tab {tIdx + 1}: {log.command.slice(0, 24)}...
                        </button>
                      ))}
                    </div>

                    {/* Terminal Window Box */}
                    <div className="rounded-xl bg-[#030508] border border-white/15 p-4 font-mono text-xs text-white space-y-3 shadow-2xl">
                      <div className="flex items-center justify-between pb-2 border-b border-white/10 opacity-60">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                          <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
                        </div>
                        <span className="text-[11px] text-[#888888]">sysadmin@infra-node-01: ~</span>
                      </div>

                      <div className="text-[#34d399]">
                        $ {currentProject.media.terminalLogs[activeTerminalTabIdx]?.command}
                      </div>

                      <pre className="text-[11px] text-[#A1A1AA] leading-relaxed whitespace-pre-wrap overflow-x-auto bg-surface-950/70 p-3 rounded-lg border border-white/5">
                        {currentProject.media.terminalLogs[activeTerminalTabIdx]?.output}
                      </pre>
                    </div>

                    <div className="text-[11px] font-mono text-[#888888] flex items-center justify-between pt-1">
                      <span>Kernel: Linux 6.8.0-45-generic</span>
                      <span className="text-[#34d399]">BBR Congestion Control: Active</span>
                    </div>
                  </div>
                )}

                {/* WIDGET 5: Software Lab / Open Source Daemons */}
                {currentProject.type === 'software' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <span className="font-mono text-xs text-[#a78bfa] font-bold flex items-center gap-1.5">
                        <GitBranch className="w-3.5 h-3.5" />
                        <span>naditha-infra / homelab-telemetry-daemon</span>
                      </span>
                      <span className="font-mono text-xs px-2 py-0.5 rounded bg-surface-850 text-white border border-white/10">
                        v2.4.0 (Latest)
                      </span>
                    </div>

                    {/* Daemon Spec Dashboard */}
                    <div className="rounded-xl bg-surface-850/80 border border-white/10 p-4 space-y-3 font-mono text-xs">
                      <div className="flex items-center justify-between text-[#888888]">
                        <span>Language: Go 1.23 / Single Static Binary</span>
                        <span className="text-[#34d399]">● Status: Running (PID 1042)</span>
                      </div>

                      <div className="bg-surface-950 p-3 rounded-lg border border-white/5 text-[#a78bfa] overflow-x-auto">
                        <code>{`$ curl -s http://127.0.0.1:9100/metrics | grep node_rack\nnode_rack_ambient_temp_celsius{rack="04"} 21.4\nnode_rack_humidity_ratio{rack="04"} 0.442\nnode_rack_wireguard_handshake_seconds 12`}</code>
                      </div>

                      <div className="grid grid-cols-2 gap-3 pt-2">
                        <div className="p-2.5 rounded bg-surface-950/70 border border-white/5">
                          <span className="text-[#888888] block text-[10px]">Memory Footprint:</span>
                          <span className="text-white font-bold text-sm">8.4 MB RSS</span>
                        </div>
                        <div className="p-2.5 rounded bg-surface-950/70 border border-white/5">
                          <span className="text-[#888888] block text-[10px]">Prometheus Scrapes:</span>
                          <span className="text-white font-bold text-sm">Every 10s</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Bottom Timeline Progress Bar for Slides */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-[#888888]">
                  <span>REEL {String(activeSlideIdx + 1).padStart(2, '0')} / {String(numProjects).padStart(2, '0')}</span>
                  <div className="flex items-center gap-1.5">
                    {filteredProjects.map((_, dotIdx) => (
                      <span
                        key={dotIdx}
                        onClick={() => setActiveSlideIdx(dotIdx)}
                        className={`h-1.5 rounded-full cursor-pointer transition-all ${
                          activeSlideIdx === dotIdx
                            ? 'w-6 bg-[#00f0ff]'
                            : 'w-1.5 bg-white/20 hover:bg-white/40'
                        }`}
                      />
                    ))}
                  </div>
                  <span>Swipe or use ← →</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default HobbyLabSlideshow;
