import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getProjects, Project } from '../services/firebaseService';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const mockProjects: Project[] = [
    {
      id: '1',
      title: 'A¹ Intelligence Engine',
      description: 'A modular AI orchestration layer for autonomous enterprise workflows.',
      tags: ['AI', 'Architecture', 'TypeScript'],
      caseStudy: {
        problem: 'Siloed data and manual workflows slowing down decision making.',
        solution: 'Centralized intelligence engine with autonomous agent capabilities.',
        impact: '40% reduction in operational latency.',
        techStack: ['Node.js', 'OpenAI', 'Firebase']
      }
    },
    {
      id: '2',
      title: 'Neuro-SaaS Interface',
      description: 'A high-performance dashboard system designed for cognitive ergonomics.',
      tags: ['SaaS', 'Systems', 'React'],
      caseStudy: {
        problem: 'Information overload in traditional SaaS interfaces.',
        solution: 'Minimalist dashboard with contextual intelligence layers.',
        impact: 'Improved user productivity by 25%.',
        techStack: ['React', 'TailwindCSS', 'Framer Motion']
      }
    }
  ];

  useEffect(() => {
    const fetchProjects = async () => {
      const data = await getProjects();
      setProjects(data.length > 0 ? data : mockProjects);
      setLoading(false);
    };
    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ghost-white">
        <span className="text-caption uppercase tracking-[0.3em] animate-pulse">Synchronizing Systems...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full bg-ghost-white min-h-screen pt-144 pb-94">
      <section className="px-4 md:px-12 max-w-[1440px] mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-144"
        >
          <span className="text-caption font-bold uppercase tracking-[0.2em] text-future-blue mb-6 block">
            System Portfolio
          </span>
          <h1 className="text-display font-w350 text-midnight-ink">
            Production-Ready Architectures.
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-midnight-ink/5 border border-midnight-ink/5">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: index * 0.1 }}
              className="group bg-white p-11 flex flex-col justify-between hover:bg-canvas transition-colors duration-500"
            >
              <div>
                <div className="flex flex-wrap gap-2 mb-11">
                  {project.tags.map(tag => (
                    <span key={tag} className="tag-pill text-[10px] uppercase tracking-widest">{tag}</span>
                  ))}
                </div>
                <h3 className="text-heading-lg font-w350 mb-6 group-hover:text-future-blue transition-colors">
                  {project.title}
                </h3>
                <p className="text-caption text-slate-comment leading-relaxed mb-11 max-w-sm">
                  {project.description}
                </p>
                
                {project.caseStudy && (
                  <div className="pt-11 border-t border-midnight-ink/5 space-y-6">
                    <div className="flex flex-col gap-2">
                      <span className="text-[10px] font-bold text-midnight-ink/40 uppercase tracking-widest">Problem Statement</span>
                      <p className="text-caption text-slate-comment leading-relaxed">{project.caseStudy.problem}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <span className="text-[10px] font-bold text-future-blue/40 uppercase tracking-widest">System Impact</span>
                      <p className="text-caption text-future-blue font-bold tracking-tight">{project.caseStudy.impact}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-22 flex items-center justify-between">
                <div className="flex gap-10">
                  {project.links?.github && (
                    <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="text-slate-comment hover:text-future-blue transition-colors">
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {project.links?.live && (
                    <a href={project.links.live} target="_blank" rel="noopener noreferrer" className="text-slate-comment hover:text-future-blue transition-colors">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
                <button className="btn-ghost text-[10px] font-bold uppercase flex items-center gap-2 group/btn tracking-widest">
                  Architecture Review <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Experimental AI Lab Placeholder - Subtle layering with Canvas */}
      <section className="bg-canvas py-144 px-4 md:px-12 border-t border-midnight-ink/5 mt-144">
        <div className="max-w-[1440px] mx-auto text-center">
           <span className="text-caption font-bold text-future-blue uppercase tracking-[0.3em] mb-6 block">Laboratory</span>
           <h2 className="text-heading-lg font-w350 text-midnight-ink mb-11">AI Systems R&D</h2>
           <p className="text-caption text-slate-comment max-w-md mx-auto leading-relaxed">
             Experimental autonomous agents and neural interface prototypes. Currently in closed beta.
           </p>
        </div>
      </section>
    </div>
  );
};

export default Projects;
