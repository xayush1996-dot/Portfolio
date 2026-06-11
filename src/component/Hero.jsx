import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa6';
import {
  SiReact, SiTailwindcss, SiJavascript,
  SiCss, SiHtml5, SiGit, SiNodedotjs, SiRust
} from 'react-icons/si';

const techStack = [
  { icon: <SiReact className="text-sky-400" />, name: 'React' },
  { icon: <SiTailwindcss className="text-teal-400" />, name: 'Tailwind CSS' },
  // { icon: <SiFramer className="text-pink-500" />, name: 'Framer Motion' },
  { icon: <SiJavascript className="text-yellow-400" />, name: 'JavaScript' },
  { icon: <SiCss className="text-blue-500" />, name: 'CSS3' },
  { icon: <SiHtml5 className="text-orange-500" />, name: 'HTML5' },
  // { icon: <SiVite className="text-purple-400" />, name: 'Vite' },
  { icon: <SiGit className="text-red-500" />, name: 'Git' },
  { icon: <SiNodedotjs className="text-green-500" />, name: 'Node.js' },
  { icon: <SiRust className="text-orange-500" />, name: 'Rust' },
];

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden pt-24">
      {/* Hero Background Cover Image */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <img
          src="/my-photo.jpeg"
          alt="Hero Cover Background"
          className="w-full h-full object-cover opacity-35 filter brightness-[0.5]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0c]/20 via-[#0a0a0c]/80 to-[#0a0a0c]" />
      </div>

      {/* Premium ambient gradient backgrounds */}
      <div className="absolute top-[20%] left-[10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-indigo-500/10 rounded-full blur-[100px] md:blur-[150px] animate-pulse-slow pointer-events-none" />
      <div className="absolute bottom-[20%] right-[10%] w-[250px] md:w-[450px] h-[250px] md:h-[450px] bg-purple-500/10 rounded-full blur-[100px] md:blur-[150px] animate-pulse-slow pointer-events-none" />

      {/* Hero Content Grid */}
      <div className="max-w-5xl mx-auto text-center z-10 flex flex-col items-center px-6">
        {/* Small greeting tag */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/5 text-indigo-300 text-xs md:text-sm font-medium mb-6 backdrop-blur-md"
        >
          <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
          Available for new opportunities
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl md:text-7xl font-extrabold tracking-tight text-white mb-6 font-sans leading-[1.1]"
        >
          Creating Digital <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
            Experiences
          </span> That Inspire.
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-gray-400 text-base md:text-xl max-w-2xl mb-10 leading-relaxed font-light"
        >
          Hi, I'm <strong className="text-white font-medium">Ayush</strong>. A creative developer specializing in beautiful, interactive user interfaces, micro-animations, and full-stack web experiences.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="flex flex-col sm:flex-row gap-4 mb-20"
        >
          <a
            href="#projects"
            className="px-8 py-4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
          >
            Explore Projects
            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#contact"
            className="px-8 py-4 rounded-full border border-[#1f1f2e] bg-[#121216]/50 hover:bg-[#121216] text-gray-300 hover:text-white font-medium transition-all flex items-center justify-center backdrop-blur-sm"
          >
            Contact Me
          </a>
        </motion.div>
      </div>

      {/* Tech Stack Marquee (Matches .animate-marquee in index.css) */}
      <div className="w-full border-t border-b border-[#1f1f2e] py-8 overflow-hidden relative bg-[#0a0a0c]/40 backdrop-blur-sm z-10">
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#0a0a0c] to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#0a0a0c] to-transparent z-20 pointer-events-none" />

        <div className="flex w-max gap-0 items-center animate-marquee">
          {/* First loop of tech items */}
          <div className="flex shrink-0 items-center gap-12 pr-12">
            {techStack.map((tech, idx) => (
              <div key={idx} className="flex items-center gap-3 bg-[#121216]/60 border border-[#1f1f2e] px-5 py-2.5 rounded-full select-none hover:border-indigo-500/50 hover:scale-105 transition-all">
                <span className="text-xl">{tech.icon}</span>
                <span className="text-sm font-medium text-gray-300">{tech.name}</span>
              </div>
            ))}
          </div>
          {/* Second identical loop of tech items for seamless looping */}
          <div className="flex shrink-0 items-center gap-12 pr-12">
            {techStack.map((tech, idx) => (
              <div key={`dup-${idx}`} className="flex items-center gap-3 bg-[#121216]/60 border border-[#1f1f2e] px-5 py-2.5 rounded-full select-none hover:border-indigo-500/50 hover:scale-105 transition-all">
                <span className="text-xl">{tech.icon}</span>
                <span className="text-sm font-medium text-gray-300">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
