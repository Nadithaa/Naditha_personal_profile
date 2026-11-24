import React, { useEffect, useState, useRef } from 'react';
import { ChevronUp, ChevronDown, Zap } from 'lucide-react';

interface NetworkNode {
  id: string;
  name: string;
  port: string;
  ip: string;
  protocol: string;
}

const NETWORK_NODES: NetworkNode[] = [
  { id: 'hero', name: 'Landing', port: '01', ip: '10.0.0.1', protocol: 'HTTP/3' },
  { id: 'about', name: 'About', port: '02', ip: '10.0.0.2', protocol: 'SSH' },
  { id: 'overview', name: 'Metrics', port: '03', ip: '10.0.0.3', protocol: 'SNMP' },
  { id: 'tagline', name: 'Philosophy', port: '04', ip: '10.0.0.4', protocol: 'TLS' },
  { id: 'projects', name: 'Projects', port: '05', ip: '10.0.0.5', protocol: 'K8S' },
  { id: 'process', name: 'Process', port: '06', ip: '10.0.0.6', protocol: 'BGP' },
  { id: 'skills', name: 'Skills', port: '07', ip: '10.0.0.7', protocol: 'TF' },
  { id: 'faq', name: 'FAQ', port: '08', ip: '10.0.0.8', protocol: 'DNS' },
  { id: 'contact', name: 'Contact', port: '09', ip: '10.0.0.9', protocol: 'SMTP' },
];

export const LanCableDataBus: React.FC = () => {
  const [activeNodeIndex, setActiveNodeIndex] = useState<number>(0);
  const [packetProgress, setPacketProgress] = useState<number>(0);
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [packetCount, setPacketCount] = useState<number>(1042);
  const cableTrackRef = useRef<HTMLDivElement>(null);

  // Scroll tracking to interpolate data packet position horizontally across nodes
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const scrollMax = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
          const rawProgress = scrollY / scrollMax;

          // Find which section is currently closest to viewport center
          const viewCenter = scrollY + window.innerHeight * 0.35;
          let closestIndex = 0;
          let minDistance = Infinity;

          NETWORK_NODES.forEach((node, idx) => {
            const el = document.getElementById(node.id);
            if (el) {
              const rect = el.getBoundingClientRect();
              const elTop = rect.top + scrollY;
              const dist = Math.abs(viewCenter - elTop);
              if (dist < minDistance) {
                minDistance = dist;
                closestIndex = idx;
              }
            }
          });

          setActiveNodeIndex(closestIndex);
          // Smooth continuous horizontal progress mapped to nodes [0, NETWORK_NODES.length - 1]
          const continuousPos = rawProgress * (NETWORK_NODES.length - 1);
          setPacketProgress(continuousPos);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Background simulated network packet counter
    const packetTimer = setInterval(() => {
      setPacketCount((prev) => prev + Math.floor(Math.random() * 3) + 1);
    }, 2400);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(packetTimer);
    };
  }, []);

  const handleNodeClick = (nodeId: string, idx: number) => {
    const el = document.getElementById(nodeId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveNodeIndex(idx);
      setPacketProgress(idx);
    }
  };

  // Compute horizontal percentage for the packet
  const maxIdx = NETWORK_NODES.length - 1;
  const clampedProgress = Math.min(Math.max(packetProgress, 0), maxIdx);
  const packetPercent = (clampedProgress / maxIdx) * 100;
  const activeNode = NETWORK_NODES[activeNodeIndex];

  return (
    <aside
      aria-label="Network Data Cable Bus"
      className="fixed bottom-3 sm:bottom-4 left-0 right-0 z-35 flex justify-center px-2 pointer-events-none"
    >
      <div
        className={`pointer-events-auto w-full max-w-5xl bg-[#141416]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl transition-all duration-500 ease-base-curve overflow-hidden ${
          isExpanded ? 'p-3 sm:p-4' : 'p-2'
        }`}
      >
        {/* Top Telemetry Header Bar */}
        <div className="flex items-center justify-between gap-2 pb-2 mb-2 border-b border-white/10 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 font-semibold tracking-wider text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              10GbE CAT.6A BUS
            </span>
            <span className="hidden md:inline-flex items-center gap-1 text-[#888888] text-[11px]">
              <Zap className="w-3 h-3 text-[#00f0ff]" />
              PACKET TRANSIT:
              <span className="text-[#EDEDED] font-semibold">
                LANDING → {activeNode?.name.toUpperCase()} (PORT {activeNode?.port})
              </span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-[#888888] text-[11px]">
              <span>MTU: 1500</span>
              <span className="text-white/20">|</span>
              <span className="text-emerald-400">RTT: 0.14ms</span>
              <span className="text-white/20">|</span>
              <span>PKTS: #{packetCount}</span>
            </div>

            {/* Minimize / Expand Toggle */}
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              aria-label={isExpanded ? 'Collapse LAN Cable Bus' : 'Expand LAN Cable Bus'}
              className="p-1 rounded-md text-[#888888] hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-1 focus:ring-white/40"
            >
              {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Cable & Ports Horizontal Runway */}
        {isExpanded && (
          <div className="relative pt-6 pb-3 px-1 sm:px-2">
            {/* The Physical Cat6A LAN Cable Spine */}
            <div
              ref={cableTrackRef}
              className="relative w-full h-4 sm:h-5 rounded-full bg-gradient-to-r from-[#1c1c1e] via-[#242428] to-[#1c1c1e] border border-white/15 shadow-inner flex items-center"
            >
              {/* Molded Strain Relief Cable Boot Texture */}
              <div className="absolute inset-0 rounded-full opacity-30 bg-[repeating-linear-gradient(45deg,transparent,transparent_4px,rgba(0,240,255,0.1)_4px,rgba(0,240,255,0.1)_8px)]" />

              {/* Cable Core Glow Conduit */}
              <div className="absolute inset-x-2 h-1 rounded-full bg-cyan-950/80 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-transparent via-[#00f0ff]/60 to-transparent blur-[1px] transition-all duration-300"
                  style={{
                    width: '35%',
                    marginLeft: `${Math.max(0, packetPercent - 15)}%`,
                  }}
                />
              </div>

              {/* High-speed Autonomous Micro-Packets Racing Horizontally */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-full">
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-6 h-1 rounded-full bg-gradient-to-r from-transparent via-[#00f0ff] to-white shadow-[0_0_8px_#00f0ff] animate-[lanPulse_3.5s_linear_infinite]"
                  style={{ animationDelay: '0s' }}
                />
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-4 h-1 rounded-full bg-gradient-to-r from-transparent via-[#10b981] to-white shadow-[0_0_6px_#10b981] animate-[lanPulse_4.2s_linear_infinite]"
                  style={{ animationDelay: '1.8s' }}
                />
              </div>

              {/* RJ45 Connector Plug Left (Landing Page Host) */}
              <div
                className="absolute -left-3.5 top-1/2 -translate-y-1/2 w-5 h-7 rounded-sm bg-[#2b2b30] border border-white/20 shadow-md flex flex-col justify-between py-1 px-0.5 z-10"
                title="HOST: 10.0.0.1 (Landing Page)"
              >
                <div className="w-full h-0.5 bg-amber-400 rounded-sm" />
                <div className="grid grid-cols-4 gap-0.5">
                  <span className="w-0.5 h-1.5 bg-amber-300 rounded-[0.5px]" />
                  <span className="w-0.5 h-1.5 bg-amber-300 rounded-[0.5px]" />
                  <span className="w-0.5 h-1.5 bg-amber-300 rounded-[0.5px]" />
                  <span className="w-0.5 h-1.5 bg-amber-300 rounded-[0.5px]" />
                </div>
                <div className="w-full h-0.5 bg-white/40 rounded-sm" />
              </div>

              {/* RJ45 Connector Plug Right (Gateway Termination) */}
              <div
                className="absolute -right-3.5 top-1/2 -translate-y-1/2 w-5 h-7 rounded-sm bg-[#2b2b30] border border-white/20 shadow-md flex flex-col justify-between py-1 px-0.5 z-10"
                title="GATEWAY: 10.0.0.9 (Contact Terminal)"
              >
                <div className="w-full h-0.5 bg-amber-400 rounded-sm" />
                <div className="grid grid-cols-4 gap-0.5">
                  <span className="w-0.5 h-1.5 bg-amber-300 rounded-[0.5px]" />
                  <span className="w-0.5 h-1.5 bg-amber-300 rounded-[0.5px]" />
                  <span className="w-0.5 h-1.5 bg-amber-300 rounded-[0.5px]" />
                  <span className="w-0.5 h-1.5 bg-amber-300 rounded-[0.5px]" />
                </div>
                <div className="w-full h-0.5 bg-white/40 rounded-sm" />
              </div>

              {/* THE ACTIVE DATA PACKET TRAVELING HORIZONTALLY */}
              <div
                className="absolute top-1/2 -translate-y-1/2 z-20 pointer-events-none transition-all duration-300 ease-out"
                style={{
                  left: `calc(${packetPercent}% - 14px)`,
                }}
              >
                {/* Horizontal Motion Streak Tail */}
                <div className="absolute right-3 top-1/2 -translate-y-1/2 w-16 h-2 bg-gradient-to-l from-[#00f0ff] via-[#00f0ff]/40 to-transparent blur-[1px] rounded-full pointer-events-none opacity-80" />

                {/* Packet Core Glow Capsule */}
                <div className="relative flex items-center justify-center">
                  <div className="w-7 h-5 rounded-md bg-gradient-to-r from-[#00f0ff] to-[#38bdf8] border border-white shadow-[0_0_16px_#00f0ff,0_0_30px_#00f0ff] flex items-center justify-center animate-pulse">
                    <span className="font-mono text-[9px] font-bold text-black tracking-tighter">
                      10G
                    </span>
                  </div>

                  {/* Dynamic Floating Packet Header HUD */}
                  <div className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap px-1.5 py-0.5 rounded bg-black/90 border border-[#00f0ff]/50 text-[#00f0ff] font-mono text-[9px] shadow-lg pointer-events-none flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-ping" />
                    <span>PKT #{packetCount}</span>
                    <span className="text-white/60">[{activeNode.protocol}]</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Section Ports along the Cable */}
            <div className="relative flex justify-between items-start mt-2 sm:mt-3 px-1">
              {NETWORK_NODES.map((node, idx) => {
                const isActive = activeNodeIndex === idx;
                const isPassed = packetProgress >= idx - 0.2;

                return (
                  <button
                    key={node.id}
                    type="button"
                    onClick={() => handleNodeClick(node.id, idx)}
                    className="group relative flex flex-col items-center focus:outline-none"
                    title={`Port ${node.port}: ${node.name} (${node.ip}) - Click to route packet`}
                  >
                    {/* RJ45 Port Socket Keystone */}
                    <div
                      className={`relative w-6 h-5 sm:w-7 sm:h-6 rounded-md border transition-all duration-300 flex flex-col items-center justify-center p-0.5 ${
                        isActive
                          ? 'bg-[#1e293b] border-[#00f0ff] shadow-[0_0_12px_rgba(0,240,255,0.4)] scale-110'
                          : isPassed
                          ? 'bg-[#18181b] border-emerald-500/50 hover:border-emerald-400'
                          : 'bg-[#121214] border-white/15 hover:border-white/40'
                      }`}
                    >
                      {/* Port Gold Pin Slots */}
                      <div className="w-full flex justify-center gap-[1.5px] mb-0.5">
                        <span className={`w-0.5 h-1 rounded-sm ${isActive ? 'bg-amber-300' : 'bg-white/20'}`} />
                        <span className={`w-0.5 h-1 rounded-sm ${isActive ? 'bg-amber-300' : 'bg-white/20'}`} />
                        <span className={`w-0.5 h-1 rounded-sm ${isActive ? 'bg-amber-300' : 'bg-white/20'}`} />
                        <span className={`w-0.5 h-1 rounded-sm ${isActive ? 'bg-amber-300' : 'bg-white/20'}`} />
                      </div>

                      {/* Port Dual Status LEDs */}
                      <div className="w-full flex justify-between px-0.5">
                        {/* Green Activity LED */}
                        <span
                          className={`w-1 h-1 rounded-full ${
                            isActive
                              ? 'bg-emerald-400 shadow-[0_0_4px_#34d399] animate-ping'
                              : isPassed
                              ? 'bg-emerald-500/70'
                              : 'bg-white/10'
                          }`}
                        />
                        {/* Amber Link 10G LED */}
                        <span
                          className={`w-1 h-1 rounded-full ${
                            isActive
                              ? 'bg-amber-400 shadow-[0_0_4px_#fbbf24]'
                              : isPassed
                              ? 'bg-amber-500/50'
                              : 'bg-white/10'
                          }`}
                        />
                      </div>
                    </div>

                    {/* Port Label & Monospace Metadata */}
                    <span
                      className={`mt-1 font-mono text-[9px] sm:text-[10px] tracking-tight transition-colors ${
                        isActive
                          ? 'text-[#00f0ff] font-bold'
                          : isPassed
                          ? 'text-[#EDEDED] font-medium'
                          : 'text-[#666666] group-hover:text-white'
                      }`}
                    >
                      {node.name}
                    </span>

                    <span className="hidden sm:block font-mono text-[8px] text-[#555555]">
                      P{node.port}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
