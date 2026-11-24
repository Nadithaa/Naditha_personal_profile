import React, { useEffect } from 'react';
import { X, ExternalLink, Check } from 'lucide-react';
import { ProjectItem } from '../../types';
import { Badge } from './Badge';
import { Button } from './Button';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-200 sm:p-400 bg-surface-950/80 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      {/* Outer modal container: rounded-2xl (16px), p-300 (24px) */}
      <div
        className="relative w-full max-w-2xl bg-surface-850 border border-border-strong rounded-2xl p-300 shadow-2xl text-left overflow-hidden motion-base my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-200 pb-200 border-b border-border-subtle">
          <div>
            <Badge variant="highlight" className="mb-75">
              {project.domain}
            </Badge>
            <h2 id="modal-title" className="heading-5 text-white">
              {project.title}
            </h2>
            <p className="body-5 text-[#888888] mt-25">
              {project.subtitle}
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-50 text-[#888888] hover:text-white rounded-lg hover:bg-surface-700 transition-colors focus:ring-2 focus:ring-white focus:outline-none"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="space-y-300 py-300 max-h-[60vh] overflow-y-auto pr-75">
          {/* Summary */}
          <div>
            <h3 className="title-4 text-[#A1A1A1] uppercase font-mono tracking-wider mb-75">
              Overview
            </h3>
            <p className="body-3 text-[#CCCCCC]">
              {project.summary}
            </p>
          </div>

          {/* Key Metrics Grid */}
          <div>
            <h3 className="title-4 text-[#A1A1A1] uppercase font-mono tracking-wider mb-75">
              Verified Metrics
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-100">
              {project.metrics.map((metric, idx) => (
                <div
                  key={idx}
                  className="bg-surface-800 border border-border-subtle p-100 rounded-lg"
                >
                  <div className="heading-6 text-white font-mono">{metric.value}</div>
                  <div className="caption-5 text-[#888888] mt-25">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Architecture Details */}
          <div>
            <h3 className="title-4 text-[#A1A1A1] uppercase font-mono tracking-wider mb-75">
              Architecture and Engineering Highlights
            </h3>
            <ul className="space-y-75">
              {project.architectureDetails.map((detail, idx) => (
                <li key={idx} className="flex items-start gap-75 body-5 text-[#B0B0B0]">
                  <Check className="w-4 h-4 text-[#4ADE80] shrink-0 mt-[3px]" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Code Artifact / Configuration Snippet */}
          {project.codeSnippet && (
            <div>
              <div className="flex items-center justify-between mb-50">
                <span className="caption-3 font-mono text-[#888888]">
                  {project.codeSnippet.filename}
                </span>
                <span className="caption-5 font-mono text-[#717171] uppercase">
                  {project.codeSnippet.language}
                </span>
              </div>
              <pre className="bg-surface-950 border border-border-subtle p-100 rounded-lg overflow-x-auto text-xs font-mono text-[#EDEDED] leading-relaxed">
                <code>{project.codeSnippet.code}</code>
              </pre>
            </div>
          )}

          {/* Technology Stack Tags */}
          <div>
            <h3 className="title-4 text-[#A1A1A1] uppercase font-mono tracking-wider mb-75">
              Technologies Used
            </h3>
            <div className="flex flex-wrap gap-50">
              {project.techStack.map((tech, idx) => (
                <Badge key={idx} variant="neutral">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="pt-200 border-t border-border-subtle flex items-center justify-end gap-100">
          <Button variant="secondary" size="sm" onClick={onClose}>
            Close
          </Button>
          <Button
            variant="primary"
            size="sm"
            icon={<ExternalLink className="w-4 h-4" />}
            onClick={() => {
              window.location.href = '#contact';
              onClose();
            }}
          >
            Inquire about this architecture
          </Button>
        </div>
      </div>
    </div>
  );
};
