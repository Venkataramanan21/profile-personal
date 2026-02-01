import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Note: You can install lucide-react for nice icons
import { Github, Linkedin, Instagram, Twitter, Code2, X } from 'lucide-react';
import { PiXLogo } from 'react-icons/pi';
import Styles from './../HeroTeaser/HeroTeaser.module.css';

const SocialHover = () => {
  const [isHovered, setIsHovered] = useState(false);

  const socials = [
    { id: 1, name: 'GitHub', icon: <Github size={20} />, url: 'https://github.com/Venkataramanan21', color: '#333' },
    { id: 2, name: 'LeetCode', icon: <Code2 size={20} />, url: 'https://leetcode.com/u/venkatbala214', color: '#FFA116' },
    { id: 3, name: 'LinkedIn', icon: <Linkedin size={20} />, url: 'https://www.linkedin.com/in/venkataramanan-b-130881139', color: '#0077B5' },
    { id: 4, name: 'Instagram', icon: <Instagram size={20} />, url: 'https://www.instagram.com/zesova21', color: '#E4405F' },
    { id: 5, name: 'Twitter', icon: <PiXLogo size={20} />, url: 'https://x.com/zesova21', color: '#000' },
  ];

  return (
      <div 
        className="relative inline-block p-3"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        >
        {/* Social Icons Container */}
        <div className={"absolute right-[100%] flex gap-3 top-1/2 transform -translate-y-1/2 "}>
            <AnimatePresence>
            { isHovered && <div className='glass-element flex-row-reverse flex gap-3 p-6 rounded-full'>
            { socials.map((social, index) => (
                <motion.a
                key={social.id}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20, scale: 0 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0.5, y: socials.length -index * 3, scale: .9, transformOrigin: "center"}}
                transition={{ 
                    type: "spring", 
                    stiffness: 260, 
                    damping: 15, 
                    delay: index * 0.05 // This creates the staggered "pop" effect
                }}
                whileHover={{ y: -5, scale: 1.1 }}
                className="w-10 h-10 rounded-full flex items-center justify-center text-white shadow-lg"
                style={{ backgroundColor: social.color }}
                >
                {social.icon}
                </motion.a>
            ))}
            </div>}
            </AnimatePresence>
        </div>

        {/* Main Trigger Button
        <button className="px-6 py-3 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700 transition-colors shadow-md">
            Connect with me
        </button> */}

        <img className={Styles.logo} src="zesova.jpg" />
        </div>
  );
};

export default SocialHover;