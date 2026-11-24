import React, { useEffect, useRef, useState } from 'react';
import { portfolioConfig } from '../../data/portfolio.config';

interface HeroProps {
  onContactClick: () => void;
  onBlogClick?: () => void;
}

const ROTATING_DISTRIBUTED_TERMS = [
  'cloud computing',
  'network firewalls',
  'cloud security',
  'Linux servers',
  'Docker containers',
  'Kubernetes',
  'system backups',
  'AWS architecture',
  'VPN networks',
  'high availability',
  'virtual machines',
  'DevOps automation',
  'firewall rules',
  'cloud migration',
  'network routing',
  'site reliability',
  'load balancing',
  'data security',
  'disaster recovery',
  'Terraform code',
  'server hardware',
  'monitoring tools',
  'cybersecurity',
  'cloud storage',
  'speed & uptime',
  'zero trust',
  'serverless apps',
  'API gateways',
  'microservices',
  'DNS management',
  'cost optimization',
  'CI/CD pipelines',
  'network traffic',
  'system updates',
  'server clusters',
  'data storage',
  'remote access',
  'IoT hardware',
  'automation scripts',
  'cloud networks',
  'incident response',
  'database scaling',
  'IT operations',
  'Wi-Fi & LAN setups',
  'hardware servers',
  'access control',
  'edge networks',
  'system monitoring',
  'performance tuning',
  'modern infrastructure',
];

const shuffleArray = (arr: string[]): string[] => {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};

const ArrowIcon = () => (
  <svg className="arw" viewBox="0 0 12 10" fill="none" aria-hidden="true">
    <path
      d="M0.8 5h10M7.1 1.4 10.9 5l-3.8 3.6"
      stroke="currentColor"
      strokeWidth="1.35"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Hero: React.FC<HeroProps> = ({ onContactClick, onBlogClick }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const videoARef = useRef<HTMLVideoElement>(null);
  const videoBRef = useRef<HTMLVideoElement>(null);

  // Video Background Crossfade Engine (Section 10.C)
  useEffect(() => {
    const videoA = videoARef.current;
    const videoB = videoBRef.current;
    if (!videoA || !videoB) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      videoA.removeAttribute('autoplay');
      videoA.pause();
      videoB.pause();
      try {
        videoA.currentTime = 0;
      } catch {
        // Ignore currentTime error if video not loaded
      }
      return;
    }

    const FADE = 0.9;
    let cur = videoA;
    let nxt = videoB;
    let swapping = false;

    const play = (v: HTMLVideoElement) => {
      v.play().catch(() => {});
    };

    play(videoA);

    const tick = () => {
      if (swapping || !cur.duration) return;
      if (cur.duration - cur.currentTime > FADE) return;

      swapping = true;
      const out = cur;
      nxt.currentTime = 0;
      play(nxt);
      nxt.classList.add('is-active');
      out.classList.remove('is-active');

      cur = nxt;
      nxt = out;

      setTimeout(() => {
        out.pause();
        out.currentTime = 0;
        swapping = false;
      }, FADE * 1000 + 100);
    };

    videoA.addEventListener('timeupdate', tick);
    videoB.addEventListener('timeupdate', tick);

    return () => {
      videoA.removeEventListener('timeupdate', tick);
      videoB.removeEventListener('timeupdate', tick);
    };
  }, []);

  // Entrance Sequence Engine (Section 9 & Section 10.A)
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return;
    }

    const docEl = document.documentElement;
    docEl.classList.add('anim');

    let cleaned = false;
    let safetyTimer: ReturnType<typeof setTimeout>;

    const clean = () => {
      if (cleaned) return;
      cleaned = true;
      clearTimeout(safetyTimer);
      docEl.classList.remove('anim', 'go');
    };

    const start = () => {
      docEl.classList.add('go');

      const onEnd = (e: AnimationEvent) => {
        if (
          e.animationName === 'pillIn' &&
          (e.target as HTMLElement)?.classList.contains('pjs-btn-ghost')
        ) {
          clean();
          docEl.removeEventListener('animationend', onEnd, true);
        }
      };

      docEl.addEventListener('animationend', onEnd, true);
      safetyTimer = setTimeout(clean, 2600);
    };

    const bootTimer = setTimeout(start, 900);

    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        clearTimeout(bootTimer);
        start();
      }).catch(() => {
        start();
      });
    } else {
      start();
    }

    return () => {
      clean();
    };
  }, []);

  // Burger Menu Keyboard Handling (Section 10.B)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menuOpen) {
        setMenuOpen(false);
        const burger = document.getElementById('pjs-burger');
        if (burger) (burger as HTMLElement).focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  // Typewriter Engine for 50 Rotating Distributed Systems, Firewalls & Cloud Keywords
  const [termQueue, setTermQueue] = useState<string[]>(() => {
    const first = ROTATING_DISTRIBUTED_TERMS[0];
    const rest = ROTATING_DISTRIBUTED_TERMS.slice(1);
    return [first, ...shuffleArray(rest)];
  });
  const [queueIdx, setQueueIdx] = useState(0);
  const [displayedText, setDisplayedText] = useState(ROTATING_DISTRIBUTED_TERMS[0]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isBlinking, setIsBlinking] = useState(true);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    let timer: ReturnType<typeof setTimeout>;
    const targetWord = termQueue[queueIdx] || ROTATING_DISTRIBUTED_TERMS[0];

    if (!isDeleting) {
      // Typing phase
      if (displayedText.length < targetWord.length) {
        setIsBlinking(false);
        const typingDelay = 70 + Math.random() * 35; // Keystroke cadence
        timer = setTimeout(() => {
          setDisplayedText(targetWord.slice(0, displayedText.length + 1));
        }, typingDelay);
      } else {
        // Paused at full word: cursor blinks for 2.5 - 3.0 seconds
        setIsBlinking(true);
        timer = setTimeout(() => {
          setIsBlinking(false);
          setIsDeleting(true);
        }, 2800);
      }
    } else {
      // Deleting / Backspacing phase
      if (displayedText.length > 0) {
        setIsBlinking(false);
        const deletingDelay = 38; // Snappy backspacing
        timer = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1));
        }, deletingDelay);
      } else {
        // Paused on empty: pause briefly before typing next word from the 50-word pool
        setIsBlinking(true);
        timer = setTimeout(() => {
          if (queueIdx + 1 < termQueue.length) {
            setQueueIdx(queueIdx + 1);
          } else {
            // All 50 terms shown: re-shuffle the pool without repeating last word
            const newShuffled = shuffleArray(ROTATING_DISTRIBUTED_TERMS);
            if (newShuffled[0] === termQueue[queueIdx]) {
              [newShuffled[0], newShuffled[newShuffled.length - 1]] = [newShuffled[newShuffled.length - 1], newShuffled[0]];
            }
            setTermQueue(newShuffled);
            setQueueIdx(0);
          }
          setIsDeleting(false);
        }, 450);
      }
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, queueIdx, termQueue]);

  return (
    <main className="pjs-hero" id="hero">
      {/* 4. Video Background (exact CloudFront assets from specification) */}
      <div
        className="pjs-bg-canvas"
        role="img"
        aria-label="Stylised globe of Earth rendered as a purple dot matrix against a starfield, slowly rotating"
      >
        <video
          ref={videoARef}
          className="pjs-bg-video is-active"
          id="bgVideoA"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          aria-hidden="true"
          poster="https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/82e7eb75-c65f-490a-99b5-f3d1cad54200.webp"
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260912_104036_bd6924f6-3c8e-417e-8465-6d03c8c2e9e6.mp4"
            type="video/mp4"
          />
        </video>

        <video
          ref={videoBRef}
          className="pjs-bg-video"
          id="bgVideoB"
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          aria-hidden="true"
          poster="https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/82e7eb75-c65f-490a-99b5-f3d1cad54200.webp"
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260912_104036_bd6924f6-3c8e-417e-8465-6d03c8c2e9e6.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      {/* 5. Desktop & Tablet Nav */}
      <header className="pjs-nav">
        <a href="#hero" className="pjs-logo">
          {portfolioConfig.name}
        </a>

        {/* Primary Desktop Nav Links */}
        <nav className="pjs-nav-links" aria-label="Primary">
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#lab">Lab</a>
          <a href="#skills">Skills</a>
          <a href="#faq">FAQ</a>
        </nav>

        {/* Desktop Nav Actions */}
        <div className="pjs-nav-actions">
          {onBlogClick && (
            <button
              type="button"
              onClick={onBlogClick}
              className="pjs-btn pjs-btn-login text-[#00f0ff] border border-[#00f0ff]/30 hover:border-[#00f0ff]/60 hover:bg-[#00f0ff]/10 transition-all font-mono"
            >
              Blog ↗
            </button>
          )}
          <a
            href={portfolioConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            className="pjs-btn pjs-btn-login"
          >
            GitHub
          </a>
          <button
            type="button"
            onClick={onContactClick}
            className="pjs-btn pjs-btn-nav-start"
          >
            <span>Get in Touch</span>
            <ArrowIcon />
          </button>
        </div>

        {/* Mobile/Tablet Burger */}
        <button
          id="pjs-burger"
          className="pjs-burger"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="pjs-menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
        </button>
      </header>

      {/* 7. Mobile Menu Panel */}
      <nav
        className={`pjs-menu ${menuOpen ? 'open' : ''}`}
        id="pjs-menu"
        aria-label="Mobile"
      >
        <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
        <a href="#projects" onClick={() => setMenuOpen(false)}>Projects</a>
        <a href="#lab" onClick={() => setMenuOpen(false)}>Lab</a>
        {onBlogClick && (
          <button
            type="button"
            onClick={() => {
              setMenuOpen(false);
              onBlogClick();
            }}
            className="text-left py-2 font-mono text-sm text-[#00f0ff] hover:text-white transition-colors"
          >
            Dedicated Blog ↗
          </button>
        )}
        <a href="#skills" onClick={() => setMenuOpen(false)}>Skills</a>
        <a href="#faq" onClick={() => setMenuOpen(false)}>FAQ</a>
        <div className="divider"></div>
        <a
          href={portfolioConfig.github}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setMenuOpen(false)}
        >
          GitHub Profile
        </a>
        <button
          className="m-start"
          onClick={() => {
            setMenuOpen(false);
            onContactClick();
          }}
        >
          <span>Get in Touch</span>
          <ArrowIcon />
        </button>
      </nav>

      {/* 6. Hero Inner Content */}
      <div className="pjs-hero-inner">
        <h1>
          <span className="ln">
            <span className="ln-i hero-title-prefix">Let's discuss</span>
          </span>
          <span className="ln">
            <span className="ln-i hero-typewriter-line">
              <span>{displayedText}</span>
              <span
                className={`hero-cursor ${isBlinking ? 'blink' : 'solid'}`}
                aria-hidden="true"
              />
            </span>
          </span>
        </h1>

        <p className="pjs-sub">
          Hands-on systems engineer passionate about infrastructure reliability.<br />
          I bridge physical computer hardware, Hyper-V virtualization, and network firewalls<br />
          with automated AWS cloud deployments.
        </p>

        <div className="pjs-ctas">
          <a href="#projects" className="pjs-btn pjs-btn-lg pjs-btn-primary">
            <span>Explore Work</span>
            <ArrowIcon />
          </a>
          {onBlogClick && (
            <button
              type="button"
              onClick={onBlogClick}
              className="pjs-btn pjs-btn-lg pjs-btn-blog"
            >
              <span>Explore Blog</span>
              <ArrowIcon />
            </button>
          )}
          <button
            type="button"
            onClick={onContactClick}
            className="pjs-btn pjs-btn-lg pjs-btn-ghost"
          >
            <span>Contact Me</span>
            <ArrowIcon />
          </button>
        </div>
      </div>
    </main>
  );
};
