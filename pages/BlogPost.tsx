import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../services/supabase';
import { BlogPost } from '../types';
import Markdown from 'react-markdown';

const FALLBACK_POST: BlogPost = {
  id: 'demo-1',
  slug: 'welcome-to-the-garden',
  title: 'Welcome to the Digital Garden',
  excerpt: 'This is a sample post acting as a placeholder.',
  content: `# Welcome to the Digital Garden\n\nThis is a sample post. If you are seeing this, it means the app couldn't fetch data from Supabase (likely because the 'posts' table doesn't exist yet).\n\n### How to fix\n1. Go to your Supabase Dashboard.\n2. Open the SQL Editor.\n3. Run the contents of \`supabase_setup.sql\` included in this project.\n\nThis will create the necessary tables for the blog to function dynamically.`,
  published_at: new Date().toISOString(),
  cover_image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?q=80&w=800&auto=format&fit=crop'
};

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

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
        console.warn('Error fetching post:', err.message || JSON.stringify(err));
        // Fallback check
        if (slug === 'welcome-to-the-garden') {
            setPost(FALLBACK_POST);
        }
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchPost();
  }, [slug]);

  if (loading) return <div className="mt-20 text-center text-slate-500">Loading entry...</div>;

  if (!post) return (
      <div className="mt-20 text-center">
          <h2 className="text-2xl font-bold mb-4">Entry Not Found</h2>
          <Link to="/blog" className="text-neon-cyan underline">Return to Garden</Link>
      </div>
  );

  return (
    <div className="max-w-3xl mx-auto pt-10 pb-20">
      <Link to="/blog" className="inline-flex items-center gap-2 text-slate-500 hover:text-white mb-8 transition-colors">
         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
         Back to Garden
      </Link>

      <header className="mb-12">
         <div className="text-sm font-mono text-neon-cyan mb-4 uppercase tracking-widest">
            {new Date(post.published_at).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
         </div>
         <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">{post.title}</h1>
      </header>
      
      {post.cover_image && (
          <div className="mb-12 rounded-2xl overflow-hidden border border-white/10">
              <img src={post.cover_image} alt={post.title} className="w-full object-cover max-h-[400px]" />
          </div>
      )}

      <div className="prose prose-invert prose-lg max-w-none prose-a:text-neon-cyan prose-headings:text-white prose-p:text-slate-300">
         <Markdown>{post.content}</Markdown>
      </div>

      <div className="mt-20 pt-10 border-t border-white/10">
         <h3 className="text-lg font-bold text-white mb-2">Written by Saviour Ukobong</h3>
         <p className="text-slate-400">Builder of offline-first systems. Exploring the intersection of African infrastructure and modern software.</p>
      </div>
    </div>
  );
};

export default BlogPostPage;