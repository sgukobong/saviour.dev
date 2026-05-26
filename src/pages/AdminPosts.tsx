import React, { useState, useEffect } from 'react';
import { supabase } from '../services/supabase';
import { ExternalPost, BlogPost } from '../types';
import { Link } from 'react-router-dom';
import Markdown from 'react-markdown';
import { Eye, Edit3, Trash2, CheckCircle, Clock, Link as LinkIcon, FileText, Send, Save } from 'lucide-react';

const AdminPosts: React.FC = () => {
  const [session, setSession] = useState<any>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Data State
  const [activeTab, setActiveTab] = useState<'external' | 'internal'>('internal');
  const [externalPosts, setExternalPosts] = useState<ExternalPost[]>([]);
  const [internalPosts, setInternalPosts] = useState<BlogPost[]>([]);
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  // Forms
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
    const { data } = await supabase.from('external_posts').select('*').order('created_at', { ascending: false });
    if (data) setExternalPosts(data as ExternalPost[]);
  };

  const fetchInternalPosts = async () => {
    const { data } = await supabase.from('posts').select('*').order('published_at', { ascending: false });
    if (data) setInternalPosts(data as BlogPost[]);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) alert(error.message);
  };

  const handleSaveBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    let slugToUse = blogForm.slug;
    if (!slugToUse && blogForm.title) {
        slugToUse = blogForm.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
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
        const res = await supabase.from('posts').update(payload).eq('id', blogForm.id);
        error = res.error;
    } else {
        const res = await supabase.from('posts').insert([payload]);
        error = res.error;
    }

    setLoading(false);
    if (error) alert('Error: ' + error.message);
    else {
        alert('Entry Published Successfully.');
        setBlogForm({ title: '', slug: '', excerpt: '', content: '', cover_image: '' });
        setIsEditingBlog(false);
        setIsPreviewMode(false);
        fetchInternalPosts();
    }
  };

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] px-4">
        <div className="bg-white border-2 border-black/5 p-12 rounded-[3.5rem] w-full max-w-md shadow-2xl">
          <h2 className="text-3xl font-black mb-8 text-center tracking-tighter">Editorial System</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-slate-50 border-2 border-black/5 rounded-2xl px-6 py-4 text-black font-bold focus:border-black outline-none transition-all" />
            <input type="password" placeholder="Passkey" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-slate-50 border-2 border-black/5 rounded-2xl px-6 py-4 text-black font-bold focus:border-black outline-none transition-all" />
            <button type="submit" className="w-full h-16 bg-black text-white font-black rounded-2xl hover:scale-[1.02] transition-all shadow-xl">Initialize Access</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto pt-10 pb-40 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8 border-b-2 border-black/5 pb-12">
        <div>
           <span className="text-[10px] font-mono text-slate-400 font-black uppercase tracking-widest mb-4 block">● Editorial Studio</span>
           <h1 className="text-4xl md:text-6xl font-black tracking-tighter">Manage Journal</h1>
           <div className="flex gap-8 mt-10">
             {['internal', 'external'].map(tab => (
               <button 
                 key={tab}
                 onClick={() => setActiveTab(tab as any)}
                 className={`text-[10px] font-black uppercase tracking-[0.2em] pb-3 border-b-4 transition-all ${activeTab === tab ? 'border-black text-black' : 'border-transparent text-slate-400 hover:text-black'}`}
               >
                 {tab === 'internal' ? 'Site Journal' : 'Remote References'}
               </button>
             ))}
           </div>
        </div>
        <button onClick={() => supabase.auth.signOut()} className="px-8 py-3 bg-red-50 text-red-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all shadow-sm">Terminate Session</button>
      </div>

      {activeTab === 'internal' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-8">
                  <div className="bg-white border-2 border-black/5 p-12 rounded-[3.5rem] shadow-xl">
                      <div className="flex justify-between items-center mb-12">
                          <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-slate-400 font-black flex items-center gap-2">
                             <Edit3 className="w-4 h-4 text-black" /> Compose Entry
                          </h2>
                          <button 
                            onClick={() => setIsPreviewMode(!isPreviewMode)}
                            className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest bg-slate-50 px-6 py-3 rounded-full border-2 border-black/5 hover:border-black transition-all shadow-sm"
                          >
                             {isPreviewMode ? <><Edit3 className="w-4 h-4" /> Go to Editor</> : <><Eye className="w-4 h-4" /> Live Preview</>}
                          </button>
                      </div>
                      
                      {isPreviewMode ? (
                          <div className="min-h-[700px] prose prose-slate prose-lg max-w-none bg-slate-50 p-12 rounded-[2.5rem] border-4 border-dashed border-black/5">
                             <h1 className="text-4xl font-black mb-8 text-black">{blogForm.title || "Untitled Insight"}</h1>
                             <Markdown>{blogForm.content || "_No content drafted yet..._"}</Markdown>
                          </div>
                      ) : (
                        <form onSubmit={handleSaveBlog} className="space-y-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <label className="text-[10px] font-mono uppercase font-black text-slate-400 tracking-widest ml-4">Article Headline</label>
                                    <input type="text" required value={blogForm.title} onChange={(e) => setBlogForm({...blogForm, title: e.target.value})} className="w-full bg-slate-50 border-2 border-black/5 rounded-2xl px-8 py-5 text-black font-bold focus:border-black outline-none transition-all" placeholder="The Future of..." />
                                </div>
                                <div className="space-y-4">
                                    <label className="text-[10px] font-mono uppercase font-black text-slate-400 tracking-widest ml-4">Slug (Leave for Auto)</label>
                                    <input type="text" value={blogForm.slug} onChange={(e) => setBlogForm({...blogForm, slug: e.target.value})} className="w-full bg-slate-50 border-2 border-black/5 rounded-2xl px-8 py-5 text-black font-bold focus:border-black outline-none transition-all" placeholder="auto-generated" />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="text-[10px] font-mono uppercase font-black text-slate-400 tracking-widest ml-4">Cover Image URL</label>
                                <input type="text" value={blogForm.cover_image} onChange={(e) => setBlogForm({...blogForm, cover_image: e.target.value})} className="w-full bg-slate-50 border-2 border-black/5 rounded-2xl px-8 py-5 text-black font-bold focus:border-black outline-none transition-all" placeholder="https://unsplash..." />
                            </div>

                            <div className="space-y-4">
                                <label className="text-[10px] font-mono uppercase font-black text-slate-400 tracking-widest ml-4">Abstract / Lead-in</label>
                                <textarea required value={blogForm.excerpt} onChange={(e) => setBlogForm({...blogForm, excerpt: e.target.value})} rows={3} className="w-full bg-slate-50 border-2 border-black/5 rounded-[2rem] px-8 py-6 text-black font-bold focus:border-black outline-none transition-all resize-none" placeholder="A brief summary for the card view..." />
                            </div>

                            <div className="space-y-4">
                                <label className="text-[10px] font-mono uppercase font-black text-slate-400 tracking-widest ml-4">Main Content (Markdown Supported)</label>
                                <textarea required value={blogForm.content} onChange={(e) => setBlogForm({...blogForm, content: e.target.value})} rows={20} className="w-full bg-slate-50 border-2 border-black/5 rounded-[3rem] px-10 py-10 text-black font-mono text-sm focus:border-black outline-none transition-all leading-relaxed" placeholder="# Start your thought here..." />
                            </div>

                            <button type="submit" disabled={loading} className="w-full h-20 bg-black text-white font-black rounded-3xl hover:bg-slate-800 transition-all shadow-2xl flex items-center justify-center gap-4">
                                {loading ? 'Processing...' : <><Send className="w-5 h-5" /> {isEditingBlog ? 'Synchronize Updates' : 'Publish to Journal'}</>}
                            </button>
                        </form>
                      )}
                  </div>
              </div>

              <div className="lg:col-span-4 space-y-12">
                  <div className="bg-slate-50 border-2 border-black/5 p-12 rounded-[3.5rem] shadow-sm">
                      <h3 className="text-xs font-mono uppercase tracking-widest text-slate-400 font-black mb-10">Archive Index</h3>
                      <div className="space-y-4">
                          {internalPosts.map(post => (
                              <div key={post.id} className="group p-6 bg-white border border-black/5 rounded-3xl hover:border-black transition-all flex justify-between items-center shadow-sm">
                                  <div className="min-w-0 pr-6">
                                      <h4 className="font-black text-black text-sm truncate">{post.title}</h4>
                                      <p className="text-[9px] font-mono text-slate-400 mt-2 uppercase tracking-widest">{new Date(post.published_at).toLocaleDateString()}</p>
                                  </div>
                                  <div className="flex gap-2">
                                      <button onClick={() => { setBlogForm(post); setIsEditingBlog(true); setIsPreviewMode(false); window.scrollTo({top:0, behavior:'smooth'}); }} className="p-3 bg-slate-50 text-slate-400 hover:text-black rounded-full transition-all">
                                          <Edit3 className="w-4 h-4" />
                                      </button>
                                      <button onClick={async () => { if(confirm('Delete?')) { await supabase.from('posts').delete().eq('id', post.id); fetchInternalPosts(); } }} className="p-3 bg-slate-50 text-slate-400 hover:text-red-600 rounded-full transition-all">
                                          <Trash2 className="w-4 h-4" />
                                      </button>
                                  </div>
                              </div>
                          ))}
                      </div>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};

export default AdminPosts;