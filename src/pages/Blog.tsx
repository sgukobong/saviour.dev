import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../services/supabase';
import { BlogPost } from '../types';
import SEO from '../components/SEO';
import { ArrowRight, Clock, Code, Zap } from 'lucide-react';

const Blog: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Frontend', 'Backend', 'AI/Watson', 'Cloud'];

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await supabase.from('posts').select('*').order('published_at', { ascending: false });
        if (data) setPosts(data as BlogPost[]);
      } catch (err) {
        console.warn('Supabase fetch failed, using fallback.');
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const filteredPosts = activeCategory === 'All' 
    ? posts 
    : posts.filter(p => p.excerpt.toLowerCase().includes(activeCategory.toLowerCase()));

  const featuredPost = filteredPosts[0];
  const remainingPosts = filteredPosts.slice(1);

  return (
    <div className="w-full pt-10 pb-32">
      <SEO 
        title="Dev Notes — Saviour Ukobong" 
        description="Technical walkthroughs on full-stack development, IBM Watson integration, and cloud architecture." 
      />

      {/* Header */}
      <div className="mb-24">
        <span className="text-[10px] font-mono uppercase tracking-[0.5em] text-brand-indigo mb-6 block font-black">● Dev Notes</span>
        <h2 className="text-section-title text-black leading-tight">
          Code, Cloud <br/>& <span className="italic font-serif font-light text-brand-indigo">Calculated</span> Logic.
        </h2>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-4 mb-24">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
              activeCategory === cat 
                ? 'bg-brand-indigo text-white shadow-xl shadow-brand-indigo/20 scale-105 border-transparent' 
                : 'bg-white border-2 border-black/5 text-slate-500 hover:border-brand-indigo hover:text-brand-indigo'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="h-[500px] bg-slate-50 rounded-[4rem] animate-pulse"></div>
          <div className="h-[500px] bg-slate-50 rounded-[4rem] animate-pulse"></div>
        </div>
      ) : (
        <div className="space-y-32">
          {/* Featured Entry */}
          {featuredPost && (
            <Link to={`/blog/${featuredPost.slug}`} className="group block">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                <div className="lg:col-span-7">
                  <div className="aspect-[16/9] rounded-[4rem] overflow-hidden bg-slate-100 border border-brand-indigo/10 shadow-sm group-hover:shadow-2xl group-hover:shadow-brand-indigo/10 transition-all duration-700 relative">
                    <div className="absolute inset-0 bg-gradient-to-tr from-brand-indigo/10 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    {featuredPost.cover_image ? (
                      <img 
                        src={featuredPost.cover_image} 
                        alt={featuredPost.title} 
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" 
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-brand-indigo/5">
                        <Code className="w-32 h-32 text-brand-indigo/10" />
                      </div>
                    )}
                  </div>
                </div>
                <div className="lg:col-span-5 space-y-8">
                  <div className="flex items-center gap-4 text-[10px] font-mono font-black uppercase tracking-widest text-brand-indigo">
                    <span className="bg-brand-indigo text-white px-3 py-1 rounded shadow-lg">Latest Build</span>
                    <span className="text-slate-400">{new Date(featuredPost.published_at).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}</span>
                  </div>
                  <h3 className="text-4xl md:text-6xl font-black text-black leading-[1.05] tracking-tighter group-hover:text-brand-indigo transition-colors underline decoration-transparent group-hover:decoration-brand-indigo/30 underline-offset-8">
                    {featuredPost.title}
                  </h3>
                  <p className="text-slate-700 text-xl font-medium leading-relaxed line-clamp-3">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-sm font-black text-brand-indigo group-hover:translate-x-4 transition-all duration-500">
                    Read the Walkthrough <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </Link>
          )}

          {/* Grid Archive */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
            {remainingPosts.map((post) => (
              <Link key={post.id} to={`/blog/${post.slug}`} className="group flex flex-col">
                <div className="aspect-[4/3] rounded-[3rem] bg-white overflow-hidden mb-8 relative border border-brand-indigo/10 group-hover:shadow-xl group-hover:shadow-brand-indigo/5 group-hover:border-brand-indigo transition-all duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-indigo/5 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  {post.cover_image ? (
                    <img 
                      src={post.cover_image} 
                      alt={post.title} 
                      className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" 
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-brand-indigo/5">
                       <Code className="w-12 h-12 text-brand-indigo/10" />
                    </div>
                  )}
                </div>
                <div className="space-y-4 px-2">
                  <div className="flex items-center gap-3 text-[9px] font-mono font-black text-slate-400 uppercase tracking-widest">
                    <span className="text-brand-indigo/60">{new Date(post.published_at).toLocaleDateString()}</span>
                    <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> 5 Min</span>
                  </div>
                  <h4 className="text-2xl font-black text-black leading-tight group-hover:text-brand-indigo transition-colors line-clamp-2 tracking-tight">
                    {post.title}
                  </h4>
                  <p className="text-slate-700 text-sm font-medium line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {filteredPosts.length === 0 && !loading && (
             <div className="py-20 text-center border-2 border-dashed border-brand-indigo/10 rounded-[3rem] bg-brand-indigo/5">
                <Zap className="w-8 h-8 text-brand-indigo mx-auto mb-4 opacity-30" />
                <p className="text-brand-indigo font-black uppercase tracking-widest text-xs">No entries indexed in this technical area.</p>
             </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Blog;