export type DomainKey = 'cloud' | 'cicd' | 'networking' | 'virtualization' | 'hardware';

export interface DomainMeta {
  key: DomainKey;
  label: string;
  tagline: string;
  iconName: string;
  count: number;
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  domain: DomainKey;
  role: string;
  summary: string;
  architectureDetails: string[];
  metrics: {
    label: string;
    value: string;
  }[];
  techStack: string[];
  codeSnippet?: {
    filename: string;
    code: string;
    language: string;
  };
  liveDemoUrl?: string;
  sourceCodeUrl?: string;
}

export interface MetricStat {
  label: string;
  value: string;
  subtext: string;
}

export interface ExpertiseStackCard {
  category: string;
  headline: string;
  items: string[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface ArchitectureProcess {
  number: string;
  title: string;
  description: string;
  tactics: string[];
}

export interface BlogPostItem {
  id: string;
  volume: string;
  tapeLabel: string;
  title: string;
  subtitle: string;
  date: string;
  year: number;
  readTime: string;
  category: string;
  color: string;
  summary: string;
  excerpt: string;
  keyTakeaways: string[];
  techStack: string[];
  codeSnippet?: {
    filename: string;
    language: string;
    code: string;
  };
}

export interface PetProjectItem {
  id: string;
  type: 'youtube' | 'hardware' | 'guide' | 'sysadmin' | 'software';
  category: string;
  badge: string;
  title: string;
  tagline: string;
  description: string;
  accentColor: string;
  metrics: { label: string; value: string }[];
  media: {
    heroImage?: string;
    galleryImages?: { url: string; caption: string; revision?: string }[];
    videoPreview?: {
      title: string;
      channelName: string;
      duration: string;
      views: string;
      topics: string[];
      videoUrl: string;
    };
    guideSteps?: {
      stepNumber: string;
      title: string;
      duration: string;
      keyTasks: string[];
      command?: string;
    }[];
    terminalLogs?: {
      command: string;
      output: string;
    }[];
  };
  tags: string[];
  links: {
    label: string;
    url: string;
    isExternal: boolean;
  }[];
}

export interface SkillCategory {
  category: string;
  skills: {
    name: string;
    level: string;
    tags: string[];
  }[];
}

export interface AboutSectionData {
  bioLead: string;
  paragraphs: string[];
  highlights: {
    title: string;
    description: string;
  }[];
  homelabSpecs: {
    label: string;
    spec: string;
  }[];
}

export interface ProfileConfig {
  name: string;
  roleTitle: string;
  location: string;
  availability: string;
  email: string;
  github: string;
  linkedin: string;
  heroHeadline: string;
  heroSubheadline: string;
  ctaText: string;
  about: AboutSectionData;
  taglineRevealLines: string[];
  metrics: MetricStat[];
  expertiseStack?: ExpertiseStackCard[];
  domains: DomainMeta[];
  projects: ProjectItem[];
  processes: ArchitectureProcess[];
  blogPosts?: BlogPostItem[];
  petProjects?: PetProjectItem[];
  skillCategories: SkillCategory[];
  faqs: FAQItem[];
}
