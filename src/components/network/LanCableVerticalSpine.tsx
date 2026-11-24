import React, { useEffect, useState, useRef } from 'react';
import { Zap } from 'lucide-react';

export interface PacketSectionNode {
  id: string;
  name: string;
  label: string;
  protocol: string;
}

// Extends specifically from About section down to Get In Touch section
export const PACKET_NODES: PacketSectionNode[] = [
  { id: 'about', name: 'About', label: 'ABOUT', protocol: 'SSH' },
  { id: 'overview', name: 'Tech Stack', label: 'STACK', protocol: 'CLOUD' },
  { id: 'tagline', name: 'Philosophy', label: 'CORE', protocol: 'TLS' },
  { id: 'projects', name: 'Projects', label: 'PROJECTS', protocol: 'K8S' },
  { id: 'lab', name: 'Hobby Lab', label: 'LAB', protocol: 'MQTT' },
  { id: 'skills', name: 'Skills', label: 'SKILLS', protocol: 'IAC' },
  { id: 'faq', name: 'FAQ', label: 'FAQ', protocol: 'DNS' },
  { id: 'contact', name: 'Get In Touch', label: 'GET IN TOUCH', protocol: 'SMTP' },
];

export const LanCableVerticalSpine: React.FC = () => {
  const [activeNodeIndex, setActiveNodeIndex] = useState<number>(0);
  const [packetPercent, setPacketPercent] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [packetCounter, setPacketCounter] = useState<number>(1042);
  const prevIndexRef = useRef<number>(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const aboutEl = document.getElementById('about');
          const contactEl = document.getElementById('contact');

          if (!aboutEl || !contactEl) {
            ticking = false;
            return;
          }

          const scrollY = window.scrollY;
          const viewH = window.innerHeight;
          const maxScroll = Math.max(1, document.documentElement.scrollHeight - viewH);

          // Start transit right as About section enters viewport
          const startY = aboutEl.offsetTop - viewH * 0.45;
          // Conclude transit when reaching Get In Touch (Contact) section
          const endY = Math.min(contactEl.offsetTop, maxScroll);
          const totalDistance = Math.max(1, endY - startY);

          // Only display between About page and Get In Touch section
          const inActiveRange = scrollY >= startY - 100;
          setIsVisible(inActiveRange);

          // Clamped progress from 0% (About) to 100% (Get In Touch)
          const rawProgress = (scrollY - startY) / totalDistance;
          const clamped = Math.min(Math.max(rawProgress, 0), 1);
          setPacketPercent(clamped * 100);

          // Determine which section currently aligns with viewport center
          const viewCenter = scrollY + viewH * 0.45;
          let closestIdx = 0;
          let minDistance = Infinity;

          PACKET_NODES.forEach((node, idx) => {
            const el = document.getElementById(node.id);
            if (el) {
              const elCenter = el.offsetTop + el.offsetHeight * 0.35;
              const dist = Math.abs(viewCenter - elCenter);
              if (dist < minDistance) {
                minDistance = dist;
                closestIdx = idx;
              }
            }
          });

          // If at or near bottom of document, lock active to Get In Touch
          if (scrollY >= maxScroll - 40) {
            closestIdx = PACKET_NODES.length - 1;
          }

          if (closestIdx !== prevIndexRef.current) {
            setPacketCounter((prev) => prev + 1);
            prevIndexRef.current = closestIdx;
          }

          setActiveNodeIndex(closestIdx);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const handleNodeClick = (nodeId: string) => {
    const el = document.getElementById(nodeId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const activeNode = PACKET_NODES[activeNodeIndex] || PACKET_NODES[0];

  return (
    <aside
      aria-label="Vertical Section Data Packet Transit"
      className={`fixed left-3 sm:left-5 md:left-7 top-1/2 -translate-y-1/2 z-35 pointer-events-none select-none transition-all duration-500 ease-base-curve ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 pointer-events-none'
      }`}
    >
      <div className="relative w-8 h-[310px] sm:h-[370px] flex items-center justify-center">
        {/* Subtle, Hairline Vertical Conduit Line (About to Get In Touch) */}
        <div className="absolute top-0 bottom-0 w-[1.5px] bg-gradient-to-b from-transparent via-cyan-500/25 to-transparent rounded-full" />

        {/* Illuminated Progress Trace up to Packet Position */}
        <div
          className="absolute top-0 w-[2px] bg-gradient-to-b from-transparent via-cyan-400/50 to-[#00f0ff] rounded-full transition-all duration-150 ease-out shadow-[0_0_8px_rgba(0,240,255,0.4)]"
          style={{ height: `${packetPercent}%` }}
        />

        {/* High-speed Autonomous Vertical Micro-Pulses */}
        <div className="absolute inset-y-0 w-full overflow-hidden pointer-events-none">
          <div
            className="absolute left-1/2 -translate-x-1/2 w-1 h-6 rounded-full bg-gradient-to-b from-transparent via-[#00f0ff] to-white shadow-[0_0_6px_#00f0ff] animate-[lanPulseVertical_3.4s_linear_infinite]"
            style={{ animationDelay: '0s' }}
          />
        </div>

        {/* Section Node Pips (8 Steps from About to Get In Touch) */}
        {PACKET_NODES.map((node, idx) => {
          const nodeTopPercent = (idx / (PACKET_NODES.length - 1)) * 100;
          const isActive = activeNodeIndex === idx;
          const isPassed = packetPercent >= nodeTopPercent - 1;

          return (
            <div
              key={node.id}
              className="absolute left-1/2 -translate-x-1/2 z-10"
              style={{ top: `${nodeTopPercent}%` }}
            >
              {/* Interactive Node Pip */}
              <button
                type="button"
                onClick={() => handleNodeClick(node.id)}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                aria-label={`Jump to ${node.name} Section`}
                className={`pointer-events-auto -translate-y-1/2 flex items-center justify-center transition-all duration-300 focus:outline-none ${
                  isActive
                    ? 'scale-125'
                    : 'hover:scale-110'
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    isActive
                      ? 'bg-[#00f0ff] ring-4 ring-[#00f0ff]/25 shadow-[0_0_10px_#00f0ff]'
                      : isPassed
                      ? 'bg-cyan-400/80 ring-1 ring-cyan-400/40'
                      : 'bg-white/25 ring-1 ring-white/10 hover:bg-white/60'
                  }`}
                />
              </button>

              {/* Minimal Hover Tooltip */}
              {hoveredIndex === idx && (
                <div className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 whitespace-nowrap px-2 py-0.5 rounded bg-black/90 border border-white/20 text-[#EDEDED] font-mono text-[9px] shadow-lg flex items-center gap-1.5 z-30 animate-fade-in">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff]" />
                  <span>{node.name}</span>
                  <span className="text-[#888888]">[{node.protocol}]</span>
                </div>
              )}
            </div>
          );
        })}

        {/* THE ACTIVE DATA PACKET TRAVELING FROM SECTION TO SECTION */}
        <div
          className="absolute left-1/2 -translate-x-1/2 z-20 pointer-events-none transition-all duration-200 ease-out"
          style={{
            top: `calc(${packetPercent}% - 12px)`,
          }}
        >
          {/* Vertical Motion Trail */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-1.5 h-12 bg-gradient-to-t from-[#00f0ff] via-[#00f0ff]/30 to-transparent blur-[0.5px] rounded-full pointer-events-none opacity-85" />

          {/* Glowing Packet Capsule */}
          <div className="relative flex items-center justify-center">
            <div className="w-5 h-6 rounded-md bg-gradient-to-b from-[#00f0ff] to-[#0284c7] border border-white shadow-[0_0_14px_#00f0ff,0_0_24px_rgba(0,240,255,0.6)] flex flex-col items-center justify-center animate-pulse">
              <Zap className="w-3 h-3 text-black fill-black" />
              <span className="font-mono text-[6.5px] font-extrabold text-black leading-none">
                10G
              </span>
            </div>

            {/* Attached Minimal Floating Packet Telemetry Badge */}
            <div className="absolute left-7 top-1/2 -translate-y-1/2 whitespace-nowrap px-2 py-0.5 rounded-full bg-black/90 backdrop-blur-md border border-[#00f0ff]/50 text-[#00f0ff] font-mono text-[9px] shadow-[0_2px_12px_rgba(0,0,0,0.8)] pointer-events-none flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-ping" />
              <span className="font-semibold text-white">PKT #{packetCounter}</span>
              <span className="text-[#00f0ff] font-bold">&gt; {activeNode.label}</span>
              <span className="text-white/40">[{activeNode.protocol}]</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default LanCableVerticalSpine;
