import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getExperiences, Experience as ExperienceType } from '../services/firebaseService';
import { ArrowUpRight, Layers3, ShieldCheck, Sparkles } from 'lucide-react';

const Experience: React.FC = () => {
  const [experiences, setExperiences] = useState<ExperienceType[]>([]);
  const [loading, setLoading] = useState(true);

  const curatedExperiences: ExperienceType[] = [
    {
      id: 'asterverse',
      company: 'Asterverse Integrated Solutions',
      role: 'AI Product Engineer',
      period: 'Jan 2025 - Present',
      description: 'Designing and developing AI-powered SaaS products and scalable digital systems. Integrating Gemini, OpenAI, and Claude APIs into production environments. Building workflow automation systems using n8n and cloud-native services to optimize operational efficiency.'
    },
    {
      id: 'cpl',
      company: 'Crossing Party Lines',
      role: 'Apps and Agents Developer',
      period: 'Feb 2026 - Present',
      description: 'Developing lightweight applications and AI-powered agents supporting civil rights and social action programs. Translating operational needs into functional AI tools. Building automation-driven workflows for remote-first team coordination.'
    },
    {
      id: 'outsource',
      company: 'Outsource Global',
      role: 'LMS Specialist / Educational Systems Developer',
      period: 'Feb 2024 - Jan 2025',
      description: 'Optimized digital learning systems supporting scalable training workflows. Built automated reporting and progress-tracking systems to improve visibility. Focused on engagement and structured learning delivery.'
    }
  ];

  useEffect(() => {
    const fetchExp = async () => {
      const data = await getExperiences();
      setExperiences(data.length > 0 ? data : curatedExperiences);
      setLoading(false);
    };
    fetchExp();
  }, []);

  const highlights = [
    { label: 'Active roles', value: '3', note: 'Across product, automation, and learning systems.' },
    { label: 'Core focus', value: 'AI + systems', note: 'Execution with reliability, not novelty.' },
    { label: 'Delivery model', value: 'Remote-first', note: 'Structured collaboration across distributed teams.' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="text-caption uppercase tracking-[0.3em] animate-pulse text-future-blue">Loading Experience...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full min-h-screen pt-144 pb-94">
      <section className="px-4 md:px-12 max-w-[1440px] mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-22 items-end mb-144"
        >
          <div>
            <span className="section-kicker mb-6 block">Experience</span>
            <h1 className="text-display font-w350 text-midnight-ink leading-tight max-w-2xl">
              Building AI products, internal tools, and learning systems with real operational value.
            </h1>
            <p className="text-heading-lg font-w350 text-slate-comment mt-8 leading-relaxed max-w-2xl">
              The thread through every role is the same: make the system clearer, make the workflow faster, and make the output trustworthy enough for teams to depend on.
            </p>
          </div>

          <div className="surface-panel rounded-lg p-8 md:p-10">
            <div className="flex items-center justify-between gap-6 mb-8">
              <div>
                <span className="text-caption font-bold uppercase tracking-[0.24em] text-slate-comment block mb-3">Current Lens</span>
                <h2 className="text-heading-lg font-w350 text-midnight-ink">Product, automation, and systems</h2>
              </div>
              <Sparkles className="w-5 h-5 text-future-blue shrink-0" />
            </div>
            <div className="grid gap-px bg-midnight-ink/10 border border-midnight-ink/10">
              {highlights.map((item, index) => (
                <div key={item.label} className="bg-white p-5 flex items-start justify-between gap-6">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-slate-comment block mb-2">{item.label}</span>
                    <p className="text-caption text-midnight-ink font-bold">{item.value}</p>
                    <p className="text-caption text-slate-comment leading-relaxed mt-3">{item.note}</p>
                  </div>
                  {index === 0 ? <Layers3 className="w-4 h-4 text-future-blue shrink-0 mt-1" /> : index === 1 ? <ShieldCheck className="w-4 h-4 text-signal-green shrink-0 mt-1" /> : <ArrowUpRight className="w-4 h-4 text-signal-amber shrink-0 mt-1" />}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-midnight-ink/10 border border-midnight-ink/10">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.08 }}
              className="group bg-white p-8 md:p-11 flex flex-col justify-between hover:bg-canvas transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_22px_70px_rgba(15,16,18,0.08)]"
            >
              <div>
                <div className="flex items-center justify-between gap-6 mb-8">
                  <span className={`inline-flex items-center gap-3 rounded-full px-4 py-2 text-[10px] font-bold uppercase tracking-[0.24em] ${
                    index === 0 ? 'bg-soft-lavender text-future-blue' : index === 1 ? 'bg-soft-mint text-signal-green' : 'bg-soft-amber text-signal-amber'
                  }`}>
                    <span className="w-2 h-2 rounded-full bg-current"></span>
                    Timeline 0{index + 1}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-slate-comment group-hover:text-future-blue transition-colors" />
                </div>

                <div className="flex flex-col gap-3 mb-8">
                  <span className="text-caption font-bold text-future-blue tracking-[0.22em] uppercase">{exp.period}</span>
                  <h3 className="text-heading-lg font-w350 text-midnight-ink uppercase tracking-widest">{exp.company}</h3>
                  <h4 className="text-caption font-regular text-slate-comment italic">{exp.role}</h4>
                </div>

                <p className="text-caption text-slate-comment leading-relaxed max-w-xl">
                  {exp.description}
                </p>
              </div>

              <div className="mt-12 pt-10 border-t border-midnight-ink/5 flex items-center justify-between gap-6">
                <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-midnight-ink/40">Role focus</span>
                <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-midnight-ink/60">
                  {index === 0 ? 'AI systems and delivery' : index === 1 ? 'Agents and civic tools' : 'Learning operations'}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-canvas py-144 px-4 md:px-12 border-t border-midnight-ink/5 mt-144">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-[0.9fr_1.1fr] gap-22 items-start">
          <div>
            <span className="section-kicker mb-6 block">Engineering Philosophy</span>
            <h2 className="text-display font-w350 text-midnight-ink mb-11 leading-tight">Engineering with purpose and visible structure.</h2>
            <div className="accent-line"></div>
          </div>
          <div className="grid gap-6">
            <div className="surface-panel rounded-lg p-8 md:p-10">
              <p className="text-slate-comment text-caption leading-relaxed max-w-xl">
                My work sits at the intersection of human-centered design and technical rigor. From Abuja to remote-first global teams, I build systems that are legible, reliable, and easy to evolve.
              </p>
            </div>
            <div className="surface-panel rounded-lg p-8 md:p-10">
              <p className="text-slate-comment text-caption leading-relaxed max-w-xl">
                The goal is not to create complexity that looks impressive. The goal is to create products that feel calm to use, clear to maintain, and strong enough to support real work.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Experience;
