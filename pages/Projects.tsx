import React, { useEffect, useState } from 'react';
import { supabase } from '../services/supabase';
import { Project } from '../types';
import ProjectCard from '../components/ProjectCard';
import SEO from '../components/SEO';

const FALLBACK_PROJECTS: Project[] = [
  {
      id: '1',
      title: 'Accentta — AI Accent Coach',
      description: 'Duolingo-style accent & soft-skills training with offline AI feedback and real-time pronunciation scoring. Designed for African professionals.',
      tags: ['AI', 'React Native', 'Gemini', 'Offline-First'],
      live_url: 'https://accentta.com',
      github_url: 'https://github.com/sgukobong/accentta_v3',
      case_study_url: 'https://medium.com/@saviour/building-offline-ai-for-africa',
      image_url: '/images/projects/accentta.jpg',
      created_at: new Date().toISOString()
  },
  {
      id: '2',
      title: 'Collaboo — Team OS',
      description: 'A Notion + WhatsApp + Trello hybrid built for African teams with unstable internet. Offline-first tasks, chat, docs, and workflows.',
      tags: ['React', 'Supabase', 'Offline Sync'],
      live_url: '', // In Dev
      github_url: 'https://github.com/saviou/collaboo',
      case_study_url: 'https://medium.com/@saviour/collaboo-case-study',
      image_url: '/images/projects/collaboo.jpg',
      created_at: new Date().toISOString()
  },
  {
      id: '3',
      title: 'Stridu — School OS',
      description: 'An LMS + school OS designed for low-cost deployment. Works with SMS for parents and costs $1.50/student/term.',
      tags: ['Flutter', 'Supabase', 'SMS'],
      live_url: '', // In Dev
      github_url: 'https://github.com/saviou/stridu',
      image_url: '/images/projects/stridu.jpg',
      created_at: new Date().toISOString()
  },
  {
      id: '4',
      title: 'Call Center QA Agent',
      description: 'Real-time AI nudging tool that catches script deviations and prevents critical mistakes before they reach customers.',
      tags: ['Electron', 'Tauri', 'AI Nudges'],
      live_url: '', // Private
      github_url: '', // Private
      case_study_url: 'https://medium.com/@saviour/ai-nudges-in-bpo',
      image_url: '/images/projects/qa-agent.jpg',
      created_at: new Date().toISOString()
  },
  {
      id: '5',
      title: 'Lamp — The Free School for Africa',
      description: 'Offline-first learning app for African students. Audio-based, low-resource optimized.',
      tags: ['Offline-First', 'Audio', 'Education'],
      live_url: '', // In Dev
      github_url: '', 
      image_url: '/images/projects/lamp.jpg',
      created_at: new Date().toISOString()
  }
];

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        
        if (data && data.length > 0) {
            setProjects(data as Project[]);
        } else {
            setProjects(FALLBACK_PROJECTS);
        }
      } catch (err: any) {
        // Detailed error logging
        const errorMessage = err.message || JSON.stringify(err);
        console.warn('Supabase fetch failed, using fallback data.');
        console.warn('System Message:', errorMessage);
        
        setProjects(FALLBACK_PROJECTS);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div>
      <SEO 
        title="Selected Work & Case Studies"
        description="Explore a portfolio of offline-first apps, AI coaching tools, and LMS platforms built for constrained network environments in Africa."
        keywords={['Portfolio', 'Case Studies', 'AI Apps', 'Offline-First Projects', 'EdTech Portfolio']}
      />

      <div className="mb-20">
        <h2 className="text-[clamp(40px,5vw,60px)] font-bold tracking-tight mb-4">Selected Work</h2>
        <p className="text-slate-400 text-xl max-w-2xl">
          Systems engineered for resilience, speed, and offline capabilities in constrained environments.
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-96 bg-cosmic-900 rounded-2xl animate-pulse border border-white/5"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Projects;