import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Code2 } from 'lucide-react';
import Styles from './../HeroTeaser/HeroTeaser.module.css';

export const socialsProfessional = [
  { id: 1, name: 'GitHub', icon: <Github size={20} />, url: 'https://github.com/Venkataramanan21', color: '#333' },
  { id: 2, name: 'LeetCode', icon: <Code2 size={20} />, url: 'https://leetcode.com/u/venkatbala214', color: '#FFA116' },
  { id: 3, name: 'LinkedIn', icon: <Linkedin size={20} />, url: 'https://www.linkedin.com/in/venkataramanan-b-130881139', color: '#0077B5' },
];

/** @deprecated Use socialsProfessional in footer/contact; kept for backward compatibility */
export const socials = socialsProfessional;

const SocialHover = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative inline-block p-3"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute right-[100%] top-1/2 flex -translate-y-1/2 gap-3">
        <AnimatePresence>
          {isHovered && (
            <div className="glass-element flex flex-row-reverse gap-3 rounded-full p-6">
              {socialsProfessional.map((social, index) => (
                <motion.a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  initial={{ opacity: 0, y: 20, scale: 0 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0.5, y: socialsProfessional.length - index * 3, scale: 0.9 }}
                  transition={{
                    type: 'spring',
                    stiffness: 260,
                    damping: 15,
                    delay: index * 0.05,
                  }}
                  whileHover={{ y: -5, scale: 1.1 }}
                  className="flex h-10 w-10 items-center justify-center rounded-full text-white shadow-lg"
                  style={{ backgroundColor: social.color }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>

      <img className={Styles.logo} src="/zesova.jpg" alt="Venkataramanan B" />
    </div>
  );
};

export default SocialHover;
