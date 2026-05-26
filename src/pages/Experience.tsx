import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getExperiences, Experience as ExperienceType } from '../services/firebaseService';

const Experience: React.FC = () => {
  const [experiences, setExperiences] = useState<ExperienceType[]>([]);
  const [loading, setLoading] = useState(true);

  const mockExperiences: ExperienceType[] = [
    {
      id: '1',
      company: 'Self-Employed / Stealth Startup',
      role: 'AI Product Engineer & Systems Lead',
      period: '2024 — Present',
      description: 'Architecting end-to-end intelligent systems, focusing on AI-native product design and scalable cloud architectures.'
    },
    {
      id: '2',
      company: 'Previous Tech Lead Role',
      role: 'Frontend Engineering Lead',
      period: '2022 — 2024',
      description: 'Led a team of engineers in building premium SaaS interfaces and optimizing system performance.'
    }
  ];

  useEffect(() => {
    const fetchExp = async () => {
      const data = await getExperiences();
      setExperiences(data.length > 0 ? data : mockExperiences);
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
            Career Trajectory
          </span>
          <h1 className="text-display font-w350 text-midnight-ink">
            Evolution of a Systems Architect.
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
                <h4 className="text-caption font-regular text-slate-comment mb-6">{exp.role}</h4>
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

      {/* Philosophy Section with Canvas Background */}
      <section className="bg-canvas py-144 px-4 md:px-12 border-t border-midnight-ink/5 mt-144">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-22 items-center">
           <div>
              <span className="text-caption font-bold text-midnight-ink/30 uppercase tracking-[0.3em] mb-6 block">Operational Philosophy</span>
              <h2 className="text-display font-w350 text-midnight-ink mb-11 leading-tight">Intellectual Rigor.</h2>
           </div>
           <p className="text-slate-comment text-caption leading-relaxed max-w-md">
             Every role I've undertaken has been a step towards mastering the architecture of intelligence. From frontend lead to AI systems lead, the focus remains on systemic integrity and aesthetic precision.
           </p>
        </div>
      </section>
    </div>
  );
};

export default Experience;
