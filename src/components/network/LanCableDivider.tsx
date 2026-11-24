import React, { useEffect, useState } from 'react';

interface LanCableDividerProps {
  sourceName?: string;
  targetName?: string;
  sourceIp?: string;
  targetIp?: string;
  protocol?: string;
}

export const LanCableDivider: React.FC<LanCableDividerProps> = ({
  sourceName = 'LANDING PAGE',
  targetName = 'INFRASTRUCTURE NODES',
  sourceIp = '10.0.0.1:443',
  targetIp = '10.0.0.2:8080',
  protocol = 'TCP/IP 10GbE',
}) => {
  const [packetCounter, setPacketCounter] = useState(2401);

  useEffect(() => {
    const timer = setInterval(() => {
      setPacketCounter((p) => p + 1);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="w-full relative py-6 bg-surface-950 overflow-hidden border-y border-border-subtle/40 select-none"
      role="region"
      aria-label="Ethernet LAN Cable Data Transit"
    >
      <div className="max-w-6xl mx-auto px-4">
        {/* Network Header Meta */}
        <div className="flex items-center justify-between text-[11px] font-mono text-[#888888] mb-2 px-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[#EDEDED] font-semibold">PATCH LINK: {sourceName}</span>
            <span className="text-white/30">→</span>
            <span className="text-[#00f0ff] font-semibold">{targetName}</span>
          </div>

          <div className="hidden sm:flex items-center gap-3">
            <span className="bg-surface-850 px-2 py-0.5 rounded border border-border-subtle text-[#A1A1A1]">
              SRC: {sourceIp}
            </span>
            <span className="text-white/20">==</span>
            <span className="bg-surface-850 px-2 py-0.5 rounded border border-border-subtle text-[#A1A1A1]">
              DST: {targetIp}
            </span>
            <span className="text-emerald-400 font-medium">[{protocol}]</span>
          </div>
        </div>

        {/* The Physical Horizontal LAN Cable Assembly */}
        <div className="relative flex items-center h-10 sm:h-12">
          {/* Left RJ45 Connector Plug (Source) */}
          <div className="relative z-10 shrink-0 flex items-center">
            {/* Wall Faceplate Jack */}
            <div className="w-6 sm:w-8 h-10 sm:h-12 rounded-l-md bg-[#1f1f23] border border-white/20 flex flex-col justify-between p-1 shadow-lg">
              <div className="flex justify-between items-center">
                <span className="w-1 h-1 rounded-full bg-emerald-400 shadow-[0_0_4px_#34d399] animate-ping" />
                <span className="w-1 h-1 rounded-full bg-amber-400 shadow-[0_0_4px_#fbbf24]" />
              </div>
              <span className="font-mono text-[7px] text-[#888888] text-center leading-none">
                ETH0
              </span>
            </div>

            {/* RJ45 Molded Modular Plug with Snagless Boot */}
            <div className="w-7 sm:w-9 h-8 sm:h-9 bg-[#2a2a30] border-y border-r border-white/30 rounded-r-md flex flex-col justify-between py-1 px-1 shadow-md">
              <div className="w-full h-1 bg-amber-400/90 rounded-sm" title="Gold Pins 1-8" />
              <div className="grid grid-cols-4 gap-0.5 my-auto">
                <span className="w-0.5 h-2 bg-amber-300 rounded-[0.5px]" />
                <span className="w-0.5 h-2 bg-amber-300 rounded-[0.5px]" />
                <span className="w-0.5 h-2 bg-amber-300 rounded-[0.5px]" />
                <span className="w-0.5 h-2 bg-amber-300 rounded-[0.5px]" />
              </div>
              <div className="w-full h-0.5 bg-white/30 rounded-sm" />
            </div>
          </div>

          {/* Central Horizontal Cat6A LAN Cable Jacket */}
          <div className="relative flex-1 h-4 sm:h-5 bg-gradient-to-r from-[#1c1c20] via-[#24242a] to-[#1c1c20] border-y border-white/20 shadow-inner flex items-center overflow-hidden">
            {/* Cable Braided Texture */}
            <div className="absolute inset-0 opacity-25 bg-[repeating-linear-gradient(45deg,transparent,transparent_6px,rgba(0,240,255,0.12)_6px,rgba(0,240,255,0.12)_12px)] pointer-events-none" />

            {/* Cable Stencil Print running horizontally along the jacket */}
            <div className="absolute inset-0 flex items-center pointer-events-none opacity-40">
              <div className="whitespace-nowrap font-mono text-[9px] text-white/50 tracking-wider pl-4 sm:pl-8">
                CAT.6A S/FTP 10Gbps 500MHz 26AWG ETHERNET PATCH CORD -- TIA/EIA-568-B -- [PACKET TRANSIT HIGHWAY] -- 10GBASE-T
              </div>
            </div>

            {/* Internal Core Conduit */}
            <div className="absolute inset-x-0 h-1.5 bg-cyan-950/70" />

            {/* DATA PACKET 1: Continuous Horizontal Transit from Left to Right */}
            <div className="absolute top-1/2 -translate-y-1/2 w-28 sm:w-36 h-3 flex items-center animate-[lanPulse_3.2s_linear_infinite] pointer-events-none">
              {/* Luminous Motion Trail */}
              <div className="w-full h-1 bg-gradient-to-r from-transparent via-[#00f0ff]/50 to-[#00f0ff] blur-[1px]" />
              {/* Glowing Packet Head Capsule */}
              <div className="shrink-0 w-6 h-3.5 rounded-sm bg-[#00f0ff] border border-white shadow-[0_0_14px_#00f0ff,0_0_24px_#00f0ff] flex items-center justify-center">
                <span className="font-mono text-[8px] font-bold text-black leading-none">
                  PKT
                </span>
              </div>
            </div>

            {/* DATA PACKET 2: High-speed Binary Data Pulse */}
            <div
              className="absolute top-1/2 -translate-y-1/2 w-20 h-2 flex items-center animate-[lanPulse_4.5s_linear_infinite] pointer-events-none"
              style={{ animationDelay: '1.6s' }}
            >
              <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-[#10b981] to-white" />
              <div className="shrink-0 w-3 h-2 rounded-[2px] bg-emerald-400 border border-white shadow-[0_0_10px_#10b981]" />
            </div>

            {/* DATA PACKET 3: Trailing ACK Frame */}
            <div
              className="absolute top-1/2 -translate-y-1/2 w-16 h-2 flex items-center animate-[lanPulse_2.8s_linear_infinite] pointer-events-none"
              style={{ animationDelay: '0.8s' }}
            >
              <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-[#a78bfa] to-white" />
              <div className="shrink-0 w-2.5 h-2 rounded-[2px] bg-purple-400 border border-white shadow-[0_0_8px_#a78bfa]" />
            </div>
          </div>

          {/* Right RJ45 Connector Plug (Destination) */}
          <div className="relative z-10 shrink-0 flex items-center">
            {/* RJ45 Molded Modular Plug with Snagless Boot */}
            <div className="w-7 sm:w-9 h-8 sm:h-9 bg-[#2a2a30] border-y border-l border-white/30 rounded-l-md flex flex-col justify-between py-1 px-1 shadow-md">
              <div className="w-full h-1 bg-amber-400/90 rounded-sm" title="Gold Pins 1-8" />
              <div className="grid grid-cols-4 gap-0.5 my-auto">
                <span className="w-0.5 h-2 bg-amber-300 rounded-[0.5px]" />
                <span className="w-0.5 h-2 bg-amber-300 rounded-[0.5px]" />
                <span className="w-0.5 h-2 bg-amber-300 rounded-[0.5px]" />
                <span className="w-0.5 h-2 bg-amber-300 rounded-[0.5px]" />
              </div>
              <div className="w-full h-0.5 bg-white/30 rounded-sm" />
            </div>

            {/* Wall Faceplate Jack */}
            <div className="w-6 sm:w-8 h-10 sm:h-12 rounded-r-md bg-[#1f1f23] border border-white/20 flex flex-col justify-between p-1 shadow-lg">
              <div className="flex justify-between items-center">
                <span className="w-1 h-1 rounded-full bg-emerald-400 shadow-[0_0_4px_#34d399] animate-ping" />
                <span className="w-1 h-1 rounded-full bg-cyan-400 shadow-[0_0_4px_#22d3ee]" />
              </div>
              <span className="font-mono text-[7px] text-[#888888] text-center leading-none">
                ETH1
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Packet Status Footnote */}
        <div className="flex items-center justify-between text-[10px] font-mono text-[#666666] mt-2 px-1">
          <div className="flex items-center gap-2">
            <span>PACKET TRANSIT #0{packetCounter}</span>
            <span className="text-white/20">•</span>
            <span>FRAME SIZE: 1518 BYTES (STANDARD ETHERNET MTU)</span>
          </div>
          <span className="text-emerald-400/80">LINK STATE: UP // DUPLEX: FULL // SPEED: 10000Mbps</span>
        </div>
      </div>
    </div>
  );
};
