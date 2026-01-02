import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { ArrowDown, ArrowUpRight } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="w-full">
      <SEO 
        title="AI Developer & Offline-First Engineer"
        description="Saviour Ukobong — Creating resilient software for Africa."
      />
      
      {/* HERO SECTION - HIGH CONTRAST STUDIO */}
      <section className="min-h-[85vh] flex flex-col pt-12 md:pt-24 pb-12 relative">
        <div className="grid grid-cols-12 w-full h-full">
          
          {/* Col 1: Vertical Sidebar Text */}
          <div className="hidden md:flex col-span-1 items-start justify-start pt-16">
            <span className="vertical-text text-[10px] font-mono uppercase tracking-[0.5em] text-black font-black">
               RESILIENT ARCHITECT
            </span>
          </div>

          {/* Col 2-7: Main Content */}
          <div className="col-span-12 md:col-span-7 flex flex-col justify-center px-4 md:px-0">
            {/* Stats Row */}
            <div className="flex gap-20 mb-20">
               <div>
                  <div className="text-4xl md:text-6xl font-black text-black tracking-tighter">+200</div>
                  <div className="text-[10px] font-mono text-black uppercase tracking-widest mt-3 font-black">Project completed</div>
               </div>
               <div>
                  <div className="text-4xl md:text-6xl font-black text-black tracking-tighter">+50</div>
                  <div className="text-[10px] font-mono text-black uppercase tracking-widest mt-3 font-black">Startup raised</div>
               </div>
            </div>

            {/* Hello Header */}
            <h1 className="text-hero mb-6 text-black">Hello</h1>
            <p className="text-xl md:text-3xl text-black max-w-xl leading-relaxed mb-6 font-bold tracking-tight">
               — I’m Saviour Ukobong, a systems engineer <br className="hidden md:block" /> focused on building for constraints.
            </p>
          </div>

          {/* Col 8-12: Big Portrait */}
          <div className="col-span-12 md:col-span-4 flex items-center justify-end relative">
            <div className="w-full aspect-[4/5] bg-slate-200 overflow-hidden rounded-[3rem] shadow-2xl border-4 border-white">
               <img 
                 src="/images/profile.jpg" 
                 alt="Saviour Ukobong" 
                 className="w-full h-full object-cover grayscale brightness-105"
               />
            </div>
          </div>
        </div>

        {/* Hero Footer */}
        <div className="grid grid-cols-12 w-full mt-auto pt-16">
            <div className="col-span-1 hidden md:block">
                <span className="text-[10px] font-mono text-slate-400 tracking-[0.2em] font-black">EST. 2018</span>
            </div>
            <div className="col-span-11 flex items-center gap-4">
                <span className="text-[10px] font-mono uppercase tracking-[0.5em] text-black font-black">EXPLORE STUDIO</span>
                <div className="w-12 h-[2px] bg-black"></div>
                <ArrowDown className="w-4 h-4 animate-bounce" />
            </div>
        </div>
      </section>

      {/* ABOUT SECTION - REFINED CONTRAST */}
      <section className="py-48 grid grid-cols-1 md:grid-cols-12 gap-20 border-t-2 border-black/5">
        <div className="md:col-span-5">
           <h2 className="text-[10px] font-mono uppercase tracking-[0.5em] text-slate-400 mb-12 font-black">● Philosophy</h2>
           <p className="text-3xl md:text-4xl text-black leading-[1.1] font-black tracking-tight">
             I build <span className="italic font-serif">offline-first</span> systems for a continent where the internet is a luxury, not a given.
           </p>
        </div>
        <div className="md:col-span-2 flex items-center justify-center">
            <div className="w-40 h-40 rounded-full border-2 border-black/5 flex flex-col items-center justify-center text-center bg-white shadow-xl hover:scale-105 transition-transform">
                <div className="text-4xl font-black">120%</div>
                <div className="text-[8px] uppercase font-mono tracking-widest text-black px-4 font-black mt-2">Retention Uplift</div>
            </div>
        </div>
        <div className="md:col-span-5 flex flex-col justify-center space-y-16">
           <div className="flex gap-10 items-start">
              <span className="text-xs font-mono text-black font-black bg-slate-100 p-2 rounded-lg">01</span>
              <p className="text-slate-800 text-xl leading-relaxed font-bold">
                Focused on EdTech, AI Coaching, and resilient backend systems. Every line of code is written with constrained environments in mind.
              </p>
           </div>
           <div className="flex gap-10 items-start">
              <span className="text-xs font-mono text-black font-black bg-slate-100 p-2 rounded-lg">02</span>
              <p className="text-slate-800 text-xl leading-relaxed font-bold">
                Currently scaling the "Free School for Africa" movement, reaching students through 2G-optimized audio learning.
              </p>
           </div>
        </div>
      </section>

      {/* LATEST WORKS - CLEAN MASONRY */}
      <section className="py-48 border-t-2 border-black/5">
          <div className="flex justify-between items-end mb-24">
             <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.5em] text-slate-400 mb-6 block font-black">Selected Work</span>
                <h2 className="text-section-title text-black">Case Studies</h2>
             </div>
             <Link to="/projects" className="text-xs font-black uppercase tracking-[0.3em] border-b-4 border-black pb-2 hover:text-slate-600 hover:border-slate-600 transition-all">
                The Lab ↗
             </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
             {[1, 2, 3].map(i => (
               <div key={i} className="group cursor-pointer">
                  <div className="aspect-[4/5] bg-slate-100 overflow-hidden mb-10 relative rounded-[3rem] border-2 border-black/5 shadow-sm group-hover:shadow-2xl transition-all duration-700">
                     <div className="w-full h-full bg-slate-200 group-hover:scale-110 transition-transform duration-1000"></div>
                     <div className="absolute top-10 right-10 w-16 h-16 rounded-full bg-white shadow-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100">
                        <ArrowUpRight className="w-6 h-6 font-black" />
                     </div>
                  </div>
                  <h3 className="text-2xl font-black mb-2 text-black group-hover:underline underline-offset-4 transition-all">Resilient System {i}</h3>
                  <p className="text-[10px] font-mono text-slate-800 uppercase tracking-widest font-black">Infrastructure & AI Engineering</p>
               </div>
             ))}
          </div>
      </section>

      {/* CONTACT CTA */}
      <section className="py-60 text-center border-t-2 border-black/5 bg-white -mx-12 px-12 relative overflow-hidden">
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-black/5"></div>
         <h2 className="text-[10px] font-mono uppercase tracking-[0.5em] text-slate-400 mb-12 font-black">Final Thought</h2>
         <p className="text-4xl md:text-6xl font-black mb-20 tracking-tighter max-w-5xl mx-auto leading-[1.05] text-black">
            Got a vision? Let’s build it with <span className="italic font-serif">precision and absolute resilience.</span>
         </p>
         <div className="flex flex-col items-center gap-6">
            <a href="mailto:hello@saviour.dev" className="text-4xl md:text-8xl font-black tracking-tighter hover:text-slate-600 transition-colors text-black border-b-8 border-black inline-block pb-2">
                hello@saviour.dev
            </a>
            <Link to="/portal" className="text-xs font-mono uppercase tracking-[0.5em] text-slate-400 hover:text-black font-black mt-8">
                Go to Client Portal ↗
            </Link>
         </div>
      </section>
    </div>
  );
};

export default Home;