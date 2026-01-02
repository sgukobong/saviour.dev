import React from 'react';
import SEO from '../components/SEO';
import { Code2, Cloud, Cpu, Database, Award, ExternalLink } from 'lucide-react';
import { Certification } from '../types';

const About: React.FC = () => {
  const experiences = [
    { title: 'Full-Stack Developer', location: 'Cloud Focused', date: '2023 - Present', desc: 'Building scalable applications and microservices across cloud environments.', tags: ['React', 'Node.js', 'Vite'] },
    { title: 'AI Solutions Specialist', location: 'IBM Watson Ecosystem', date: '2023 - 2024', desc: 'Utilizing Watson Assistant, NLU, and Sentiment Analysis for user-focused insights.', tags: ['IBM Watson', 'NLU', 'AI'] },
    { title: 'Cloud Integration Lead', location: 'Distributed Systems', date: '2022 - 2023', desc: 'Handling deployments and cloud-based workflows on Google and IBM infrastructure.', tags: ['GCP', 'IBM Cloud', 'DevOps'] },
  ];

  const certifications: Certification[] = [
    {
      id: 'cert-1',
      title: 'IBM Watson AI Professional',
      issuer: 'IBM',
      issue_date: '2024',
      badge_url: 'https://images.credly.com/images/86435f3d-5900-476b-950c-e16f72f883f3/IBM-Watson-Assistant-Foundation.png', // Replace with your actual badge URL
      verify_url: 'https://www.credly.com/users/sgukobong'
    },
    {
      id: 'cert-2',
      title: 'Google Cloud Certified',
      issuer: 'Google',
      issue_date: '2023',
      badge_url: 'https://images.credly.com/images/ae16f6b5-559d-4348-89c0-99c084a44107/google-cloud-certified-associate-cloud-engineer.png', // Replace with your actual badge URL
      verify_url: 'https://www.credly.com/users/sgukobong'
    }
  ];

  const skills = [
    { category: "Frontend", items: ["HTML", "CSS", "JavaScript", "React", "TypeScript", "Tailwind"] },
    { category: "Backend", items: ["Node.js", "Express", "Java", "Python", "SQL", "Supabase"] },
    { category: "Cloud & AI", items: ["IBM Watson", "GCP", "IBM Cloud", "NLU", "Automations"] }
  ];

  return (
    <div className="max-w-6xl mx-auto pt-10 pb-32">
      <SEO title="About — Saviour Ukobong" description="Full-stack developer with expertise in JavaScript, IBM Watson, and cloud infrastructure." />
      
      {/* Intro Bio */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-20 mb-40 items-center">
         <div className="md:col-span-7">
            <span className="text-[10px] font-mono uppercase tracking-[0.5em] text-slate-500 mb-6 block font-black">● Introduction</span>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-[1.1] mb-12">
              Turning ideas into clean, <span className="italic font-serif">functional interfaces.</span>
            </h2>
            <div className="prose prose-slate prose-xl max-w-none text-slate-700 font-medium leading-relaxed space-y-8">
               <p>
                 I’m a full-stack developer with hands-on experience building and deploying web applications and microservices across cloud environments, including IBM Cloud and Google infrastructure.
               </p>
               <p>
                 Over the past two years, I’ve worked across both the frontend and backend, contributing to applications that are scalable, reliable, and user-focused. I’m comfortable working with JavaScript-based stacks and enjoy turning ideas into solid server logic.
               </p>
               <p>
                 I’m naturally curious, quick to adapt, and motivated by building systems that solve real problems and scale well.
               </p>
            </div>
         </div>
         <div className="md:col-span-5">
            <div className="bg-black text-white p-12 rounded-[3.5rem] shadow-2xl">
               <h3 className="text-xs font-mono uppercase tracking-widest text-white/50 mb-10 font-black">Core Skills</h3>
               <div className="space-y-10">
                  {skills.map(skillGroup => (
                    <div key={skillGroup.category}>
                        <h4 className="text-lg font-black mb-4 border-b border-white/10 pb-2">{skillGroup.category}</h4>
                        <div className="flex flex-wrap gap-2">
                           {skillGroup.items.map(item => (
                             <span key={item} className="px-3 py-1.5 bg-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest">{item}</span>
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
              className="group bg-white border border-black/5 p-8 rounded-[2.5rem] flex flex-col items-center text-center hover:border-black transition-all hover:shadow-xl"
            >
              <div className="w-24 h-24 mb-6 relative">
                 <img 
                    src={cert.badge_url} 
                    alt={cert.title} 
                    className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500"
                 />
              </div>
              <h3 className="text-lg font-black text-black leading-tight mb-2">{cert.title}</h3>
              <p className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold mb-4">{cert.issuer} • {cert.issue_date}</p>
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-black opacity-0 group-hover:opacity-100 transition-all">
                 Verify Credential <ExternalLink className="w-3 h-3" />
              </div>
            </a>
          ))}
          {/* CTA to view all on Credly */}
          <a 
            href="https://www.credly.com/users/sgukobong" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group border-2 border-dashed border-black/10 p-8 rounded-[2.5rem] flex flex-col items-center justify-center text-center hover:border-black/30 transition-all"
          >
            <Award className="w-10 h-10 text-slate-200 group-hover:text-black transition-colors mb-4" />
            <h3 className="text-sm font-black text-slate-400 group-hover:text-black tracking-widest uppercase">View All Credentials ↗</h3>
          </a>
        </div>
      </div>

      {/* Experience Timeline */}
      <div className="mb-40">
        <span className="text-[10px] font-mono uppercase tracking-[0.5em] text-slate-500 mb-12 block font-black">● Professional Path</span>
        <div className="divide-y divide-black/10">
          {experiences.map((exp, i) => (
            <div key={i} className="py-12 group grid grid-cols-1 md:grid-cols-12 gap-8 items-center hover:bg-slate-50 transition-colors -mx-8 px-8 rounded-3xl">
               <div className="md:col-span-4">
                  <h3 className="text-2xl font-black text-black mb-2 tracking-tight">{exp.title}</h3>
                  <p className="text-xs text-slate-500 font-black uppercase tracking-widest">{exp.location} • {exp.date}</p>
               </div>
               <div className="md:col-span-5 text-slate-700 text-lg font-medium leading-relaxed italic">
                  {exp.desc}
               </div>
               <div className="md:col-span-3 flex flex-wrap justify-end gap-2">
                  {exp.tags.map(tag => (
                    <span key={tag} className="px-4 py-2 rounded-full border border-black/10 text-[9px] font-black uppercase tracking-widest text-black group-hover:bg-black group-hover:text-white transition-all">
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
         <div className="p-12 bg-slate-50 rounded-[3rem] border border-black/5">
            <Cpu className="w-8 h-8 mb-6" />
            <h4 className="text-xl font-black mb-4">IBM Watson</h4>
            <p className="text-slate-600 font-medium">Expertise in Watson Assistant, NLU, and Sentiment Analysis for building intelligent interactions.</p>
         </div>
         <div className="p-12 bg-slate-50 rounded-[3rem] border border-black/5">
            <Database className="w-8 h-8 mb-6" />
            <h4 className="text-xl font-black mb-4">Backend Logic</h4>
            <p className="text-slate-600 font-medium">Solid server-side engineering with Node.js and Java, ensuring data integrity and system reliability.</p>
         </div>
         <div className="p-12 bg-slate-50 rounded-[3rem] border border-black/5">
            <Cloud className="w-8 h-8 mb-6" />
            <h4 className="text-xl font-black mb-4">Cloud Ops</h4>
            <p className="text-slate-600 font-medium">Confident deployment and workflow management across Google Cloud and IBM infrastructure.</p>
         </div>
      </div>
    </div>
  );
};

export default About;