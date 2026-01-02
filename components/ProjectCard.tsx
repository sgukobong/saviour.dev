import React from 'react';
import { Project } from '../types';
import { ArrowUpRight } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="group cursor-pointer hover-trigger">
      <div className="aspect-[1.1/1] rounded-[3rem] bg-white border-2 border-black/5 overflow-hidden mb-8 relative transition-all duration-700 hover:border-black/20 hover:shadow-2xl">
        {project.image_url ? (
          <img 
            src={project.image_url} 
            alt={project.title} 
            className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 scale-100 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-slate-50 flex items-center justify-center">
             <span className="text-7xl font-black text-black/5 tracking-tighter">SU.</span>
          </div>
        )}
        
        {/* Interaction Arrow */}
        <div className="absolute top-8 right-8 arrow-circle w-14 h-14 rounded-full bg-white text-black border border-black/10 flex items-center justify-center shadow-xl transition-all duration-500">
           <ArrowUpRight className="w-6 h-6" />
        </div>
        
        {/* Tag Overlay */}
        <div className="absolute bottom-10 left-10 flex flex-wrap gap-2">
          {project.tags.slice(0, 3).map(tag => (
            <span key={tag} className="bg-black/80 backdrop-blur-md text-[9px] font-black uppercase tracking-widest px-4 py-2 rounded-full border border-white/10 text-white shadow-lg">
              {tag}
            </span>
          ))}
        </div>
      </div>
      
      <div className="flex justify-between items-start px-4">
        <div>
          <h3 className="text-2xl font-black mb-1 text-black group-hover:underline transition-all underline-offset-4">{project.title}</h3>
          <p className="text-xs font-mono text-slate-800 uppercase tracking-widest font-black">Infrastructure & Resilience</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;