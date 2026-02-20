import React from 'react';
import SEO from '../components/SEO';
import { Code2, Cloud, Cpu, Database, Award, ExternalLink, Zap, Workflow, Terminal, Globe } from 'lucide-react';
import { Certification } from '../types';

const About: React.FC = () => {
  const experiences = [
    { title: 'AI Automation Engineer', location: 'Freelance/Consulting', date: '2024 - Present', desc: 'Building AI-powered workflows and SaaS automation systems that reduced operational effort by 30%+.', tags: ['Python', 'Zapier', 'OpenAI'], color: 'text-brand-indigo' },
    { title: 'Full-Stack Developer', location: 'Cloud Focused', date: '2023 - Present', desc: 'Building scalable applications and microservices across cloud environments.', tags: ['React', 'Node.js', 'Vite'], color: 'text-brand-violet' },
    { title: 'AI Solutions Specialist', location: 'IBM Watson Ecosystem', date: '2023 - 2024', desc: 'Utilizing Watson Assistant, NLU, and Sentiment Analysis for user-focused insights.', tags: ['IBM Watson', 'NLU', 'AI'], color: 'text-brand-emerald' },
  ];

  const certifications: Certification[] = [
    {
      id: 'cert-1',
      title: 'IBM Watson AI Professional',
      issuer: 'IBM',
      issue_date: '2024',
      badge_url: 'https://images.credly.com/images/86435f3d-5900-476b-950c-e16f72f883f3/IBM-Watson-Assistant-Foundation.png',
      verify_url: 'https://www.credly.com/users/sgukobong'
    },
    {
      id: 'cert-2',
      title: 'Google Cloud Certified',
      issuer: 'Google',
      issue_date: '2023',
      badge_url: 'https://images.credly.com/images/ae16f6b5-559d-4348-89c0-99c084a44107/google-cloud-certified-associate-cloud-engineer.png',
      verify_url: 'https://www.credly.com/users/sgukobong'
    }
  ];

  const skills = [
    { category: "Primary Expertise", items: ["Artificial Intelligence", "Workflow Automation", "Python", "API Integration", "SaaS Development"], color: "text-brand-indigo" },
    { category: "Frontend & Logic", items: ["JavaScript", "React", "TypeScript", "Tailwind", "Node.js"], color: "text-brand-violet" },
    { category: "Tools & Ecosystem", items: ["Zapier", "Make", "IBM Watson", "GCP", "REST APIs", "Git", "LMS Systems"], color: "text-brand-emerald" }
  ];

  return (
    <div className="max-w-6xl mx-auto pt-10 pb-32">
      <SEO title="About — Saviour Ukobong" description="AI Automation Engineer and Full-Stack Developer specialized in Python, JavaScript, and intelligent workflows." />
      
      {/* Intro Bio */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-20 mb-40 items-center">
         <div className="md:col-span-7">
            <span className="text-[10px] font-mono uppercase tracking-[0.5em] text-brand-indigo mb-6 block font-black">● Introduction</span>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-[1.1] mb-12">
              Building systems that <span className="italic font-serif text-brand-indigo">think, automate,</span> and scale.
            </h2>
            <div className="prose prose-slate prose-xl max-w-none text-slate-700 font-medium leading-relaxed space-y-8">
               <p>
                 I’m a full-stack developer and AI automation specialist. I specialize in building <span className="text-brand-indigo font-black">AI-powered workflows</span>, SaaS integrations, and data-driven systems using Python, JavaScript, and modern AI APIs.
               </p>
               <p>
                 I’ve successfully built automation systems that reduced operational manual effort by over 30% and engineered learning platforms serving over 1,000 users. My work focuses on bridging the gap between complex data and functional, user-centric interfaces.
               </p>
               <p>
                 Whether it's custom SaaS backend logic, <span className="text-brand-violet font-black underline decoration-2 underline-offset-4">Zapier/Make automations</span>, or deploying local-first LLMs, I’m motivated by solving real-world problems with solid code and intelligent logic.
               </p>
            </div>
         </div>
         <div className="md:col-span-5">
            <div className="bg-black text-white p-12 rounded-[3.5rem] shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-40 h-40 bg-brand-indigo/20 blur-[60px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
               <h3 className="text-xs font-mono uppercase tracking-widest text-white/50 mb-10 font-black">Technical Toolkit</h3>
               <div className="space-y-10">
                  {skills.map(skillGroup => (
                    <div key={skillGroup.category}>
                        <h4 className={`text-lg font-black mb-4 border-b border-white/10 pb-2 ${skillGroup.color}`}>{skillGroup.category}</h4>
                        <div className="flex flex-wrap gap-2">
                           {skillGroup.items.map(item => (
                             <span key={item} className="px-3 py-1.5 bg-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/20 transition-colors">{item}</span>
                           ))}
                        </div>
                    </div>
                  ))}
               </div>
            </div>
         </div>
      </div>

      {/* VERIFIED EXPERTISE (BADGES) */}
      <div className="mb-40">
        <span className="text-[10px] font-mono uppercase tracking-[0.5em] text-slate-500 mb-12 block font-black">● Verified Expertise</span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((cert) => (
            <a 
              key={cert.id} 
              href={cert.verify_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group bg-white border border-black/5 p-8 rounded-[2.5rem] flex flex-col items-center text-center hover:border-brand-indigo/30 transition-all hover:shadow-xl hover:shadow-brand-indigo/5"
            >
              <div className="w-24 h-24 mb-6 relative">
                 <img 
                    src={cert.badge_url} 
                    alt={cert.title} 
                    className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500"
                 />
              </div>
              <h3 className="text-lg font-black text-black leading-tight mb-2 group-hover:text-brand-indigo transition-colors">{cert.title}</h3>
              <p className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold mb-4">{cert.issuer} • {cert.issue_date}</p>
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-brand-indigo opacity-0 group-hover:opacity-100 transition-all">
                 Verify Credential <ExternalLink className="w-3 h-3" />
              </div>
            </a>
          ))}
          <a 
            href="https://www.credly.com/users/sgukobong" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group border-2 border-dashed border-black/10 p-8 rounded-[2.5rem] flex flex-col items-center justify-center text-center hover:border-brand-indigo/30 transition-all"
          >
            <Award className="w-10 h-10 text-slate-200 group-hover:text-brand-indigo transition-colors mb-4" />
            <h3 className="text-sm font-black text-slate-400 group-hover:text-black tracking-widest uppercase">View All Credentials ↗</h3>
          </a>
        </div>
      </div>

      {/* Experience Timeline */}
      <div className="mb-40">
        <span className="text-[10px] font-mono uppercase tracking-[0.5em] text-slate-500 mb-12 block font-black">● Professional Path</span>
        <div className="divide-y divide-black/10">
          {experiences.map((exp, i) => (
            <div key={i} className="py-12 group grid grid-cols-1 md:grid-cols-12 gap-8 items-center hover:bg-white hover:shadow-xl hover:shadow-brand-indigo/5 transition-all -mx-8 px-8 rounded-3xl relative overflow-hidden">
               <div className="absolute left-0 top-0 bottom-0 w-1 bg-transparent group-hover:bg-brand-indigo transition-all"></div>
               <div className="md:col-span-4">
                  <h3 className={`text-2xl font-black mb-2 tracking-tight transition-colors ${exp.color}`}>{exp.title}</h3>
                  <p className="text-xs text-slate-500 font-black uppercase tracking-widest">{exp.location} • {exp.date}</p>
               </div>
               <div className="md:col-span-5 text-slate-700 text-lg font-medium leading-relaxed italic">
                  {exp.desc}
               </div>
               <div className="md:col-span-3 flex flex-wrap justify-end gap-2">
                  {exp.tags.map(tag => (
                    <span key={tag} className={`px-4 py-2 rounded-full border border-black/10 text-[9px] font-black uppercase tracking-widest text-black group-hover:bg-black group-hover:text-white transition-all`}>
                      {tag}
                    </span>
                  ))}
               </div>
            </div>
          ))}
        </div>
      </div>

      {/* Specializations */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         <div className="p-12 bg-white rounded-[3rem] border border-black/5 hover:border-brand-indigo/30 transition-all group shadow-sm hover:shadow-xl hover:shadow-brand-indigo/5">
            <Zap className="w-8 h-8 mb-6 text-brand-indigo group-hover:scale-110 transition-transform" />
            <h4 className="text-xl font-black mb-4 group-hover:text-brand-indigo transition-colors">AI & Workflow Automation</h4>
            <p className="text-slate-600 font-medium leading-relaxed">Expert in Zapier, Make, and custom Python scripts to streamline business processes and SaaS onboarding.</p>
         </div>
         <div className="p-12 bg-white rounded-[3rem] border border-black/5 hover:border-brand-violet/30 transition-all group shadow-sm hover:shadow-xl hover:shadow-brand-violet/5">
            <Terminal className="w-8 h-8 mb-6 text-brand-violet group-hover:scale-110 transition-transform" />
            <h4 className="text-xl font-black mb-4 group-hover:text-brand-violet transition-colors">Python & API Integration</h4>
            <p className="text-slate-600 font-medium leading-relaxed">Building robust data pipelines, reporting engines, and integrating modern AI APIs into existing products.</p>
         </div>
         <div className="p-12 bg-white rounded-[3rem] border border-black/5 hover:border-brand-emerald/30 transition-all group shadow-sm hover:shadow-xl hover:shadow-brand-emerald/5">
            <Globe className="w-8 h-8 mb-6 text-brand-emerald group-hover:scale-110 transition-transform" />
            <h4 className="text-xl font-black mb-4 group-hover:text-brand-emerald transition-colors">LMS & EdTech Systems</h4>
            <p className="text-slate-600 font-medium leading-relaxed">Deep experience with Moodle and custom LMS architectures designed for the African context and unreliable networks.</p>
         </div>
      </div>
    </div>
  );
};

export default About;