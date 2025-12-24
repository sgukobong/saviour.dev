import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Markdown from 'react-markdown';
import { supabase } from '../services/supabase';
import SEO from '../components/SEO';

interface Skill {
  id: string;
  category: 'Design' | 'Tech' | 'Analytics';
  name: string;
}

interface Credential {
  id: string;
  title: string;
  issuer: string;
  date: string;
  status: 'active' | 'in-progress';
  image: string; // URL to badge logo
  url: string;   // Credly or verification link
}

interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  points: string[];
}

const About: React.FC = () => {
  const bio = `Hi, I’m Saviour Ukobong.

I am an **AI Developer and EdTech Consultant based in Nigeria**, creating tools that make life easier for Africans. My specialty is building **offline-first mobile apps** and resilient web systems that perform flawlessly in places where the network is weak (2G/3G) and electricity is unreliable.

Over the past five years, I’ve worked as a **Moodle Developer** and Instructional Designer to deploy 500+ e-learning modules. I help organizations move from chaotic training to data-driven **Learning Management Systems (LMS)**. I’ve worked across secondary schools, EdTech startups, and BPO floors in Nigeria.

My philosophy is simple: if the infrastructure is fragile, the software shouldn't be.

I build products that resume instantly after power cuts and sync quietly when the internet returns. Whether it’s a **custom AI coaching tool** or a lightweight school management app, I prioritize durability and human-centered design.

Right now, I’m deeply focused on:

- **Offline-first learning platforms** that stay useful with zero connectivity
- **AI-powered coaching tools** for real-time agent assistance
- **EdTech consulting** for African schools and startups
- General-purpose apps that solve everyday friction

If your organization needs technology that works everywhere—not just where the fiber optics are perfect—let's partner.`;

  const [skills, setSkills] = useState<Skill[]>([]);

  // Static fallback skills data
  const fallbackSkills: Skill[] = [
    // Design & Instruction
    { id: '1', category: 'Design', name: 'Instructional Design' },
    { id: '2', category: 'Design', name: 'ADDIE Model' },
    { id: '3', category: 'Design', name: "Bloom's Taxonomy" },
    { id: '4', category: 'Design', name: 'User Experience (UX)' },
    
    // Tech Stack
    { id: '7', category: 'Tech', name: 'Moodle LMS Dev' },
    { id: '8', category: 'Tech', name: 'OpenEDX' },
    { id: '9', category: 'Tech', name: 'Supabase / SQL' },
    { id: '10', category: 'Tech', name: 'Next.js & React' },
    { id: '11', category: 'Tech', name: 'Gemini AI API' },
    { id: '12', category: 'Tech', name: 'Flutter (Mobile)' },
    { id: '13', category: 'Tech', name: 'PWA Development' },
    { id: '14', category: 'Tech', name: 'Articulate 360' },

    // Analytics
    { id: '16', category: 'Analytics', name: 'Data Analysis (SPSS)' },
    { id: '17', category: 'Analytics', name: 'Learning Analytics' },
    { id: '18', category: 'Analytics', name: 'ROI Measurement' },
  ];

  // Credentials Data (Credly style)
  const credentials: Credential[] = [
    {
      id: '1',
      title: 'Google Project Management',
      issuer: 'Google',
      date: '2025',
      status: 'active',
      image: '/images/credentials/google.svg',
      url: 'https://coursera.org/share/905f20411e2bb0bfbc4ac10583486a8c'
    },
    {
      id: '5',
      title: 'IBM AI Developer',
      issuer: 'IBM',
      date: 'In Progress',
      status: 'in-progress',
      image: '/images/credentials/ibm.svg',
      url: '#'
    }
  ];

  const experiences: Experience[] = [
    {
      id: '1',
      role: 'EdTech Consultant',
      company: 'Asterverse Integrated Solutions (ISAS)',
      period: 'Jan 2025 – Present',
      points: [
        'Consulted on the design and deployment of LMS platforms for Nigerian schools and startups.',
        'Transitioned faculty to digital-first learning through tailored training interventions.',
        'Integrated tools such as Moodle, iSpring, and Articulate for offline-ready content.'
      ]
    },
    {
      id: '2',
      role: 'Instructional Designer',
      company: 'Outsource to Nigeria Initiative (OTNI)',
      period: 'May 2024 – Present',
      points: [
        'Designed competency-based learning programs for workforce upskilling.',
        'Administered Moodle LMS and created interactive, multimedia-rich content.',
        'Identified skill gaps and created tailored digital learning solutions.'
      ]
    },
    {
      id: '3',
      role: 'LMS Administrator',
      company: 'Worknation',
      period: 'Mar 2024 – Present',
      points: [
        'Managed and optimised the LMS platform for virtual learning experiences.',
        'Produced analytics-based reports on learner progress and program impact.',
        'Facilitated adoption of the LMS among staff and learners.'
      ]
    }
  ];

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const { data, error } = await supabase.from('skills').select('*');
        if (error || !data || data.length === 0) {
          setSkills(fallbackSkills);
        } else {
          setSkills(data as Skill[]);
        }
      } catch (e) {
        setSkills(fallbackSkills);
      }
    };
    fetchSkills();
  }, []);

  const renderSkillColumn = (title: string, category: string, iconColor: string) => (
    <div className="bg-cosmic-900/50 border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-colors h-full">
      <h4 className={`text-small font-mono uppercase tracking-widest mb-6 ${iconColor}`}>{title}</h4>
      <ul className="space-y-3">
        {skills.filter(s => s.category === category).map((skill) => (
          <li key={skill.id} className="flex items-center gap-3 text-slate-300">
            <svg className={`w-4 h-4 ${iconColor} opacity-70`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-body">{skill.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto">
      <SEO 
        title="About Me"
        description="Learn about Saviour Ukobong's journey from instructional design to building AI-powered offline-first software for the African context. Expertise in Moodle, React, and Flutter."
        keywords={['Saviour Ukobong Bio', 'About AI Developer', 'EdTech Experience', 'Moodle Consultant']}
      />

      {/* Intro Section with Photo */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-24">
        
        {/* Photo Column */}
        <div className="md:col-span-5 lg:col-span-4">
           <div className="sticky top-32 group">
              <div className="absolute -inset-0.5 bg-gradient-to-br from-neon-cyan via-transparent to-neon-cyan rounded-[2rem] opacity-30 blur-md group-hover:opacity-70 transition duration-1000"></div>
              
              <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden border border-white/10 bg-cosmic-900 shadow-2xl">
                <img 
                  src="/images/profile.jpg" 
                  alt="Saviour Ukobong - AI Developer" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0" 
                />
                
                <div className="absolute bottom-4 left-4 right-4 p-4 bg-black/60 backdrop-blur-xl rounded-2xl border border-white/10">
                   <div className="text-white font-medium text-lg">Saviour Ukobong</div>
                   <div className="text-slate-400 text-sm flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse"></span>
                      Abuja, Nigeria
                   </div>
                </div>
              </div>
           </div>
        </div>

        {/* Bio Text Column */}
        <div className="md:col-span-7 lg:col-span-8 flex flex-col">
            <h1 className="text-4xl md:text-section font-medium tracking-tight mb-8">About Me</h1>
            <div className="glass-panel p-8 md:p-10 rounded-3xl relative overflow-hidden h-full flex flex-col items-start">
              <div className="absolute top-0 right-0 w-32 h-32 bg-neon-cyan/10 rounded-full blur-[50px]"></div>
              
              <div className="text-base md:text-lg leading-relaxed text-slate-200 mb-8 w-full">
                <Markdown
                  components={{
                    p: ({node, ...props}) => <p className="mb-4" {...props} />,
                    strong: ({node, ...props}) => <strong className="text-white font-semibold" {...props} />,
                    ul: ({node, ...props}) => <ul className="list-disc pl-5 space-y-2 mb-6 marker:text-neon-cyan" {...props} />,
                    li: ({node, ...props}) => <li className="pl-1" {...props} />
                  }}
                >
                  {bio}
                </Markdown>
              </div>

              {/* YouTube Embed Section */}
              <div className="w-full aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl mb-10 relative bg-black/50 group">
                <iframe 
                    src="https://www.youtube.com/embed/HmaMkg2sHIc" 
                    title="YouTube video player"
                    className="absolute inset-0 w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                ></iframe>
                <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <p className="text-xs text-white/70 text-center font-mono uppercase tracking-widest">Video Introduction</p>
                </div>
              </div>
              
              <Link 
                to="/contact" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-neon-cyan/10 border border-neon-cyan/20 rounded-full text-neon-cyan font-medium hover:bg-neon-cyan hover:text-black transition-all group mt-auto"
              >
                Book a Consultation
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
            </div>
        </div>
      </div>

      {/* Professional Experience Section */}
      <div className="mb-24">
        <h3 className="text-subheading mb-10 border-l-4 border-neon-cyan pl-6">Experience</h3>
        <div className="space-y-8 relative">
          
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-6 top-4 bottom-4 w-px bg-white/10 hidden md:block"></div>

          {experiences.map((exp, index) => (
            <div key={exp.id} className="relative md:pl-16 group">
              {/* Timeline Dot */}
              <div className="absolute left-4 md:left-6 top-6 w-2 h-2 -ml-1 bg-cosmic-900 border border-neon-cyan rounded-full z-10 hidden md:block group-hover:scale-150 transition-transform duration-300 shadow-[0_0_10px_#00d4ff]"></div>
              
              <div className="bg-cosmic-900/50 border border-white/5 rounded-2xl p-8 hover:border-white/15 transition-all duration-300 hover:translate-x-1">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4 gap-2">
                  <div>
                    <h4 className="text-2xl font-bold text-white group-hover:text-neon-cyan transition-colors">{exp.role}</h4>
                    <p className="text-lg text-slate-300">{exp.company}</p>
                  </div>
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-neon-cyan font-mono whitespace-nowrap">
                    {exp.period}
                  </div>
                </div>
                
                <ul className="space-y-2 mt-4">
                  {exp.points.map((point, i) => (
                    <li key={i} className="flex gap-3 text-slate-400 leading-relaxed text-base">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-slate-600 flex-shrink-0 group-hover:bg-neon-cyan/50 transition-colors"></span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Skills & Tools Section */}
      <div className="mb-24">
         <h3 className="text-subheading mb-10">Technical Expertise</h3>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {renderSkillColumn('Design & Instruction', 'Design', 'text-neon-cyan')}
            {renderSkillColumn('Tech Stack', 'Tech', 'text-neon-cyan')}
            {renderSkillColumn('Analytics & Evaluation', 'Analytics', 'text-neon-ember')}
         </div>
      </div>
      
      {/* Credentials */}
      <div className="mb-20">
          <h3 className="text-subheading mb-6 border-l-4 border-neon-ember pl-6">Professional Certifications</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {credentials.map((cred) => (
              <a 
                key={cred.id} 
                href={cred.url}
                target="_blank"
                rel="noopener noreferrer" 
                className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 group
                  ${cred.status === 'in-progress' 
                    ? 'bg-neon-ember/5 border-neon-ember/20 hover:bg-neon-ember/10' 
                    : 'bg-cosmic-900 border-white/5 hover:border-neon-cyan/30 hover:bg-white/5'
                  }`}
              >
                <div className="w-12 h-12 flex-shrink-0 bg-white rounded-lg p-2 flex items-center justify-center shadow-lg">
                  <img src={cred.image} alt={cred.issuer} className="w-full h-full object-contain" />
                </div>
                <div className="flex-grow">
                  <h4 className="text-ui text-white group-hover:text-neon-cyan transition-colors">{cred.title}</h4>
                  <div className="flex items-center gap-2 text-small text-slate-400">
                    <span>{cred.issuer}</span>
                    <span className="w-1 h-1 rounded-full bg-slate-600"></span>
                    <span className={cred.status === 'in-progress' ? 'text-neon-ember font-bold uppercase text-[10px] tracking-wider' : ''}>
                      {cred.date}
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
      </div>
    </div>
  );
};

export default About;