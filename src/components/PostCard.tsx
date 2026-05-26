import React from 'react';
import { ExternalPost } from '../types';
import { ExternalLink } from 'lucide-react';

interface PostCardProps {
  post: ExternalPost;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const getPlatformColors = (platform: string) => {
    switch (platform) {
      case 'Medium': return { badge: 'bg-black text-white', accent: 'group-hover:text-brand-indigo', shadow: 'group-hover:shadow-brand-indigo/10' };
      case 'LinkedIn': return { badge: 'bg-[#0077b5] text-white', accent: 'group-hover:text-[#0077b5]', shadow: 'group-hover:shadow-[#0077b5]/10' };
      case 'Dev.to': return { badge: 'bg-white border-black/10 text-black', accent: 'group-hover:text-black', shadow: 'group-hover:shadow-black/10' };
      default: return { badge: 'bg-brand-indigo text-white', accent: 'group-hover:text-brand-indigo', shadow: 'group-hover:shadow-brand-indigo/10' };
    }
  };

  const colors = getPlatformColors(post.platform);

  return (
    <a 
      href={post.url} 
      target="_blank" 
      rel="noopener noreferrer"
      className={`group flex flex-col h-full bg-white border border-black/5 rounded-[2.5rem] overflow-hidden hover:border-brand-indigo/20 transition-all duration-500 transform hover:-translate-y-2 shadow-sm hover:shadow-2xl ${colors.shadow}`}
    >
      {/* Thumbnail */}
      <div className="h-56 w-full bg-slate-50 relative overflow-hidden">
        {post.thumbnail ? (
          <img 
            src={post.thumbnail} 
            alt={post.title} 
            className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0 opacity-80 group-hover:opacity-100" 
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-brand-indigo/5 to-white">
            <span className="text-5xl text-brand-indigo/5 font-black">SU.</span>
          </div>
        )}
        <div className="absolute top-6 left-6 z-20">
          <span className={`px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest border border-transparent shadow-lg ${colors.badge}`}>
            {post.platform}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-8 flex flex-col flex-grow">
        <h3 className={`text-xl font-black mb-3 transition-colors leading-tight line-clamp-2 tracking-tight ${colors.accent}`}>
          {post.title}
        </h3>
        <p className="text-slate-600 text-sm font-medium line-clamp-3 mb-8 flex-grow leading-relaxed">
          {post.subtitle || "Exploring technical deep-dives on " + post.platform}
        </p>
        
        <div className="flex justify-between items-center mt-auto border-t border-black/5 pt-6">
          <span className="text-[10px] text-slate-400 font-mono font-bold uppercase tracking-widest">
            {new Date(post.published_at).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}
          </span>
          <span className={`text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all group-hover:translate-x-1 ${colors.accent}`}>
            Read Article <ExternalLink className="w-3 h-3" />
          </span>
        </div>
      </div>
    </a>
  );
};

export default PostCard;