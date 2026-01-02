import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../services/supabase';
import { BlogPost } from '../types';
import SEO from '../components/SEO';

const Blog: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="w-full pt-10">
       <SEO title="Digital Garden" description="Design Insights & Trends by Saviour Ukobong." />

       <div className="mb-20">
         <span className="text-[10px] font-mono uppercase tracking-[0.5em] text-slate-500 mb-6 block font-bold">● Blogs</span>
         <h2 className="text-section-title text-black">Design Insights<br/>& Trends</h2>
       </div>

       {loading ? (
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => <div key={i} className="h-64 bg-slate-100 rounded-[2.5rem] animate-pulse"></div>)}
         </div>
       ) : (
         <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {posts.map(post => (
              <Link key={post.id} to={`/blog/${post.slug}`} className="group">
                  <div className="aspect-[4/3] rounded-[2.5rem] bg-slate-200 overflow-hidden mb-6 relative border border-black/10">
                     {post.cover_image ? (
                        <img src={post.cover_image} alt="" className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700" />
                     ) : (
                        <div className="w-full h-full bg-slate-300 flex items-center justify-center">
                          <span className="text-4xl font-black text-black/20 tracking-tighter">STUDIO</span>
                        </div>
                     )}
                     <div className="absolute top-6 left-6 flex gap-2">
                        <span className="bg-black text-white text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">Insight</span>
                        <span className="bg-white/90 backdrop-blur-md text-black text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-black/10 shadow-sm">5 min read</span>
                     </div>
                  </div>
                  <h3 className="text-xl font-black mb-3 text-black group-hover:underline transition-colors leading-tight line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-slate-800 text-sm line-clamp-2 mb-4 leading-relaxed font-medium">
                    {post.excerpt}
                  </p>
                  <div className="text-sm font-black flex items-center gap-2 group-hover:gap-4 transition-all text-black">
                    Read More ↗
                  </div>
              </Link>
            ))}
         </div>
       )}
    </div>
  );
};

export default Blog;