import React from 'react';
import SEO from '../components/SEO';

const About: React.FC = () => {
  const experiences = [
    { title: 'EdTech Consultant', location: 'Nigeria, USA', date: 'Jan 2025 - Present', desc: 'Strategy, Moodle, and Resilient Systems.', tags: ['EdTech', 'Strategy'] },
    { title: 'Instructional Designer', location: 'Lagos, Nigeria', date: 'May 2024 - Dec 2024', desc: 'Competency-based learning for workforce upskilling.', tags: ['Design', 'LMS'] },
    { title: 'LMS Administrator', location: 'Remote', date: 'Mar 2024 - May 2024', desc: 'Managing Moodle platforms for virtual experiences.', tags: ['Admin', 'Automation'] },
  ];

  return (
    <div className="max-w-6xl mx-auto pt-10">
      <SEO title="Experience & Journey" description="Explore my professional journey as an AI Developer and EdTech consultant." />
      
      <div className="mb-24">
        <span className="text-[10px] font-mono uppercase tracking-[0.5em] text-slate-500 mb-6 block font-bold">● Experiences</span>
        <h2 className="text-section-title mb-12 text-black">Explore My Design<br/>Journey</h2>
        
        <div className="divide-y divide-black/10">
          {experiences.map((exp, i) => (
            <div key={i} className="py-10 group grid grid-cols-1 md:grid-cols-12 gap-6 items-center hover:bg-white transition-colors -mx-4 px-4 rounded-xl">
               <div className="md:col-span-4">
                  <h3 className="text-xl font-black mb-1 text-black">{exp.title}</h3>
                  <p className="text-sm text-slate-800 font-bold">{exp.location} • {exp.date}</p>
               </div>
               <div className="md:col-span-5 text-slate-900 text-base italic font-medium leading-relaxed">
                  {exp.desc}
               </div>
               <div className="md:col-span-3 flex justify-end gap-2">
                  {exp.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 rounded-full border border-black/20 text-[10px] font-black uppercase tracking-widest text-slate-800 group-hover:bg-black group-hover:text-white transition-all">
                      {tag}
                    </span>
                  ))}
               </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-20 py-24 border-t border-black/10">
         <div>
            <h3 className="text-2xl font-black mb-6 text-black">The Philosophy</h3>
            <p className="text-slate-800 leading-relaxed text-lg font-medium">
              I believe software should be as resilient as the people who use it. My focus is on offline-first capabilities, ensuring that data is never lost, and learning never stops, even when the lights go out.
            </p>
         </div>
         <div className="space-y-8">
            <div className="glass-card p-8 rounded-3xl bg-white shadow-sm">
               <div className="text-4xl font-black text-black mb-2">500+</div>
               <p className="text-[10px] text-slate-800 uppercase tracking-widest font-bold">Modules Deployed</p>
            </div>
            <div className="glass-card p-8 rounded-3xl bg-white shadow-sm">
               <div className="text-4xl font-black text-black mb-2">24/7</div>
               <p className="text-[10px] text-slate-800 uppercase tracking-widest font-bold">Resilience Monitoring</p>
            </div>
         </div>
      </div>
    </div>
  );
};

export default About;