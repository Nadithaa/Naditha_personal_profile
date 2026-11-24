import React, { useEffect, useRef, useState } from 'react';
import { BlogPostItem } from '../../types';
import { portfolioConfig } from '../../data/portfolio.config';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { ArrowUpRight, Sparkles, Terminal, FileCode2 } from 'lucide-react';

interface BlogShowcaseProps {
  onSelectPost: (post: BlogPostItem) => void;
}

// Verified high-resolution tech & datacenter imagery
const ASSETS = {
  network: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80',
  datacenter: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80',
  code: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=800&auto=format&fit=crop&q=80',
  pcb: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80',
  soldering: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80',
  fiber: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&auto=format&fit=crop&q=80',
  saltflat: 'https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/7b6ad638-89ec-4dec-be74-d36fbff3ea53.webp',
  mesa: 'https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/62b0d7c1-3eb7-44bd-9b19-57b975fb250f.webp',
  dunes: 'https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/0e201fcd-ffc0-46a0-bd06-faa07bf0e84b.webp',
};

// 32-bit Integer Hash from specification
function hash(a: number, b: number, c: number): number {
  let h = (Math.imul(a, 374761393) + Math.imul(b, 668265263) + Math.imul(c, 2147483647)) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177) | 0;
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}

// Particle spark interface
interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  life: number;
  maxLife: number;
}

const PARTICLE_PALETTE = [
  '#FF4A12',
  '#FF5A1F',
  '#FF6B2C',
  '#FF8A3D',
  '#FFB06A',
  '#FFD9B5',
  '#FFF3E6',
];

interface DistillArticleCardData {
  id: string;
  category: string;
  badge: string;
  title: string;
  subtitle: string;
  originalTokens: number;
  distilledTokens: number;
  savedTokens: number;
  percentLess: string;
  url: string;
  postIdx: number;
  stats: { label: string; value: string }[];
  htmlCode: string;
}

const TECH_ARTICLES: DistillArticleCardData[] = [
  {
    id: 'aws-migration',
    category: 'CLOUD & IAC',
    badge: 'AWS CLOUD // TERRAFORM // WIREGUARD',
    title: 'Zero-Downtime Migration: Moving 42 Production Workloads to AWS',
    subtitle: 'How we executed live cutovers without a minute of SLA penalty using WireGuard mesh, CloudFormation, and dual Aurora replicas.',
    originalTokens: 70411,
    distilledTokens: 6140,
    savedTokens: 64271,
    percentLess: '91% less',
    url: 'naditha.io/articles/aws-migration',
    postIdx: 0,
    stats: [
      { label: 'WORKLOADS MIGRATED', value: '42+' },
      { label: 'PROD UPTIME', value: '99.98%' },
      { label: 'MAINTENANCE LOSS', value: '0 min' },
    ],
    htmlCode: `<h1>Zero-Downtime Migration: Moving 42 Workloads to AWS</h1>
<p>
  Phased cutover strategy combining dedicated WireGuard IPsec mesh
  tunnels, continuous CDC via AWS DMS, and Route 53 health-checked
  weighted DNS routing controls.
</p>

<h2>Architecture Overview</h2>
<ul>
  <li>Dual 25GbE on-prem links routed to AWS Transit Gateway</li>
  <li>Continuous Aurora PostgreSQL replication under 120ms lag</li>
  <li>Automated failback reverse sync maintained for 48 hours</li>
  <li>Route 53 TTL lowered to 60s for deterministic traffic handoff</li>
</ul>

<h2>Infrastructure Stack</h2>
<ul>
  <li>AWS CloudFormation, Terraform, Aurora PostgreSQL, WireGuard</li>
</ul>
<a href="#article-modal" class="btn">Read Full Architecture Notes</a>`,
  },
  {
    id: 'ransomware-defense',
    category: 'SECURITY & STORAGE',
    badge: 'UBUNTU 22.04 // XFS IMMUTABILITY // VEEAM',
    title: 'Surviving Ransomware: Hardened Linux & Immutable Repositories',
    subtitle: 'Architecting an air-gapped, tamper-proof backup repository where files cannot be deleted even with compromised Domain Admin credentials.',
    originalTokens: 98432,
    distilledTokens: 6300,
    savedTokens: 92132,
    percentLess: '94% less',
    url: 'naditha.io/articles/immutable-linux-backup',
    postIdx: 1,
    stats: [
      { label: 'RPO RECOVERY', value: '< 15 min' },
      { label: 'DRILL SUCCESS', value: '100%' },
      { label: 'TAMPERED BLOCKS', value: '0' },
    ],
    htmlCode: `<h1>Surviving Ransomware: Hardened Linux & Immutability</h1>
<p>
  Why Domain Admin access shouldn't mean backup access.
  How we deployed air-gapped Ubuntu Linux with kernel-enforced
  XFS immutable flags to guarantee tamper-proof backups.
</p>

<h2>Key Defense Mechanisms</h2>
<ul>
  <li>Headless Ubuntu 22.04 LTS on non-routable management VLAN</li>
  <li>Root SSH permanently disabled; single-use deployment creds</li>
  <li>chattr +i immutable attribute locks active backup blocks</li>
  <li>Automated weekly SureBackup sandboxed VM boot verification</li>
</ul>

<h2>Core Deliverables</h2>
<ul>
  <li>Verified RPO under 15 minutes; 45-minute full database restore</li>
</ul>`,
  },
  {
    id: 'hyper-v-cluster',
    category: 'ENTERPRISE VIRTUALIZATION',
    badge: 'HYPER-V 2022 // S2D // ROCEV2 RDMA',
    title: 'Orchestrating 150+ Production VMs: Storage Spaces Direct & RoCEv2',
    subtitle: 'Achieving 140,000 IOPS and sub-4-second live migration failovers across 3-node Hyper-V clusters using converged 25GbE Mellanox NICs.',
    originalTokens: 55870,
    distilledTokens: 8215,
    savedTokens: 47655,
    percentLess: '85% less',
    url: 'naditha.io/articles/hyper-v-s2d-rocev2',
    postIdx: 2,
    stats: [
      { label: 'SUSTAINED IOPS', value: '140K' },
      { label: 'FAILOVER TIME', value: '< 4 sec' },
      { label: 'PROD VMS', value: '150+' },
    ],
    htmlCode: `<h1>Orchestrating 150+ Production VMs on Hyper-V & S2D</h1>
<p>
  Taming storage latency and CPU interrupt overhead in a dense
  multi-tenant private cloud. Implementing converged RoCEv2 RDMA
  fabrics to deliver zero-copy kernel storage throughput.
</p>

<h2>Performance Benchmark</h2>
<ul>
  <li>Dual 25GbE Mellanox ConnectX-5 adapters in converged mode</li>
  <li>NVMe write-cache tiering with 3-way mirroring delivering 140K IOPS</li>
  <li>Priority Flow Control (PFC) on priority 3 eliminates packet drop</li>
  <li>PowerShell automation for zero-downtime node drain maintenance</li>
</ul>`,
  },
  {
    id: 'esp32-telemetry',
    category: 'HARDWARE & EMBEDDED IOT',
    badge: 'KICAD PCB // FREERTOS // AWS IOT CORE',
    title: 'From Silicon to Hypervisor: Custom ESP32 Server Rack Telemetry',
    subtitle: 'Schematic design, 2-layer PCB fabrication, transient voltage suppression, and encrypted MQTT mTLS streaming to AWS IoT Core.',
    originalTokens: 63904,
    distilledTokens: 5512,
    savedTokens: 58392,
    percentLess: '91% less',
    url: 'naditha.io/articles/esp32-server-telemetry',
    postIdx: 4,
    stats: [
      { label: 'AVG POWER DRAW', value: '18mA' },
      { label: 'VOLTAGE RIPPLE', value: '< 15mV' },
      { label: 'UPTIME RECORD', value: '180 days' },
    ],
    htmlCode: `<h1>From Silicon to Hypervisor: Custom ESP32 Telemetry</h1>
<p>
  Why systems engineering starts at the circuit board. Designing
  custom microcontroller boards for ambient server rack temperature,
  humidity, and power rail telemetry streaming to AWS IoT Core.
</p>

<h2>Hardware Specifications</h2>
<ul>
  <li>ESP32 dual-core microcontroller running FreeRTOS firmware</li>
  <li>I2C sensor bus with BME280 thermals and INA219 current sensing</li>
  <li>Transient voltage suppression via SMBJ12CA diode arrays</li>
  <li>X.509 mutual TLS certificate authentication on MQTT port 8883</li>
</ul>`,
  },
  {
    id: 'zero-trust-vlan',
    category: 'NETWORK & ZERO-TRUST',
    badge: 'SONICWALL NSA // FREERADIUS // 802.1X',
    title: 'Stopping Lateral Movement: 802.1X Dynamic VLANs & SonicWall',
    subtitle: 'Replacing static network trust with dynamic identity steering, automated machine certificates, and instant threat isolation.',
    originalTokens: 41208,
    distilledTokens: 4960,
    savedTokens: 36248,
    percentLess: '88% less',
    url: 'naditha.io/articles/zero-trust-8021x-vlan',
    postIdx: 3,
    stats: [
      { label: 'AUTH SPEED', value: '180ms' },
      { label: 'ROGUE NODES', value: '0 permitted' },
      { label: 'POLICY ENGINE', value: 'Dynamic' },
    ],
    htmlCode: `<h1>Stopping Lateral Movement: 802.1X Dynamic VLANs</h1>
<p>
  Eliminating static network port trust in enterprise datacenters.
  Enforcing EAP-TLS certificate validation to steer verified endpoints
  to corporate networks while isolating unmanaged devices into quarantine.
</p>

<h2>Network Hardening Architecture</h2>
<ul>
  <li>Active Directory Certificate Services auto-enrolls machine certs</li>
  <li>Dual FreeRADIUS servers respond to switch port queries in 180ms</li>
  <li>SonicWall zero-trust security zones block lateral subnet pivoting</li>
  <li>Automated isolation redirects non-compliant OS endpoints instantly</li>
</ul>`,
  },
  {
    id: 'siem-tuning',
    category: 'SIEM & COMPLIANCE',
    badge: 'RAPID7 SIEM // OSSIM // SOC 2 TYPE II',
    title: 'Taming Alert Fatigue: Tuning Rapid7 SIEM & OSSIM for SOC 2',
    subtitle: 'Filtering 4 million daily security events into actionable signal, achieving SOC 2 audit readiness without on-call burnout.',
    originalTokens: 47316,
    distilledTokens: 7602,
    savedTokens: 39714,
    percentLess: '84% less',
    url: 'naditha.io/articles/siem-soc2-tuning',
    postIdx: 5,
    stats: [
      { label: 'DAILY EVENTS', value: '4M → 24' },
      { label: 'NOISE REDUCTION', value: '94%' },
      { label: 'AUDIT STATUS', value: 'SOC 2 Ready' },
    ],
    htmlCode: `<h1>Taming Alert Fatigue: Tuning Rapid7 SIEM for SOC 2</h1>
<p>
  How to turn millions of Windows Security Event IDs 4624/4672 into
  high-fidelity incident signals that satisfy SOC 2 CC6.1 & CC7.2
  audits without waking up on-call engineers for benign service churn.
</p>

<h2>Correlation Rules & Evidence Pipeline</h2>
<ul>
  <li>NXLog agents filter machine account noise before SIEM ingestion</li>
  <li>Composite rules detect abnormal privilege escalation sequences</li>
  <li>AlienVault OSSIM feeds cross-reference firewall drop logs</li>
  <li>Tamper-evident audit logs proving continuous security governance</li>
</ul>`,
  },
];

export const BlogShowcase: React.FC<BlogShowcaseProps> = ({ onSelectPost }) => {
  const { ref, isVisible } = useScrollReveal();
  const beltContainerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Card DOM nodes and Code DOM nodes
  const cardElsRef = useRef<(HTMLDivElement | null)[]>([]);
  const codeElsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Scanner Counter state
  const [tokenCounter, setTokenCounter] = useState<string>('−64,271');
  const [percentText, setPercentText] = useState<string>('91% less');

  // Motion physics variables
  const offRef = useRef<number>(0);
  const velRef = useRef<number>(0);
  const hoverRef = useRef<number>(0);
  const isDraggingRef = useRef<boolean>(false);
  const startXRef = useRef<number>(0);
  const lastXRef = useRef<number>(0);
  const lastTRef = useRef<number>(0);
  const shownNumberRef = useRef<number>(64271);
  const currentCrossingCardRef = useRef<number>(0);

  // Sparks array for 2D canvas particle simulation
  const sparksRef = useRef<Spark[]>([]);

  // Click card handler
  const handleCardClick = (postIdx: number) => {
    const posts = portfolioConfig.blogPosts || [];
    const targetPost = posts[postIdx] || posts[0];
    if (targetPost) onSelectPost(targetPost);
  };

  // Setup 60fps RequestAnimationFrame motion loop & particle dissolve
  useEffect(() => {
    const container = beltContainerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let animId: number;
    let lastTime = performance.now();

    // Initial offset so first card is already slightly past the scanner line on load
    const stageW = container.offsetWidth || window.innerWidth;
    const cw = stageW < 768 ? stageW * 0.84 : Math.min(stageW * 0.46, 680);
    offRef.current = stageW / 2 - 0.62 * cw;
    velRef.current = -0.075 * stageW;

    const ctx = canvas.getContext('2d');

    const loop = (now: number) => {
      animId = requestAnimationFrame(loop);
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      const currentStageW = container.offsetWidth || window.innerWidth;
      const isMobile = currentStageW < 768;
      const cardW = isMobile ? currentStageW * 0.84 : Math.min(currentStageW * 0.46, 680);
      const cardH = isMobile ? cardW * (54 / 84) : Math.min(window.innerHeight * 0.52, 420);
      const cardGap = isMobile ? currentStageW * 0.07 : Math.min(currentStageW * 0.0475, 70);
      const span = cardW + cardGap;
      const period = span * 6;
      const Lx = currentStageW / 2; // Scanner horizontal center
      const cardTop = 70; // top offset inside belt

      // Canvas DPR sizing
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const beltH = cardH + 140;
      if (canvas.width !== currentStageW * dpr || canvas.height !== beltH * dpr) {
        canvas.width = currentStageW * dpr;
        canvas.height = beltH * dpr;
        canvas.style.width = `${currentStageW}px`;
        canvas.style.height = `${beltH}px`;
      }

      // Auto-speed and hover deceleration
      const autoSpeed = -0.075 * currentStageW;
      const targetSpeed = autoSpeed * (1 - 0.65 * hoverRef.current);

      if (!isDraggingRef.current) {
        velRef.current += (targetSpeed - velRef.current) * (1 - Math.exp(-2.2 * dt));
        offRef.current += velRef.current * dt;
      }

      const off = offRef.current;

      // Prepare canvas for drawing dissolve & sparks
      if (ctx) {
        ctx.save();
        ctx.scale(dpr, dpr);
        ctx.clearRect(0, 0, currentStageW, beltH);
      }

      let activeCrossingCardIdx = -1;
      let activeProgress = 0;

      // Update positions, clip paths, masks, and particles for all 6 cards
      for (let i = 0; i < 6; i++) {
        const cardEl = cardElsRef.current[i];
        const codeEl = codeElsRef.current[i];

        // Card coordinate wrapped in belt
        const x = ((((off + i * span + span) % period) + period) % period) - span;
        const cut = Math.min(cardW, Math.max(0, Lx - x));

        if (cardEl) {
          cardEl.style.transform = `translate3d(${x}px, ${cardTop}px, 0)`;
          cardEl.style.width = `${cardW}px`;
          cardEl.style.height = `${cardH}px`;

          if (cut > 0) {
            // Cut card straight at the scanner line with soft right-corner radius
            cardEl.style.clipPath = `inset(0 0 0 ${cut}px round 0 1.6vw 1.6vw 0)`;
            // CSS Mask softens into the particles over 26px
            cardEl.style.maskImage = `linear-gradient(90deg, transparent ${cut}px, #000 ${cut + 26}px)`;
            cardEl.style.webkitMaskImage = `linear-gradient(90deg, transparent ${cut}px, #000 ${cut + 26}px)`;
          } else {
            cardEl.style.clipPath = 'none';
            cardEl.style.maskImage = 'none';
            cardEl.style.webkitMaskImage = 'none';
          }
        }

        if (codeEl) {
          codeEl.style.transform = `translate3d(${x}px, ${cardTop}px, 0)`;
          codeEl.style.width = `${cardW}px`;
          codeEl.style.height = `${cardH}px`;

          if (cut > 0) {
            codeEl.style.visibility = 'visible';
            // Code block revealed exactly where the card is cut
            codeEl.style.clipPath = `inset(0 ${cardW - cut}px 0 0 round 1.6vw 0 0 1.6vw)`;
          } else {
            codeEl.style.visibility = 'hidden';
            codeEl.style.clipPath = 'none';
          }
        }

        // Check if this card is currently crossing the scanner line
        if (cut > 0 && cut < cardW) {
          activeCrossingCardIdx = i;
          activeProgress = cut / cardW;
        }

        // Canvas Dissolve rendering for crossing card
        if (ctx && cut > 0 && x + cardW > Lx) {
          // 1. Horizontal Haze
          const hazeW = Math.min(150, x + cardW - Lx);
          if (hazeW > 0) {
            const grad = ctx.createLinearGradient(Lx, 0, Lx + hazeW, 0);
            grad.addColorStop(0, 'rgba(255, 96, 40, 0.42)');
            grad.addColorStop(1, 'transparent');
            ctx.fillStyle = grad;
            ctx.fillRect(Lx, cardTop, hazeW, cardH);
          }

          // 2. Dithered Particles in 3px card-local grid
          const R = 0.3 * cardW;
          const startCol = Math.max(0, Math.floor(cut));
          const endCol = Math.min(cardW, Math.floor(cut + R));
          const numRows = Math.floor(cardH / 3);

          const timeSec = now / 1000;
          const twinkleBucket = Math.floor(timeSec * 9) + 97;

          for (let col = startCol; col < endCol; col += 3) {
            const sx = x + col;
            const distFromLine = sx - Lx;
            if (distFromLine < 0) continue;

            const p = Math.pow(Math.max(0, 1 - distFromLine / R), 1.7);

            for (let row = -5; row < numRows + 5; row++) {
              const isInside = row >= 0 && row < numRows;
              const prob = isInside ? p * 0.92 : p * 0.16 * Math.max(0, 1 - Math.abs(row < 0 ? row : row - numRows) / 5);

              // Twinkle skip check (approx 20% dots blink 9x per sec)
              if (hash(col, row, twinkleBucket) < 0.22) continue;

              const hVal = hash(col, row, i);
              if (hVal < prob) {
                const h2 = hash(row, col, i + 31);
                // Color selection
                let color: string;
                if (distFromLine < 10) {
                  // White-hot edge
                  color = PARTICLE_PALETTE[4 + Math.floor(h2 * 3)];
                } else {
                  color = PARTICLE_PALETTE[Math.floor(h2 * h2 * 7)];
                }

                const dotSize = 1.1 + h2 * 1.7;
                const jitterX = (hVal - 0.5) * 1.6;
                const jitterY = (h2 - 0.5) * 1.6;

                const py = cardTop + row * 3 + jitterY;
                const px = sx + jitterX;

                ctx.fillStyle = color;
                ctx.fillRect(px, py, dotSize, dotSize);
              }
            }
          }

          // 3. Spawn Free Sparks (up to 3 per frame)
          for (let s = 0; s < 3; s++) {
            if (Math.random() < 0.7) {
              sparksRef.current.push({
                x: Lx + Math.random() * 30,
                y: cardTop - 10 + Math.random() * (cardH + 20),
                vx: -30 + Math.random() * 70 + velRef.current * 0.6,
                vy: (Math.random() - 0.5) * 50,
                size: 0.8 + Math.random() * 1.8,
                color: PARTICLE_PALETTE[Math.floor(Math.random() * PARTICLE_PALETTE.length)],
                life: 0,
                maxLife: 0.3 + Math.random() * 0.8,
              });
            }
          }
        }
      }

      // Render & Update Free Sparks
      if (ctx) {
        const sparks = sparksRef.current;
        for (let sIdx = sparks.length - 1; sIdx >= 0; sIdx--) {
          const spark = sparks[sIdx];
          spark.life += dt;
          if (spark.life >= spark.maxLife) {
            sparks.splice(sIdx, 1);
            continue;
          }

          spark.x += spark.vx * dt;
          spark.y += spark.vy * dt;

          const alpha = Math.min(1, (spark.maxLife - spark.life) * 2.2);
          ctx.save();
          ctx.globalAlpha = Math.max(0, alpha);
          ctx.fillStyle = spark.color;
          ctx.shadowColor = '#FF5A1F';
          ctx.shadowBlur = 4;
          ctx.fillRect(spark.x, spark.y, spark.size, spark.size);
          ctx.restore();
        }

        ctx.restore();
      }

      // Update Scanner Token Reduction Counter
      if (activeCrossingCardIdx !== -1) {
        const card = TECH_ARTICLES[activeCrossingCardIdx];
        if (currentCrossingCardRef.current !== activeCrossingCardIdx) {
          currentCrossingCardRef.current = activeCrossingCardIdx;
          setPercentText(card.percentLess);
        }
        const targetTokens = Math.round((card.originalTokens - card.distilledTokens) * activeProgress);
        shownNumberRef.current += (targetTokens - shownNumberRef.current) * Math.min(1, dt * 14);

        const formatted = `−${Math.round(shownNumberRef.current).toLocaleString('en-US')}`;
        setTokenCounter(formatted);
      }
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Pointer drag events for scrubbing belt with inertia & reverse reconstruction
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    startXRef.current = e.clientX;
    lastXRef.current = e.clientX;
    lastTRef.current = performance.now();
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const now = performance.now();
    const dx = e.clientX - lastXRef.current;
    const dt = Math.max(0.008, (now - lastTRef.current) / 1000);

    offRef.current += dx;
    velRef.current = (dx / dt) * 0.8 + velRef.current * 0.2;

    lastXRef.current = e.clientX;
    lastTRef.current = now;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
    }
  };

  // Wheel horizontal scrubbing
  const handleWheel = (e: React.WheelEvent) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      velRef.current += -e.deltaX * 6;
    }
  };

  const handleMouseEnter = () => {
    hoverRef.current = 1;
  };

  const handleMouseLeave = () => {
    hoverRef.current = 0;
  };

  return (
    <section
      id="articles"
      className="py-16 sm:py-24 bg-[#0a0c10] border-b border-border-subtle relative overflow-hidden select-none outline-none"
    >
      {/* Anchor aliases so existing #blog and #process links land smoothly */}
      <span id="blog" className="absolute -top-24 left-0" />
      <span id="process" className="absolute -top-24 left-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Hero Copy: Grid of 1fr | 34vw from specification */}
        <div
          ref={ref}
          className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8 sm:mb-12 motion-base ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-200'
          }`}
        >
          {/* Left Column: Eyebrow + Serif Headline */}
          <div className="lg:col-span-7 space-y-3">
            <div className="inline-flex items-center gap-2 font-mono text-xs tracking-wider uppercase text-[#FF5A1F] font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>TECHNICAL PUBLICATIONS // SYSTEMS ARCHITECTURE</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-normal font-serif text-white tracking-tight leading-[1.05]">
              Built for engineers.<br />
              <span className="italic text-[#FF5A1F]">Read by machines.</span>
            </h2>
          </div>

          {/* Right Column: Paragraph + Orange Pill Button */}
          <div className="lg:col-span-5 space-y-5">
            <p className="text-sm sm:text-base text-[#9CA3AF] leading-relaxed">
              Distill detects AI agents, automated telemetry scrapers, and LLMs at the edge, serving a clean, token‑light version of every systems architecture article, without changing a single pixel of what engineers see.
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleCardClick(0)}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#FF5A1F] hover:bg-[#ff7a3c] text-white font-medium text-xs sm:text-sm tracking-wide transition-all shadow-lg hover:shadow-[0_0_25px_rgba(255,90,31,0.5)] hover:-translate-y-0.5 duration-300 font-sans"
              >
                <span>Explore Tech Articles</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
              <span className="text-xs font-mono text-[#6B7280]">
                ← Drag belt to scrub & rebuild
              </span>
            </div>
          </div>
        </div>

        {/* The Belt Container */}
        <div
          ref={beltContainerRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onWheel={handleWheel}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="relative w-full h-[540px] sm:h-[580px] overflow-hidden cursor-grab active:cursor-grabbing border-y border-white/5 bg-[#08090d]"
        >
          {/* THE SCANNER LINE (.scan): Fixed at horizontal center (Lx = 50%) */}
          <div
            className="absolute top-[56px] bottom-[28px] left-1/2 -translate-x-1/2 pointer-events-none z-30"
            style={{ width: '0px' }}
          >
            {/* Glowing Core <i> */}
            <div
              className="absolute top-0 bottom-0 left-[-2px] w-[4px] rounded-full"
              style={{
                background: 'linear-gradient(180deg, #ff7a3c 0%, #FF5A1F 12%, #FF5A1F 88%, #ff7a3c 100%)',
                boxShadow: '0 0 10px 2px rgba(255,90,31,0.85), 0 0 34px 10px rgba(255,90,31,0.38)',
              }}
            />

            {/* Glowing Halo <b> spilling to the card side (right) only */}
            <div
              className="absolute top-[4%] bottom-[4%] left-0 w-[48px] pointer-events-none"
              style={{
                background: 'linear-gradient(90deg, rgba(255,110,50,0.55) 0%, transparent 100%)',
                filter: 'blur(6px)',
              }}
            />

            {/* THE COUNTER BADGE (.badge): Floating above the scanner line */}
            <div className="absolute -top-[48px] left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 whitespace-nowrap z-40">
              <span className="text-[11px] font-sans text-[#8B9098] tracking-wider uppercase font-semibold">
                Token reduction
              </span>
              <div
                className="flex items-center h-[26px] rounded-full overflow-hidden font-mono text-[12px] font-medium shadow-[0_0_20px_rgba(255,90,31,0.4)] border border-white/20"
              >
                {/* Number half (Hot orange) */}
                <span className="bg-[#FF5A1F] text-white px-3 py-1 font-bold tracking-tight">
                  {tokenCounter}
                </span>
                {/* Percent half (Soft orange) */}
                <span className="bg-[#FFE1D3] text-[#D9430F] px-2.5 py-1 text-[11px] font-bold">
                  {percentText}
                </span>
              </div>
            </div>
          </div>

          {/* 1. CODE LAYER (.codes): Positioned left-to-right, masked to fade out towards left edge */}
          <div
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              maskImage: 'linear-gradient(90deg, transparent 0, #000 24vw)',
              WebkitMaskImage: 'linear-gradient(90deg, transparent 0, #000 24vw)',
            }}
          >
            {TECH_ARTICLES.map((article, idx) => (
              <div
                key={`code-${article.id}`}
                ref={(el) => {
                  codeElsRef.current[idx] = el;
                }}
                className="absolute top-[70px] left-0 rounded-[1.6vw] bg-[#0d0f14] border border-white/10 p-5 sm:p-7 overflow-hidden select-text pointer-events-auto"
                style={{
                  willChange: 'transform, clip-path',
                }}
              >
                {/* Code header comments */}
                <div className="flex flex-col sm:flex-row sm:justify-between font-mono text-[11px] text-[#B3B8BF] pb-3 border-b border-white/10 mb-4 opacity-80">
                  <span className="text-[#FF5A1F] font-bold">
                    &lt;!-- distilled: {article.distilledTokens.toLocaleString()} tokens --&gt;
                  </span>
                  <span>
                    &lt;!-- original: {article.originalTokens.toLocaleString()} tokens --&gt;
                  </span>
                  <span className="text-[#888888]">
                    &lt;!-- {article.url} --&gt;
                  </span>
                </div>

                {/* HTML Source code block */}
                <pre className="font-mono text-[11px] sm:text-[12px] text-[#9CA3AF] leading-[1.48] whitespace-pre-wrap overflow-hidden">
                  <code>{article.htmlCode}</code>
                </pre>
              </div>
            ))}
          </div>

          {/* 2. CARDS LAYER (.cards): Real scaled visual technical article cards with image collages */}
          <div className="absolute inset-0 z-20 pointer-events-none">
            {TECH_ARTICLES.map((article, idx) => (
              <div
                key={`card-${article.id}`}
                ref={(el) => {
                  cardElsRef.current[idx] = el;
                }}
                onClick={() => handleCardClick(article.postIdx)}
                className="absolute top-[70px] left-0 rounded-[1.6vw] overflow-hidden select-none cursor-pointer pointer-events-auto shadow-2xl transition-shadow duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
                style={{
                  willChange: 'transform, clip-path',
                }}
              >
                {/* CARD 1: AWS Multi-Cloud Migration (Full-Bleed Network Fabric) */}
                {article.id === 'aws-migration' && (
                  <div
                    className="w-full h-full p-6 sm:p-8 flex flex-col justify-between text-white relative"
                    style={{
                      backgroundImage: `linear-gradient(180deg, rgba(8,12,24,0.45) 0%, rgba(8,12,24,0.3) 30%, rgba(8,12,24,0.88) 100%), url(${ASSETS.network})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-white/20 pb-3">
                      <span className="font-bold tracking-tight text-lg sm:text-xl font-sans flex items-center gap-2">
                        <Terminal className="w-5 h-5 text-[#FF5A1F]" />
                        <span>NADITHA GALLELLA // ARCHITECTURE</span>
                      </span>
                      <span className="font-mono text-xs uppercase px-2.5 py-0.5 rounded-full border border-white/40 text-white/90">
                        {article.category}
                      </span>
                    </div>

                    {/* Title & Subtitle */}
                    <div className="my-auto space-y-2 max-w-xl">
                      <span className="font-mono text-[11px] text-[#FF8A3D] uppercase tracking-wider font-semibold">
                        {article.badge}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-snug">
                        {article.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-white/80 line-clamp-2">
                        {article.subtitle}
                      </p>
                    </div>

                    {/* Bottom Stats */}
                    <div className="flex items-end justify-between border-t border-white/20 pt-3">
                      <div className="flex items-center gap-6">
                        {article.stats.map((s, sIdx) => (
                          <div key={sIdx}>
                            <div className="text-xl sm:text-3xl font-light tracking-tight text-white">
                              {s.value}
                            </div>
                            <div className="text-[10px] font-mono uppercase text-white/70">
                              {s.label}
                            </div>
                          </div>
                        ))}
                      </div>
                      <span className="text-xs font-mono text-[#FF8A3D] flex items-center gap-1 hover:underline">
                        <span>Read Article</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                )}

                {/* CARD 2: Hardened Linux & Immutable Storage (Datacenter Server Rack) */}
                {article.id === 'ransomware-defense' && (
                  <div
                    className="w-full h-full p-6 sm:p-8 flex flex-col justify-between text-white relative overflow-hidden"
                    style={{
                      backgroundImage: `linear-gradient(180deg, rgba(12,18,14,0.5) 0%, rgba(12,18,14,0.85) 100%), url(${ASSETS.datacenter})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  >
                    <div className="flex items-center justify-between border-b border-white/20 pb-3">
                      <span className="font-bold tracking-tight text-lg sm:text-xl font-sans flex items-center gap-2">
                        <FileCode2 className="w-5 h-5 text-[#34d399]" />
                        <span>NADITHA GALLELLA // SECURITY</span>
                      </span>
                      <span className="font-mono text-xs uppercase px-2.5 py-0.5 rounded-full border border-[#34d399]/60 text-[#34d399]">
                        {article.category}
                      </span>
                    </div>

                    <div className="my-auto space-y-2 max-w-xl">
                      <span className="font-mono text-[11px] text-[#34d399] uppercase tracking-wider font-semibold">
                        {article.badge}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-snug">
                        {article.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-white/80 line-clamp-2">
                        {article.subtitle}
                      </p>
                    </div>

                    <div className="flex items-end justify-between border-t border-white/20 pt-3">
                      <div className="flex items-center gap-6">
                        {article.stats.map((s, sIdx) => (
                          <div key={sIdx}>
                            <div className="text-xl sm:text-3xl font-light tracking-tight text-white">
                              {s.value}
                            </div>
                            <div className="text-[10px] font-mono uppercase text-white/70">
                              {s.label}
                            </div>
                          </div>
                        ))}
                      </div>
                      <span className="text-xs font-mono text-[#34d399] flex items-center gap-1 hover:underline">
                        <span>Read Deep-Dive</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                )}

                {/* CARD 3: Windows Hyper-V S2D & RoCEv2 (Code / Enterprise Infrastructure) */}
                {article.id === 'hyper-v-cluster' && (
                  <div
                    className="w-full h-full p-6 sm:p-8 flex flex-col justify-between text-white relative overflow-hidden"
                    style={{
                      backgroundImage: `linear-gradient(180deg, rgba(18,12,28,0.55) 0%, rgba(18,12,28,0.9) 100%), url(${ASSETS.code})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  >
                    <div className="flex items-center justify-between border-b border-white/20 pb-3">
                      <span className="font-bold tracking-tight text-lg sm:text-xl font-sans flex items-center gap-2">
                        <Terminal className="w-5 h-5 text-[#a78bfa]" />
                        <span>NADITHA GALLELLA // VIRTUALIZATION</span>
                      </span>
                      <span className="font-mono text-xs uppercase px-2.5 py-0.5 rounded-full border border-[#a78bfa]/60 text-[#a78bfa]">
                        {article.category}
                      </span>
                    </div>

                    <div className="my-auto space-y-2 max-w-xl">
                      <span className="font-mono text-[11px] text-[#a78bfa] uppercase tracking-wider font-semibold">
                        {article.badge}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-snug">
                        {article.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-white/80 line-clamp-2">
                        {article.subtitle}
                      </p>
                    </div>

                    <div className="flex items-end justify-between border-t border-white/20 pt-3">
                      <div className="flex items-center gap-6">
                        {article.stats.map((s, sIdx) => (
                          <div key={sIdx}>
                            <div className="text-xl sm:text-3xl font-light tracking-tight text-white">
                              {s.value}
                            </div>
                            <div className="text-[10px] font-mono uppercase text-white/70">
                              {s.label}
                            </div>
                          </div>
                        ))}
                      </div>
                      <span className="text-xs font-mono text-[#a78bfa] flex items-center gap-1 hover:underline">
                        <span>Read Case Study</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                )}

                {/* CARD 4: Custom ESP32 Server Rack Telemetry (DUAL-IMAGE COLLAGE: PCB + Soldering Workbench) */}
                {article.id === 'esp32-telemetry' && (
                  <div className="w-full h-full p-6 sm:p-8 flex flex-col justify-between text-white bg-[#1B1311]">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <span className="font-bold tracking-tight text-lg sm:text-xl font-sans flex items-center gap-2">
                        <Terminal className="w-5 h-5 text-[#f43f5e]" />
                        <span>NADITHA GALLELLA // EMBEDDED</span>
                      </span>
                      <span className="font-mono text-xs uppercase px-2.5 py-0.5 rounded-full border border-[#f43f5e]/60 text-[#f43f5e]">
                        {article.category}
                      </span>
                    </div>

                    {/* Image Collage Row: Circuit Board Tile + Soldering Workbench Tile + Summary Quote */}
                    <div className="grid grid-cols-12 gap-3 my-auto items-center">
                      <div
                        className="col-span-4 h-28 sm:h-32 rounded-xl bg-cover bg-center shadow-lg border border-white/15"
                        style={{ backgroundImage: `url(${ASSETS.pcb})` }}
                      />
                      <div
                        className="col-span-4 h-28 sm:h-32 rounded-xl bg-cover bg-center shadow-lg border border-white/15"
                        style={{ backgroundImage: `url(${ASSETS.soldering})` }}
                      />
                      <div className="col-span-4 pl-2 space-y-1">
                        <span className="font-mono text-[9px] uppercase tracking-wider text-[#f43f5e] font-bold">
                          PCB FABRICATION
                        </span>
                        <p className="font-serif text-xs sm:text-sm leading-snug text-white/90">
                          From Silicon to Hypervisor: <span className="italic text-[#FF8A3D]">Custom ESP32 telemetry boards with FreeRTOS.</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center text-xs font-mono text-white/70 border-t border-white/10 pt-3">
                      <div className="flex items-center gap-5">
                        {article.stats.map((s, sIdx) => (
                          <span key={sIdx} className="text-[11px]">
                            <strong className="text-white">{s.value}</strong> {s.label}
                          </span>
                        ))}
                      </div>
                      <span className="text-[#FF5A1F] hover:underline">
                        Hardware Postmortem →
                      </span>
                    </div>
                  </div>
                )}

                {/* CARD 5: Zero-Trust Perimeter (Full-Bleed Glowing Fiber Optics) */}
                {article.id === 'zero-trust-vlan' && (
                  <div
                    className="w-full h-full p-6 sm:p-8 flex flex-col justify-between text-white relative overflow-hidden"
                    style={{
                      backgroundImage: `linear-gradient(180deg, rgba(8,16,28,0.5) 0%, rgba(8,16,28,0.85) 100%), url(${ASSETS.fiber})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  >
                    <div className="flex items-center justify-between border-b border-white/20 pb-3">
                      <span className="font-bold tracking-tight text-lg sm:text-xl font-sans flex items-center gap-2">
                        <Terminal className="w-5 h-5 text-[#f59e0b]" />
                        <span>NADITHA GALLELLA // NETWORKING</span>
                      </span>
                      <span className="font-mono text-xs uppercase px-2.5 py-0.5 rounded-full border border-[#f59e0b]/60 text-[#f59e0b]">
                        {article.category}
                      </span>
                    </div>

                    <div className="my-auto space-y-2 max-w-xl">
                      <span className="font-mono text-[11px] text-[#f59e0b] uppercase tracking-wider font-semibold">
                        {article.badge}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-snug">
                        {article.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-white/80 line-clamp-2">
                        {article.subtitle}
                      </p>
                    </div>

                    <div className="flex items-end justify-between border-t border-white/20 pt-3">
                      <div className="flex items-center gap-6">
                        {article.stats.map((s, sIdx) => (
                          <div key={sIdx}>
                            <div className="text-xl sm:text-3xl font-light tracking-tight text-white">
                              {s.value}
                            </div>
                            <div className="text-[10px] font-mono uppercase text-white/70">
                              {s.label}
                            </div>
                          </div>
                        ))}
                      </div>
                      <span className="text-xs font-mono text-[#f59e0b] flex items-center gap-1 hover:underline">
                        <span>Read Network Rule</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                )}

                {/* CARD 6: Technical Journal (THREE-IMAGE COLLAGE: Field Notes & Case Studies) */}
                {article.id === 'siem-tuning' && (
                  <div className="w-full h-full p-6 sm:p-8 flex flex-col justify-between text-[#121A2A] bg-[#E9ECF1]">
                    <div className="flex items-center justify-between border-b border-[#121A2A]/15 pb-2">
                      <span className="font-bold tracking-tight text-lg sm:text-xl font-sans text-[#121A2A] flex items-center gap-2">
                        <FileCode2 className="w-5 h-5 text-[#1F3FB0]" />
                        <span>NADITHA GALLELLA // FIELD LOGBOOK</span>
                      </span>
                      <span className="font-mono text-xs uppercase px-2.5 py-0.5 rounded-full border border-[#121A2A] text-[#121A2A]">
                        {article.category}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-serif text-xl sm:text-2xl text-[#121A2A] font-normal leading-snug">
                        Technical Journal <span className="italic text-[#46618E]">field notes from the production frontlines</span>
                      </h3>
                    </div>

                    {/* Three Thumbnail Image Collage */}
                    <div className="grid grid-cols-3 gap-3 my-auto">
                      <div className="space-y-1">
                        <div
                          className="w-full h-16 sm:h-20 rounded-lg bg-cover bg-center shadow-sm"
                          style={{ backgroundImage: `url(${ASSETS.saltflat})` }}
                        />
                        <div className="text-[9px] font-mono text-[#6A7891] uppercase">
                          SIEM & AUDIT
                        </div>
                        <div className="text-[10px] font-bold text-[#121A2A] line-clamp-1">
                          Tuning Rapid7 SIEM for SOC 2
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div
                          className="w-full h-16 sm:h-20 rounded-lg bg-cover bg-center shadow-sm"
                          style={{ backgroundImage: `url(${ASSETS.mesa})` }}
                        />
                        <div className="text-[9px] font-mono text-[#6A7891] uppercase">
                          FAILOVER DRILL
                        </div>
                        <div className="text-[10px] font-bold text-[#121A2A] line-clamp-1">
                          S2D RoCEv2 Recovery
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div
                          className="w-full h-16 sm:h-20 rounded-lg bg-cover bg-center shadow-sm"
                          style={{ backgroundImage: `url(${ASSETS.dunes})` }}
                        />
                        <div className="text-[9px] font-mono text-[#6A7891] uppercase">
                          CLOUD TRANSIT
                        </div>
                        <div className="text-[10px] font-bold text-[#121A2A] line-clamp-1">
                          WireGuard Mesh Runbook
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center text-xs font-mono text-[#121A2A]/80 border-t border-[#121A2A]/15 pt-2">
                      <span className="font-semibold">6 Production Architecture Case Studies</span>
                      <span className="text-[#1F3FB0] font-bold hover:underline">
                        Browse Full Logbook →
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* 3. CANVAS FX LAYER (.fx): Draws real-time haze, dithered particles, and sparks */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none z-25"
          />
        </div>

        {/* Section Footer Telemetry Strip */}
        <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-[#6B7280] border-t border-white/5 pt-4">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-[#FF5A1F]">
              <span className="w-2 h-2 rounded-full bg-[#FF5A1F] animate-pulse" />
              SCANNER ENGINE: ACTIVE
            </span>
            <span>•</span>
            <span>CARD LOCAL 3PX PARTICLE DISSOLVE</span>
            <span>•</span>
            <span>REAL-TIME TOKEN SCRUBBER</span>
          </div>
          <div>
            Click any article card to read full architecture postmortem & verified metrics
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogShowcase;
