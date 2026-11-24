import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { AboutMe } from './components/sections/AboutMe';
import { MetricsStrip } from './components/sections/MetricsStrip';
import { TaglineReveal } from './components/sections/TaglineReveal';
import { DomainsShowcase } from './components/sections/DomainsShowcase';
import { HobbyLabSlideshow } from './components/sections/HobbyLabSlideshow';
import { SkillsMatrix } from './components/sections/SkillsMatrix';
import { FAQSection } from './components/sections/FAQSection';
import { ContactSection } from './components/sections/ContactSection';
import { ProjectModal } from './components/ui/ProjectModal';
import { BlogModal } from './components/ui/BlogModal';
import { TerminalModal } from './components/ui/TerminalModal';
import { BlogPage } from './components/pages/BlogPage';
import { Toast } from './components/ui/Toast';
import { ScrollDrone } from './components/3d/ScrollDrone';
import { LanCableVerticalSpine } from './components/network/LanCableVerticalSpine';
import { Terminal as TerminalIcon } from 'lucide-react';
import { ProjectItem, BlogPostItem } from './types';

export const App: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [selectedPost, setSelectedPost] = useState<BlogPostItem | null>(null);
  const [isBlogPageOpen, setIsBlogPageOpen] = useState<boolean>(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    const handleGlobalKeys = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsTerminalOpen((prev) => !prev);
      } else if (e.key === '`' && !(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)) {
        e.preventDefault();
        setIsTerminalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleGlobalKeys);
    return () => window.removeEventListener('keydown', handleGlobalKeys);
  }, []);

  useEffect(() => {
    const handleHash = () => {
      setIsBlogPageOpen(window.location.hash === '#/blog');
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleContactClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenBlog = () => {
    window.location.hash = '#/blog';
    setIsBlogPageOpen(true);
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  if (isBlogPageOpen) {
    return (
      <div className="min-h-screen bg-surface-950 text-[#EDEDED] font-sans selection:bg-surface-700 selection:text-white flex flex-col">
        <BlogPage
          onBackToHome={() => {
            window.location.hash = '';
            setIsBlogPageOpen(false);
          }}
          onSelectArticle={(post) => setSelectedPost(post)}
        />
        <BlogModal
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
        />
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
        <TerminalModal
          isOpen={isTerminalOpen}
          onClose={() => setIsTerminalOpen(false)}
          onSelectProject={(project) => setSelectedProject(project)}
          onSelectArticle={(post) => setSelectedPost(post)}
          onToast={showToast}
        />
        <button
          onClick={() => setIsTerminalOpen(true)}
          className="fixed bottom-6 left-6 z-40 hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-900/90 hover:bg-surface-850 border border-white/10 hover:border-[#00f0ff]/50 backdrop-blur-md text-xs font-mono text-white/90 shadow-2xl transition-all duration-200 group"
          aria-label="Open Systems CLI Terminal"
        >
          <TerminalIcon className="w-3.5 h-3.5 text-[#00f0ff] group-hover:animate-pulse" />
          <span>CLI Shell</span>
          <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-[10px] text-white/60 font-mono">Ctrl+K</kbd>
        </button>
        <Toast message={toastMessage} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-950 text-[#EDEDED] font-sans selection:bg-surface-700 selection:text-white flex flex-col">
      {/* Scroll-Driven 3D Sci-Fi Telemetry Drone */}
      <ScrollDrone />

      {/* Floating Blurred Navigation Bar */}
      <Navbar onContactClick={handleContactClick} onBlogClick={handleOpenBlog} />

      {/* Main Semantic Landmark */}
      <main id="main-content" className="flex-1">
        {/* 1. Immersive Video Background Hero Section */}
        <Hero onContactClick={handleContactClick} onBlogClick={handleOpenBlog} />

        {/* 2. Personal Story & Home Lab Setup */}
        <AboutMe />

        {/* 3. Verified Performance & Track Record */}
        <MetricsStrip />

        {/* 4. Mandatory Tagline Word Reveal Section (Rule B11) */}
        <TaglineReveal />

        {/* 5. Personal Projects & Hands On Work */}
        <DomainsShowcase onSelectProject={(project) => setSelectedProject(project)} />

        {/* 6. Hobby Projects, Cloud Academy & Hardware Lab (Creative Slideshow) */}
        <HobbyLabSlideshow
          onOpenArticle={(post) => setSelectedPost(post)}
          onOpenBlogPage={() => {
            window.location.hash = '#/blog';
            setIsBlogPageOpen(true);
          }}
        />

        {/* 8. Technical Skills & Systems Matrix */}
        <SkillsMatrix />

        {/* 9. Frequently Asked Questions (First Person) */}
        <FAQSection />

        {/* 10. Direct Contact & Connect Hub */}
        <ContactSection onCopySuccess={showToast} />
      </main>

      {/* Semantic Footer */}
      <Footer />

      {/* Architecture Deep Dive Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Technical Blog Field Note Modal */}
      <BlogModal
        post={selectedPost}
        onClose={() => setSelectedPost(null)}
      />

      {/* Systems Interactive CLI Terminal Modal */}
      <TerminalModal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        onSelectProject={(project) => setSelectedProject(project)}
        onSelectArticle={(post) => setSelectedPost(post)}
        onToast={showToast}
      />

      {/* Floating CLI Terminal Trigger Button */}
      <button
        onClick={() => setIsTerminalOpen(true)}
        className="fixed bottom-6 left-6 z-40 hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-900/90 hover:bg-surface-850 border border-white/10 hover:border-[#00f0ff]/50 backdrop-blur-md text-xs font-mono text-white/90 shadow-2xl transition-all duration-200 group"
        aria-label="Open Systems CLI Terminal"
      >
        <TerminalIcon className="w-3.5 h-3.5 text-[#00f0ff] group-hover:animate-pulse" />
        <span>CLI Shell</span>
        <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-[10px] text-white/60 font-mono">Ctrl+K</kbd>
      </button>

      {/* Interactive Vertical LAN Cable Spine (Landing Page to Others) */}
      <LanCableVerticalSpine />

      {/* Calm Status Feedback Toast */}
      <Toast message={toastMessage} />
    </div>
  );
};

export default App;
