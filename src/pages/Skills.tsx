import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Layers3, Sparkles, SquareCode } from 'lucide-react';

const Skills: React.FC = () => {
  const competenceCategories = [
    {
      title: 'AI Product Engineering',
      summary: 'Product logic, automation, and AI systems built to work in production, not just demos.',
      accent: 'bg-soft-lavender text-future-blue',
      skills: ['AI SaaS Development', 'Intelligent Workflow Automation', 'AI Agents & Chatbot Systems', 'Prompt Engineering', 'AI-Assisted Learning'],
    },
    {
      title: 'Full-Stack Development',
      summary: 'Frontends, backends, and data layers designed for reliability and clean handoff.',
      accent: 'bg-soft-mint text-signal-green',
      skills: ['React / TypeScript / Vite', 'Node.js', 'Firebase Architecture', 'REST APIs', 'Supabase / PostgreSQL', 'PWA'],
    },
    {
      title: 'Systems & Strategy',
      summary: 'Product thinking, implementation discipline, and operational clarity for complex work.',
      accent: 'bg-soft-amber text-signal-amber',
      skills: ['Product & System Design', 'LMS & EdTech Platforms', 'Business Process Automation', 'Rapid Iteration', 'Cross-functional Collaboration'],
    },
    {
      title: 'Infrastructure & Tools',
      summary: 'The tooling and deployment stack that keeps delivery fast and observable.',
      accent: 'bg-white text-electric-cyan',
      skills: ['Google Cloud Run', 'Vercel', 'Git & GitHub', 'Docker', 'Postman', 'n8n / Zapier', 'Airtable'],
    },
  ];

  const highlights = [
    { label: 'AI systems', value: 'Production-focused' },
    { label: 'Delivery style', value: 'Fast and structured' },
    { label: 'Core stack', value: 'React, Firebase, TypeScript' },
  ];

  return (
    <div className="flex flex-col w-full min-h-screen pt-144 pb-94">
      <section className="px-4 md:px-12 max-w-[1440px] mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-22 mb-144 items-end"
        >
          <div>
            <span className="section-kicker mb-6 block">Capability</span>
            <h1 className="text-display font-w350 text-midnight-ink leading-tight max-w-2xl">
              A focused capability stack for AI products, software systems, and delivery.
            </h1>
            <p className="text-heading-lg font-w350 text-slate-comment mt-8 leading-relaxed max-w-2xl">
              The page is organized around what I can actually ship: product thinking, engineering execution, and the infrastructure that keeps the work stable.
            </p>
          </div>

          <div className="surface-panel rounded-lg p-8 md:p-10">
            <div className="flex items-center justify-between gap-6 mb-8">
              <div>
                <span className="text-caption font-bold uppercase tracking-[0.24em] text-slate-comment block mb-3">Delivery Shape</span>
                <h2 className="text-heading-lg font-w350 text-midnight-ink">Built for execution</h2>
              </div>
              <Sparkles className="w-5 h-5 text-future-blue shrink-0" />
            </div>
            <div className="grid gap-px bg-midnight-ink/10 border border-midnight-ink/10">
              {highlights.map((item, index) => (
                <div key={item.label} className="bg-white p-5 flex items-start justify-between gap-6">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-slate-comment block mb-2">{item.label}</span>
                    <p className="text-caption text-midnight-ink">{item.value}</p>
                  </div>
                  {index === 0 ? <Layers3 className="w-4 h-4 text-future-blue" /> : index === 1 ? <SquareCode className="w-4 h-4 text-signal-green" /> : <ArrowUpRight className="w-4 h-4 text-signal-amber" />}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-midnight-ink/10 border border-midnight-ink/10">
          {competenceCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.08 }}
              className="bg-white p-8 md:p-11 hover:bg-canvas transition-all duration-500 hover:-translate-y-1"
            >
              <div className={`inline-flex items-center gap-3 rounded-full px-4 py-2 text-[10px] font-bold uppercase tracking-[0.24em] mb-8 ${category.accent}`}>
                <span className="w-2 h-2 rounded-full bg-current"></span>
                {index + 1 < 10 ? `0${index + 1}` : index + 1}
              </div>
              <div className="flex items-start justify-between gap-6 mb-5">
                <div>
                  <h3 className="text-heading-lg font-w350 text-midnight-ink uppercase tracking-widest">{category.title}</h3>
                  <p className="text-caption text-slate-comment leading-relaxed mt-4 max-w-md">{category.summary}</p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-comment shrink-0 mt-1" />
              </div>
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="tag-pill cursor-default border border-transparent hover:border-future-blue/10"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-canvas py-144 px-4 md:px-12 border-t border-midnight-ink/5 mt-144">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-[0.8fr_1.2fr] gap-22 items-center">
          <div>
            <span className="section-kicker mb-6 block">Approach</span>
            <h2 className="text-display font-w350 text-midnight-ink leading-tight">Practical AI, grounded in product delivery.</h2>
          </div>
          <div className="surface-panel rounded-lg p-8 md:p-11">
            <p className="text-slate-comment text-caption leading-relaxed max-w-2xl">
              I focus on systems that are easy to use, easy to maintain, and clear enough for teams to act on. The point is not to collect tools, but to assemble a stack that makes execution reliable.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Skills;
