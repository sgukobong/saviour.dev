import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getExperiences, Experience as ExperienceType } from '../services/firebaseService';

const Experience: React.FC = () => {
  const [experiences, setExperiences] = useState<ExperienceType[]>([]);
  const [loading, setLoading] = useState(true);

  const curatedExperiences: ExperienceType[] = [
    {
      id: 'asterverse',
      company: 'Asterverse Integrated Solutions',
      role: 'AI Product Engineer',
      period: 'Jan 2025 — Present',
      description: 'Designing and developing AI-powered SaaS products and scalable digital systems. Integrating Gemini, OpenAI, and Claude APIs into production environments. Building workflow automation systems using n8n and cloud-native services to optimize operational efficiency.'
    },
    {
      id: 'cpl',
      company: 'Crossing Party Lines',
      role: 'Apps and Agents Developer',
      period: 'Feb 2026 — Present',
      description: 'Developing lightweight applications and AI-powered agents supporting civil rights and social action programs. Translating operational needs into functional AI tools. Building automation-driven workflows for remote-first team coordination.'
    },
    {
      id: 'outsource',
      company: 'Outsource Global',
      role: 'LMS Specialist / Educational Systems Developer',
      period: 'Feb 2024 — Jan 2025',
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
            My Journey
          </span>
          <h1 className="text-display font-w350 text-midnight-ink">
            Building and Leading Intelligent Systems.
          </h1>
        </motion.div>

        <div className="space-y-22 relative before:absolute before:left-0 md:before:left-1/2 before:top-0 before:bottom-0 before:w-px before:bg-midnight-ink/10">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className={`flex flex-col md:flex-row gap-22 relative ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
            >
              <div className={`w-full md:w-1/2 flex flex-col items-start ${index % 2 === 0 ? 'md:items-end md:text-right' : 'md:items-start md:text-left'} px-4 md:px-11`}>
                <span className="text-caption font-bold text-future-blue mb-4 tracking-[0.2em] uppercase">{exp.period}</span>
                <h3 className="text-heading-lg font-w350 text-midnight-ink mb-2 uppercase tracking-tight">{exp.company}</h3>
                <h4 className="text-caption font-regular text-slate-comment mb-6 italic">{exp.role}</h4>
                <p className="text-caption text-slate-comment leading-relaxed max-w-md">
                  {exp.description}
                </p>
              </div>
              <div className="hidden md:block absolute left-1/2 top-0 -translate-x-1/2 w-2 h-2 bg-midnight-ink rounded-full z-10"></div>
              <div className="w-full md:w-1/2"></div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="bg-canvas py-144 px-4 md:px-12 border-t border-midnight-ink/5 mt-144">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-22 items-center">
           <div>
              <span className="text-caption font-bold text-midnight-ink/30 uppercase tracking-[0.3em] mb-6 block">Engineering Philosophy</span>
              <h2 className="text-display font-w350 text-midnight-ink mb-11 leading-tight">Engineering with Purpose.</h2>
           </div>
           <p className="text-slate-comment text-caption leading-relaxed max-w-md">
             My work is focused on the intersection of human-centered design and technical rigor. From Abuja to remote-first global teams, I build systems that solve real challenges and empower users through thoughtful AI integration.
           </p>
        </div>
      </section>
    </div>
  );
};

export default Experience;
