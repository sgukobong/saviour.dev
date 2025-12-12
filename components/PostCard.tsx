import React from 'react';
import { ExternalPost } from '../types';

interface PostCardProps {
  post: ExternalPost;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'Medium': return 'text-white bg-black border-white/20';
      case 'LinkedIn': return 'text-white bg-[#0077b5] border-transparent';
      case 'Dev.to': return 'text-black bg-white border-transparent';
      default: return 'text-neon-cyan bg-neon-cyan/10 border-neon-cyan/20';
    }
  };

  return (
    <a 
      href={post.url} 
      target="_blank" 
      rel="noopener noreferrer"
      className="group flex flex-col h-full bg-cosmic-900 border border-white/5 rounded-2xl overflow-hidden hover:border-neon-cyan/40 hover:shadow-[0_0_20px_rgba(0,234,255,0.15)] transition-all duration-300 transform hover:scale-[1.02]"
    >
      {/* Thumbnail */}
      <div className="h-48 w-full bg-cosmic-800 relative overflow-hidden">
        {post.thumbnail ? (
          <img 
            src={post.thumbnail} 
            alt={post.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100" 
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-cosmic-800 to-cosmic-950">
            <span className="text-4xl text-white/10 font-bold">SU.</span>
          </div>
        )}
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${getPlatformColor(post.platform)}`}>
            {post.platform}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-neon-cyan transition-colors leading-tight line-clamp-2">
          {post.title}
        </h3>
        <p className="text-slate-400 text-sm line-clamp-3 mb-6 flex-grow">
          {post.subtitle || "Read this article on " + post.platform}
        </p>
        
        <div className="flex justify-between items-center mt-auto border-t border-white/5 pt-4">
          <span className="text-xs text-slate-500 font-mono">
            {new Date(post.published_at).toLocaleDateString()}
          </span>
          <span className="text-sm font-medium text-neon-cyan flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            Read Article
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          </span>
        </div>
      </div>
    </a>
  );
};

export default PostCard;