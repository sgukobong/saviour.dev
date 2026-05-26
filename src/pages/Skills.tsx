import React from 'react';
import { motion } from 'framer-motion';

const Skills: React.FC = () => {
  const competenceCategories = [
    {
      title: 'AI Product Engineering',
      skills: ['AI SaaS Development', 'Intelligent Workflow Automation', 'AI Agents & Chatbot Systems', 'Prompt Engineering', 'AI-Assisted Learning']
    },
    {
      title: 'Full-Stack Development',
      skills: ['React / TypeScript / Vite', 'Node.js', 'Firebase Architecture', 'REST APIs', 'Supabase / PostgreSQL', 'PWA']
    },
    {
      title: 'Systems & Strategy',
      skills: ['Product & System Design', 'LMS & EdTech Platforms', 'Business Process Automation', 'Rapid Iteration', 'Cross-functional Collaboration']
    },
    {
      title: 'Infrastructure & Tools',
      skills: ['Google Cloud Run', 'Vercel', 'Git & GitHub', 'Docker', 'Postman', 'n8n / Zapier', 'Airtable']
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
            My Expertise
          </span>
          <h1 className="text-display font-w350 text-midnight-ink">
            How I Build & What I Use.
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-midnight-ink/5 border border-midnight-ink/5">
          {competenceCategories.map((category, index) => (
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

      {/* Stack Summary */}
      <section className="bg-canvas py-144 px-4 md:px-12 border-t border-midnight-ink/5 mt-144">
        <div className="max-w-[1440px] mx-auto text-center">
           <p className="text-slate-comment text-caption leading-relaxed max-w-2xl mx-auto uppercase tracking-[0.2em]">
             Focusing on practical AI solutions that improve operations, learning experiences, and decision-making for real-world products.
           </p>
        </div>
      </section>
    </div>
  );
};

export default Skills;
