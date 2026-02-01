import { Mail, ArrowUp } from 'lucide-react';
import { socials } from './SocialHover/SocialHover';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-50 dark:bg-slate-800 border-t border-slate-200 dark:border-slate-800 pt-12 pb-8">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              Let's Connect
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Open to opportunities in Full Stack Development.
            </p>
            <a 
              href="mailto:venkatbala214@gmail.com" 
              className="inline-flex items-center gap-2 mt-4 text-blue-600 hover:text-blue-700 font-medium"
            >
              <Mail size={18} />
              venkatbala214@gmail.com
            </a>
          </div>

          <div className="flex gap-4">
            {socials.map((social, i) => (
              <a 
                key={i} 
                href={social.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label={social.name}
                className="p-3 bg-white dark:bg-slate-900 rounded-full shadow-sm hover:shadow-md hover:scale-110 transition-all border border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-blue-600"
              >
                {/* <Icon size={20} /> */}
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-slate-200 dark:bg-slate-800 w-full mb-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500 dark:text-slate-500">
          
          <p>© {new Date().getFullYear()} Venkataramanan B. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <span className="hidden md:block">Built with React, Tailwind & Framer Motion</span>
            
            <button 
              onClick={scrollToTop}
              className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              aria-label="Scroll to top"
            >
              <ArrowUp size={18} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;