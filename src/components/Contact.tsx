import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  AlertCircle,
  Terminal,
  Loader2,
  Clock
} from 'lucide-react';
import { GithubIcon, LinkedinIcon, WhatsAppIcon } from './SocialIcons';
import { PERSONAL_INFO } from '../data/portfolioData';
import { sendContactEmail, type EmailFormData } from '../services/emailService';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState<EmailFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<Partial<EmailFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const validate = (): boolean => {
    const newErrors: Partial<EmailFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please provide your full name.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please provide your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Please enter a subject.';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please write your message.';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    const result = await sendContactEmail(formData);

    setIsSubmitting(false);
    if (result.success) {
      setSubmitStatus({ type: 'success', message: result.message });
      setFormData({ name: '', email: '', subject: '', message: '' });
      setErrors({});
    } else {
      setSubmitStatus({ type: 'error', message: result.message });
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-neutral-900/30 dark:bg-black/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-mono mb-3">
            <Terminal className="w-3.5 h-3.5" />
            <span>08. GET IN TOUCH</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
            Let's Collaborate on Software & Infrastructure
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
            Have an attachment opening, full-stack project, network setup, or research inquiry? Send me a message or connect directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
          
          {/* Left Column: Direct Info Cards */}
          <div className="lg:col-span-5 space-y-4">
            
            <div className="p-6 sm:p-7 rounded-3xl bg-neutral-100/90 dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-800 shadow-md">
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-6">
                Contact Information
              </h3>

              <div className="space-y-4">
                {/* Email */}
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="flex items-center gap-3.5 p-3 rounded-2xl bg-neutral-200/50 dark:bg-neutral-800/50 hover:bg-emerald-500/10 dark:hover:bg-emerald-500/10 border border-neutral-200 dark:border-neutral-700/60 hover:border-emerald-500/40 transition-colors group"
                >
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500 group-hover:scale-105 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-xs text-neutral-500 dark:text-neutral-400">Email Address</div>
                    <div className="text-xs sm:text-sm font-semibold text-neutral-800 dark:text-neutral-100 truncate group-hover:text-emerald-500 transition-colors">
                      {PERSONAL_INFO.email}
                    </div>
                  </div>
                </a>

                {/* Phone */}
                <a
                  href={`tel:${PERSONAL_INFO.phone}`}
                  className="flex items-center gap-3.5 p-3 rounded-2xl bg-neutral-200/50 dark:bg-neutral-800/50 hover:bg-emerald-500/10 dark:hover:bg-emerald-500/10 border border-neutral-200 dark:border-neutral-700/60 hover:border-emerald-500/40 transition-colors group"
                >
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500 group-hover:scale-105 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-neutral-500 dark:text-neutral-400">Phone Call</div>
                    <div className="text-xs sm:text-sm font-semibold text-neutral-800 dark:text-neutral-100 group-hover:text-emerald-500 transition-colors">
                      {PERSONAL_INFO.phone}
                    </div>
                  </div>
                </a>

                {/* WhatsApp */}
                <a
                  href={PERSONAL_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3.5 p-3 rounded-2xl bg-neutral-200/50 dark:bg-neutral-800/50 hover:bg-emerald-500/10 dark:hover:bg-emerald-500/10 border border-neutral-200 dark:border-neutral-700/60 hover:border-emerald-500/40 transition-colors group"
                >
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500 group-hover:scale-105 transition-transform">
                    <WhatsAppIcon className="w-5 h-5 text-emerald-500" />
                  </div>
                  <div>
                    <div className="text-xs text-neutral-500 dark:text-neutral-400">WhatsApp</div>
                    <div className="text-xs sm:text-sm font-semibold text-neutral-800 dark:text-neutral-100 group-hover:text-emerald-500 transition-colors">
                      {PERSONAL_INFO.phone} (Direct Chat)
                    </div>
                  </div>
                </a>

                {/* Location */}
                <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-neutral-200/50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700/60">
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-neutral-500 dark:text-neutral-400">Location</div>
                    <div className="text-xs sm:text-sm font-semibold text-neutral-800 dark:text-neutral-100">
                      {PERSONAL_INFO.location} (East Africa Time)
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick response badge */}
              <div className="mt-6 pt-5 border-t border-neutral-200 dark:border-neutral-800 flex items-center gap-2 text-xs font-mono text-neutral-500">
                <Clock className="w-4 h-4 text-emerald-500" />
                <span>Typical response time: Under 12 hours</span>
              </div>
            </div>

            {/* Social Connect Card */}
            <div className="p-6 rounded-3xl bg-neutral-100/90 dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-800 shadow-sm flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-neutral-900 dark:text-white">
                  Social Channels
                </h4>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Follow code updates & labs
                </p>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={PERSONAL_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-neutral-200 dark:bg-neutral-800 hover:text-emerald-500 transition-colors text-neutral-700 dark:text-neutral-300"
                  aria-label="WhatsApp"
                >
                  <WhatsAppIcon className="w-4 h-4 text-emerald-500" />
                </a>
                <a
                  href={PERSONAL_INFO.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-neutral-200 dark:bg-neutral-800 hover:text-emerald-500 transition-colors text-neutral-700 dark:text-neutral-300"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
                <a
                  href={PERSONAL_INFO.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-neutral-200 dark:bg-neutral-800 hover:text-emerald-500 transition-colors text-neutral-700 dark:text-neutral-300"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-7 sm:p-9 rounded-3xl bg-neutral-100/90 dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-800 shadow-xl backdrop-blur-md"
            >
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
                Send a Direct Message
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mb-6">
                Fill out the form below and I'll get back to you promptly.
              </p>

              {/* Status Alert */}
              {submitStatus.type && (
                <div
                  className={`p-4 rounded-2xl mb-6 flex items-start gap-3 text-xs sm:text-sm ${
                    submitStatus.type === 'success'
                      ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-300'
                      : 'bg-red-500/15 border border-red-500/30 text-red-600 dark:text-red-300'
                  }`}
                >
                  {submitStatus.type === 'success' ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  )}
                  <span>{submitStatus.message}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name Field */}
                  <div>
                    <label className="block text-xs font-mono font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Kiprono Koech"
                      className={`w-full px-4 py-2.5 rounded-xl bg-neutral-200/60 dark:bg-neutral-950/80 border text-xs sm:text-sm text-neutral-900 dark:text-white placeholder-neutral-500 focus:outline-none transition-colors ${
                        errors.name
                          ? 'border-red-500 focus:border-red-500'
                          : 'border-neutral-300 dark:border-neutral-800 focus:border-emerald-500'
                      }`}
                    />
                    {errors.name && (
                      <p className="text-[11px] text-red-500 mt-1">{errors.name}</p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div>
                    <label className="block text-xs font-mono font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. client@organization.com"
                      className={`w-full px-4 py-2.5 rounded-xl bg-neutral-200/60 dark:bg-neutral-950/80 border text-xs sm:text-sm text-neutral-900 dark:text-white placeholder-neutral-500 focus:outline-none transition-colors ${
                        errors.email
                          ? 'border-red-500 focus:border-red-500'
                          : 'border-neutral-300 dark:border-neutral-800 focus:border-emerald-500'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-[11px] text-red-500 mt-1">{errors.email}</p>
                    )}
                  </div>
                </div>

                {/* Subject Field */}
                <div>
                  <label className="block text-xs font-mono font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                    Subject *
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. ICT Attachment Opportunity / Web Development Project"
                    className={`w-full px-4 py-2.5 rounded-xl bg-neutral-200/60 dark:bg-neutral-950/80 border text-xs sm:text-sm text-neutral-900 dark:text-white placeholder-neutral-500 focus:outline-none transition-colors ${
                      errors.subject
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-neutral-300 dark:border-neutral-800 focus:border-emerald-500'
                    }`}
                  />
                  {errors.subject && (
                    <p className="text-[11px] text-red-500 mt-1">{errors.subject}</p>
                  )}
                </div>

                {/* Message Field */}
                <div>
                  <label className="block text-xs font-mono font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                    Your Message *
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your project, team role, or timeline requirements..."
                    className={`w-full px-4 py-2.5 rounded-xl bg-neutral-200/60 dark:bg-neutral-950/80 border text-xs sm:text-sm text-neutral-900 dark:text-white placeholder-neutral-500 focus:outline-none transition-colors resize-none ${
                      errors.message
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-neutral-300 dark:border-neutral-800 focus:border-emerald-500'
                    }`}
                  />
                  {errors.message && (
                    <p className="text-[11px] text-red-500 mt-1">{errors.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
};
