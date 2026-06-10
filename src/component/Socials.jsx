import { motion } from 'framer-motion';
import { FaGithub, FaLinkedinIn, FaTwitter, FaEnvelope } from 'react-icons/fa6';

const socials = [
  { icon: <FaGithub />, href: 'https://github.com/xayush1996-dot', label: 'GitHub' },
  { icon: <FaLinkedinIn />, href: 'https://www.linkedin.com/in/ayush-singh-99a61837a/', label: 'LinkedIn' },
  { icon: <FaTwitter />, href: 'https://x.com/ayush77781', label: 'Twitter' },
  { icon: <FaEnvelope />, href: 'mailto:xayush1996@gmail.com', label: 'Email' },
];

export default function Socials() {
  return (
    <div className="fixed bottom-0 left-6 z-30 hidden lg:flex flex-col items-center space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col space-y-5"
      >
        {socials.map((social, idx) => (
          <motion.a
            key={idx}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
            whileHover={{ y: -4, scale: 1.1 }}
            className="w-10 h-10 rounded-full bg-[#121216]/80 border border-[#1f1f2e] text-gray-400 hover:text-indigo-400 hover:border-indigo-500/50 flex items-center justify-center text-lg shadow-md hover:shadow-indigo-500/10 transition-colors backdrop-blur-sm"
          >
            {social.icon}
          </motion.a>
        ))}
      </motion.div>

      {/* Vertical linking line */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.8, delay: 2.0, ease: 'easeOut' }}
        className="w-[1px] h-24 bg-gradient-to-t from-indigo-500/50 to-transparent origin-bottom"
      />
    </div>
  );
}
