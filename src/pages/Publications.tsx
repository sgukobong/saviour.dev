import React, { useEffect, useState } from 'react';
import { supabase } from '../services/supabase';
import { ExternalPost } from '../types';
import PostCard from '../components/PostCard';
import SEO from '../components/SEO';

const FALLBACK_POSTS: ExternalPost[] = [
  {
    id: '1',
    platform: 'Medium',
    url: 'https://medium.com/@saviour',
    title: 'Designing for the Next Billion Users: Why Offline-First Matters',
    subtitle: 'How 2G optimization and local-first architecture are solving the education crisis in rural Africa.',
    thumbnail: '/images/blog/offline-first.jpg',
    published_at: new Date().toISOString(),
    metadata_status: 'processed',
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    platform: 'LinkedIn',
    url: 'https://linkedin.com/in/saviour',
    title: 'The Future of AI is Hybrid: Local LLMs on Mobile Devices',
    subtitle: 'Reducing latency and server costs by running inference on-device for education apps.',
    thumbnail: '/images/blog/local-llm.jpg',
    published_at: new Date(Date.now() - 86400000 * 5).toISOString(),
    metadata_status: 'processed',
    created_at: new Date().toISOString(),
  },
  {
    id: '3',
    platform: 'Dev.to',
    url: 'https://dev.to/saviour',
    title: 'Building Resilient React Apps with Supabase and Netlify',
    subtitle: 'A technical deep dive into syncing data when the network is flaky.',
    thumbnail: '/images/blog/react-supabase.jpg',
    published_at: new Date(Date.now() - 86400000 * 12).toISOString(),
    metadata_status: 'processed',
    created_at: new Date().toISOString(),
  }
];

const Publications: React.FC = () => {
  const [posts, setPosts] = useState<ExternalPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data, error } = await supabase
          .from('external_posts')
          .select('*')
          .order('published_at', { ascending: false });

        if (error) throw error;

        if (data && data.length > 0) {
          setPosts(data as ExternalPost[]);
        } else {
          setPosts(FALLBACK_POSTS);
        }
      } catch (err: any) {
        const errorMessage = err.message || JSON.stringify(err);
        console.warn('Supabase fetch failed (Publications), using fallback data.');
        console.warn('System Message:', errorMessage);
        setPosts(FALLBACK_POSTS);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <SEO 
        title="Writing & Publications"
        description="Articles, thoughts, and technical deep-dives on software engineering, 2G optimization, and the future of EdTech in emerging markets."
        keywords={['Tech Blog', 'EdTech Articles', 'Software Engineering', 'Africa Tech', 'Offline-First Articles']}
      />

      <div className="mb-20">
        <h2 className="text-[clamp(40px,5vw,60px)] font-bold tracking-tight mb-4">Posts & Insights</h2>
        <p className="text-slate-400 text-xl max-w-2xl">
          Thoughts on software development, education, and the future of technology in emerging markets.
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 bg-cosmic-900 rounded-2xl animate-pulse border border-white/5"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Publications;