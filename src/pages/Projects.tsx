import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getProjects, Project } from '../services/firebaseService';
import { ExternalLink, ArrowRight, Shield, Zap, X } from 'lucide-react';

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  const curatedProducts: Project[] = [
    {
      id: 'asterscholar',
      title: 'Asterscholar',
      description: 'A high-fidelity research platform designed to eliminate academic hallucinations through verified indexing.',
      tags: ['AI', 'Research', 'Integrity'],
      caseStudy: {
        problem: 'Academic hallucinations and unreliable AI citations undermining research integrity.',
        solution: 'Access to 213M+ verified papers with a Co-Writer and Fact-Checker that audits claims against real sources.',
        impact: 'Trusted by 50,000+ scholars across hundreds of institutions worldwide.',
        techStack: ['RAG Architecture', 'Semantic Search', 'Verified Indexing']
      },
      links: { live: 'https://www.asterscholar.com/' }
    },
    {
      id: 'accentta',
      title: 'Accentta',
      description: 'An AI-powered speech coaching application helping professionals improve their clarity and confidence.',
      tags: ['AI', 'Speech', 'Coaching'],
      caseStudy: {
        problem: 'Lack of personalized, instant feedback on clarity and pronunciation for professional communication.',
        solution: 'AI-powered recording analysis providing scores and specific coaching notes on pace, clarity, and accent.',
        impact: 'Enabling confident professional delivery through data-driven coaching loops.',
        techStack: ['Audio Analysis', 'Pattern Recognition', 'NLP']
      },
      links: { live: 'https://accentta.com' }
    },
    {
      id: 'tabmeet',
      title: 'Tabmeet',
      description: 'A decision-support tool that turns fragmented browser tabs into structured product comparisons.',
      tags: ['Browser Extension', 'AI'],
      caseStudy: {
        problem: 'Information fragmentation across too many tabs making product comparisons difficult.',
        solution: 'Chrome extension that extracts structured details, summarizes tradeoffs, and surfaces trust signals.',
        impact: 'Streamlined research workflow for complex purchase and evaluation decisions.',
        techStack: ['Chrome API', 'LLM Summarization', 'Structured Extraction']
      },
      links: { live: 'https://tabmeet.vercel.app' }
    },
  ];

  useEffect(() => {
    const fetchProjects = async () => {
      const data = await getProjects();
      setProjects(data.length > 0 ? data : curatedProducts);
      setLoading(false);
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    document.body.style.overflow = selectedProject ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedProject]);

  useEffect(() => {
    if (!selectedProject) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedProject(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ghost-white">
        <span className="text-caption uppercase tracking-[0.3em] animate-pulse text-future-blue">Loading Projects...</span>
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
          <span className="section-kicker mb-6 block">
            Selected Work
          </span>
          <h1 className="text-display font-w350 text-midnight-ink max-w-2xl leading-tight">
            Building platforms that prioritize trust and clarity.
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-px bg-midnight-ink/10 border border-midnight-ink/10">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: index * 0.1 }}
              className="group bg-white p-8 md:p-11 flex flex-col justify-between hover:bg-canvas transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_22px_70px_rgba(15,16,18,0.08)]"
            >
              <div>
                <div className="flex flex-wrap gap-2 mb-11">
                  {project.tags.map(tag => (
                    <span key={tag} className="tag-pill text-[10px] uppercase tracking-widest">{tag}</span>
                  ))}
                </div>
                <h3 className="text-heading-lg font-w350 mb-6 group-hover:text-future-blue transition-colors uppercase tracking-tight">
                  {project.title}
                </h3>
                <p className="text-caption text-slate-comment leading-relaxed mb-11 max-w-sm">
                  {project.description}
                </p>
                
                {project.caseStudy && (
                  <div className="pt-11 border-t border-midnight-ink/5 space-y-8">
                    <div className="flex flex-col gap-2">
                      <span className="text-[10px] font-bold text-midnight-ink/50 uppercase tracking-widest flex items-center gap-2">
                        <Shield className="w-3 h-3" /> The Challenge
                      </span>
                      <p className="text-caption text-slate-comment leading-relaxed">{project.caseStudy.problem}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <span className="text-[10px] font-bold text-signal-green uppercase tracking-widest flex items-center gap-2">
                        <Zap className="w-3 h-3" /> Real-World Impact
                      </span>
                      <p className="text-caption text-midnight-ink font-bold tracking-tight">{project.caseStudy.impact}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-22 flex items-center justify-between gap-6">
                <div className="flex gap-10">
                  {project.links?.live && (
                    <a 
                      href={project.links.live} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-slate-comment hover:text-future-blue transition-colors flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest"
                    >
                      Visit Site <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedProject(project)}
                  className="btn-ghost text-[10px] font-bold uppercase flex items-center gap-2 group/btn tracking-widest"
                >
                  View Details <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="bg-canvas py-144 px-4 md:px-12 border-t border-midnight-ink/5 mt-144">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-22 items-center">
           <div>
              <span className="text-caption font-bold text-future-blue uppercase tracking-[0.3em] mb-6 block">Our Commitment</span>
              <h2 className="text-display font-w350 text-midnight-ink mb-11 leading-tight">Focusing on Integrity.</h2>
              <div className="accent-line"></div>
           </div>
           <p className="text-slate-comment text-caption leading-relaxed max-w-md">
             Speed is valuable, but trust is essential. Every system I architect is built on the commitment that technology should be reliable, traceable, and designed with the user's best interest in mind.
          </p>
        </div>
      </section>

      {selectedProject && (
        <div
          className="fixed inset-0 z-[70] bg-midnight-ink/40 backdrop-blur-sm px-4 py-6 md:p-12 flex items-end md:items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-detail-title"
          onClick={() => setSelectedProject(null)}
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-3xl bg-white border border-midnight-ink/10 rounded-lg shadow-[0_20px_80px_rgba(15,16,18,0.16)] max-h-[88vh] overflow-y-auto"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="sticky top-0 bg-white/95 backdrop-blur border-b border-midnight-ink/5 p-6 md:p-8 flex items-start justify-between gap-6">
              <div>
                <span className="text-[10px] font-bold text-future-blue uppercase tracking-[0.3em] mb-3 block">Case Study</span>
                <h2 id="project-detail-title" className="text-heading-lg font-w350 uppercase tracking-widest text-midnight-ink">{selectedProject.title}</h2>
              </div>
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="w-10 h-10 rounded-full bg-ghost-white border border-midnight-ink/5 flex items-center justify-center text-midnight-ink hover:text-future-blue transition-colors shrink-0"
                aria-label="Close project details"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 md:p-8 grid gap-8">
              <p className="text-[16px] md:text-heading-lg text-slate-comment leading-relaxed max-w-2xl">
                {selectedProject.description}
              </p>

              {selectedProject.caseStudy && (
                <div className="grid gap-px bg-midnight-ink/5 border border-midnight-ink/5">
                  {[
                    ['Problem', selectedProject.caseStudy.problem],
                    ['Solution', selectedProject.caseStudy.solution],
                    ['Impact', selectedProject.caseStudy.impact]
                  ].map(([label, copy]) => (
                    <div key={label} className="bg-canvas p-6 md:p-8">
                      <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-midnight-ink/40 mb-3 block">{label}</span>
                      <p className="text-caption md:text-[13px] text-slate-comment leading-relaxed">{copy}</p>
                    </div>
                  ))}
                </div>
              )}

              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-midnight-ink/40 mb-4 block">Technical Focus</span>
                <div className="flex flex-wrap gap-3">
                  {(selectedProject.caseStudy?.techStack || selectedProject.tags).map((item) => (
                    <span key={item} className="tag-pill text-[10px] uppercase tracking-widest">{item}</span>
                  ))}
                </div>
              </div>

              {selectedProject.links?.live && (
                <a
                  href={selectedProject.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-pill bg-midnight-ink text-white hover:bg-future-blue inline-flex w-fit gap-4"
                >
                  Visit Product <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Projects;
