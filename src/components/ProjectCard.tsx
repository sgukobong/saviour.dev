import React from 'react';
import { Project } from '../types';
import { ArrowUpRight } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  // Determine accent color based on project (mock logic for demo)
  const isAi = project.tags.some(t => t.toLowerCase().includes('ai'));
  const accentClass = isAi ? 'group-hover:text-brand-indigo' : 'group-hover:text-brand-emerald';
  const decorationClass = isAi ? 'group-hover:decoration-brand-indigo/30' : 'group-hover:decoration-brand-emerald/30';

  return (
    <div className="group cursor-pointer">
      <div className="aspect-[1.1/1] rounded-[3rem] bg-white border-2 border-black/5 overflow-hidden mb-8 relative transition-all duration-700 hover:border-brand-indigo/20 hover:shadow-2xl hover:shadow-brand-indigo/5">
        <div className={`absolute inset-0 bg-gradient-to-tr from-brand-indigo/5 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700`}></div>
        
        {project.image_url ? (
          <img 
            src={project.image_url} 
            alt={project.title} 
            className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 scale-100 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-slate-50 flex items-center justify-center">
             <span className="text-7xl font-black text-black/5 tracking-tighter group-hover:text-brand-indigo/5 transition-colors">SU.</span>
          </div>
        )}
        
        {/* Interaction Arrow */}
        <div className="absolute top-8 right-8 w-14 h-14 rounded-full bg-white text-black border border-black/10 flex items-center justify-center shadow-xl transition-all duration-500 z-20 group-hover:bg-brand-indigo group-hover:text-white group-hover:border-brand-indigo">
           <ArrowUpRight className="w-6 h-6" />
        </div>
        
        {/* Tag Overlay */}
        <div className="absolute bottom-10 left-10 flex flex-wrap gap-2 z-20">
          {project.tags.slice(0, 3).map(tag => (
            <span key={tag} className="bg-black/80 backdrop-blur-md text-[9px] font-black uppercase tracking-widest px-4 py-2 rounded-full border border-white/10 text-white shadow-lg group-hover:bg-brand-indigo group-hover:border-brand-indigo/20 transition-colors">
              {tag}
            </span>
          ))}
        </div>
      </div>
      
      <div className="flex justify-between items-start px-4">
        <div>
          <h3 className={`text-2xl font-black mb-1 text-black transition-all underline decoration-transparent underline-offset-8 ${accentClass} ${decorationClass}`}>{project.title}</h3>
          <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-black">Resilient Systems & Logic</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;