import React, { useState, useEffect } from 'react';
import { supabase } from '../services/supabase';
import { ExternalPost, BlogPost } from '../types';
import { Link } from 'react-router-dom';

const AdminPosts: React.FC = () => {
  const [session, setSession] = useState<any>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Data State
  const [activeTab, setActiveTab] = useState<'external' | 'internal'>('internal');
  const [externalPosts, setExternalPosts] = useState<ExternalPost[]>([]);
  const [internalPosts, setInternalPosts] = useState<BlogPost[]>([]);
  const [refreshing, setRefreshing] = useState<{ [key: string]: boolean }>({});

  // Forms
  const [newUrl, setNewUrl] = useState('');
  const [blogForm, setBlogForm] = useState<Partial<BlogPost>>({
    title: '',
    slug: '',
    excerpt: '',
    cover_image: '',
    content: ''
  });
  const [isEditingBlog, setIsEditingBlog] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) fetchAllData();
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) fetchAllData();
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchAllData = async () => {
    await Promise.all([fetchExternalPosts(), fetchInternalPosts()]);
  };

  const fetchExternalPosts = async () => {
    const { data } = await supabase
      .from('external_posts')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) setExternalPosts(data as ExternalPost[]);
  };

  const fetchInternalPosts = async () => {
    const { data } = await supabase
      .from('posts')
      .select('*')
      .order('published_at', { ascending: false });
    if (data) setInternalPosts(data as BlogPost[]);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);
    if (error) alert(error.message);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  // --- External Post Logic ---

  const detectPlatform = (url: string): ExternalPost['platform'] => {
    if (url.includes('medium.com')) return 'Medium';
    if (url.includes('linkedin.com')) return 'LinkedIn';
    if (url.includes('dev.to')) return 'Dev.to';
    if (url.includes('substack.com')) return 'Substack';
    return 'Other';
  };

  const handleAddExternalPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrl) return;

    const tempPlatform = detectPlatform(newUrl);
    const { data, error } = await supabase.from('external_posts').insert({
      url: newUrl,
      platform: tempPlatform,
      title: newUrl, // Temp title
      published_at: new Date().toISOString(),
      metadata_status: 'pending'
    }).select().single();

    if (error) {
      alert('Error adding post: ' + error.message);
      return;
    }

    setNewUrl('');
    setExternalPosts(prev => [data as ExternalPost, ...prev]);

    if (data) {
      handleRefreshMeta(data.id, data.url);
    }
  };

  const handleRefreshMeta = async (id: string, url: string) => {
    setRefreshing(prev => ({ ...prev, [id]: true }));
    try {
      const res = await fetch('/.netlify/functions/fetch_meta', {
        method: 'POST',
        body: JSON.stringify({ url })
      });
      if (!res.ok) throw new Error('Fetch failed');
      const meta = await res.json();
      
      const { data, error } = await supabase.from('external_posts').update({
        title: meta.title,
        subtitle: meta.subtitle,
        thumbnail: meta.thumbnail,
        platform: meta.platform,
        metadata_status: 'processed'
      }).eq('id', id).select().single();

      if (error) throw error;
      setExternalPosts(prev => prev.map(p => p.id === id ? (data as ExternalPost) : p));
    } catch (e) {
      console.error(e);
      await supabase.from('external_posts').update({ metadata_status: 'error' }).eq('id', id);
      setExternalPosts(prev => prev.map(p => p.id === id ? { ...p, metadata_status: 'error' } : p));
    } finally {
      setRefreshing(prev => ({ ...prev, [id]: false }));
    }
  };

  const handleDeleteExternal = async (id: string) => {
    if (!confirm('Delete this external link?')) return;
    const { error } = await supabase.from('external_posts').delete().eq('id', id);
    if (!error) {
      setExternalPosts(prev => prev.filter(p => p.id !== id));
    }
  };

  // --- Internal Blog Logic ---

  const handleBlogChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setBlogForm({ ...blogForm, [e.target.name]: e.target.value });
  };

  const handleSaveBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Auto-generate slug if missing
    let slugToUse = blogForm.slug;
    if (!slugToUse && blogForm.title) {
        slugToUse = blogForm.title
            .toLowerCase()
            .replace(/ /g, '-')
            .replace(/[^\w-]+/g, '');
    }

    const payload = {
        title: blogForm.title,
        slug: slugToUse,
        excerpt: blogForm.excerpt,
        content: blogForm.content,
        cover_image: blogForm.cover_image,
        published_at: blogForm.published_at || new Date().toISOString()
    };

    let error;
    if (isEditingBlog && blogForm.id) {
        // Update
        const res = await supabase.from('posts').update(payload).eq('id', blogForm.id).select();
        error = res.error;
    } else {
        // Insert
        const res = await supabase.from('posts').insert([payload]).select();
        error = res.error;
    }

    if (error) {
        alert('Error saving post: ' + error.message);
    } else {
        alert('Post saved successfully!');
        setBlogForm({ title: '', slug: '', excerpt: '', content: '', cover_image: '' });
        setIsEditingBlog(false);
        fetchInternalPosts();
    }
  };

  const handleEditBlog = (post: BlogPost) => {
      setBlogForm(post);
      setIsEditingBlog(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteBlog = async (id: string) => {
      if (!confirm('Delete this article?')) return;
      const { error } = await supabase.from('posts').delete().eq('id', id);
      if (!error) {
          setInternalPosts(prev => prev.filter(p => p.id !== id));
      } else {
          alert(error.message);
      }
  };

  const handleCancelEdit = () => {
      setBlogForm({ title: '', slug: '', excerpt: '', content: '', cover_image: '' });
      setIsEditingBlog(false);
  };

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="bg-cosmic-900 border border-white/10 p-8 rounded-2xl w-full max-w-md shadow-2xl">
          <h2 className="text-2xl font-bold mb-6 text-center">System Access</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Admin Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-neon-cyan outline-none transition-colors"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-neon-cyan outline-none transition-colors"
            />
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-neon-cyan transition-colors disabled:opacity-50"
            >
              {loading ? 'Authenticating...' : 'Authenticate'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto pt-4">
      <div className="flex justify-between items-center mb-10">
        <div>
           <h1 className="text-3xl font-bold">Content Command</h1>
           <div className="flex gap-4 mt-4">
             <span className="text-sm text-neon-cyan">Content Admin</span>
             <span className="text-slate-600">|</span>
             <Link to="/admin/payments" className="text-sm text-slate-400 hover:text-white">Payments Admin</Link>
           </div>
        </div>
        <button 
          onClick={handleSignOut}
          className="text-sm text-slate-400 hover:text-white border border-white/10 px-4 py-2 rounded-full transition-colors"
        >
          Sign Out
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-6 border-b border-white/10 mb-8">
          <button 
            onClick={() => setActiveTab('internal')}
            className={`pb-3 text-sm font-bold uppercase tracking-widest transition-colors ${
                activeTab === 'internal' 
                ? 'text-neon-cyan border-b-2 border-neon-cyan' 
                : 'text-slate-500 hover:text-white'
            }`}
          >
            Journal (Writing)
          </button>
          <button 
            onClick={() => setActiveTab('external')}
            className={`pb-3 text-sm font-bold uppercase tracking-widest transition-colors ${
                activeTab === 'external' 
                ? 'text-neon-cyan border-b-2 border-neon-cyan' 
                : 'text-slate-500 hover:text-white'
            }`}
          >
            Curated Links (External)
          </button>
      </div>

      {/* --- INTERNAL BLOG SECTION --- */}
      {activeTab === 'internal' && (
          <div className="space-y-12">
              
              {/* Blog Editor Form */}
              <div className="bg-cosmic-900 border border-white/10 rounded-2xl p-6 md:p-8">
                  <div className="flex justify-between items-center mb-6">
                      <h2 className="text-sm font-mono uppercase tracking-widest text-neon-cyan">
                          {isEditingBlog ? 'Edit Entry' : 'Write New Entry'}
                      </h2>
                      {isEditingBlog && (
                          <button onClick={handleCancelEdit} className="text-xs text-slate-400 hover:text-white">
                              Cancel Edit
                          </button>
                      )}
                  </div>
                  
                  <form onSubmit={handleSaveBlog} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                              <label className="block text-xs text-slate-500 mb-2 uppercase">Title</label>
                              <input 
                                type="text" 
                                name="title"
                                value={blogForm.title}
                                onChange={handleBlogChange}
                                className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-neon-cyan outline-none"
                                placeholder="Enter article title..."
                                required
                              />
                          </div>
                          <div>
                              <label className="block text-xs text-slate-500 mb-2 uppercase">Slug (Optional)</label>
                              <input 
                                type="text" 
                                name="slug"
                                value={blogForm.slug}
                                onChange={handleBlogChange}
                                className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-neon-cyan outline-none"
                                placeholder="auto-generated-from-title"
                              />
                          </div>
                      </div>

                      <div>
                          <label className="block text-xs text-slate-500 mb-2 uppercase">Cover Image URL</label>
                          <input 
                            type="text" 
                            name="cover_image"
                            value={blogForm.cover_image}
                            onChange={handleBlogChange}
                            className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-neon-cyan outline-none"
                            placeholder="https://images.unsplash.com/..."
                          />
                      </div>

                      <div>
                          <label className="block text-xs text-slate-500 mb-2 uppercase">Excerpt</label>
                          <textarea 
                            name="excerpt"
                            value={blogForm.excerpt}
                            onChange={handleBlogChange}
                            rows={2}
                            className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-neon-cyan outline-none"
                            placeholder="Brief summary for the card preview..."
                            required
                          />
                      </div>

                      <div>
                          <label className="block text-xs text-slate-500 mb-2 uppercase">Content (Markdown)</label>
                          <textarea 
                            name="content"
                            value={blogForm.content}
                            onChange={handleBlogChange}
                            rows={15}
                            className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-neon-cyan outline-none font-mono text-sm"
                            placeholder="# Hello World..."
                            required
                          />
                      </div>

                      <button 
                        type="submit"
                        className="w-full md:w-auto bg-neon-cyan text-black font-bold px-8 py-3 rounded-xl hover:bg-white transition-colors"
                      >
                        {isEditingBlog ? 'Update Entry' : 'Publish Entry'}
                      </button>
                  </form>
              </div>

              {/* Existing Entries List */}
              <div className="space-y-4">
                  <h3 className="text-xl font-bold mb-4">Published Entries</h3>
                  {internalPosts.map(post => (
                      <div key={post.id} className="bg-cosmic-900/50 border border-white/5 rounded-xl p-4 flex flex-col md:flex-row gap-4 items-start md:items-center hover:border-white/15 transition-colors">
                          <div className="w-16 h-16 bg-cosmic-800 rounded-lg overflow-hidden flex-shrink-0">
                              {post.cover_image && <img src={post.cover_image} alt="" className="w-full h-full object-cover" />}
                          </div>
                          <div className="flex-grow">
                              <h4 className="font-bold text-white text-lg">{post.title}</h4>
                              <p className="text-slate-500 text-sm truncate">{post.slug} • {new Date(post.published_at).toLocaleDateString()}</p>
                          </div>
                          <div className="flex gap-2">
                              <Link to={`/blog/${post.slug}`} target="_blank" className="p-2 text-slate-400 hover:text-neon-cyan border border-white/5 hover:border-neon-cyan/50 rounded-lg">
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                              </Link>
                              <button onClick={() => handleEditBlog(post)} className="p-2 text-slate-400 hover:text-white border border-white/5 hover:bg-white/5 rounded-lg">
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                              </button>
                              <button onClick={() => handleDeleteBlog(post.id)} className="p-2 text-slate-400 hover:text-neon-ember border border-white/5 hover:border-neon-ember/50 rounded-lg">
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                              </button>
                          </div>
                      </div>
                  ))}
                  {internalPosts.length === 0 && <div className="text-slate-500 italic">No entries found. Write your first one above.</div>}
              </div>
          </div>
      )}

      {/* --- EXTERNAL LINKS SECTION --- */}
      {activeTab === 'external' && (
          <div className="space-y-12 animate-fade-in">
              {/* Add Resource */}
              <div className="bg-cosmic-900 border border-white/10 rounded-2xl p-6">
                <h2 className="text-sm font-mono uppercase tracking-widest text-neon-cyan mb-4">Add External Resource</h2>
                <form onSubmit={handleAddExternalPost} className="flex flex-col md:flex-row gap-4">
                  <input 
                    type="url" 
                    placeholder="Paste URL (Medium, LinkedIn, etc)..." 
                    value={newUrl}
                    onChange={(e) => setNewUrl(e.target.value)}
                    className="flex-grow bg-black/30 border border-white/10 rounded-xl px-5 py-3 text-white focus:border-neon-cyan outline-none"
                    required
                  />
                  <button 
                    type="submit"
                    className="bg-neon-cyan text-black font-bold px-8 py-3 rounded-xl hover:bg-white transition-colors"
                  >
                    Add & Fetch
                  </button>
                </form>
              </div>

              {/* Library */}
              <div className="space-y-4">
                <div className="grid grid-cols-12 gap-4 px-4 pb-2 text-xs font-mono uppercase text-slate-500 tracking-wider">
                  <div className="col-span-6">Resource</div>
                  <div className="col-span-2">Platform</div>
                  <div className="col-span-2">Status</div>
                  <div className="col-span-2 text-right">Actions</div>
                </div>

                {externalPosts.map((post) => (
                  <div key={post.id} className="grid grid-cols-12 gap-4 items-center bg-cosmic-900/50 border border-white/5 rounded-xl p-4 hover:border-white/10 transition-colors">
                    
                    {/* Resource Info */}
                    <div className="col-span-6 flex items-center gap-4 overflow-hidden">
                       {post.thumbnail ? (
                         <img src={post.thumbnail} alt="" className="w-12 h-12 rounded-lg object-cover bg-cosmic-800 flex-shrink-0" />
                       ) : (
                         <div className="w-12 h-12 rounded-lg bg-cosmic-800 flex-shrink-0 flex items-center justify-center text-xs text-slate-600 font-bold">N/A</div>
                       )}
                       <div className="min-w-0">
                         <div className="font-medium text-white truncate pr-4" title={post.title}>{post.title}</div>
                         <div className="text-xs text-slate-500 truncate pr-4">{post.url}</div>
                       </div>
                    </div>

                    {/* Platform */}
                    <div className="col-span-2">
                      <span className="text-xs font-bold px-2 py-1 rounded bg-white/5 text-slate-300 border border-white/10">
                        {post.platform}
                      </span>
                    </div>

                    {/* Status */}
                    <div className="col-span-2">
                       {post.metadata_status === 'processed' && (
                         <span className="inline-flex items-center gap-1.5 text-xs text-[#25D366]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#25D366]"></span> Synced
                         </span>
                       )}
                       {post.metadata_status === 'pending' && (
                         <span className="inline-flex items-center gap-1.5 text-xs text-neon-cyan">
                            <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse"></span> Pending
                         </span>
                       )}
                       {post.metadata_status === 'error' && (
                         <span className="inline-flex items-center gap-1.5 text-xs text-neon-ember">
                            <span className="w-1.5 h-1.5 rounded-full bg-neon-ember"></span> Error
                         </span>
                       )}
                    </div>

                    {/* Actions */}
                    <div className="col-span-2 flex justify-end gap-2">
                      <button 
                        onClick={() => handleRefreshMeta(post.id, post.url)}
                        disabled={refreshing[post.id]}
                        className="p-2 text-slate-400 hover:text-neon-cyan hover:bg-neon-cyan/10 rounded-lg transition-colors disabled:opacity-50"
                        title="Refresh Metadata"
                      >
                        <svg className={`w-5 h-5 ${refreshing[post.id] ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                      </button>
                      <button 
                        onClick={() => handleDeleteExternal(post.id)}
                        className="p-2 text-slate-400 hover:text-neon-ember hover:bg-neon-ember/10 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </div>

                  </div>
                ))}

                {externalPosts.length === 0 && (
                  <div className="text-center py-12 text-slate-500 border border-white/5 border-dashed rounded-xl">
                    No external resources active.
                  </div>
                )}
              </div>
          </div>
      )}
    </div>
  );
};

export default AdminPosts;