import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../services/supabase';
import { BlogPost } from '../types';
import SEO from '../components/SEO';

const FALLBACK_POSTS: BlogPost[] = [
  {
    id: 'demo-1',
    slug: 'welcome-to-the-garden',
    title: 'Welcome to the Digital Garden',
    excerpt: 'This is a sample post acting as a placeholder. If you see this, the database connection is currently using fallback data.',
    content: `# Welcome to the Digital Garden\n\nThis is a sample post. If you are seeing this, it means the app couldn't fetch data from Supabase (likely because the 'posts' table doesn't exist yet).\n\n### How to fix\n1. Go to your Supabase Dashboard.\n2. Open the SQL Editor.\n3. Run the contents of \`supabase_setup.sql\` included in this project.\n\nThis will create the necessary tables for the blog to function dynamically.`,
    published_at: new Date().toISOString(),
    cover_image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?q=80&w=800&auto=format&fit=crop'
  }
];

const Blog: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .order('published_at', { ascending: false });

        if (error) throw error;
        
        if (data && data.length > 0) {
          setPosts(data as BlogPost[]);
        } else {
          // If table exists but empty
          setPosts([]);
        }
      } catch (err: any) {
        console.warn('Supabase fetch failed (Blog), using fallback data.');
        console.warn('Error Details:', err.message || JSON.stringify(err));
        setPosts(FALLBACK_POSTS);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
       <SEO 
         title="Digital Garden"
         description="Notes, tutorials, and long-form thoughts on building resilient software in Africa. A digital garden of evolving ideas."
         keywords={['Digital Garden', 'Tech Blog', 'Software Tutorials', 'Building in Public']}
       />

       <div className="mb-20">
         <h2 className="text-[clamp(40px,5vw,60px)] font-bold tracking-tight mb-4">Digital Garden</h2>
         <p className="text-slate-400 text-xl max-w-2xl">
           Notes, tutorials, and long-form thoughts on building resilient software in Africa.
         </p>
         {/* Link to External Publications */}
         <Link to="/publications" className="inline-flex items-center gap-2 mt-6 text-neon-cyan hover:underline">
            View External Publications (Medium, LinkedIn) &rarr;
         </Link>
       </div>

       {loading ? (
         <div className="space-y-12">
            {[1, 2].map(i => (
              <div key={i} className="animate-pulse space-y-4">
                 <div className="h-8 bg-cosmic-900 rounded-lg w-3/4"></div>
                 <div className="h-4 bg-cosmic-900 rounded w-full"></div>
                 <div className="h-4 bg-cosmic-900 rounded w-1/2"></div>
              </div>
            ))}
         </div>
       ) : (
         <div className="space-y-16">
            {posts.length === 0 ? (
                <div className="p-12 border border-white/5 border-dashed rounded-2xl text-center text-slate-500">
                    The garden is currently being seeded. Check back soon.
                </div>
            ) : (
                posts.map(post => (
                    <article key={post.id} className="group relative flex flex-col items-start">
                        <span className="text-sm text-slate-500 font-mono mb-3 block">
                            {new Date(post.published_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                        </span>
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-neon-cyan transition-colors">
                            <Link to={`/blog/${post.slug}`}>
                                <span className="absolute inset-0"></span>
                                {post.title}
                            </Link>
                        </h3>
                        <p className="text-slate-400 text-lg leading-relaxed mb-4 line-clamp-3">
                            {post.excerpt}
                        </p>
                        <div className="text-neon-cyan font-medium text-sm flex items-center gap-1 group-hover:translate-x-2 transition-transform">
                            Read Essay
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                        </div>
                    </article>
                ))
            )}
         </div>
       )}
    </div>
  );
};

export default Blog;