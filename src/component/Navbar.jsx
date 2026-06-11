import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { socials } from './Socials.jsx';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${scrolled
          ? 'py-4 bg-[#0a0a0c]/80 backdrop-blur-md border-b border-[#1f1f2e]'
          : 'py-6 bg-transparent'
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between relative">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2.5 z-10 hover:opacity-85 transition-opacity">
            <img src="/logo.png" alt="Logo" className="w-8 h-8 object-contain" />
            <span className="text-xl md:text-2xl font-extrabold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
              AYUSH
            </span>
          </a>

          {/* Center Email Address */}
          <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center justify-center z-10">
            <motion.a
              href="mailto:xayush1996@gmail.com"
              whileHover={{ y: -1, scale: 1.02 }}
              className="text-sm font-medium text-gray-400 hover:text-indigo-400 transition-colors tracking-wide"
            >
              xayush1996@gmail.com
            </motion.a>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-8 z-10">
            {navLinks.map((link, idx) => (
              <motion.a
                key={idx}
                href={link.href}
                whileHover={{ y: -2 }}
                className="text-sm font-medium text-gray-300 hover:text-indigo-400 transition-colors relative group"
              >
                {link.name}
                <span className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-indigo-500 transition-all duration-300 group-hover:w-full" />
              </motion.a>
            ))}

            {/* CTA Button */}
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-5 py-2 text-sm font-medium rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all"
            >
              Get in Touch
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden z-10">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-2xl text-gray-300 hover:text-white transition-colors"
            >
              {isOpen ? <HiX /> : <HiMenuAlt3 />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed top-[72px] left-0 w-full bg-[#0a0a0c]/95 backdrop-blur-lg border-b border-[#1f1f2e] z-30 md:hidden overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col space-y-6">
              {navLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium text-gray-300 hover:text-indigo-400 transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="inline-block text-center py-3 px-6 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium shadow-lg shadow-indigo-500/20"
              >
                Get in Touch
              </a>

              {/* Mobile Social Links */}
              <div className="flex items-center justify-center gap-6 pt-6 border-t border-[#1f1f2e]">
                {socials.map((social, idx) => (
                  <motion.a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 rounded-full bg-[#121216]/80 border border-[#1f1f2e] text-gray-400 hover:text-indigo-400 hover:border-indigo-500/50 flex items-center justify-center text-lg transition-colors shadow-md backdrop-blur-sm"
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
