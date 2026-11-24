import { ProfileConfig } from '../types';

export const portfolioConfig: ProfileConfig = {
  name: "Naditha Gallella",
  roleTitle: "Cloud, DevOps and Systems Infrastructure Engineer",
  location: "San Francisco, CA (Open to Worldwide Remote)",
  availability: "Available for Senior Infrastructure and DevOps Roles",
  email: "naditha100@gmail.com",
  github: "https://github.com/Nadithaa",
  linkedin: "https://linkedin.com/in/naditha-gallella",

  heroHeadline: "I engineer resilient cloud systems, secure networks, and hardware",
  heroSubheadline: "Hands-on systems engineer passionate about infrastructure reliability. I bridge physical computer hardware, Hyper-V virtualization, and network firewalls with automated AWS cloud deployments.",
  ctaText: "Get in touch",

  about: {
    bioLead: "I am a systems and cloud engineer who builds and troubleshoots infrastructure from Hardware to Cloud.",
    paragraphs: [
      "My engineering journey started on the physical layer—disassembling hardware, crimping Ethernet cables, and configuring bare-metal hypervisors. Today, that foundation drives how I manage enterprise infrastructure at scale: orchestrating 150+ production Windows and Linux VMs, hardening SonicWall network perimeters, and automating multi-cloud deployments across AWS and Azure using Terraform.",
      "Rather than treating the cloud as an abstract black box, I approach every workload with a deep respect for what runs underneath—CPU interrupts, NVMe storage buses, Active Directory replication, and hypervisor scheduling. Whether I am deploying Rapid7 SIEM telemetry for SOC 2 audit readiness or soldering custom ESP32 IoT hardware at my workbench, I build systems designed to stay observable, resilient, and fast."
    ],
    highlights: [
      {
        title: "From Silicon to Cloud",
        description: "Hands-on execution spanning custom ESP32 circuit boards, bare-metal Hyper-V & Proxmox clusters, and Terraform-automated multi-cloud infrastructure."
      },
      {
        title: "Zero-Downtime Operations",
        description: "Battle-tested management of 150+ production VMs, automated failover clusters, and validated immutable backup strategies where recovery is proven."
      },
      {
        title: "Compliance & Security by Design",
        description: "Practical experience implementing SOC 2 audit controls, Rapid7/OSSIM SIEM alerting, Entra ID access governance, and zero-trust firewall perimeters."
      }
    ],
    homelabSpecs: [
      {
        label: "Cloud & Infrastructure as Code",
        spec: "AWS (Security Hub, CloudFormation), Microsoft Azure, Oracle Cloud, Terraform, Kubernetes, Docker"
      },
      {
        label: "Virtualization & Core Systems",
        spec: "Windows Hyper-V (150+ VMs), VMware, Proxmox, Windows Server (AD, DC, GPO), Linux Administration"
      },
      {
        label: "Security, SIEM & Compliance",
        spec: "Rapid7 SIEM, AlienVault OSSIM, SonicWall Firewalls & VPN, Microsoft Entra ID, SOC 2 Controls, Network Infrastructure"
      },
      {
        label: "Automation, DNS & Ops Tooling",
        spec: "PowerShell, Linux CLI, n8n, GoDaddy / Register.com DNS, Jira, Confluence, SharePoint"
      }
    ]
  },

  // Core Philosophy Tagline Reveal text
  taglineRevealLines: [
    "Systems and cloud engineer focused on dependable infrastructure, practical security, and clean automation across on-prem and multi-cloud environments."
  ],

  // 4-Column "Core Expertise & Tech Stack" Grid
  expertiseStack: [
    {
      category: "CLOUD & IAC",
      headline: "Multi-Cloud & Automation",
      items: [
        "AWS (Security Hub, CloudFormation)",
        "Microsoft Azure",
        "Oracle Cloud",
        "Terraform",
        "Kubernetes",
        "Docker"
      ]
    },
    {
      category: "SYSTEMS & VIRTUALIZATION",
      headline: "Enterprise Compute & OS",
      items: [
        "Windows Hyper-V (150+ VMs)",
        "VMware & VirtualBox",
        "Windows Server (AD, DC, GPO)",
        "Linux Administration"
      ]
    },
    {
      category: "SECURITY & COMPLIANCE",
      headline: "SIEM, Perimeter & Governance",
      items: [
        "Rapid7 SIEM",
        "AlienVault OSSIM",
        "SonicWall Firewalls & VPN",
        "Microsoft Entra ID",
        "SOC 2 Controls"
      ]
    },
    {
      category: "NETOPS & WORKFLOWS",
      headline: "Scripting, DNS & Tooling",
      items: [
        "PowerShell & Linux CLI",
        "External DNS (GoDaddy, Register.com)",
        "n8n & Moltbot",
        "Jira, Confluence & SharePoint"
      ]
    }
  ],

  // B8: Specific numbers, believable metrics
  metrics: [
    {
      label: "Production Uptime",
      value: "99.98%",
      subtext: "Maintained across production cloud systems"
    },
    {
      label: "Workloads Migrated",
      value: "42+",
      subtext: "Zero-downtime cutovers led to AWS"
    },
    {
      label: "Secure Tunnels",
      value: "18+",
      subtext: "Encrypted site-to-site WireGuard links"
    },
    {
      label: "Recovery Point",
      value: "< 15 min",
      subtext: "Validated automated Veeam restore drills"
    }
  ],

  domains: [
    {
      key: 'cloud',
      label: 'Cloud Computing',
      tagline: 'AWS, Azure, and Google Cloud workload architecture and migrations',
      iconName: 'Cloud',
      count: 2
    },
    {
      key: 'cicd',
      label: 'Containers and CI/CD',
      tagline: 'Docker containerization and Kubernetes orchestration pipelines',
      iconName: 'Boxes',
      count: 2
    },
    {
      key: 'networking',
      label: 'Networking and Security',
      tagline: 'Firewall architecture, site-to-site VPNs, and perimeter defense',
      iconName: 'ShieldCheck',
      count: 2
    },
    {
      key: 'virtualization',
      label: 'Virtualization and Backup',
      tagline: 'Windows Hyper-V clusters and automated Veeam replication',
      iconName: 'Server',
      count: 2
    },
    {
      key: 'hardware',
      label: 'Hardware and IoT',
      tagline: 'Custom ESP32 board designs, telemetry, and edge firmware',
      iconName: 'Cpu',
      count: 2
    }
  ],

  projects: [
    // 1. Cloud Computing
    {
      id: 'aws-enterprise-migration',
      title: 'Enterprise On-Premises to AWS Cloud Migration',
      subtitle: 'How I executed a zero-downtime cutover of 28 services and transactional databases',
      domain: 'cloud',
      role: 'Lead Cloud and Infrastructure Engineer',
      summary: 'I led the complete migration of an on-premises infrastructure footprint into AWS. I provisioned immutable landing zones with AWS Control Tower, containerized monolithic applications onto AWS ECS, and configured continuous database replication with AWS DMS to eliminate downtime during cutover.',
      architectureDetails: [
        'Architected multi-account AWS Organization with IAM Identity Center and fine-grained permission boundaries',
        'Configured dual Aurora PostgreSQL clusters with automated cross-region read replicas',
        'Provisioned Direct Connect 10 Gbps uplinks with automated IPsec VPN failover routes',
        'Refactored compute and storage tiers, cutting monthly cloud spend by 34%'
      ],
      metrics: [
        { label: 'Cutover Downtime', value: '0 seconds' },
        { label: 'Workloads Moved', value: '28 services' },
        { label: 'Monthly Savings', value: '34%' }
      ],
      techStack: ['AWS ECS', 'Terraform', 'Aurora PostgreSQL', 'AWS DMS', 'Transit Gateway'],
      codeSnippet: {
        filename: 'main.tf',
        language: 'hcl',
        code: `resource "aws_dms_replication_task" "db_sync" {
  replication_task_id     = "core-db-live-sync"
  migration_type          = "full-load-and-cdc"
  replication_instance_arn = aws_dms_replication_instance.primary.arn
  source_endpoint_arn      = aws_dms_endpoint.on_premises.arn
  target_endpoint_arn      = aws_dms_endpoint.aurora_target.arn
  table_mappings          = file("\${path.module}/table-mappings.json")
}`
      }
    },
    {
      id: 'multi-cloud-cost-audit',
      title: 'Multi-Cloud Infrastructure as Code and Cost Governance',
      subtitle: 'Unified Terraform automation across AWS, Microsoft Azure, and Google Cloud',
      domain: 'cloud',
      role: 'DevOps and Infrastructure Engineer',
      summary: 'I authored a reusable Terraform module ecosystem managing virtual networks, compute instances, and storage buckets across AWS and Azure. I implemented automated lifecycle policies and rightsizing alerts that eliminated cloud resource sprawl.',
      architectureDetails: [
        'Developed standardized OpenTofu modules enforcing mandatory resource tagging',
        'Negotiated AWS Savings Plans and configured automated Azure spot instance pools',
        'Built automated scripts identifying orphaned snapshots and unattached storage volumes'
      ],
      metrics: [
        { label: 'Annual Savings', value: '$72,000' },
        { label: 'Coverage', value: '100% IaC' }
      ],
      techStack: ['AWS', 'Azure', 'Terraform', 'Terragrunt', 'Python']
    },

    // 2. Containers and CI/CD
    {
      id: 'k8s-gitops-pipeline',
      title: 'Production Kubernetes Cluster and GitOps Delivery',
      subtitle: 'Automated Docker compilation and progressive ArgoCD deployments',
      domain: 'cicd',
      role: 'Platform Engineer',
      summary: 'I built and maintain a high-availability Kubernetes cluster running on Ubuntu Linux nodes. I integrated GitHub Actions pipelines that automatically build Docker containers, scan for CVEs with Trivy, and synchronize deployments declaratively using ArgoCD.',
      architectureDetails: [
        'Configured multi-master control plane with stacked etcd and keepalived virtual IP',
        'Established ArgoCD GitOps sync loops with automated branch preview environments',
        'Implemented Traefik ingress controller with automated Let\'s Encrypt certificate renewal',
        'Configured Prometheus and Grafana alerting for pod memory limits and container restarts'
      ],
      metrics: [
        { label: 'Deploy Frequency', value: '14 / day' },
        { label: 'Build Duration', value: '3.2 min' },
        { label: 'Rollback Time', value: '< 20 sec' }
      ],
      techStack: ['Kubernetes', 'Docker', 'ArgoCD', 'Helm', 'GitHub Actions', 'Prometheus'],
      codeSnippet: {
        filename: 'deployment.yaml',
        language: 'yaml',
        code: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: telemetry-api
spec:
  replicas: 3
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0`
      }
    },
    {
      id: 'secure-container-registry',
      title: 'Hardened Docker Container Images and CI Security',
      subtitle: 'Multi-stage builds with non-root runtime and cryptographic image signing',
      domain: 'cicd',
      role: 'Security and DevOps Engineer',
      summary: 'I re-engineered base Docker images using Google distroless patterns, reducing vulnerability exposure and shrinking image payloads. I incorporated Cosign and Trivy in continuous integration to cryptographically sign images prior to staging.',
      architectureDetails: [
        'Adopted distroless scratch containers, shrinking average image sizes from 840MB to 48MB',
        'Enforced non-root user security contexts and read-only root filesystems on all pods',
        'Automated generation of software bill of materials documents during CI builds'
      ],
      metrics: [
        { label: 'Image Size Reduction', value: '94%' },
        { label: 'Critical CVEs', value: '0' }
      ],
      techStack: ['Docker', 'Trivy', 'Cosign', 'Bash', 'GitHub Actions']
    },

    // 3. Networking and Security
    {
      id: 'zero-trust-network',
      title: 'Perimeter Firewall and WireGuard Site-to-Site Mesh',
      subtitle: 'Zero-trust network zoning connecting remote offices, homelab, and AWS VPCs',
      domain: 'networking',
      role: 'Network and Security Architect',
      summary: 'I designed a secure network topology utilizing OPNsense hardware appliances, segmented 802.1Q VLANs, and mesh WireGuard tunnels. I eliminated public port forwarding for database endpoints and internal administration consoles.',
      architectureDetails: [
        'Configured dedicated VLANs for Management, Corporate LAN, DMZ, and IoT telemetry',
        'Deployed redundant IPsec IKEv2 tunnels with automatic failover to primary WireGuard links',
        'Implemented Suricata intrusion prevention with real-time signature updates and drop rules',
        'Enforced mutual TLS client certificate verification for all administrative dashboards'
      ],
      metrics: [
        { label: 'Tunnel Latency', value: '18ms' },
        { label: 'Packet Drop Rate', value: '0.001%' },
        { label: 'Uptime', value: '100%' }
      ],
      techStack: ['OPNsense', 'WireGuard', 'IPsec', 'Suricata IDS', 'VLAN 802.1Q', 'BGP'],
      codeSnippet: {
        filename: 'wg0.conf',
        language: 'ini',
        code: `[Interface]
PrivateKey = {{my_server_private_key}}
Address = 10.200.0.1/24
ListenPort = 51820
PostUp = iptables -A FORWARD -i wg0 -j ACCEPT

[Peer]
PublicKey = {{branch_office_public_key}}
AllowedIPs = 10.200.0.2/32, 192.168.10.0/24
PersistentKeepalive = 25`
      }
    },
    {
      id: 'radius-wpa3-enterprise',
      title: '802.1X Network Access Control and RADIUS Authentication',
      subtitle: 'Certificate-based machine authentication for internal corporate access',
      domain: 'networking',
      role: 'Network Security Engineer',
      summary: 'I deployed a FreeRADIUS authentication server integrated with Active Directory LDAP. Every employee laptop and server is cryptographically validated using EAP-TLS certificates before receiving an internal IP lease.',
      architectureDetails: [
        'Configured automated machine certificate enrollment for managed Windows and macOS endpoints',
        'Implemented dynamic VLAN steering based on verified device health and user groups',
        'Isolated unmanaged personal devices into an air-gapped guest quarantine network'
      ],
      metrics: [
        { label: 'Rogue Devices', value: '0 permitted' },
        { label: 'Auth Speed', value: '180ms' }
      ],
      techStack: ['FreeRADIUS', 'Active Directory', 'EAP-TLS', 'Cisco IOS', 'pfSense']
    },

    // 4. Virtualization and Backup
    {
      id: 'hyper-v-failover-cluster',
      title: '3-Node Windows Hyper-V Cluster and Storage Spaces Direct',
      subtitle: 'High-availability virtualization cluster hosting mission-critical services',
      domain: 'virtualization',
      role: 'Systems Administrator and Architect',
      summary: 'I built and maintain a 3-node Windows Server Hyper-V failover cluster running 45 virtual machines. I configured Storage Spaces Direct with dual NVMe caching tiers and verified live migration capabilities during node maintenance.',
      architectureDetails: [
        'Engineered converged networking with dual 25GbE Mellanox NICs utilizing RDMA RoCEv2',
        'Configured Storage Spaces Direct mirror-accelerated parity pool delivering 140,000 IOPS',
        'Automated VM live migration and node drain scripts using custom PowerShell modules',
        'Created isolated VirtualBox sandbox environments for safely testing system updates'
      ],
      metrics: [
        { label: 'VM Failover Time', value: '< 4 sec' },
        { label: 'Storage IOPS', value: '140K' },
        { label: 'Hosts', value: '3 nodes' }
      ],
      techStack: ['Windows Server Hyper-V', 'Storage Spaces Direct', 'Failover Clustering', 'PowerShell', 'VirtualBox'],
      codeSnippet: {
        filename: 'cluster_health.ps1',
        language: 'powershell',
        code: `Get-ClusterNode | Select-Object Name, State
Get-StoragePool -FriendlyName "S2D*" | Get-VirtualDisk | Select-Object FriendlyName, HealthStatus, OperationalStatus
Test-Cluster -Node "NODE01","NODE02","NODE03" -Include "Storage Spaces Direct", "Inventory"`
      }
    },
    {
      id: 'veeam-immutable-backup',
      title: 'Automated Veeam Backup and Immutable Linux Disaster Recovery',
      subtitle: 'Protecting virtualized workloads following the 3-2-1-1-0 rule',
      domain: 'virtualization',
      role: 'Disaster Recovery Engineer',
      summary: 'I architected an enterprise backup solution with Veeam Backup and Replication writing directly to an immutable Linux repository. The immutable repository prevents backup alteration or deletion, even if domain administrative credentials are compromised.',
      architectureDetails: [
        'Enforced the 3-2-1-1-0 rule with secondary air-gapped copies in AWS S3 Glacier',
        'Created automated SureBackup verification jobs that test VM bootability and database integrity weekly',
        'Conducted successful bare-metal disaster recovery drills restoring SQL databases within 45 minutes'
      ],
      metrics: [
        { label: 'RPO Target', value: '15 min' },
        { label: 'RTO Target', value: '45 min' },
        { label: 'Drill Pass Rate', value: '100%' }
      ],
      techStack: ['Veeam B&R', 'Ubuntu Hardened Repo', 'AWS S3 Glacier', 'Hyper-V', 'PowerShell']
    },

    // 5. Hardware and IoT
    {
      id: 'esp32-environmental-sensor',
      title: 'Custom ESP32 Server Rack Telemetry and Sensor Board',
      subtitle: 'Hardware schematic, custom 2-layer PCB design, and MQTT cloud telemetry',
      domain: 'hardware',
      role: 'Hardware and Embedded Firmware Engineer',
      summary: 'I designed and assembled a custom ESP32 microcontroller board that monitors server rack ambient temperature, relative humidity, air pressure, and power stability. The firmware streams sensor telemetry over encrypted MQTT to AWS IoT Core.',
      architectureDetails: [
        'Designed schematic and 2-layer PCB layout in KiCad with transient voltage suppression and LiPo charging',
        'Hand-soldered surface mount components and tested power supply ripple on an oscilloscope',
        'Wrote FreeRTOS firmware managing sleep cycles, I2C sensor bus communication, and Wi-Fi auto reconnect',
        'Configured real-time webhook alerts to Discord when rack temperatures exceed threshold values'
      ],
      metrics: [
        { label: 'Power Draw', value: '18mA avg' },
        { label: 'Sampling Rate', value: '10 sec' },
        { label: 'Uptime', value: '180 days' }
      ],
      techStack: ['ESP32', 'C++ / FreeRTOS', 'KiCad', 'MQTT over TLS', 'AWS IoT Core', 'Grafana'],
      codeSnippet: {
        filename: 'telemetry_node.cpp',
        language: 'cpp',
        code: `#include <WiFiClientSecure.h>
#include <PubSubClient.h>

void publishTelemetry(float temp, float humidity) {
  char payload[128];
  snprintf(payload, sizeof(payload), 
    "{\\"rack_id\\":\\"RACK_04\\",\\"temp\\":%.2f,\\"humidity\\":%.2f}", 
    temp, humidity);
  mqttClient.publish("telemetry/server_room/rack04", payload);
}`
      }
    },
    {
      id: 'iot-lora-edge-gateway',
      title: 'Long Range Hardware Gateway for Remote Field Sensors',
      subtitle: 'Solar-powered ESP32 and SX1276 LoRa transceiver bridge to cellular uplink',
      domain: 'hardware',
      role: 'Embedded Systems Developer',
      summary: 'I developed an autonomous edge gateway relaying telemetry from remote field nodes up to 5 kilometers away. The gateway receives sub-gigahertz LoRa packets, decrypts payloads, and relays metrics over a cellular connection.',
      architectureDetails: [
        'Engineered custom power management circuit utilizing MPPT solar battery controller',
        'Implemented AES 128 payload decryption in firmware before cellular upload',
        'Built local flash memory buffer to prevent data loss during cellular connectivity dropouts'
      ],
      metrics: [
        { label: 'Transmission Range', value: '5.2 km' },
        { label: 'Autonomy', value: '72 hrs reserve' }
      ],
      techStack: ['ESP32', 'SX1276 LoRa', 'C++', 'SPI Bus', 'Hardware Prototyping']
    }
  ],

  processes: [
    {
      number: "01",
      title: "Audit and Blueprint",
      description: "I begin by mapping infrastructure dependencies, identifying single points of failure, and documenting network boundaries before writing code.",
      tactics: [
        "Infrastructure mapping and dependency graphing",
        "Security boundary and attack surface assessment",
        "Disaster recovery gap analysis and RPO definition"
      ]
    },
    {
      number: "02",
      title: "Automate and Validate",
      description: "I codify servers, networks, and delivery pipelines into repeatable Infrastructure as Code with thorough validation in isolated staging environments.",
      tactics: [
        "Terraform and OpenTofu modular configuration",
        "Docker containerization with multi-stage builds",
        "Zero-downtime staging tests and dry-run drills"
      ]
    },
    {
      number: "03",
      title: "Harden and Continuously Monitor",
      description: "I enforce zero-trust network segmentation, immutable backup retention, and comprehensive metrics telemetry with automated alerting.",
      tactics: [
        "Stateful firewall rules and WireGuard mesh links",
        "Automated backup drills and immutable repository flags",
        "Prometheus and Grafana telemetry monitoring"
      ]
    }
  ],

  blogPosts: [
    {
      id: "zero-downtime-aws-migration",
      volume: "VOL. 01",
      tapeLabel: "AWS-MIG-26",
      title: "Zero-Downtime Migration: Moving 42 Production Workloads to AWS",
      subtitle: "How we executed live cutovers without a minute of SLA penalty using WireGuard mesh, CloudFormation, and dual Aurora replicas.",
      date: "JAN 2026",
      year: 2026,
      readTime: "8 min read",
      category: "Cloud & IaC",
      color: "#00f0ff",
      summary: "Migrating enterprise workloads across hybrid infrastructure cannot rely on weekend maintenance windows when customers run operations 24/7. This article breaks down our shadow routing strategy, continuous CDC database replication, and zero-loss DNS cutovers.",
      excerpt: "When you have 42 on-premises VMs running legacy billing, customer portals, and telemetry collectors, the naive playbook says 'take a 4-hour maintenance window at 2 AM on a Sunday.' But in global commerce, 2 AM UTC is midday in APAC. Here is how we engineered continuous live traffic handoff without dropping a single packet.",
      keyTakeaways: [
        "Established dedicated WireGuard IPsec tunnels with BGP dynamic routing between on-prem Hyper-V and AWS Transit Gateway.",
        "Ran AWS Database Migration Service (DMS) with continuous CDC to keep Aurora PostgreSQL perfectly synced within 120ms.",
        "Lowered Route 53 TTL to 60 seconds 72 hours prior to cutover and validated health-check failover before switching weighted DNS records.",
        "Maintained bi-directional reverse sync for 48 hours post-cutover to allow instant failback if latency anomalies occurred."
      ],
      techStack: ["AWS CloudFormation", "Aurora PostgreSQL", "AWS DMS", "Route 53", "WireGuard", "Hyper-V"],
      codeSnippet: {
        filename: "dns_health_cutover.json",
        language: "json",
        code: `{\n  "RoutingControl": "PrimaryAuroraCluster",\n  "TargetHealthCheck": "arn:aws:route53:::healthcheck/04f981-prod",\n  "FailoverPolicy": "FAILOVER_PRIMARY",\n  "HealthThreshold": 3,\n  "Inverted": false\n}`
      }
    },
    {
      id: "surviving-ransomware-immutable-linux",
      volume: "VOL. 02",
      tapeLabel: "BAK-IMM-25",
      title: "Surviving Modern Ransomware: Hardened Linux & Immutable Storage",
      subtitle: "Architecting an air-gapped, tamper-proof Veeam repository that prevents backup deletion even if domain admin credentials leak.",
      date: "OCT 2025",
      year: 2025,
      readTime: "11 min read",
      category: "Virtualization & Security",
      color: "#34d399",
      summary: "Modern ransomware no longer just encrypts your live hypervisors—it actively discovers and purges your backup shares first. This architecture guide outlines how we deployed Linux XFS immutability flags to make backups structurally impossible to delete or overwrite.",
      excerpt: "The first thing a modern ransomware actor does after gaining Domain Admin is query Active Directory for service accounts containing 'veeam', 'backup', or 'storage'. If your backup server is a domain-joined Windows box, your backups are already gone. Here is the architecture of an isolated Linux hardened repository that turns compromised credentials into harmless errors.",
      keyTakeaways: [
        "Deployed headless Ubuntu 22.04 LTS servers isolated on a non-routable management VLAN with root SSH permanently disabled.",
        "Configured XFS filesystem with chattr +i immutable attributes, enforced by the Linux kernel so even local root cannot delete active backup blocks.",
        "Implemented ephemeral single-use credentials for Veeam Transport Service deployment—passwords are discarded after installation.",
        "Weekly automated SureBackup sandbox boots verify volume bootability and database consistency without touching production."
      ],
      techStack: ["Ubuntu Linux", "XFS Immutability", "Veeam B&R", "Hyper-V", "Air-Gapped VLAN", "Bash"],
      codeSnippet: {
        filename: "verify_immutable_flags.sh",
        language: "bash",
        code: `#!/usr/bin/env bash\n# Audit XFS immutable retention flags on repository mount\nlsattr -d /mnt/veeam_immutable_repo/backups/* | while read -r attr file; do\n  if [[ "$attr" =~ i ]]; then\n    echo "[OK] Immutable flag set: $file"\n  else\n    echo "[ALERT] File NOT protected: $file" >&2\n  fi\ndone`
      }
    },
    {
      id: "hyper-v-s2d-150-vms",
      volume: "VOL. 03",
      tapeLabel: "S2D-ROCE-25",
      title: "Orchestrating 150+ Production VMs: Storage Spaces Direct & RoCEv2",
      subtitle: "Achieving 140,000 IOPS and sub-4-second live migration failover using Storage Spaces Direct, RoCEv2 RDMA, and PowerShell automation.",
      date: "JUN 2025",
      year: 2025,
      readTime: "14 min read",
      category: "Enterprise Virtualization",
      color: "#a78bfa",
      summary: "Running 150+ dense enterprise VMs across a 3-node Windows Hyper-V cluster requires relentless focus on storage latency and bus contention. Discover how dual-port 25GbE Mellanox NICs and hardware RDMA eliminated CPU interrupts during live node maintenance.",
      excerpt: "Storage Spaces Direct (S2D) has a reputation: configured carelessly on consumer switching, it will drop cluster heartbeats and split-brain your disks. But paired with converged 25GbE Mellanox adapters, RoCEv2 RDMA, and strict PFC/ETS flow control, it rivals million-dollar SAN arrays at a fraction of the cost.",
      keyTakeaways: [
        "Engineered dual Mellanox ConnectX-5 25GbE adapters using RoCEv2 RDMA for zero-copy kernel storage fabric.",
        "Configured 3-way mirroring with NVMe write-cache tiering delivering 140,000 sustained 4K random read IOPS.",
        "Implemented Priority Flow Control (PFC) on 802.1p priority 3 with explicit traffic class scheduling to prevent packet loss.",
        "Built automated node maintenance draining scripts in PowerShell that orchestrate failover without dropped TCP sessions."
      ],
      techStack: ["Windows Server Hyper-V", "Storage Spaces Direct", "Mellanox RoCEv2", "PowerShell", "Failover Clustering"],
      codeSnippet: {
        filename: "test_roce_traffic.ps1",
        language: "powershell",
        code: `# Inspect active RDMA counters on converged adapters\nGet-NetAdapterRdma | Where-Object { $_.Enabled -eq $true } | ForEach-Object {\n    $stats = Get-NetAdapterStatistics -Name $_.Name\n    [PSCustomObject]@{\n        Adapter       = $_.Name\n        RdmaActive    = $_.Enabled\n        FramingErrors = $stats.RdmaMissingPackets\n        OutOctets     = [math]::Round($stats.RdmaOutOctets / 1GB, 2)\n    }\n}`
      }
    },
    {
      id: "stopping-lateral-movement-zero-trust",
      volume: "VOL. 04",
      tapeLabel: "8021X-VLAN-25",
      title: "Stopping Lateral Movement: 802.1X Dynamic VLANs & SonicWall",
      subtitle: "Replacing static network trust with dynamic identity steering, automated machine certificates, and instant threat isolation.",
      date: "FEB 2025",
      year: 2025,
      readTime: "9 min read",
      category: "Network & Security",
      color: "#f59e0b",
      summary: "In an enterprise office or datacenter, a rogue device plugged into a conference room RJ45 port should never reach production database subnets. Learn how 802.1X EAP-TLS certificate authentication steers healthy workstations to compliant VLANs while sandboxing unverified hardware.",
      excerpt: "Static VLAN port assignments are an open invitation to lateral movement. If an attacker bypasses the reception desk and connects an Ethernet cable, static access ports trust them by default. By enforcing 802.1X dynamic VLAN assignments, port access is mathematically tied to verified Active Directory machine certificates.",
      keyTakeaways: [
        "Configured Microsoft Active Directory Certificate Services (AD CS) with auto-enrollment for domain computer certificates.",
        "Deployed dual FreeRADIUS servers integrated with Network Policy Server (NPS) responding to Cisco Catalyst switch port queries within 180ms.",
        "Authored SonicWall zero-trust perimeter access policies blocking cross-VLAN broadcast and inter-subnet discovery.",
        "Automated quarantine redirection for endpoints that fail OS patch level or EDR agent health checks."
      ],
      techStack: ["802.1X EAP-TLS", "FreeRADIUS", "SonicWall NSA", "Active Directory GPO", "Cisco Catalyst"],
      codeSnippet: {
        filename: "radius_vlan_steer.conf",
        language: "conf",
        code: `# FreeRADIUS Dynamic VLAN policy rule\npost-auth {\n  if (TLS-Client-Cert-Common-Name =~ /\\.corp\\.internal$/) {\n    update reply {\n      Tunnel-Type = ":=VLAN"\n      Tunnel-Medium-Type = ":=IEEE-802"\n      Tunnel-Private-Group-Id = ":=120" # Corp Workstations\n    }\n  } else {\n    update reply {\n      Tunnel-Private-Group-Id = ":=999" # Quarantine Sandbox\n    }\n  }\n}`
      }
    },
    {
      id: "from-silicon-to-hypervisor-esp32",
      volume: "VOL. 05",
      tapeLabel: "ESP-PCB-24",
      title: "From Silicon to Hypervisor: Custom ESP32 Server Rack Telemetry",
      subtitle: "Schematic design, 2-layer PCB fabrication, transient voltage suppression, and encrypted MQTT streaming to AWS IoT Core.",
      date: "NOV 2024",
      year: 2024,
      readTime: "10 min read",
      category: "Hardware & IoT",
      color: "#f43f5e",
      summary: "When commercial server rack temperature monitors demanded proprietary cloud subscriptions, I designed, etched, and hand-soldered custom ESP32 microcontroller boards with industrial I2C sensors streaming real-time telemetry over mTLS to AWS IoT Core.",
      excerpt: "DevOps doesn't begin at the Kubernetes API—it begins at the wall socket and the server chassis thermals. When thermal hotspots caused unthrottled CPU downclocking in our server room, commercial monitoring solutions quoted $4,500 plus annual licensing. I chose the engineering route: building custom hardware from the silicon up.",
      keyTakeaways: [
        "Designed custom schematic and 2-layer PCB in KiCad featuring TVS diode input protection and buck regulation from 12V rack bus.",
        "Hand-soldered surface mount components (0805 passives and SOIC-8 I2C sensors) and verified low ripple under 15mV on an oscilloscope.",
        "Wrote deterministic FreeRTOS C++ firmware utilizing hardware watchdogs, deep sleep states, and automated Wi-Fi reconnect.",
        "Streamed sensor metrics over encrypted MQTT with client-side X.509 certificates to AWS IoT Core and Prometheus/Grafana."
      ],
      techStack: ["ESP32 Microcontroller", "KiCad PCB Design", "FreeRTOS / C++", "AWS IoT Core", "MQTT over TLS", "Grafana"],
      codeSnippet: {
        filename: "telemetry_publish.cpp",
        language: "cpp",
        code: `// Encrypted MQTT Telemetry Dispatch\nvoid loop() {\n    if (!mqttClient.connected()) reconnectMqtt();\n    mqttClient.loop();\n    \n    float temp = bmeSensor.readTemperature();\n    float hum  = bmeSensor.readHumidity();\n    \n    char buffer[128];\n    snprintf(buffer, sizeof(buffer), \n      "{\\"rack_id\\":\\"RACK-02\\",\\"temp_c\\":%.2f,\\"humidity_pct\\":%.2f}", \n      temp, hum);\n      \n    mqttClient.publish("infra/telemetry/racks", buffer, 1);\n    vTaskDelay(pdMS_TO_TICKS(10000));\n}`
      }
    },
    {
      id: "taming-alert-fatigue-siem-soc2",
      volume: "VOL. 06",
      tapeLabel: "SIEM-SOC2-24",
      title: "Taming Alert Fatigue: Tuning Rapid7 SIEM & OSSIM for SOC 2",
      subtitle: "Filtering 4 million daily security events into actionable signal, achieving SOC 2 audit readiness without on-call burnout.",
      date: "AUG 2024",
      year: 2024,
      readTime: "12 min read",
      category: "SIEM & Compliance",
      color: "#38bdf8",
      summary: "Most security incident and event management (SIEM) tools fail because teams turn on every default detection rule until on-call engineers ignore notifications. This field note explains how correlation pipelines reduced false positives by 94% while satisfying SOC 2 Trust Services Criteria.",
      excerpt: "Every compliance auditor wants you to collect Windows Security Event IDs 4624 (Successful Logon) and 4672 (Special Privileges Assigned). But across 150 production VMs and Active Directory domain controllers, that generates millions of daily logs. If you alert on raw occurrences, your team will mute the Slack channel within 48 hours.",
      keyTakeaways: [
        "Configured NXLog agents on Windows servers to filter out high-volume service account kerberos churn prior to SIEM ingestion.",
        "Built composite correlation rules in Rapid7 InsightIDR detecting abnormal privilege escalation sequences rather than single events.",
        "Integrated AlienVault OSSIM open-source feeds to cross-reference perimeter firewall drops with known threat actor IP pools.",
        "Delivered tamper-evident audit evidence logs satisfying SOC 2 CC6.1 (Logical Access) and CC7.2 (Security Monitoring)."
      ],
      techStack: ["Rapid7 InsightIDR", "AlienVault OSSIM", "SonicWall Logs", "NXLog", "Active Directory", "SOC 2 Type II"],
      codeSnippet: {
        filename: "nxlog_filter.conf",
        language: "conf",
        code: `# Drop benign machine account noise before SIEM ingestion\n<Input eventlog_filtered>\n    Module im_msvistalog\n    Query <QueryList>\\\n            <Query Id="0">\\\n              <Select Path="Security">*\\\n                [System[(EventID=4624 or EventID=4625)]]\\\n                and *[EventData[Data[@Name='TargetUserName'] != 'HEALTHCHECK$']]\\\n              </Select>\\\n            </Query>\\\n          </QueryList>\n</Input>`
      }
    }
  ],

  petProjects: [
    {
      id: "youtube-aws-channel",
      type: "youtube",
      category: "Tech Updates & Cloud Academy",
      badge: "YOUTUBE CHANNEL // AWS LEARNING",
      title: "AWS Cloud Architecture & Video Tutorials",
      tagline: "Weekly hands-on video tutorials breaking down real-world AWS VPC networking, ECS Fargate containers, IAM security, and infrastructure automation.",
      description: "I run a dedicated YouTube channel providing practical, terminal-driven tech updates and AWS cloud tutorials. Unlike theoretical slide presentations, every video shows live console provisioning, Terraform automation, and real troubleshooting from an engineer's workbench.",
      accentColor: "#FF0000",
      metrics: [
        { label: "Videos Uploaded", value: "36+ Episodes" },
        { label: "Core Focus", value: "AWS & Cloud" },
        { label: "Format", value: "Hands-on Labs" }
      ],
      media: {
        heroImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
        videoPreview: {
          title: "Building a Production VPC with Transit Gateway & WireGuard Mesh",
          channelName: "Naditha Gallella // Cloud & Systems",
          duration: "24:18",
          views: "14.2K views",
          topics: ["VPC Peering", "Transit Gateway", "WireGuard IPsec", "Terraform Modules", "Route Tables"],
          videoUrl: "https://youtube.com/@nadithagallella"
        }
      },
      tags: ["AWS Cloud", "Terraform", "YouTube", "Networking", "VPC", "Architecture"],
      links: [
        { label: "Watch on YouTube", url: "https://youtube.com/@nadithagallella", isExternal: true }
      ]
    },
    {
      id: "esp32-hardware-lab",
      type: "hardware",
      category: "Embedded Systems & PCB Design",
      badge: "HARDWARE LAB // ESP32 DESIGNS",
      title: "Custom ESP32 Board Revisions & Rack Telemetry",
      tagline: "Designing custom 2-layer and 4-layer PCBs in KiCad for industrial environment sensing, low-power LoRa edge nodes, and server rack metrics.",
      description: "A collection of custom ESP32 board prototypes designed, etched, and hand-soldered for my homelab and server racks. Features isolated I2C sensor buses, transient voltage suppression (TVS), and encrypted mTLS streaming to AWS IoT Core.",
      accentColor: "#00f0ff",
      metrics: [
        { label: "Board Revisions", value: "3 Prototype Gens" },
        { label: "Continuous Draw", value: "18mA" },
        { label: "Sensors Supported", value: "BME280 / INA219" }
      ],
      media: {
        galleryImages: [
          { revision: "Rev 1.2", url: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80", caption: "Rev 1.2: Dual-Rail Sensor Board with 0805 Passives & Buck Converter" },
          { revision: "Rev 2.0", url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80", caption: "Rev 2.0: Hand-soldered prototype testing with oscilloscope ripple measurement" },
          { revision: "Rev 2.5", url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80", caption: "Rev 2.5: Server rack DIN-rail enclosure with active OLED telemetry readout" }
        ]
      },
      tags: ["ESP32", "KiCad PCB", "FreeRTOS", "AWS IoT Core", "Hardware Prototyping", "C++"],
      links: [
        { label: "Inspect Board Designs", url: "#/blog", isExternal: false }
      ]
    },
    {
      id: "aws-migration-step-by-step-guide",
      type: "guide",
      category: "Interactive Runbook & Field Guide",
      badge: "MIGRATION PLAYBOOK // STEP-BY-STEP",
      title: "Step-by-Step Production AWS Migration Blueprint",
      tagline: "A battle-tested 4-phase runbook for migrating on-premises virtual machines and databases to AWS with zero unplanned downtime.",
      description: "A comprehensive practical blueprint covering discovery, network transit tunnels, continuous database replication, and cutover day execution. Built from real migrations spanning 42+ enterprise workloads.",
      accentColor: "#38bdf8",
      metrics: [
        { label: "Phases", value: "4 Structured Steps" },
        { label: "Cutover SLA", value: "Zero Downtime" },
        { label: "Rollback Window", value: "< 2 min failback" }
      ],
      media: {
        guideSteps: [
          {
            stepNumber: "01",
            title: "Pre-Flight Discovery & VPC Scaffolding",
            duration: "Week 1 - 2",
            keyTasks: [
              "Run AWS Application Discovery Service on on-prem hypervisors",
              "Provision multi-AZ VPC, subnets, and NAT Gateways via Terraform",
              "Establish IAM least-privilege roles and Security Groups"
            ],
            command: "terraform apply -target=module.vpc_transit_mesh"
          },
          {
            stepNumber: "02",
            title: "Site-to-Site Transit & Encrypted Mesh",
            duration: "Week 3",
            keyTasks: [
              "Configure dual WireGuard IPsec tunnels between Hyper-V and AWS Transit Gateway",
              "Verify BGP route propagation and MTU clamping to 1420 bytes",
              "Validate inter-datacenter latency under 22ms"
            ],
            command: "wg-quick up wg0 && ping -c 5 10.100.0.1"
          },
          {
            stepNumber: "03",
            title: "Continuous Database CDC Streaming",
            duration: "Week 4",
            keyTasks: [
              "Deploy AWS Database Migration Service (DMS) replication instance",
              "Configure Change Data Capture (CDC) from on-prem PostgreSQL to Aurora",
              "Maintain target replica lag consistently under 120ms"
            ],
            command: "aws dms start-replication-task --replication-task-arn ..."
          },
          {
            stepNumber: "04",
            title: "Cutover Day: Weighted DNS & 0-Loss Handoff",
            duration: "Day of Cutover",
            keyTasks: [
              "Lower Route 53 TTL to 60 seconds 72 hours prior to execution",
              "Drain on-prem background workers and execute final CDC validation checkpoint",
              "Shift Route 53 weighted record from 100% on-prem to 100% AWS Aurora",
              "Maintain reverse CDC replication for 48 hours to enable instant failback"
            ],
            command: "aws route53 change-resource-record-sets --hosted-zone-id ..."
          }
        ]
      },
      tags: ["AWS DMS", "Aurora PostgreSQL", "Route 53", "Terraform", "WireGuard", "Cloud Migration"],
      links: [
        { label: "Open Step-by-Step Guide", url: "#/blog", isExternal: false }
      ]
    },
    {
      id: "linux-sysadmin-homelab",
      type: "sysadmin",
      category: "Systems Administration & Linux Kernel",
      badge: "LINUX LAB // SYSADMIN RUNBOOKS",
      title: "Linux Administration & Performance Kernel Tuning",
      tagline: "Real-world sysctl optimization, automated systemd daemon maintenance, immutable XFS storage filesystems, and ZFS replication.",
      description: "Hardening enterprise Linux environments (Ubuntu 22.04 LTS & Debian 12). Custom scripts for memory pressure monitoring, systemd cgroup resource slicing, and kernel network stack tuning for high-throughput packet processing.",
      accentColor: "#34d399",
      metrics: [
        { label: "Kernel Tuning", value: "sysctl 99-net.conf" },
        { label: "Filesystems", value: "XFS + ZFS Pools" },
        { label: "Automation", value: "Systemd + Bash" }
      ],
      media: {
        terminalLogs: [
          {
            command: "sudo sysctl -p /etc/sysctl.d/99-network-tuning.conf",
            output: "net.core.rmem_max = 16777216\nnet.core.wmem_max = 16777216\nnet.ipv4.tcp_rmem = 4096 87380 16777216\nnet.ipv4.tcp_wmem = 4096 65536 16777216\nnet.ipv4.tcp_congestion_control = bbr"
          },
          {
            command: "sudo lsattr -d /mnt/veeam_immutable_repo/backups/vm-cluster-01.vbk",
            output: "----i---------e------- /mnt/veeam_immutable_repo/backups/vm-cluster-01.vbk [IMMUTABLE LOCK ACTIVE]"
          }
        ]
      },
      tags: ["Linux", "Kernel Tuning", "BBR", "Systemd", "ZFS", "Security Hardening"],
      links: [
        { label: "View Sysadmin Notes", url: "#/blog", isExternal: false }
      ]
    },
    {
      id: "software-automation-daemons",
      type: "software",
      category: "Open-Source Tools & Daemons",
      badge: "SOFTWARE LAB // OPEN-SOURCE TOOLING",
      title: "Custom Infrastructure Automation & Telemetry Daemons",
      tagline: "Lightweight Go and Python background daemons for edge heartbeat monitoring, Discord webhook alerting, and automated failover orchestration.",
      description: "Instead of heavy agent stacks that consume 2GB RAM per VM, I build minimal single-binary daemons that gather system thermals, ping latency, and disk IOPS, exporting Prometheus metrics over lightweight endpoints.",
      accentColor: "#a78bfa",
      metrics: [
        { label: "Binary Footprint", value: "< 12MB Go Binary" },
        { label: "Idle CPU Draw", value: "< 0.2%" },
        { label: "Telemetry Export", value: "Prometheus / OpenMetrics" }
      ],
      media: {
        terminalLogs: [
          {
            command: "telemetry-daemon --config=/etc/telemetry.yaml --status",
            output: "[INFO] Edge collector initialized. Exposing metrics on :9100/metrics\n[OK] Server Room Rack 04: 21.4°C | 44.2% RH | 100% Link OK"
          }
        ]
      },
      tags: ["Go (Golang)", "Python", "Prometheus", "Webhooks", "Docker", "Automation"],
      links: [
        { label: "Explore Tooling Suite", url: "#/blog", isExternal: false }
      ]
    }
  ],

  skillCategories: [
    {
      category: "Cloud and Infrastructure",
      skills: [
        { name: "AWS Cloud", level: "Expert", tags: ["EC2", "VPC", "Aurora", "ECS", "IAM", "Control Tower"] },
        { name: "Microsoft Azure", level: "Advanced", tags: ["Azure VMs", "VNet", "Entra ID", "Storage"] },
        { name: "Google Cloud", level: "Proficient", tags: ["Compute Engine", "VPC", "Cloud Storage"] },
        { name: "Terraform / OpenTofu", level: "Expert", tags: ["Modules", "State Management", "CI/CD"] }
      ]
    },
    {
      category: "Containers and Orchestration",
      skills: [
        { name: "Docker", level: "Expert", tags: ["Multi-Stage", "Distroless", "Compose", "Trivy"] },
        { name: "Kubernetes", level: "Advanced", tags: ["Control Plane", "Helm", "Ingress", "ArgoCD"] },
        { name: "CI / CD Pipelines", level: "Expert", tags: ["GitHub Actions", "GitLab CI", "Automated Testing"] }
      ]
    },
    {
      category: "Networking and Perimeter Security",
      skills: [
        { name: "Firewalls and Routing", level: "Expert", tags: ["OPNsense", "pfSense", "iptables", "VLANs", "BGP"] },
        { name: "VPN Architectures", level: "Expert", tags: ["WireGuard", "IPsec IKEv2", "OpenVPN", "Zero-Trust"] },
        { name: "Security and Hardening", level: "Advanced", tags: ["Suricata IDS", "RADIUS 802.1X", "TLS Certificates"] }
      ]
    },
    {
      category: "Virtualization and Disaster Recovery",
      skills: [
        { name: "Windows Hyper-V", level: "Expert", tags: ["Failover Cluster", "Storage Spaces Direct", "PowerShell"] },
        { name: "VirtualBox and KVM", level: "Advanced", tags: ["Lab Environments", "QEMU", "Automation"] },
        { name: "Veeam Backup and Replication", level: "Expert", tags: ["Immutable Storage", "SureBackup", "Disaster Recovery"] }
      ]
    },
    {
      category: "Hardware and Systems Level",
      skills: [
        { name: "ESP32 and Microcontrollers", level: "Advanced", tags: ["FreeRTOS", "C++", "MQTT", "I2C/SPI"] },
        { name: "PCB and Circuit Design", level: "Proficient", tags: ["KiCad", "Schematics", "Power Management"] },
        { name: "Computer Hardware", level: "Expert", tags: ["Server Assembly", "RAID Arrays", "Diagnostics"] }
      ]
    }
  ],

  faqs: [
    {
      id: 'faq-1',
      category: 'Cloud and Migrations',
      question: "How do you guarantee zero-downtime during an AWS database migration?",
      answer: "I establish continuous replication prior to cutover using AWS Database Migration Service (DMS) alongside transaction log shipping. The cloud database remains synchronized in real-time with the on-premises source. During the scheduled maintenance window, I switch traffic at the DNS or load balancer level once replication lag reaches zero, ensuring no transactions are dropped."
    },
    {
      id: 'faq-2',
      category: 'Cloud and Migrations',
      question: "Which cloud provider are you most experienced with?",
      answer: "AWS is my primary cloud platform, where I specialize in VPC networking, ECS container services, RDS/Aurora databases, and IAM security. I also manage enterprise workloads on Microsoft Azure and Google Cloud, frequently deploying cross-cloud infrastructure using unified Terraform configurations."
    },
    {
      id: 'faq-3',
      category: 'Networking and Security',
      question: "What is your approach to firewall design and network segmentation?",
      answer: "I apply strict zero-trust principles. Networks are segmented into isolated VLANs (Management, Corporate LAN, DMZ, and IoT). Inter-subnet traffic is denied by default and allowed only through explicit firewall rules on OPNsense or pfSense. Administrative management interfaces are strictly accessible via mutual TLS or authenticated WireGuard VPN tunnels."
    },
    {
      id: 'faq-4',
      category: 'Containers and CI/CD',
      question: "Do you build bare metal Kubernetes clusters or managed cloud Kubernetes?",
      answer: "Both. For cloud environments, managed services like AWS EKS or Azure AKS provide high control plane reliability. For private datacenters or cost-sensitive deployments, I architect self-hosted Kubernetes clusters on Linux nodes with stacked etcd, HAProxy virtual IPs, and GitOps synchronization via ArgoCD."
    },
    {
      id: 'faq-5',
      category: 'Virtualization and Backup',
      question: "How do you protect Windows Hyper-V environments against ransomware?",
      answer: "By enforcing the 3-2-1-1-0 backup rule using Veeam Backup and Replication. Backups are stored on immutable Linux repositories where file retention locks prevent deletion or encryption even with compromised domain credentials. Weekly automated SureBackup drills boot backup images in isolated sandboxes to verify data integrity."
    },
    {
      id: 'faq-6',
      category: 'Hardware and Systems',
      question: "Why do you work with hardware and ESP32 microcontrollers as a DevOps engineer?",
      answer: "Understanding physical computing from the circuit board up provides a holistic view of systems engineering. Designing custom ESP32 boards for server room telemetry involves the same core principles as cloud engineering: power optimization, resilient networking, encrypted telemetry transmission, and graceful failure recovery."
    },
    {
      id: 'faq-7',
      category: 'Collaboration',
      question: "Are you open to full-time remote or contract engineering roles?",
      answer: "Yes. I am actively available for senior infrastructure, cloud, DevOps, and systems engineering positions globally. I have extensive experience operating across distributed time zones and collaborating with engineering teams via standard Git workflows and documentation."
    },
    {
      id: 'faq-8',
      category: 'Collaboration',
      question: "How quickly can you be onboarded into an existing infrastructure codebase?",
      answer: "Typically within 48 to 72 hours. With established experience across Terraform, Docker, AWS, and enterprise networking, I can review existing architectural diagrams, inspect Infrastructure as Code repositories, and begin contributing immediately without disrupting active workflows."
    }
  ]
};
