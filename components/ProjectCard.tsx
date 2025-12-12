import React from 'react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="group relative bg-cosmic-900 border border-white/5 rounded-2xl overflow-hidden transition-all duration-[200ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.03] hover:translate-y-[-3px] hover:border-neon-cyan/40 shadow-[0_8px_32px_rgba(0,0,0,0.45)] hover:shadow-[0_0_28px_rgba(0,234,255,0.35)] flex flex-col h-full">
      
      {/* Image / Placeholder Area - Cinematic 16:9 */}
      <div className="aspect-video w-full bg-cosmic-800 relative overflow-hidden border-b border-white/5">
        {project.image_url ? (
          <img 
            src={project.image_url} 
            alt={project.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-cosmic-800 via-cosmic-900 to-cosmic-950 flex items-center justify-center group-hover:from-cosmic-800 group-hover:via-cosmic-800 group-hover:to-neon-cyan/10 transition-colors duration-500">
             <div className="text-4xl opacity-20 font-bold text-white tracking-tighter">SU.</div>
          </div>
        )}
        
        {/* Overlay Gradient for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-cosmic-900 via-transparent to-transparent opacity-80"></div>
        
        {/* Top Right Status Indicator */}
        <div className="absolute top-4 right-4">
            {project.live_url ? (
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-black/50 backdrop-blur-md border border-neon-cyan/30 text-[10px] font-bold text-neon-cyan tracking-wider uppercase shadow-[0_0_10px_rgba(0,234,255,0.2)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse"></span>
                    Live
                </div>
            ) : (
                <div className="px-2 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-[10px] font-bold text-slate-500 tracking-wider uppercase">
                    In Dev
                </div>
            )}
        </div>
      </div>

      <div className="p-8 relative z-10 flex flex-col flex-grow bg-cosmic-900">
        
        <div className="mb-4">
          <h3 className="text-card-title text-white group-hover:text-neon-cyan transition-colors duration-300 leading-tight">
            {project.title}
          </h3>
        </div>

        <p className="text-body text-slate-400 mb-6 flex-grow line-clamp-3">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-8">
          {project.tags.slice(0, 4).map((tag) => (
            <span 
              key={tag} 
              className="text-[10px] font-bold px-3 py-1.5 rounded-full bg-white/5 text-slate-300 border border-white/10 tracking-wider uppercase group-hover:border-neon-cyan/20 group-hover:text-white transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3 mt-auto pt-6 border-t border-white/5">
          {project.live_url ? (
            <a 
              href={project.live_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-ui text-white bg-neon-cyan/10 border border-neon-cyan/20 px-4 py-2 rounded-full hover:bg-neon-cyan hover:text-black transition-all duration-300"
            >
              <span>View System</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </a>
          ) : (
            <span className="text-ui font-medium text-slate-600 cursor-not-allowed px-2">
              Private Access
            </span>
          )}
          
          {project.case_study_url && (
            <a 
              href={project.case_study_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-neon-cyan border border-white/10 hover:border-neon-cyan/50 bg-white/5 px-3 py-2 rounded-full transition-all flex items-center gap-2 text-ui font-medium"
            >
              <span>Case Study</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
            </a>
          )}

          {project.github_url && (
            <a 
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-white transition-colors ml-auto"
              title="GitHub"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;