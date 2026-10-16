import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, ExternalLink, FileText, CheckCircle2 } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative w-full max-w-5xl h-[85vh] bg-neutral-900 border border-emerald-500/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden z-10"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-950/80">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    {PERSONAL_INFO.name} — Curriculum Vitae
                    <span className="hidden sm:inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-normal">
                      <CheckCircle2 className="w-3 h-3" /> Verified PDF
                    </span>
                  </h3>
                  <p className="text-xs text-neutral-400">
                    BSc Information Technology • Software Developer & Network Engineer
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <a
                  href={PERSONAL_INFO.cvPath}
                  download="Peter_Kiplagat_Misik_CV.pdf"
                  className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs sm:text-sm font-medium text-black bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors shadow-sm"
                >
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">Download</span>
                </a>
                <a
                  href={PERSONAL_INFO.cvPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors"
                  title="Open in new window"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
                <button
                  onClick={onClose}
                  className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors"
                  title="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body / PDF Viewer */}
            <div className="flex-1 bg-neutral-950 p-2 sm:p-4 overflow-hidden">
              <object
                data={`${PERSONAL_INFO.cvPath}#view=FitH`}
                type="application/pdf"
                className="w-full h-full rounded-lg border border-neutral-800 bg-neutral-900"
              >
                <div className="flex flex-col items-center justify-center h-full text-center p-6">
                  <FileText className="w-16 h-16 text-emerald-500/60 mb-4 animate-bounce" />
                  <h4 className="text-lg font-semibold text-white mb-2">Resume Document Ready</h4>
                  <p className="text-sm text-neutral-400 max-w-md mb-6">
                    Your browser does not support inline PDF previews. You can download the complete CV file directly.
                  </p>
                  <a
                    href={PERSONAL_INFO.cvPath}
                    download="Peter_Kiplagat_Misik_CV.pdf"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 text-black font-semibold hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/20"
                  >
                    <Download className="w-4 h-4" />
                    Download CV (PDF)
                  </a>
                </div>
              </object>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
