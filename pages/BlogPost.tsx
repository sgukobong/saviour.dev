import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabase';
import { BlogPost } from '../types';
import Markdown from 'react-markdown';
import SEO from '../components/SEO';
import { ArrowLeft, Twitter, Linkedin, Link as LinkIcon, Clock, ChevronRight } from 'lucide-react';

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .eq('slug', slug)
          .single();

        if (error) throw error;
        setPost(data as BlogPost);
      } catch (err: any) {
        console.warn('Error fetching post:', err.message);
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchPost();
  }, [slug]);

  const handleShare = (platform: 'twitter' | 'linkedin' | 'copy') => {
    const url = window.location.href;
    const title = post?.title || '';
    if (platform === 'twitter') window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank');
    if (platform === 'linkedin') window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
    if (platform === 'copy') {
        navigator.clipboard.writeText(url);
        alert('Link copied to clipboard');
    }
  };

  if (loading) return (
    <div className="min-h-[80vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Opening Journal...</span>
        </div>
    </div>
  );

  if (!post) return (
      <div className="mt-40 text-center px-4">
          <SEO title="Entry Not Found" description="The journal entry you are looking for does not exist." />
          <h2 className="text-5xl font-black mb-8 tracking-tighter">Entry Not Found.</h2>
          <Link to="/blog" className="text-xs font-black bg-black text-white px-10 py-4 rounded-2xl uppercase tracking-widest">Return to Journal</Link>
      </div>
  );

  return (
    <div className="w-full pb-40">
      <SEO 
        title={post.title}
        description={post.excerpt}
        image={post.cover_image}
        type="article"
      />

      {/* Persistent Progress bar */}
      <div className="fixed top-0 left-0 w-full h-1.5 z-[100] bg-transparent">
          <div 
            className="h-full bg-black shadow-[0_0_15px_rgba(0,0,0,0.3)] transition-all duration-150 ease-out" 
            style={{ width: `${scrollProgress}%` }}
          />
      </div>

      <div className="max-w-4xl mx-auto pt-16 px-4">
        <Link to="/blog" className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-black mb-20 transition-all group">
           <ArrowLeft className="w-4 h-4 group-hover:-translate-x-2 transition-transform" />
           Back to Journal
        </Link>

        <header className="mb-24">
           <div className="flex flex-wrap items-center gap-6 text-[10px] font-mono text-slate-400 font-black uppercase tracking-[0.2em] mb-10">
              <span className="bg-black text-white px-4 py-1.5 rounded-full shadow-lg">Journal Entry</span>
              <span>{new Date(post.published_at).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
              <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
              <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" /> 8 Minute Read</span>
           </div>
           <h1 className="text-5xl md:text-8xl font-black leading-[1] tracking-tighter text-black mb-12">
               {post.title}
           </h1>
           <p className="text-xl md:text-3xl text-slate-800 font-medium leading-relaxed italic border-l-8 border-black pl-10 py-4">
               {post.excerpt}
           </p>
        </header>
        
        {post.cover_image && (
            <div className="mb-24 rounded-[4rem] overflow-hidden bg-slate-50 border border-black/5 shadow-2xl">
                <img src={post.cover_image} alt={post.title} className="w-full object-cover max-h-[700px] grayscale" />
            </div>
        )}

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 relative">
            
            {/* Sidebar Desktop Share */}
            <div className="hidden lg:block lg:col-span-1">
                <div className="sticky top-40 flex flex-col gap-8 items-center">
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-300 vertical-text mb-6">Share This Insight</span>
                    <button onClick={() => handleShare('twitter')} className="p-4 bg-slate-50 text-slate-400 hover:text-white hover:bg-black border border-black/5 rounded-full transition-all shadow-sm">
                        <Twitter className="w-5 h-5" />
                    </button>
                    <button onClick={() => handleShare('linkedin')} className="p-4 bg-slate-50 text-slate-400 hover:text-white hover:bg-black border border-black/5 rounded-full transition-all shadow-sm">
                        <Linkedin className="w-5 h-5" />
                    </button>
                    <button onClick={() => handleShare('copy')} className="p-4 bg-slate-50 text-slate-400 hover:text-white hover:bg-black border border-black/5 rounded-full transition-all shadow-sm">
                        <LinkIcon className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <div className="lg:col-span-11 max-w-2xl mx-auto">
                <article className="prose prose-slate prose-xl max-w-none 
                    prose-headings:font-black prose-headings:tracking-tighter prose-headings:text-black
                    prose-h2:text-5xl prose-h2:mt-24 prose-h2:mb-10
                    prose-p:text-slate-900 prose-p:leading-[1.9] prose-p:font-medium
                    prose-a:text-black prose-a:font-black prose-a:underline prose-a:underline-offset-4 hover:prose-a:text-slate-600
                    prose-blockquote:border-l-8 prose-blockquote:border-black prose-blockquote:bg-slate-50 prose-blockquote:px-12 prose-blockquote:py-4 prose-blockquote:rounded-r-3xl prose-blockquote:italic
                    prose-strong:font-black prose-strong:text-black
                    prose-code:bg-slate-100 prose-code:px-2 prose-code:py-1 prose-code:rounded-lg prose-code:before:content-[''] prose-code:after:content-[''] prose-code:font-mono prose-code:text-black
                    prose-img:rounded-[3rem] prose-img:border prose-img:border-black/5 prose-img:shadow-xl
                ">
                    <Markdown>{post.content}</Markdown>
                </article>

                {/* Engagement Section */}
                <div className="mt-40 pt-20 border-t-4 border-black/5">
                   <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                      <div className="flex items-center gap-8">
                         <div className="w-24 h-24 rounded-full bg-slate-100 overflow-hidden border-2 border-black shadow-xl">
                            <img src="/images/profile.jpg" alt="Saviour" className="w-full h-full object-cover grayscale" />
                         </div>
                         <div>
                            <h3 className="text-2xl font-black text-black mb-2">Saviour Ukobong</h3>
                            <p className="text-slate-600 font-bold text-sm max-w-xs leading-relaxed">
                                Engineering resilient EdTech and AI coaching tools for Africa's future.
                            </p>
                         </div>
                      </div>
                      <div className="flex gap-4">
                         <button onClick={() => handleShare('twitter')} className="p-5 bg-black text-white rounded-2xl hover:bg-slate-800 transition-all"><Twitter className="w-6 h-6" /></button>
                         <button onClick={() => handleShare('linkedin')} className="p-5 bg-black text-white rounded-2xl hover:bg-slate-800 transition-all"><Linkedin className="w-6 h-6" /></button>
                      </div>
                   </div>
                </div>

                {/* Footer Navigation */}
                <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8">
                   <Link to="/blog" className="p-10 bg-slate-50 rounded-[2.5rem] border-2 border-transparent hover:border-black transition-all group">
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-4">Back Home</span>
                      <h4 className="text-2xl font-black text-black flex items-center gap-2">
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-2 transition-transform" /> Browse Archive
                      </h4>
                   </Link>
                   <Link to="/contact" className="p-10 bg-black text-white rounded-[2.5rem] hover:bg-slate-800 transition-all group shadow-2xl">
                      <span className="text-[10px] font-black uppercase tracking-widest text-white/50 block mb-4">Got a vision?</span>
                      <h4 className="text-2xl font-black flex items-center gap-2">
                        Let's Talk <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                      </h4>
                   </Link>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostPage;