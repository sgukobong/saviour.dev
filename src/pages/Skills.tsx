import React from 'react';
import { motion } from 'framer-motion';

const Skills: React.FC = () => {
  const skillCategories = [
    {
      title: 'AI & Machine Learning',
      skills: ['Orchestration Engines', 'LLM Fine-tuning', 'Vector Databases', 'Autonomous Agents', 'RAG Architectures']
    },
    {
      title: 'Systems & Architecture',
      skills: ['SaaS Design Patterns', 'Distributed Systems', 'Cloud Native (Firebase/AWS)', 'Performance Optimization', 'Security Architectures']
    },
    {
      title: 'Frontend Engineering',
      skills: ['React / TypeScript', 'Design Systems', 'Micro-frontends', 'State Management', 'Complex Motion Systems']
    },
    {
      title: 'Tools & Ecosystem',
      skills: ['Vite', 'TailwindCSS', 'CI/CD Pipelines', 'Vercel / Netlify', 'Product Analytics']
    }
  ];

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
            Systems Capability Grid
          </span>
          <h1 className="text-display font-w350 text-midnight-ink">
            Technical Stack & Expertise.
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-midnight-ink/5 border border-midnight-ink/5">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="bg-white p-11 hover:bg-canvas transition-colors duration-500"
            >
              <h3 className="text-heading-lg font-w350 text-midnight-ink mb-14 uppercase tracking-widest">{category.title}</h3>
              <div className="flex flex-wrap gap-4">
                {category.skills.map(skill => (
                  <span 
                    key={skill}
                    className="tag-pill cursor-default hover:bg-[rgba(0,113,227,0.05)] hover:text-future-blue border border-transparent hover:border-future-blue/10"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stack Summary - Canvas layering */}
      <section className="bg-canvas py-144 px-4 md:px-12 border-t border-midnight-ink/5 mt-144">
        <div className="max-w-[1440px] mx-auto text-center">
           <p className="text-slate-comment text-caption leading-relaxed max-w-xl mx-auto">
             My technical stack is curated for precision and performance. I prioritize tools that offer systemic integrity and architectural flexibility, enabling the build of high-stakes intelligent platforms.
           </p>
        </div>
      </section>
    </div>
  );
};

export default Skills;
