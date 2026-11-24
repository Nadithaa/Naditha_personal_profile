import React, { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, Copy } from 'lucide-react';
import { portfolioConfig } from '../../data/portfolio.config';
import { ProjectItem, BlogPostItem } from '../../types';

interface TerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject: (project: ProjectItem) => void;
  onSelectArticle: (post: BlogPostItem) => void;
  onToast: (msg: string) => void;
}

interface HistoryItem {
  id: string;
  command: string;
  output: React.ReactNode;
  time: string;
}

export const TerminalModal: React.FC<TerminalModalProps> = ({
  isOpen,
  onClose,
  onSelectProject,
  onSelectArticle,
  onToast,
}) => {
  const [inputVal, setInputVal] = useState('');
  const [isMaximized, setIsMaximized] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [cmdIndex, setCmdIndex] = useState<number>(-1);
  const [pastCommands, setPastCommands] = useState<string[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Scroll to bottom on new output
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  // Initial welcome greeting
  useEffect(() => {
    if (history.length === 0) {
      setHistory([
        {
          id: 'welcome',
          command: 'motd',
          time: new Date().toLocaleTimeString(),
          output: (
            <div className="space-y-2 text-xs font-mono">
              <div className="text-[#00f0ff] font-bold">
                Naditha Gallella // Systems & Cloud Infrastructure Terminal [v2.4-prod]
              </div>
              <div className="text-[#888888]">
                Type <span className="text-[#00f0ff] font-semibold">help</span> to view available system commands or <span className="text-[#00f0ff] font-semibold">neofetch</span> for host specifications.
              </div>
            </div>
          ),
        },
      ]);
    }
  }, [history.length]);

  if (!isOpen) return null;

  const handleCommand = (rawCmd: string) => {
    const trimmed = rawCmd.trim();
    if (!trimmed) return;

    setPastCommands((prev) => [...prev, trimmed]);
    setCmdIndex(-1);

    const parts = trimmed.split(' ');
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1).join(' ').trim();
    const time = new Date().toLocaleTimeString();
    const id = `${Date.now()}-${Math.random()}`;

    let output: React.ReactNode = null;

    switch (cmd) {
      case 'help':
        output = (
          <div className="space-y-1.5 text-xs font-mono text-[#CCCCCC]">
            <div className="text-[#00f0ff] font-bold pb-1">AVAILABLE UTILITIES &amp; SYSTEM COMMANDS:</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-[11px]">
              <div><span className="text-[#00f0ff] font-semibold">neofetch</span> - Display system architecture &amp; homelab spec</div>
              <div><span className="text-[#00f0ff] font-semibold">projects</span> - List verified production projects &amp; case studies</div>
              <div><span className="text-[#00f0ff] font-semibold">project &lt;n&gt;</span> - Open project by index (e.g. `project 1`)</div>
              <div><span className="text-[#00f0ff] font-semibold">blog</span> - List published engineering field notes &amp; runbooks</div>
              <div><span className="text-[#00f0ff] font-semibold">article &lt;n&gt;</span> - Open article by index (e.g. `article 1`)</div>
              <div><span className="text-[#00f0ff] font-semibold">skills</span> - Print cloud, networking &amp; kernel skill matrix</div>
              <div><span className="text-[#00f0ff] font-semibold">uptime</span> - Query infrastructure availability &amp; SLA stats</div>
              <div><span className="text-[#00f0ff] font-semibold">ping &lt;host&gt;</span> - Run ICMP latency probe (e.g. `ping aws`)</div>
              <div><span className="text-[#00f0ff] font-semibold">whoami</span> - Display current user context</div>
              <div><span className="text-[#00f0ff] font-semibold">contact</span> - Output direct email, LinkedIn, and GitHub links</div>
              <div><span className="text-[#00f0ff] font-semibold">clear</span> - Clear terminal buffer</div>
              <div><span className="text-[#00f0ff] font-semibold">exit</span> - Terminate shell session</div>
            </div>
          </div>
        );
        break;

      case 'neofetch':
      case 'fetch':
        output = (
          <div className="space-y-2 text-xs font-mono">
            <pre className="text-[#00f0ff] text-[10px] sm:text-xs leading-none select-none">
{`   _____ __    ____  __  ______  
  / ___// /   / __ \\/ / / / __ \\ 
  \\__ \\/ /   / / / / / / / / / / 
 ___/ / /___/ /_/ / /_/ / /_/ /  
/____/_____/\\____/\\____/_____/   `}
            </pre>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs border-t border-white/10 pt-2 text-[#A1A1A1]">
              <div><span className="text-white font-semibold">Operator:</span> {portfolioConfig.name}</div>
              <div><span className="text-white font-semibold">Role:</span> {portfolioConfig.roleTitle}</div>
              <div><span className="text-white font-semibold">OS Host:</span> Ubuntu 22.04 LTS / Windows Server 2022</div>
              <div><span className="text-white font-semibold">Hypervisor:</span> Hyper-V Failover Cluster &amp; Proxmox VE</div>
              <div><span className="text-white font-semibold">Compute:</span> 3-Node Supermicro / 150+ Production VMs</div>
              <div><span className="text-white font-semibold">Interconnect:</span> Mellanox 25GbE RoCEv2 RDMA Fabric</div>
              <div><span className="text-white font-semibold">Cloud Mesh:</span> AWS (Control Tower, ECS, DMS), Azure, OCI</div>
              <div><span className="text-white font-semibold">Network:</span> OPNsense Hardware Appliance, WireGuard Mesh</div>
              <div><span className="text-white font-semibold">IoT Hardware:</span> Custom ESP32 PCB with LiPo &amp; TVS Diodes</div>
              <div><span className="text-white font-semibold">Availability:</span> 99.98% SLA across production workloads</div>
            </div>
          </div>
        );
        break;

      case 'projects':
        output = (
          <div className="space-y-2 text-xs font-mono">
            <div className="text-[#00f0ff] font-bold">ENTERPRISE CASE STUDIES &amp; ARCHITECTURE DELIVERABLES:</div>
            <div className="space-y-1.5">
              {portfolioConfig.projects.map((p, idx) => (
                <div key={p.id} className="flex items-start gap-2">
                  <span className="text-[#00f0ff] font-semibold w-6">[{idx + 1}]</span>
                  <button
                    onClick={() => {
                      onSelectProject(p);
                      onClose();
                    }}
                    className="text-left text-white hover:text-[#00f0ff] hover:underline transition-colors"
                  >
                    {p.title}
                  </button>
                  <span className="text-[#666666] text-[10px]">({p.domain})</span>
                </div>
              ))}
            </div>
            <div className="text-[#888888] text-[11px] pt-1">
              Tip: Type <span className="text-[#00f0ff]">project 1</span> to directly launch Project 1.
            </div>
          </div>
        );
        break;

      case 'project': {
        const num = parseInt(args, 10);
        if (!isNaN(num) && num >= 1 && num <= portfolioConfig.projects.length) {
          const target = portfolioConfig.projects[num - 1];
          onSelectProject(target);
          onClose();
          return;
        }
        output = <div className="text-[#f87171] text-xs font-mono">Invalid index. Please run `projects` to inspect numbers (1 to {portfolioConfig.projects.length}).</div>;
        break;
      }

      case 'blog':
      case 'articles': {
        const blogPosts = portfolioConfig.blogPosts || [];
        output = (
          <div className="space-y-2 text-xs font-mono">
            <div className="text-[#00f0ff] font-bold">SYSTEMS ENGINEERING PUBLICATIONS &amp; FIELD NOTES:</div>
            <div className="space-y-1.5">
              {blogPosts.map((post, idx) => (
                <div key={post.id} className="flex items-start gap-2">
                  <span className="text-[#00f0ff] font-semibold w-6">[{idx + 1}]</span>
                  <button
                    onClick={() => {
                      onSelectArticle(post);
                      onClose();
                    }}
                    className="text-left text-white hover:text-[#00f0ff] hover:underline transition-colors"
                  >
                    {post.title}
                  </button>
                  <span className="text-[#666666] text-[10px]">({post.readTime})</span>
                </div>
              ))}
            </div>
            <div className="text-[#888888] text-[11px] pt-1">
              Tip: Type <span className="text-[#00f0ff]">article 1</span> to read Article 1.
            </div>
          </div>
        );
        break;
      }

      case 'article': {
        const blogPosts = portfolioConfig.blogPosts || [];
        const num = parseInt(args, 10);
        if (!isNaN(num) && num >= 1 && num <= blogPosts.length) {
          const target = blogPosts[num - 1];
          onSelectArticle(target);
          onClose();
          return;
        }
        output = <div className="text-[#f87171] text-xs font-mono">Invalid article index. Run `blog` to view available items (1 to {blogPosts.length}).</div>;
        break;
      }

      case 'skills':
        output = (
          <div className="space-y-2 text-xs font-mono">
            <div className="text-[#00f0ff] font-bold">TECHNICAL SKILL STACK:</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px]">
              {portfolioConfig.skillCategories.map((cat, idx) => (
                <div key={idx} className="bg-white/5 p-2 rounded border border-white/5">
                  <div className="text-white font-semibold text-xs mb-1">{cat.category}</div>
                  <div className="text-[#888888]">
                    {cat.skills.map((s) => s.name).join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
        break;

      case 'uptime':
        output = (
          <div className="space-y-1 text-xs font-mono text-[#4ADE80]">
            <div>● System Status: OPERATIONAL</div>
            <div className="text-[#EDEDED]">Production SLA: 99.98% across 150+ VMs</div>
            <div className="text-[#EDEDED]">Active WireGuard Mesh Links: 18+ Tunnels (0 packet loss)</div>
            <div className="text-[#EDEDED]">Ransomware RPO Target: &lt; 15 min via Immutable XFS</div>
          </div>
        );
        break;

      case 'whoami':
        output = (
          <div className="text-xs font-mono text-[#00f0ff]">
            guest@naditha-edge-gateway:~$ (Session authenticated via interactive CLI)
          </div>
        );
        break;

      case 'ping': {
        const target = args || 'aws.amazon.com';
        output = (
          <div className="space-y-1 text-xs font-mono text-[#A1A1A1]">
            <div>PING {target} (52.94.236.248): 56 data bytes</div>
            <div>64 bytes from 52.94.236.248: icmp_seq=0 ttl=58 time=14.28 ms</div>
            <div>64 bytes from 52.94.236.248: icmp_seq=1 ttl=58 time=14.51 ms</div>
            <div>64 bytes from 52.94.236.248: icmp_seq=2 ttl=58 time=14.19 ms</div>
            <div>64 bytes from 52.94.236.248: icmp_seq=3 ttl=58 time=14.33 ms</div>
            <div className="text-[#4ADE80] pt-1">--- {target} ping statistics: 4 packets transmitted, 4 received, 0% packet loss ---</div>
          </div>
        );
        break;
      }

      case 'contact':
      case 'email':
        output = (
          <div className="space-y-1.5 text-xs font-mono">
            <div className="text-[#00f0ff] font-bold">DIRECT COMMUNICATIONS:</div>
            <div>Email: <a href={`mailto:${portfolioConfig.email}`} className="text-white underline hover:text-[#00f0ff]">{portfolioConfig.email}</a></div>
            <div>GitHub: <a href={portfolioConfig.github} target="_blank" rel="noreferrer" className="text-white underline hover:text-[#00f0ff]">{portfolioConfig.github}</a></div>
            <div>LinkedIn: <a href={portfolioConfig.linkedin} target="_blank" rel="noreferrer" className="text-white underline hover:text-[#00f0ff]">{portfolioConfig.linkedin}</a></div>
            <button
              onClick={() => {
                navigator.clipboard.writeText(portfolioConfig.email);
                onToast(`Copied ${portfolioConfig.email} to clipboard.`);
              }}
              className="inline-flex items-center gap-1.5 text-[11px] text-[#4ADE80] hover:underline pt-1"
            >
              <Copy className="w-3 h-3" />
              <span>Click to copy email address</span>
            </button>
          </div>
        );
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      case 'exit':
      case 'quit':
        onClose();
        return;

      default:
        output = (
          <div className="text-xs font-mono text-[#f87171]">
            command not found: {cmd}. Type <span className="text-[#00f0ff]">help</span> to see available commands.
          </div>
        );
        break;
    }

    setHistory((prev) => [
      ...prev,
      {
        id,
        command: rawCmd,
        time,
        output,
      },
    ]);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (pastCommands.length > 0) {
        const nextIdx = cmdIndex === -1 ? pastCommands.length - 1 : Math.max(0, cmdIndex - 1);
        setCmdIndex(nextIdx);
        setInputVal(pastCommands[nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (cmdIndex !== -1) {
        const nextIdx = cmdIndex + 1;
        if (nextIdx >= pastCommands.length) {
          setCmdIndex(-1);
          setInputVal('');
        } else {
          setCmdIndex(nextIdx);
          setInputVal(pastCommands[nextIdx]);
        }
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const available = ['help', 'neofetch', 'projects', 'project', 'blog', 'article', 'skills', 'uptime', 'ping', 'whoami', 'contact', 'clear', 'exit'];
      const match = available.find((c) => c.startsWith(inputVal.trim().toLowerCase()));
      if (match) {
        setInputVal(match);
      }
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Systems Interactive CLI Terminal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className={`relative w-full bg-[#08090d] border border-white/15 rounded-xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 font-mono ${
          isMaximized ? 'h-[95vh] max-w-[95vw]' : 'h-[620px] max-w-3xl'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title Bar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-[#0f1117] border-b border-white/10 select-none">
          <div className="flex items-center gap-2 text-xs text-[#A1A1A1]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#f43f5e] inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#fbbf24] inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#34d399] inline-block" />
            <span className="ml-2 font-semibold text-white flex items-center gap-1.5">
              <TerminalIcon className="w-3.5 h-3.5 text-[#00f0ff]" />
              <span>naditha@infra-gw-01:~ (bash)</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMaximized(!isMaximized)}
              aria-label={isMaximized ? 'Restore window size' : 'Maximize window'}
              className="p-1 text-[#888888] hover:text-white rounded hover:bg-white/5 transition-colors"
            >
              {isMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={onClose}
              aria-label="Close terminal"
              className="p-1 text-[#888888] hover:text-white rounded hover:bg-white/5 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Terminal Body */}
        <div
          className="flex-1 p-4 overflow-y-auto space-y-3 font-mono text-xs text-[#EDEDED] selection:bg-[#00f0ff]/30 selection:text-white"
          onClick={() => inputRef.current?.focus()}
        >
          {history.map((item) => (
            <div key={item.id} className="space-y-1">
              <div className="flex items-center gap-2 text-[#888888]">
                <span className="text-[#34d399] font-semibold">naditha@infra-gw-01</span>
                <span>:</span>
                <span className="text-[#38bdf8]">~</span>
                <span className="text-white">$ {item.command}</span>
                <span className="ml-auto text-[10px] text-[#555555]">{item.time}</span>
              </div>
              <div className="pl-3 border-l-2 border-[#00f0ff]/20 py-0.5">{item.output}</div>
            </div>
          ))}

          {/* Active Input Line */}
          <div className="flex items-center gap-2 pt-1">
            <span className="text-[#34d399] font-semibold">naditha@infra-gw-01</span>
            <span>:</span>
            <span className="text-[#38bdf8]">~</span>
            <span className="text-[#00f0ff] font-bold">$</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
              spellCheck={false}
              autoComplete="off"
              className="flex-1 bg-transparent text-white focus:outline-none caret-[#00f0ff] font-mono text-xs"
              placeholder="Type a command (try 'help' or 'neofetch')..."
            />
          </div>

          <div ref={bottomRef} />
        </div>

        {/* Footer Status Bar */}
        <div className="px-4 py-1.5 bg-[#0b0d12] border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-[#666666]">
          <div className="flex items-center gap-3">
            <span>PORT: 51820 (WireGuard)</span>
            <span>ENCRYPTION: ChaCha20-Poly1305</span>
          </div>
          <div className="flex items-center gap-2">
            <span>Tab: Autocomplete</span>
            <span>·</span>
            <span>ESC: Close</span>
          </div>
        </div>
      </div>
    </div>
  );
};
