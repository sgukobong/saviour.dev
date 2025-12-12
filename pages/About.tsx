import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../services/supabase';

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

I create tools that make life easier for Africans, especially in places where the network is weak, electricity is unreliable, and technology has to survive real-world constraints. My work sits at the intersection of learning, software, and practical innovation, with one goal: build systems people can rely on, anytime.

Over the past five years, I’ve designed and deployed 500+ e-learning modules, supported 1,000+ call-center agents, and helped organisations move from chaotic, inconsistent training to structured, data-driven learning systems. I’ve worked across secondary schools, EdTech startups, BPO floors, and enterprise teams. Always with the same philosophy: if the infrastructure is fragile, the learning shouldn’t be.

I build products that work on 2G, that resume instantly after power cuts, and that sync quietly in the background when the internet decides to come back. Whether it’s a learning platform, an AI coaching tool, or a simple workflow app, I care about durability, clarity, and human-centered design.

Right now, I’m deeply focused on:

• Offline-first learning platforms that stay useful even with zero connectivity
• AI-powered coaching that gives agents real-time nudges during live calls
• Lightweight, affordable school systems that make administration effortless for African schools
• And increasingly, general-purpose tools that remove everyday friction for teams and communities across the continent

If your school, startup, or contact centre wants technology that works everywhere, not just where the infrastructure is perfect. I’d love to partner with you and build something truly resilient.

Based in Abuja, Nigeria
Open to collaborations, new projects, and long-term partnerships`;

  const [skills, setSkills] = useState<Skill[]>([]);

  // Static fallback skills data
  const fallbackSkills: Skill[] = [
    // Design & Instruction
    { id: '1', category: 'Design', name: 'Instructional Design' },
    { id: '2', category: 'Design', name: 'ADDIE' },
    { id: '3', category: 'Design', name: "Bloom's Taxonomy" },
    { id: '4', category: 'Design', name: 'Andragogy' },
    
    // Tech Stack
    { id: '7', category: 'Tech', name: 'Moodle' },
    { id: '8', category: 'Tech', name: 'OpenEDX' },
    { id: '9', category: 'Tech', name: 'Supabase' },
    { id: '10', category: 'Tech', name: 'Next.js' },
    { id: '11', category: 'Tech', name: 'Gemini API' },
    { id: '12', category: 'Tech', name: 'Flutter' },
    { id: '13', category: 'Tech', name: 'Kotlin Compose' },
    { id: '14', category: 'Tech', name: 'Articulate' },
    { id: '15', category: 'Tech', name: 'iSpring' },

    // Analytics
    { id: '16', category: 'Analytics', name: 'SPSS' },
    { id: '17', category: 'Analytics', name: 'Jamovi' },
    { id: '18', category: 'Analytics', name: 'Learning Analytics' },
    { id: '19', category: 'Analytics', name: 'Kirkpatrick Evaluation' },
  ];

  // Credentials Data (Credly style)
  const credentials: Credential[] = [
    {
      id: '1',
      title: 'Google Project Management',
      issuer: 'Google',
      date: '2025',
      status: 'active',
      image: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg',
      url: 'https://coursera.org/share/905f20411e2bb0bfbc4ac10583486a8c'
    },
    {
      id: '5',
      title: 'IBM AI Developer',
      issuer: 'IBM',
      date: 'In Progress',
      status: 'in-progress',
      image: 'https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg',
      url: '#'
    }
  ];

  const experiences: Experience[] = [
    {
      id: '1',
      role: 'EdTech Consultant',
      company: 'Asterverse Integrated Solutions & Allied Services (ISAS)',
      period: 'Jan 2025 – Present',
      points: [
        'Consulted on the design, deployment, and management of LMS platforms for schools, startups, and organisations.',
        'Supported faculty and HR teams in transitioning to digital-first learning through tailored training interventions.',
        'Designed and delivered blended and e-learning programs, integrating tools such as Moodle, iSpring, and Articulate.',
        'Collaborated with cross-functional teams to align learning technologies with organisational goals.',
        'Introduced analytics-driven reporting to measure training effectiveness and ROI.'
      ]
    },
    {
      id: '2',
      role: 'Instructional Designer',
      company: 'Outsource to Nigeria Initiative (OTNI)',
      period: 'May 2024 – Present',
      points: [
        'Designed competency-based learning programs to upskill teams, aligning with organisational goals.',
        'Administered Moodle LMS and created interactive, multimedia-rich content using iSpring, Articulate, and Canva.',
        'Partnered with leadership to identify skill gaps and create tailored digital learning solutions.',
        'Monitored and evaluated training effectiveness with measurable improvements.'
      ]
    },
    {
      id: '3',
      role: 'LMS Administrator',
      company: 'Worknation',
      period: 'Mar 2024 – Present',
      points: [
        'Managed and optimised the LMS platform for seamless virtual learning experiences.',
        'Produced analytics-based reports on learner progress and program impact.',
        'Delivered technical support and facilitated adoption of the LMS among staff and learners.'
      ]
    },
    {
      id: '4',
      role: 'LMS Specialist',
      company: 'Outsource Global',
      period: 'Feb 2024 – Present',
      points: [
        'Configured and managed LMS platforms to support onboarding and workforce training programs.',
        'Designed structured learning paths for call centre staff, reducing average onboarding time by 20%.',
        'Produced adoption and performance reports to guide management in workforce development initiatives.'
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
      {/* Intro Section with Photo */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-24">
        
        {/* Photo Column */}
        <div className="md:col-span-5 lg:col-span-4">
           <div className="sticky top-32 group">
              {/* Animated Glow Border */}
              <div className="absolute -inset-0.5 bg-gradient-to-br from-neon-cyan via-transparent to-neon-cyan rounded-[2rem] opacity-30 blur-md group-hover:opacity-70 transition duration-1000"></div>
              
              <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden border border-white/10 bg-cosmic-900 shadow-2xl">
                <img 
                  /* REPLACE THIS URL WITH YOUR PHOTO */
                  src="https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=800&auto=format&fit=crop" 
                  alt="Saviour Ukobong" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0" 
                />
                
                {/* Floating Badge */}
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
            <h2 className="text-4xl md:text-section font-medium tracking-tight mb-8">About Me</h2>
            <div className="glass-panel p-8 md:p-10 rounded-3xl relative overflow-hidden h-full flex flex-col items-start">
              <div className="absolute top-0 right-0 w-32 h-32 bg-neon-cyan/10 rounded-full blur-[50px]"></div>
              <p className="text-base md:text-lg leading-relaxed text-slate-200 whitespace-pre-wrap mb-8">
                {bio}
              </p>
              
              <Link 
                to="/contact" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-neon-cyan/10 border border-neon-cyan/20 rounded-full text-neon-cyan font-medium hover:bg-neon-cyan hover:text-black transition-all group mt-auto"
              >
                Let's Partner
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

      {/* Education & Credentials Section */}
      <div className="mb-24 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Education Column */}
        <div>
          <h3 className="text-subheading mb-6 text-white border-l-4 border-neon-cyan pl-6">Education</h3>
          <div className="space-y-6">
            <div className="bg-cosmic-900/50 border border-white/5 rounded-2xl p-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/5 rounded-bl-full group-hover:bg-neon-cyan/10 transition-colors"></div>
              <div className="text-neon-cyan text-small font-mono mb-2">2022</div>
              <h4 className="text-card-title text-white">M.Ed. Educational Technology</h4>
              <p className="text-body text-slate-400">National Open University of Nigeria</p>
            </div>
            <div className="bg-cosmic-900/50 border border-white/5 rounded-2xl p-6 relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-20 h-20 bg-white/5 rounded-bl-full group-hover:bg-neon-cyan/10 transition-colors"></div>
              <div className="text-neon-cyan text-small font-mono mb-2">2015</div>
              <h4 className="text-card-title text-white">B.Sc. (Ed.) Statistics/Computer Science</h4>
              <p className="text-body text-slate-400">Federal University of Agriculture, Makurdi</p>
            </div>
          </div>
        </div>

        {/* Credentials / Badges Column */}
        <div>
          <h3 className="text-subheading mb-6 text-white border-l-4 border-neon-ember pl-6">Professional Certifications</h3>
          <div className="grid grid-cols-1 gap-4">
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
                {/* Badge Image Area */}
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

                {/* Arrow Icon */}
                <div className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-slate-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Skills & Tools Section */}
      <div className="mb-24">
         <h3 className="text-subheading mb-10">Skills & Tools</h3>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {renderSkillColumn('Design & Instruction', 'Design', 'text-neon-cyan')}
            {renderSkillColumn('Tech Stack', 'Tech', 'text-neon-cyan')}
            {renderSkillColumn('Analytics & Evaluation', 'Analytics', 'text-neon-ember')}
         </div>
      </div>

      {/* Edge & Metrics Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
        <div>
          <h3 className="text-subheading text-white mb-6">My Edge</h3>
          <ul className="space-y-6">
            {[
              { title: "Real-time AI Nudges", desc: "Eliminating critical BPO errors before they happen." },
              { title: "Offline-First EdTech", desc: "Syncs flawlessly when 2G connectivity returns." },
              { title: "Zero-Error Pipelines", desc: "Gemini + Claude + Local LLMs for content generation." },
              { title: "Resilient Builds", desc: "LearnDash/Moodle architectures for unreliable internet." }
            ].map((item, i) => (
              <li key={i} className="flex gap-4 items-start group">
                <span className="mt-1.5 w-1.5 h-1.5 bg-neon-cyan rounded-full shadow-[0_0_8px_#00d4ff] group-hover:scale-150 transition-transform"></span>
                <div>
                  <h4 className="text-ui text-white">{item.title}</h4>
                  <p className="text-small text-slate-400 mt-1">{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-subheading text-white mb-6">Impact Metrics</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-cosmic-900 border border-white/5 p-6 rounded-2xl">
              <div className="text-subheading font-bold text-neon-cyan mb-1">18%</div>
              <div className="text-small text-slate-400">CSAT Lift</div>
            </div>
            <div className="bg-cosmic-900 border border-white/5 p-6 rounded-2xl">
              <div className="text-subheading font-bold text-neon-cyan mb-1">-33%</div>
              <div className="text-small text-slate-400">Onboarding Time</div>
            </div>
            <div className="bg-cosmic-900 border border-white/5 p-6 rounded-2xl">
              <div className="text-subheading font-bold text-white mb-1">1k+</div>
              <div className="text-small text-slate-400">Agents Trained</div>
            </div>
            <div className="bg-cosmic-900 border border-white/5 p-6 rounded-2xl">
              <div className="text-subheading font-bold text-neon-ember mb-1">500+</div>
              <div className="text-small text-slate-400">AI Modules</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;