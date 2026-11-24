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
import { BlogPage } from './components/pages/BlogPage';
import { Toast } from './components/ui/Toast';
import { ScrollDrone } from './components/3d/ScrollDrone';
import { LanCableVerticalSpine } from './components/network/LanCableVerticalSpine';
import { ProjectItem, BlogPostItem } from './types';

export const App: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [selectedPost, setSelectedPost] = useState<BlogPostItem | null>(null);
  const [isBlogPageOpen, setIsBlogPageOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

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

      {/* Interactive Vertical LAN Cable Spine (Landing Page to Others) */}
      <LanCableVerticalSpine />

      {/* Calm Status Feedback Toast */}
      <Toast message={toastMessage} />
    </div>
  );
};

export default App;
