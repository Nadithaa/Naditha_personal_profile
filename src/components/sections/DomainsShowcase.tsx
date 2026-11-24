import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Cloud, 
  Boxes, 
  ShieldCheck, 
  Server, 
  Cpu, 
  ArrowUpRight, 
  Code2,
  ChevronLeft,
  ChevronRight,
  Maximize2
} from 'lucide-react';
import { portfolioConfig } from '../../data/portfolio.config';
import { DomainKey, ProjectItem } from '../../types';
import { Badge } from '../ui/Badge';
import { useScrollReveal } from '../../hooks/useScrollReveal';

interface DomainsShowcaseProps {
  onSelectProject: (project: ProjectItem) => void;
}

// Helper: smoothstep for mathematical transitions
const smoothstep = (x: number): number => {
  const t = Math.max(0, Math.min(1, x));
  return t * t * (3 - 2 * t);
};

export const DomainsShowcase: React.FC<DomainsShowcaseProps> = ({ onSelectProject }) => {
  const [selectedDomain, setSelectedDomain] = useState<DomainKey | 'all'>('all');
  const [activeTapeIdx, setActiveTapeIdx] = useState<number>(0);
  const { ref, isVisible } = useScrollReveal();
  const containerRef = useRef<HTMLDivElement>(null);

  // Domain Icons
  const domainIcons: Record<DomainKey, React.ReactNode> = {
    cloud: <Cloud className="w-3.5 h-3.5" />,
    cicd: <Boxes className="w-3.5 h-3.5" />,
    networking: <ShieldCheck className="w-3.5 h-3.5" />,
    virtualization: <Server className="w-3.5 h-3.5" />,
    hardware: <Cpu className="w-3.5 h-3.5" />,
  };

  const domainColors: Record<DomainKey, string> = {
    cloud: '#00f0ff',
    cicd: '#38bdf8',
    networking: '#34d399',
    virtualization: '#a78bfa',
    hardware: '#fbbf24',
  };

  // Filtered project list
  const filteredProjects = selectedDomain === 'all'
    ? portfolioConfig.projects
    : portfolioConfig.projects.filter((p) => p.domain === selectedDomain);

  const numProjects = filteredProjects.length;

  // Spring animation state for 3D curved shelf
  // s = current continuous floating position, T = target integer index
  const sRef = useRef<number>(0);
  const targetRef = useRef<number>(0);
  const isDraggingRef = useRef<boolean>(false);
  const startXRef = useRef<number>(0);
  const startTargetRef = useRef<number>(0);
  const hasMovedRef = useRef<boolean>(false);
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const tiltRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // DOM node references for 3D transforms
  const tapeElsRef = useRef<(HTMLDivElement | null)[]>([]);
  const timelineDotRef = useRef<HTMLDivElement>(null);

  // Step to target index
  const stepTo = useCallback((newTarget: number) => {
    targetRef.current = newTarget;
  }, []);

  const nextTape = () => {
    stepTo(targetRef.current + 1);
  };

  const prevTape = () => {
    stepTo(targetRef.current - 1);
  };

  // Precomputed screen x mapping (XS integral from the Vasari prompt)
  const U_REF = 480;
  const XS: number[] = [];
  let accum = 0;
  for (let u = 0; u <= 3 * U_REF; u += 2) {
    accum += 2 / (1 + Math.pow(u / U_REF, 1.6));
    XS.push(accum);
  }
  const getScreenX = (u: number): number => {
    const absU = Math.abs(u);
    const idx = Math.min(Math.floor(absU / 2), XS.length - 1);
    return Math.sign(u) * XS[idx];
  };

  // Reset target on domain change
  useEffect(() => {
    sRef.current = 0;
    targetRef.current = 0;
    setActiveTapeIdx(0);
  }, [selectedDomain]);

  // Main 60 FPS requestAnimationFrame loop for the Curved 3D Arc
  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();

    const loop = (now: number) => {
      animId = requestAnimationFrame(loop);
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      // Spring physics
      const k = isDraggingRef.current ? 18 : 6.2;
      sRef.current += (targetRef.current - sRef.current) * (1 - Math.exp(-k * dt));
      const s = sRef.current;

      // Determine active project index (modulo wrapped)
      const currentRounded = Math.round(s);
      const activeIdx = ((currentRounded % numProjects) + numProjects) % numProjects;
      setActiveTapeIdx(activeIdx);

      // Measure dimensions
      const stageW = containerRef.current?.offsetWidth || window.innerWidth;
      const isMobile = stageW < 768;
      const H = isMobile ? Math.min(stageW * 0.72, 340) : Math.min(window.innerHeight * 0.44, 420);
      const ws = H * (138 / 840); // spine width (~65px)
      const d = H * (470 / 900);  // cover width (~220px)
      const gap = H * 0.032;
      const U = isMobile ? H * 1.05 : H * 1.35;
      const P = 1400; // CSS perspective

      // Cover interactive 3D tilt towards mouse cursor
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const isSettled = Math.abs(targetRef.current - s) < 0.35;
      const targetTiltY = isSettled ? (mx / (stageW * 0.5)) * 9 : 0;
      const targetTiltX = isSettled ? (-my / (H * 0.5)) * 6 : 0;

      tiltRef.current.x += (targetTiltX - tiltRef.current.x) * (1 - Math.exp(-8 * dt));
      tiltRef.current.y += (targetTiltY - tiltRef.current.y) * (1 - Math.exp(-8 * dt));

      // Loop through tapes and apply 3D curved bowl transforms
      // Render 3 virtual repetitions so shelf wraps seamlessly
      const totalTapes = tapeElsRef.current.length;
      for (let i = 0; i < totalTapes; i++) {
        const el = tapeElsRef.current[i];
        if (!el) continue;

        // Relative index r from s
        let r = i - s;
        // Wrap r into [-totalTapes/2, totalTapes/2)
        while (r < -totalTapes / 2) r += totalTapes;
        while (r >= totalTapes / 2) r -= totalTapes;

        // Smooth expansion B(r) so open center cover pushes neighbours apart
        const B = Math.abs(r) < 1 ? (r + Math.sin(Math.PI * r) / Math.PI) / 2 : (r > 0 ? 0.5 : -0.5);
        const u = r * (ws + gap) + (d - ws + 1.4 * gap) * B;

        // Hide tapes that recede past field of view
        if (Math.abs(u) > U * 1.95) {
          el.style.display = 'none';
          continue;
        }
        el.style.display = 'block';

        // Scale falloff with depth
        const sc = 1 / (1 + Math.pow(Math.abs(u) / U, 1.6));
        const kDepth = 1 / sc;

        // Active cover rotation factor (0 = spine, 1 = front cover)
        const o = smoothstep(Math.max(0, 1 - Math.abs(r)));

        // 3D coordinates
        const z = P * (1 - kDepth) + o * H * 0.12;
        const x = getScreenX(u) * kDepth;
        // Far items sink slightly to create the curved bowl aesthetic
        const y = (H * 0.5 * (1 - sc) * 0.44 + o * H * 0.012) * kDepth;

        // 3D rotations: spines angle towards center, active tape turns 90 deg to face camera
        const rotateY = Math.sign(u) * Math.min(1, Math.abs(u) / U) * 26 * (1 - o) - 90 * o + tiltRef.current.y * o;
        const rotateX = tiltRef.current.x * o;

        el.style.transform = `translate3d(${x}px, ${y}px, ${z}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        el.style.zIndex = String(Math.round(3000 + z));

        // Depth shading: far spines darken into shadows
        const spineShade = Math.min(0.65, o * 0.55 + (1 - sc) * 0.38);
        const coverShade = (1 - o) * 0.85;

        el.style.setProperty('--spine-shade', String(spineShade));
        el.style.setProperty('--cover-shade', String(coverShade));
      }

      // Update Timeline Scrubber dot position smoothly
      if (timelineDotRef.current && numProjects > 1) {
        const normalizedS = ((s % numProjects) + numProjects) % numProjects;
        const pct = (normalizedS / (numProjects - 1)) * 100;
        timelineDotRef.current.style.left = `${Math.min(Math.max(pct, 0), 100)}%`;
      }
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [numProjects]);

  // Pointer Drag Handling (Mouse & Touch)
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    startXRef.current = e.clientX;
    startTargetRef.current = targetRef.current;
    hasMovedRef.current = false;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      mouseRef.current.x = e.clientX - (rect.left + rect.width / 2);
      mouseRef.current.y = e.clientY - (rect.top + rect.height / 2);
    }

    if (isDraggingRef.current) {
      const dx = e.clientX - startXRef.current;
      if (Math.abs(dx) > 4) {
        hasMovedRef.current = true;
      }
      const H = 380;
      const ws = H * (138 / 840);
      targetRef.current = startTargetRef.current - dx / (ws + 12);
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      targetRef.current = Math.round(targetRef.current);
      (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
    }
  };

  // Mouse wheel horizontal scroll scrub
  const wheelTimeoutRef = useRef<number | null>(null);
  const handleWheel = (e: React.WheelEvent) => {
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    if (Math.abs(delta) > 5) {
      const H = 380;
      const ws = H * (138 / 840);
      targetRef.current += (delta / (ws + 12)) * 0.45;

      if (wheelTimeoutRef.current) window.clearTimeout(wheelTimeoutRef.current);
      wheelTimeoutRef.current = window.setTimeout(() => {
        targetRef.current = Math.round(targetRef.current);
      }, 140);
    }
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      nextTape();
    } else if (e.key === 'ArrowLeft') {
      prevTape();
    } else if (e.key === 'Enter') {
      const activeP = filteredProjects[activeTapeIdx];
      if (activeP) onSelectProject(activeP);
    }
  };

  // Handle clicking a tape
  const handleTapeClick = (tapeIdx: number) => {
    if (hasMovedRef.current) return;

    if (tapeIdx === activeTapeIdx) {
      // Active center tape clicked: Open detailed Architecture Modal!
      const p = filteredProjects[activeTapeIdx];
      if (p) onSelectProject(p);
    } else {
      // Side spine clicked: Smoothly glide it to center
      const s = sRef.current;
      let diff = tapeIdx - (((Math.round(s) % numProjects) + numProjects) % numProjects);
      if (diff > numProjects / 2) diff -= numProjects;
      if (diff < -numProjects / 2) diff += numProjects;
      stepTo(Math.round(s) + diff);
    }
  };

  const activeProject = filteredProjects[activeTapeIdx] || filteredProjects[0];

  return (
    <section
      id="projects"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      className="py-700 sm:py-800 bg-[#0c0d11] border-b border-border-subtle relative overflow-hidden select-none outline-none"
    >
      {/* Background Halftone Watermark Typography (Leon Vasari Aesthetic Adapted to Systems Architecture) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-25 flex justify-between items-center px-4 md:px-12 z-0">
        <span
          className="font-mono text-[12vw] font-black text-transparent tracking-tighter"
          style={{
            WebkitTextStroke: '1px rgba(0,240,255,0.18)',
            backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(0,240,255,0.25) 0 32%, transparent 36%)',
            backgroundSize: '4px 4px',
            WebkitBackgroundClip: 'text',
          }}
        >
          SYS // 01
        </span>
        <span
          className="font-mono text-[12vw] font-black text-transparent tracking-tighter"
          style={{
            WebkitTextStroke: '1px rgba(0,240,255,0.18)',
            backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(0,240,255,0.25) 0 32%, transparent 36%)',
            backgroundSize: '4px 4px',
            WebkitBackgroundClip: 'text',
          }}
        >
          ARCHIVE
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-200 sm:px-400 relative z-10">
        {/* Section Header & Slide Navigation Controls */}
        <div
          ref={ref}
          className={`flex flex-col md:flex-row md:items-end justify-between gap-400 mb-400 motion-base ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-200'
          }`}
        >
          <div className="max-w-[680px] space-y-100">
            <Badge variant="highlight" className="mb-50">
              3D Systems Case Archive
            </Badge>
            <h2 className="heading-3 text-white">
              Projects I have engineered and shipped
            </h2>
            <p className="body-3 text-[#A1A1A1]">
              Curved 3D production architecture archive. Click any side spine to glide it to center, or inspect the front case for system blueprints.
            </p>
          </div>

          {/* Controls: Prev / Next Buttons & Active Project Counter */}
          <div className="flex items-center gap-3 shrink-0 self-start md:self-auto">
            <div className="font-mono text-xs text-[#888888] bg-surface-850 border border-border-subtle px-3 py-1.5 rounded-lg">
              <span className="text-[#00f0ff] font-bold">
                {String(activeTapeIdx + 1).padStart(2, '0')}
              </span>
              <span className="mx-1 text-white/30">/</span>
              <span>{String(numProjects).padStart(2, '0')}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={prevTape}
                aria-label="Previous project in archive"
                className="w-10 h-10 rounded-xl border border-border-subtle bg-surface-850 hover:bg-surface-800 hover:border-[#00f0ff]/50 text-white flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#00f0ff]"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={nextTape}
                aria-label="Next project in archive"
                className="w-10 h-10 rounded-xl border border-border-subtle bg-surface-850 hover:bg-surface-800 hover:border-[#00f0ff]/50 text-white flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#00f0ff]"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Domain Filter Tabs */}
        <div className="flex items-center gap-50 overflow-x-auto pb-100 mb-500 no-scrollbar">
          <button
            onClick={() => setSelectedDomain('all')}
            className={`caption-1 px-100 py-75 rounded-lg border font-mono transition-colors whitespace-nowrap focus:ring-2 focus:ring-white focus:outline-none ${
              selectedDomain === 'all'
                ? 'bg-surface-800 text-white border-border-strong font-semibold'
                : 'bg-surface-950 text-[#888888] border-border-subtle hover:text-white hover:bg-surface-850'
            }`}
          >
            All Archives ({portfolioConfig.projects.length})
          </button>

          {portfolioConfig.domains.map((d) => (
            <button
              key={d.key}
              onClick={() => setSelectedDomain(d.key)}
              className={`caption-1 px-100 py-75 rounded-lg border font-mono transition-colors whitespace-nowrap flex items-center gap-50 focus:ring-2 focus:ring-white focus:outline-none ${
                selectedDomain === d.key
                  ? 'bg-surface-800 text-white border-border-strong font-semibold'
                  : 'bg-surface-950 text-[#888888] border-border-subtle hover:text-white hover:bg-surface-850'
              }`}
            >
              <span className="text-[#EDEDED]">{domainIcons[d.key]}</span>
              <span>{d.label}</span>
            </button>
          ))}
        </div>

        {/* 3D CURVED SHELF STAGE */}
        <div
          ref={containerRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onWheel={handleWheel}
          className="relative w-full h-[440px] sm:h-[480px] md:h-[520px] flex items-center justify-center cursor-grab active:cursor-grabbing touch-pan-y"
          style={{
            perspective: '1400px',
            perspectiveOrigin: '50% 50%',
          }}
        >
          {/* Floor Shadow beneath active cartridge */}
          <div
            className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[85%] max-w-[680px] h-12 pointer-events-none"
            style={{
              background: 'radial-gradient(50% 50% at 50% 50%, rgba(0,240,255,0.12), rgba(0,0,0,0.7) 40%, transparent 75%)',
            }}
          />

          {/* Central 3D Stage (Zero-size anchor with preserve-3d) */}
          <div
            className="relative w-0 h-0"
            style={{
              transformStyle: 'preserve-3d',
            }}
          >
            {filteredProjects.map((project, idx) => {
              const domColor = domainColors[project.domain] || '#00f0ff';
              const pIdNum = String(idx + 1).padStart(2, '0');

              return (
                <div
                  key={project.id}
                  ref={(el) => {
                    tapeElsRef.current[idx] = el;
                  }}
                  onClick={() => handleTapeClick(idx)}
                  className="absolute top-0 left-0 w-0 h-0 transition-opacity duration-300"
                  style={{
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* FACE 1: THE SPINDLE / SPINAL EDGE (.sp) */}
                  <div
                    className="absolute top-[-180px] left-[-34px] w-[68px] h-[360px] rounded-sm bg-gradient-to-b from-[#181920] via-[#242630] to-[#16171d] border-y border-x border-white/15 shadow-2xl flex flex-col justify-between p-2 cursor-pointer group"
                    style={{
                      transform: 'translateZ(135px)',
                      backfaceVisibility: 'hidden',
                    }}
                  >
                    {/* Dark Depth Shading Overlay */}
                    <div
                      className="absolute inset-0 bg-black pointer-events-none rounded-sm transition-opacity"
                      style={{ opacity: 'var(--spine-shade, 0)' }}
                    />

                    {/* Top Spine Header: Domain LED + Tape Number */}
                    <div className="relative z-10 flex flex-col items-center gap-1 pt-1 border-b border-white/10 pb-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full shadow-[0_0_8px_currentColor] animate-pulse"
                        style={{ backgroundColor: domColor, color: domColor }}
                      />
                      <span className="font-mono text-[9px] font-bold text-white tracking-widest">
                        {pIdNum}
                      </span>
                    </div>

                    {/* Middle: Vertical Title Running Down the Spine */}
                    <div className="relative z-10 flex-1 flex items-center justify-center py-2 overflow-hidden">
                      <span
                        className="font-mono text-[10px] font-semibold text-[#D4D4D8] uppercase tracking-widest whitespace-nowrap opacity-85 group-hover:text-white group-hover:opacity-100 transition-colors"
                        style={{
                          writingMode: 'vertical-rl',
                          transform: 'rotate(180deg)',
                        }}
                      >
                        {project.title.slice(0, 32)}
                      </span>
                    </div>

                    {/* Bottom Spine Terminal: Domain Label + Production Tag */}
                    <div className="relative z-10 flex flex-col items-center gap-1 border-t border-white/10 pt-2 pb-1">
                      <span className="font-mono text-[8px] text-[#888888] uppercase">
                        {project.domain.slice(0, 4)}
                      </span>
                      <span className="w-full text-center font-mono text-[7px] text-[#00f0ff] bg-black/60 py-0.5 rounded border border-[#00f0ff]/30">
                        PROD
                      </span>
                    </div>
                  </div>

                  {/* FACE 2: THE ACTIVE FRONT COVER (.cv) Turned 90 deg */}
                  <div
                    className="absolute top-[-180px] left-[-135px] w-[270px] h-[360px] rounded-2xl bg-gradient-to-b from-[#16171d]/95 via-[#1a1c24]/95 to-[#121318]/95 border border-[#00f0ff]/40 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.9),0_0_30px_rgba(0,240,255,0.18)] p-4 flex flex-col justify-between cursor-pointer group backdrop-blur-md"
                    style={{
                      transform: 'rotateY(90deg) translateZ(34px)',
                      backfaceVisibility: 'hidden',
                    }}
                  >
                    {/* Shading overlay when transitioning */}
                    <div
                      className="absolute inset-0 bg-black pointer-events-none rounded-2xl transition-opacity"
                      style={{ opacity: 'var(--cover-shade, 0)' }}
                    />

                    {/* Top Ambient Glow Bar */}
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00f0ff] to-transparent rounded-t-2xl" />

                    <div>
                      {/* Domain Badge & File Tag */}
                      <div className="flex items-center justify-between gap-1 mb-2">
                        <span
                          className="inline-flex items-center gap-1 text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-black/60 border"
                          style={{ borderColor: `${domColor}50`, color: domColor }}
                        >
                          {domainIcons[project.domain]}
                          <span className="uppercase">{project.domain}</span>
                        </span>

                        {project.codeSnippet && (
                          <span className="inline-flex items-center gap-1 font-mono text-[9px] text-[#888888] bg-black/40 px-1.5 py-0.5 rounded border border-white/10">
                            <Code2 className="w-3 h-3 text-[#00f0ff]" />
                            <span>{project.codeSnippet.filename}</span>
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="title-2 text-white font-bold leading-tight group-hover:text-[#00f0ff] transition-colors mb-1.5">
                        {project.title}
                      </h3>

                      {/* Subtitle */}
                      <p className="caption-4 text-[#888888] line-clamp-2 mb-2.5">
                        {project.subtitle}
                      </p>

                      {/* Role Pill */}
                      <div className="mb-3">
                        <span className="font-mono text-[9.5px] text-[#4ADE80] bg-[#4ADE80]/10 border border-[#4ADE80]/30 px-2 py-0.5 rounded inline-flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80] animate-pulse" />
                          {project.role}
                        </span>
                      </div>

                      {/* Metrics 2-column Grid */}
                      <div className="grid grid-cols-2 gap-1.5 mb-2">
                        {project.metrics.slice(0, 2).map((m, mIdx) => (
                          <div
                            key={mIdx}
                            className="bg-black/50 border border-white/10 p-1.5 rounded-lg text-left"
                          >
                            <div className="font-mono text-[8px] text-[#888888] uppercase truncate">{m.label}</div>
                            <div className="font-mono text-xs font-bold text-white mt-0.5 truncate">{m.value}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Card Footer: Tech tags + Inspect Action */}
                    <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {project.techStack.slice(0, 2).map((t, tIdx) => (
                          <span
                            key={tIdx}
                            className="font-mono text-[8.5px] text-[#A1A1AA] bg-black/60 px-1.5 py-0.5 rounded border border-white/5"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      <div className="inline-flex items-center gap-1 text-[11px] font-mono text-[#00f0ff] group-hover:translate-x-1 transition-transform">
                        <span className="font-semibold">INSPECT</span>
                        <Maximize2 className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Floating Active Caption under Center Cover */}
        <div className="mt-4 flex flex-col items-center text-center max-w-xl mx-auto px-4">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-ping" />
            <span className="font-mono text-xs text-[#00f0ff] font-semibold tracking-wider uppercase">
              {activeProject?.domain} ARCHITECTURE // CASE #{String(activeTapeIdx + 1).padStart(2, '0')}
            </span>
          </div>

          <h3 className="title-1 sm:heading-4 text-white font-bold tracking-tight mb-2">
            {activeProject?.title}
          </h3>

          <p className="body-4 text-[#A1A1A1] max-w-lg mb-4 line-clamp-2">
            {activeProject?.summary}
          </p>

          <button
            type="button"
            onClick={() => onSelectProject(activeProject)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-600/20 hover:from-cyan-500/30 hover:to-blue-600/30 border border-[#00f0ff]/50 text-white font-mono text-xs tracking-wider uppercase shadow-[0_0_20px_rgba(0,240,255,0.2)] hover:shadow-[0_0_30px_rgba(0,240,255,0.4)] transition-all duration-300 group"
          >
            <span>Inspect Production Architecture</span>
            <ArrowUpRight className="w-4 h-4 text-[#00f0ff] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* BOTTOM TIMELINE / SYSTEMS INDEX SCRUBBER */}
        <div className="mt-8 pt-4 border-t border-border-subtle/80 flex flex-col gap-2">
          <div className="flex items-center justify-between font-mono text-[10px] text-[#717171]">
            <span>SYSTEM ARCHIVE // 2021 — 2026</span>
            <span className="text-[#00f0ff]">SCRUB OR DRAG TO ROTATE 3D SHELF</span>
            <span>INDEX 01 — {String(numProjects).padStart(2, '0')}</span>
          </div>

          {/* Timeline Bar Track */}
          <div
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickX = e.clientX - rect.left;
              const pct = clickX / rect.width;
              stepTo(Math.round(pct * (numProjects - 1)));
            }}
            className="relative w-full h-8 flex items-center cursor-pointer group py-2"
          >
            {/* Base Horizontal Rule */}
            <div className="w-full h-[1.5px] bg-white/15 group-hover:bg-white/30 transition-colors" />

            {/* Individual Project Ticks */}
            {filteredProjects.map((_, pIdx) => {
              const tickPct = (pIdx / Math.max(1, numProjects - 1)) * 100;
              const isCurr = activeTapeIdx === pIdx;

              return (
                <div
                  key={pIdx}
                  className="absolute -translate-x-1/2 flex flex-col items-center pointer-events-none"
                  style={{ left: `${tickPct}%` }}
                >
                  <div
                    className={`w-[1.5px] transition-all duration-200 ${
                      isCurr ? 'h-4 bg-[#00f0ff] shadow-[0_0_6px_#00f0ff]' : 'h-2 bg-white/20'
                    }`}
                  />
                  <span
                    className={`font-mono text-[8px] mt-1 transition-colors ${
                      isCurr ? 'text-[#00f0ff] font-bold' : 'text-white/30'
                    }`}
                  >
                    {String(pIdx + 1).padStart(2, '0')}
                  </span>
                </div>
              );
            })}

            {/* Active Gliding Dot Tracker */}
            <div
              ref={timelineDotRef}
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-b from-[#00f0ff] to-[#0284c7] border border-white shadow-[0_0_12px_#00f0ff] flex items-center justify-center pointer-events-none transition-transform"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-black" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DomainsShowcase;
