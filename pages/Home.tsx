import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { ArrowDown, ArrowUpRight, Code2, Cloud, Cpu, Globe, Award, Zap, Workflow } from 'lucide-react';

const Home: React.FC = () => {
  const skills = [
    "Artificial Intelligence", "Workflow Automation", "Python", "React", "Node.js", "SaaS Logic", "API Integration", "IBM Watson", "GCP", "Zapier/Make"
  ];

  return (
    <div className="w-full">
      <SEO 
        title="Full-Stack Developer & AI Automation Engineer"
        description="Saviour Ukobong — Building scalable web applications, AI-powered workflows, and SaaS automation systems."
      />
      
      {/* HERO SECTION */}
      <section className="min-h-[90vh] flex flex-col pt-12 md:pt-24 pb-12 relative">
        <div className="grid grid-cols-1 md:grid-cols-12 w-full h-full gap-12">
          
          {/* Main Content */}
          <div className="col-span-12 md:col-span-7 flex flex-col justify-center">
            <div className="inline-flex items-center gap-3 mb-8 bg-brand-indigo/5 px-4 py-2 rounded-full w-fit border border-brand-indigo/10">
               <span className="w-2 h-2 bg-brand-emerald rounded-full animate-pulse"></span>
               <span className="text-[10px] font-mono uppercase tracking-widest text-brand-indigo font-black">Available for AI & Automation Projects</span>
            </div>

            <h1 className="text-6xl md:text-[8rem] font-black tracking-tighter leading-[0.9] mb-8">
              Hi, I’m <br/>Saviour <span className="italic font-serif font-light text-brand-indigo/60">Ukobong.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-800 max-w-2xl leading-relaxed mb-10 font-medium">
              I’m a <span className="text-black font-black underline decoration-brand-indigo decoration-4 underline-offset-4">Full-Stack Developer</span> & <span className="text-black font-black underline decoration-brand-violet decoration-4 underline-offset-4">AI Automation Engineer</span> specialized in building data-driven systems.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
               <Link to="/contact" className="px-10 py-5 bg-black text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-brand-indigo transition-all shadow-xl shadow-brand-indigo/20">
                 Let's Talk ↗
               </Link>
               <Link to="/projects" className="px-10 py-5 bg-white border-2 border-black/5 text-black rounded-2xl font-black text-xs uppercase tracking-widest hover:border-brand-indigo transition-all">
                 View Code
               </Link>
            </div>

            {/* Subtle Badge Proof Bar */}
            <div className="flex items-center gap-6 pt-4 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 border-r border-slate-200 pr-6 mr-2">Expertise</span>
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" alt="IBM" className="h-4" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_Cloud_Logo.svg" alt="Google Cloud" className="h-4" />
                <Link to="/about" className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-brand-indigo ml-4 hover:underline">
                    <Award className="w-3 h-3" /> Credentials ↗
                </Link>
            </div>
          </div>

          {/* Portrait/Visual */}
          <div className="col-span-12 md:col-span-5 flex items-center justify-center">
            <div className="relative w-full aspect-square md:aspect-[4/5] bg-slate-100 rounded-[4rem] overflow-hidden border-4 border-white shadow-2xl group">
               <div className="absolute inset-0 bg-gradient-to-tr from-brand-indigo/20 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
               <img 
                 src="/images/profile.jpg" 
                 alt="Saviour Ukobong" 
                 className="w-full h-full object-cover grayscale brightness-110 group-hover:grayscale-0 transition-all duration-700"
               />
               <div className="absolute bottom-10 left-10 right-10 bg-white/95 backdrop-blur-xl p-6 rounded-3xl border border-brand-indigo/10 shadow-xl transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-20">
                  <p className="text-xs font-black uppercase tracking-widest text-brand-indigo mb-2">Primary Expertise</p>
                  <p className="text-sm font-bold text-black">AI • Automation • SaaS Systems</p>
               </div>
            </div>
          </div>
        </div>

        {/* Hero Footer: Skills Marquee-like row */}
        <div className="mt-24 pt-12 border-t border-black/5 overflow-hidden">
            <div className="flex flex-wrap gap-x-12 gap-y-6">
                {skills.map(skill => (
                    <span key={skill} className="text-[10px] font-mono uppercase tracking-[0.3em] text-slate-400 font-black hover:text-brand-indigo transition-colors cursor-default">
                      {skill}
                    </span>
                ))}
            </div>
        </div>
      </section>

      {/* CORE CAPABILITIES */}
      <section className="py-40 border-t border-black/5">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
          <div className="md:col-span-4">
             <span className="text-[10px] font-mono uppercase tracking-[0.5em] text-brand-indigo mb-6 block font-black">● What I Solve</span>
             <h2 className="text-4xl font-black tracking-tighter leading-tight">AI-driven workflows that reduce effort & scale results.</h2>
          </div>
          <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
             <div className="p-10 rounded-[2.5rem] bg-white border border-black/5 hover:border-brand-indigo/30 transition-colors group">
                <Zap className="w-8 h-8 mb-6 text-brand-indigo group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-black mb-4">AI & Workflow Automation</h3>
                <p className="text-slate-600 font-medium leading-relaxed">Integrating tools like Zapier/Make and custom LLM logic to reduce manual operations by 30% or more.</p>
             </div>
             <div className="p-10 rounded-[2.5rem] bg-white border border-black/5 hover:border-brand-emerald/30 transition-colors group">
                <Globe className="w-8 h-8 mb-6 text-brand-emerald group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-black mb-4">SaaS Development</h3>
                <p className="text-slate-600 font-medium leading-relaxed">Building optimized SaaS backends and EdTech platforms serving thousands of users across Africa.</p>
             </div>
             <div className="p-10 rounded-[2.5rem] bg-white border border-black/5 hover:border-brand-violet/30 transition-colors group">
                <Code2 className="w-8 h-8 mb-6 text-brand-violet group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-black mb-4">Python & JS Logic</h3>
                <p className="text-slate-600 font-medium leading-relaxed">Fluent in Python for data pipelines and JavaScript/React for high-performance interfaces.</p>
             </div>
             <div className="p-10 rounded-[2.5rem] bg-white border border-black/5 hover:border-brand-amber/30 transition-colors group">
                <Workflow className="w-8 h-8 mb-6 text-brand-amber group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-black mb-4">System Integration</h3>
                <p className="text-slate-600 font-medium leading-relaxed">Connecting siloed data through robust API architectures and automation-first system design.</p>
             </div>
          </div>
        </div>
      </section>

      {/* LATEST PROJECTS PREVIEW */}
      <section className="py-40 border-t border-black/5">
          <div className="flex justify-between items-end mb-20">
             <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.5em] text-slate-500 mb-6 block font-black">The Lab</span>
                <h2 className="text-5xl font-black tracking-tighter">AI-Powered Builds</h2>
             </div>
             <Link to="/projects" className="text-xs font-black uppercase tracking-widest border-b-2 border-brand-indigo pb-2 hover:text-brand-indigo transition-all">
                All Projects ↗
             </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
             {[1, 2].map(i => (
               <div key={i} className="group cursor-pointer">
                  <div className="aspect-[16/10] bg-slate-100 overflow-hidden mb-8 relative rounded-[3rem] border-2 border-black/5 shadow-sm group-hover:shadow-2xl group-hover:shadow-brand-indigo/10 transition-all duration-700">
                     <div className={`w-full h-full ${i === 1 ? 'bg-brand-indigo/5' : 'bg-brand-emerald/5'} group-hover:scale-105 transition-transform duration-1000`}></div>
                     <div className="absolute top-10 right-10 w-16 h-16 rounded-full bg-white shadow-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                        <ArrowUpRight className="w-6 h-6 text-brand-indigo" />
                     </div>
                  </div>
                  <h3 className="text-2xl font-black mb-2 text-black group-hover:text-brand-indigo transition-all tracking-tight underline decoration-transparent group-hover:decoration-brand-indigo/30 underline-offset-8">{i === 1 ? 'AI Accent Coach Integration' : 'Automated Reporting Engine'}</h3>
                  <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-black">{i === 1 ? 'AI • React Native' : 'Python • Automation'}</p>
               </div>
             ))}
          </div>
      </section>

      {/* FOOTER CTA */}
      <section className="py-60 text-center border-t border-black/5 relative">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-indigo/10 blur-[100px] -z-10 rounded-full"></div>
         <h2 className="text-[10px] font-mono uppercase tracking-[0.5em] text-slate-400 mb-12 font-black">Connect</h2>
         <p className="text-4xl md:text-7xl font-black mb-20 tracking-tighter max-w-5xl mx-auto leading-tight">
            Ready to <span className="italic font-serif text-brand-indigo">automate your growth</span> with intelligent systems?
         </p>
         <div className="flex flex-col items-center gap-6">
            <a href="mailto:hello@saviour.dev" className="text-4xl md:text-8xl font-black tracking-tighter hover:text-brand-indigo transition-colors border-b-8 border-brand-indigo/20 hover:border-brand-indigo pb-4">
                hello@saviour.dev
            </a>
         </div>
      </section>
    </div>
  );
};

export default Home;