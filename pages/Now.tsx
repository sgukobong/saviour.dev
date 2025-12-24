import React, { useState } from 'react';
import SEO from '../components/SEO';

const Now: React.FC = () => {
  const content = `I’m currently building a Free School for Africa—a learning platform created to give every child, regardless of background or circumstance, access to quality education at zero cost.

The vision is simple but bold:
No data. No fees. No barriers. Just pure learning.

Through this project, African learners will be able to study offline, in their preferred language, with engaging lessons, stories, activities, and a supportive community. It will also empower creators, educators, technologists, and volunteers to contribute to the future of African education in meaningful ways.

This Free School is a step toward making learning accessible, fun, inclusive, and limitless for millions of children across the continent.

If you believe education should be free and universal, then this movement is for you.

Africa deserves the future—and we’re building it.`;

  return (
    <div className="max-w-3xl mx-auto pt-10">
      <SEO 
        title="What I'm Doing Now"
        description="Current focus: Building a free school for Africa, advancing offline-first AI technology, and consulting for EdTech startups."
        keywords={['Now Page', 'Current Projects', 'Free School Africa', 'Offline First Education']}
      />

      <div className="flex items-center gap-4 mb-8">
        <span className="w-3 h-3 bg-neon-ember rounded-full animate-pulse-slow"></span>
        <h2 className="text-sm font-mono tracking-widest uppercase text-neon-ember">Right Now ({new Date().toLocaleString('default', { month: 'long', year: 'numeric' })})</h2>
      </div>
      
      <h1 className="text-[clamp(32px,4vw,48px)] font-bold mb-12">The Big Focus</h1>
      
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-neon-cyan via-neon-cyan/50 to-neon-ember rounded-3xl opacity-20 blur group-hover:opacity-40 transition duration-1000"></div>
        <div className="relative bg-cosmic-900 border border-white/10 rounded-3xl p-10 md:p-14">
          
          <div className="text-base leading-relaxed text-slate-200 whitespace-pre-wrap">
            {content}
          </div>
          
          <div className="mt-12 flex justify-between items-end border-t border-white/5 pt-6">
            <p className="text-sm text-slate-500 font-mono">Last Update: {new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Now;