import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { ArrowDown, ArrowUpRight, Code2, Cloud, Cpu, Globe, Award } from 'lucide-react';

const Home: React.FC = () => {
  const skills = [
    "HTML", "CSS", "JavaScript", "React", "Node.js", "Java", "IBM Watson Services", "Google Cloud Infrastructure"
  ];

  return (
    <div className="w-full">
      <SEO 
        title="Full-Stack Developer & Cloud Engineer"
        description="Saviour Ukobong — Building scalable web applications, microservices, and AI-integrated systems."
      />
      
      {/* HERO SECTION */}
      <section className="min-h-[90vh] flex flex-col pt-12 md:pt-24 pb-12 relative">
        <div className="grid grid-cols-1 md:grid-cols-12 w-full h-full gap-12">
          
          {/* Main Content */}
          <div className="col-span-12 md:col-span-7 flex flex-col justify-center">
            <div className="inline-flex items-center gap-3 mb-8 bg-black/5 px-4 py-2 rounded-full w-fit">
               <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
               <span className="text-[10px] font-mono uppercase tracking-widest text-black font-black">Available for new projects</span>
            </div>

            <h1 className="text-6xl md:text-[8rem] font-black tracking-tighter leading-[0.9] mb-8">
              Hi, I’m <br/>Saviour <span className="italic font-serif font-light text-slate-400">Ukobong.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-800 max-w-2xl leading-relaxed mb-10 font-medium">
              I’m a <span className="text-black font-black underline decoration-2 underline-offset-4">Full-Stack Developer</span> building scalable web apps and microservices across IBM and Google Cloud infrastructure.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
               <Link to="/contact" className="px-10 py-5 bg-black text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl">
                 Let's Talk ↗
               </Link>
               <Link to="/projects" className="px-10 py-5 bg-white border-2 border-black/5 text-black rounded-2xl font-black text-xs uppercase tracking-widest hover:border-black transition-all">
                 View Code
               </Link>
            </div>

            {/* Subtle Badge Proof Bar */}
            <div className="flex items-center gap-6 pt-4 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 border-r border-slate-200 pr-6 mr-2">Certified By</span>
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" alt="IBM" className="h-4" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_Cloud_Logo.svg" alt="Google Cloud" className="h-4" />
                <Link to="/about" className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-black ml-4 hover:underline">
                    <Award className="w-3 h-3" /> Credentials ↗
                </Link>
            </div>
          </div>

          {/* Portrait/Visual */}
          <div className="col-span-12 md:col-span-5 flex items-center justify-center">
            <div className="relative w-full aspect-square md:aspect-[4/5] bg-slate-100 rounded-[4rem] overflow-hidden border-4 border-white shadow-2xl group">
               <img 
                 src="/images/profile.jpg" 
                 alt="Saviour Ukobong" 
                 className="w-full h-full object-cover grayscale brightness-110 group-hover:grayscale-0 transition-all duration-700"
               />
               <div className="absolute bottom-10 left-10 right-10 bg-white/90 backdrop-blur-xl p-6 rounded-3xl border border-black/5 shadow-xl transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Primary Stack</p>
                  <p className="text-sm font-bold text-black">React • Node.js • Cloud Ops</p>
               </div>
            </div>
          </div>
        </div>

        {/* Hero Footer: Skills Marquee-like row */}
        <div className="mt-24 pt-12 border-t border-black/5">
            <div className="flex flex-wrap gap-x-12 gap-y-6">
                {skills.map(skill => (
                    <span key={skill} className="text-[10px] font-mono uppercase tracking-[0.3em] text-slate-400 font-black hover:text-black transition-colors cursor-default">
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
             <span className="text-[10px] font-mono uppercase tracking-[0.5em] text-slate-500 mb-6 block font-black">● Focus Areas</span>
             <h2 className="text-4xl font-black tracking-tighter leading-tight">Functional interfaces backed by solid logic.</h2>
          </div>
          <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
             <div className="p-10 rounded-[2.5rem] bg-slate-50 border border-black/5">
                <Code2 className="w-8 h-8 mb-6 text-black" />
                <h3 className="text-xl font-black mb-4">Full-Stack Dev</h3>
                <p className="text-slate-600 font-medium leading-relaxed">Comfortable with JS-based stacks, turning complex ideas into clean, functional React interfaces.</p>
             </div>
             <div className="p-10 rounded-[2.5rem] bg-slate-50 border border-black/5">
                <Cpu className="w-8 h-8 mb-6 text-black" />
                <h3 className="text-xl font-black mb-4">AI Integration</h3>
                <p className="text-slate-600 font-medium leading-relaxed">Extensive work with IBM Watson (Assistant, NLU) to extract insights and improve user interactions.</p>
             </div>
             <div className="p-10 rounded-[2.5rem] bg-slate-50 border border-black/5">
                <Cloud className="w-8 h-8 mb-6 text-black" />
                <h3 className="text-xl font-black mb-4">Cloud Workflows</h3>
                <p className="text-slate-600 font-medium leading-relaxed">Confidently handling deployments and integrations across Google Cloud and IBM infrastructure.</p>
             </div>
             <div className="p-10 rounded-[2.5rem] bg-slate-50 border border-black/5">
                <Globe className="w-8 h-8 mb-6 text-black" />
                <h3 className="text-xl font-black mb-4">Scale & Reliability</h3>
                <p className="text-slate-600 font-medium leading-relaxed">Building distributed applications that are user-focused, scalable, and reliable from day one.</p>
             </div>
          </div>
        </div>
      </section>

      {/* LATEST PROJECTS PREVIEW */}
      <section className="py-40 border-t border-black/5">
          <div className="flex justify-between items-end mb-20">
             <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.5em] text-slate-500 mb-6 block font-black">Codebase</span>
                <h2 className="text-5xl font-black tracking-tighter">Recent Builds</h2>
             </div>
             <Link to="/projects" className="text-xs font-black uppercase tracking-widest border-b-2 border-black pb-2 hover:text-slate-500 hover:border-slate-500 transition-all">
                All Projects ↗
             </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
             {[1, 2].map(i => (
               <div key={i} className="group cursor-pointer">
                  <div className="aspect-[16/10] bg-slate-100 overflow-hidden mb-8 relative rounded-[3rem] border-2 border-black/5 shadow-sm group-hover:shadow-2xl transition-all duration-700">
                     <div className="w-full h-full bg-slate-200 group-hover:scale-105 transition-transform duration-1000"></div>
                     <div className="absolute top-10 right-10 w-16 h-16 rounded-full bg-white shadow-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                        <ArrowUpRight className="w-6 h-6" />
                     </div>
                  </div>
                  <h3 className="text-2xl font-black mb-2 text-black group-hover:underline underline-offset-4 transition-all tracking-tight">Technical Solution {i}</h3>
                  <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-black">Full-Stack • Cloud Deploy</p>
               </div>
             ))}
          </div>
      </section>

      {/* FOOTER CTA */}
      <section className="py-60 text-center border-t border-black/5">
         <h2 className="text-[10px] font-mono uppercase tracking-[0.5em] text-slate-400 mb-12 font-black">Connect</h2>
         <p className="text-4xl md:text-7xl font-black mb-20 tracking-tighter max-w-5xl mx-auto leading-tight">
            Motivated by systems that <span className="italic font-serif">solve problems</span> and scale well.
         </p>
         <div className="flex flex-col items-center gap-6">
            <a href="mailto:hello@saviour.dev" className="text-4xl md:text-8xl font-black tracking-tighter hover:text-slate-500 transition-colors border-b-8 border-black pb-4">
                hello@saviour.dev
            </a>
         </div>
      </section>
    </div>
  );
};

export default Home;