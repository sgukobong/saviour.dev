import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, ExternalLink, Mail, MessageCircle, Linkedin, Send, MapPin, Phone } from 'lucide-react';

type FormState = {
  name: string;
  email: string;
  organization: string;
  projectType: string;
  message: string;
};

const initialFormState: FormState = {
  name: '',
  email: '',
  organization: '',
  projectType: 'Product build',
  message: '',
};

const Contact: React.FC = () => {
  const [formState, setFormState] = useState<FormState>(initialFormState);
  const [notice, setNotice] = useState('');

  const contactChannels = useMemo(() => ([
    {
      icon: Mail,
      label: 'Email',
      value: 'sgukobong@gmail.com',
      href: 'mailto:sgukobong@gmail.com',
      note: 'Best for project briefs, proposals, and follow-up details.',
    },
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      value: '+234 806 910 7294',
      href: 'https://wa.me/2348069107294',
      note: 'Best for quick clarifications and time-sensitive updates.',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'Professional profile',
      href: 'https://linkedin.com/in/sgukobong',
      note: 'Best for introductions and partnership conversations.',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+234 806 910 7294',
      href: 'tel:+2348069107294',
      note: 'Best when you need direct coordination during active work.',
    },
  ]), []);

  const buildEmailDraft = () => {
    const subject = encodeURIComponent(`[${formState.projectType}] Inquiry from ${formState.name || 'New contact'}`);
    const body = encodeURIComponent([
      `Name: ${formState.name || 'Not provided'}`,
      `Email: ${formState.email || 'Not provided'}`,
      `Organization: ${formState.organization || 'Not provided'}`,
      `Project Type: ${formState.projectType}`,
      '',
      formState.message.trim() || 'No message provided.',
    ].join('\n'));

    return {
      subject,
      body,
      draftText: [
        `Subject: [${formState.projectType}] Inquiry from ${formState.name || 'New contact'}`,
        `Name: ${formState.name || 'Not provided'}`,
        `Email: ${formState.email || 'Not provided'}`,
        `Organization: ${formState.organization || 'Not provided'}`,
        `Project Type: ${formState.projectType}`,
        '',
        formState.message.trim() || 'No message provided.',
      ].join('\n'),
    };
  };

  const openEmailClient = async () => {
    const { subject, body } = buildEmailDraft();
    const mailto = `mailto:sgukobong@gmail.com?subject=${subject}&body=${body}`;

    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(buildEmailDraft().draftText);
      }
      setNotice('Draft prepared. Your email app should open with the fields filled in.');
    } catch {
      setNotice('Draft prepared. Your email app should open with the fields filled in.');
    }

    window.location.href = mailto;
  };

  const copyDraft = async () => {
    const draft = buildEmailDraft().draftText;
    await navigator.clipboard.writeText(draft);
    setNotice('Draft copied to clipboard.');
  };

  return (
    <div className="flex flex-col w-full min-h-screen pt-144 pb-94">
      <section className="px-4 md:px-12 max-w-[1440px] mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-144"
        >
          <span className="section-kicker mb-6 block">Get in Touch</span>
          <div className="max-w-3xl">
            <h1 className="text-display font-w350 text-midnight-ink leading-tight">
              Let's build a clear, fast path from idea to delivery.
            </h1>
            <p className="text-heading-lg font-w350 text-slate-comment mt-8 leading-relaxed max-w-2xl">
              Send a project summary, a link to your current product, or the exact outcome you need. I will reply with the next useful step, not a generic response.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-22 items-start">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-10"
          >
            <div className="surface-panel p-8 md:p-11 rounded-lg">
              <span className="section-kicker mb-6 block">Direct Channels</span>
              <div className="space-y-6">
                {contactChannels.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="group flex items-start gap-5 rounded-lg border border-transparent p-4 -mx-4 hover:border-midnight-ink/10 hover:bg-white/80 transition-all"
                  >
                    <div className="p-4 bg-white border border-midnight-ink/10 rounded-full group-hover:border-future-blue group-hover:shadow-[0_14px_35px_rgba(0,95,204,0.12)] transition-all">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-caption font-bold block uppercase tracking-widest text-midnight-ink">{item.label}</span>
                      <span className="text-caption text-slate-comment group-hover:text-midnight-ink transition-colors block mt-1">{item.value}</span>
                      <span className="text-caption text-slate-comment/80 block mt-3 leading-relaxed max-w-sm">{item.note}</span>
                    </div>
                    <ExternalLink className="w-4 h-4 text-slate-comment group-hover:text-future-blue mt-1 ml-auto shrink-0" />
                  </a>
                ))}
              </div>
            </div>

            <div className="surface-panel p-8 md:p-11 rounded-lg">
              <span className="section-kicker mb-6 block">Response Pattern</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-midnight-ink/10 border border-midnight-ink/10">
                {[
                  ['Scope', 'What you need built or fixed.'],
                  ['Context', 'What exists today and what is failing.'],
                  ['Outcome', 'The result you need and any deadline.'],
                ].map(([title, detail], index) => (
                  <div key={title} className="bg-white p-5">
                    <div className={`w-10 h-1 mb-4 ${
                      index === 0 ? 'bg-future-blue' : index === 1 ? 'bg-signal-green' : 'bg-signal-amber'
                    }`} />
                    <h3 className="text-caption font-bold uppercase tracking-widest text-midnight-ink mb-3">{title}</h3>
                    <p className="text-caption text-slate-comment leading-relaxed">{detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            onSubmit={(e) => {
              e.preventDefault();
              openEmailClient();
            }}
            className="surface-panel p-8 md:p-11 rounded-lg space-y-8"
          >
            <div className="flex items-end justify-between gap-6">
              <div>
                <span className="section-kicker mb-4 block">Project Brief</span>
                <h2 className="text-heading-lg font-w350 text-midnight-ink">Start the conversation</h2>
              </div>
              <div className="hidden sm:block text-[10px] uppercase tracking-[0.3em] text-slate-comment">
                Usually replies within 1 business day
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-4">
                <label className="text-caption font-bold uppercase tracking-widest text-midnight-ink">Full Name</label>
                <input
                  type="text"
                  required
                  autoComplete="name"
                  maxLength={80}
                  className="bg-white/90 border border-midnight-ink/10 rounded-lg p-6 text-caption outline-none focus:ring-1 focus:ring-future-blue transition-all duration-300"
                  placeholder="Jane Doe"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                />
              </div>

              <div className="flex flex-col gap-4">
                <label className="text-caption font-bold uppercase tracking-widest text-midnight-ink">Email</label>
                <input
                  type="email"
                  required
                  autoComplete="email"
                  maxLength={120}
                  className="bg-white/90 border border-midnight-ink/10 rounded-lg p-6 text-caption outline-none focus:ring-1 focus:ring-future-blue transition-all duration-300"
                  placeholder="jane@company.com"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-4">
                <label className="text-caption font-bold uppercase tracking-widest text-midnight-ink">Organization</label>
                <input
                  type="text"
                  autoComplete="organization"
                  maxLength={120}
                  className="bg-white/90 border border-midnight-ink/10 rounded-lg p-6 text-caption outline-none focus:ring-1 focus:ring-future-blue transition-all duration-300"
                  placeholder="Company, team, or product"
                  value={formState.organization}
                  onChange={(e) => setFormState({ ...formState, organization: e.target.value })}
                />
              </div>

              <div className="flex flex-col gap-4">
                <label className="text-caption font-bold uppercase tracking-widest text-midnight-ink">Project Type</label>
                <select
                  value={formState.projectType}
                  onChange={(e) => setFormState({ ...formState, projectType: e.target.value })}
                  className="bg-white/90 border border-midnight-ink/10 rounded-lg p-6 text-caption outline-none focus:ring-1 focus:ring-future-blue transition-all duration-300"
                >
                  <option>Product build</option>
                  <option>AI automation</option>
                  <option>Fix / rescue</option>
                  <option>Strategy / advisory</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <label className="text-caption font-bold uppercase tracking-widest text-midnight-ink">Message</label>
              <textarea
                required
                rows={7}
                minLength={30}
                maxLength={1800}
                className="bg-white/90 border border-midnight-ink/10 rounded-lg p-6 text-caption outline-none focus:ring-1 focus:ring-future-blue transition-all duration-300 resize-none"
                placeholder="Describe the project, the problem, your deadline, and what success looks like."
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
              />
              <div className="flex items-center justify-between gap-6 text-[10px] uppercase tracking-[0.24em] text-slate-comment">
                <span>{formState.message.length}/1800 characters</span>
                <span>Minimum 30 characters</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="submit"
                className="btn-pill bg-midnight-ink text-white hover:bg-future-blue flex items-center justify-center gap-4 py-6 transition-all w-full"
              >
                Open Email Draft <Send className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={copyDraft}
                className="btn-pill bg-white text-midnight-ink border border-midnight-ink/10 hover:bg-soft-lavender flex items-center justify-center gap-4 py-6 transition-all w-full"
              >
                Copy Draft <Copy className="w-4 h-4" />
              </button>
            </div>

            <div aria-live="polite" className="min-h-5 text-caption text-slate-comment">
              {notice}
            </div>
          </motion.form>
        </div>
      </section>
    </div>
  );
};

export default Contact;
