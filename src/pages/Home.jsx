import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaArrowUpRightFromSquare, FaPaperPlane, FaXmark } from 'react-icons/fa6';
import Hero from '../component/Hero.jsx';

const projects = [
  {
    title: 'Synthetix AI',
    description: 'An AI SaaS platform using generative LLMs to design vector layout mockups and create customizable UI schemas in real-time.',
    tags: ['React', 'Tailwind CSS', 'OpenAI', 'Framer Motion'],
    github: 'https://github.com',
    live: 'https://example.com',
    imageBg: 'from-pink-500/20 to-rose-500/25',
    borderCol: 'hover:border-rose-500/30'
  },
  {
    title: 'Orbit Commerce',
    description: 'A headless e-commerce storefront with optimized image rendering, clean product filtration, GraphQL backend, and stripe integration.',
    tags: ['Next.js', 'React', 'GraphQL', 'Stripe'],
    github: 'https://github.com',
    live: 'https://example.com',
    imageBg: 'from-indigo-500/20 to-purple-500/25',
    borderCol: 'hover:border-indigo-500/30'
  },
  {
    title: 'Aether Dashboard',
    description: 'A high-performance real-time data visualization analytics panel integrated with WebSockets, Recharts, and custom metric tracking.',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Recharts'],
    github: 'https://github.com',
    live: 'https://example.com',
    imageBg: 'from-cyan-500/20 to-blue-500/25',
    borderCol: 'hover:border-cyan-500/30'
  }
];

const stats = [
  { value: '0+', label: 'Years Experience' },
  { value: '0+', label: 'Completed Projects' },
  { value: '0+', label: 'Happy Clients' },
  { value: '100%', label: 'Success Rate' }
];

export default function Home() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setFormSubmitted(true);
      setTimeout(() => {
        setFormSubmitted(false);
        setFormData({ name: '', email: '', message: '' });
      }, 3000);
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <Hero />

      {/* About Section */}
      <section id="about" className="py-24 px-6 max-w-7xl mx-auto relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
        >
          {/* Left Column: Visual card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[360px] aspect-[4/5] rounded-3xl overflow-hidden border border-[#1f1f2e] bg-gradient-to-br from-[#121216]/80 to-[#0a0a0c]/60 p-6 flex flex-col justify-between shadow-2xl group hover:border-indigo-500/30 transition-colors">
              <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-indigo-500/10 rounded-full blur-[50px] group-hover:bg-indigo-500/20 transition-all pointer-events-none" />

              <div className="z-10">
                <span className="text-xs font-semibold tracking-wider text-indigo-400 uppercase">Interactive Developer</span>
                <h3 className="text-3xl font-bold text-white mt-2">Ayush</h3>
              </div>

              {/* Photo Container */}
              <div className="my-auto flex justify-center items-center z-10">
                <button
                  onClick={() => setIsPhotoModalOpen(true)}
                  className="relative w-44 h-44 rounded-2xl overflow-hidden border border-[#1f1f2e] bg-[#0a0a0c]/40 hover:border-indigo-500/50 hover:scale-[1.05] transition-all duration-500 shadow-xl flex items-center justify-center cursor-zoom-in group/photo focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                >
                  <img
                    src="/my-photo.jpeg"
                    alt="Ayush"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover/photo:scale-110"
                  />
                  <div className="absolute inset-0 bg-[#0a0a0c]/10 hover:bg-transparent transition-colors duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c]/40 via-transparent to-transparent opacity-60 pointer-events-none" />
                </button>
              </div>

              <div className="z-10 space-y-4">
                <div className="w-12 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full" />
                <p className="text-sm text-gray-400 leading-relaxed font-light">
                  Focused on crafting beautiful user interfaces that combine cutting-edge technology with aesthetic simplicity.
                </p>
                <div className="flex gap-3 text-xs text-indigo-300 font-semibold uppercase tracking-wider">
                  <span>Code</span>
                  <span>•</span>
                  <span>Design</span>
                  <span>•</span>
                  <span>Animate</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Text content */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-2">About Me</h2>
            <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-6">
              Bridging the Gap Between Code and Aesthetic Design
            </h3>
            <p className="text-gray-400 font-light text-base md:text-lg leading-relaxed mb-6">
              I am a creative developer who builds performant, secure, and beautiful digital experiences. With a deep passion for clean typography, fluid transitions, and minimalist interfaces, I bring static mockups to life.
            </p>
            <p className="text-gray-400 font-light text-base md:text-lg leading-relaxed mb-8">
              My engineering stack spans Rust Memory Management, modern JavaScript (primarily React, Vite, and Next.js) for interactive frontends, paired with flexible backend resources and rich animations (Framer Motion, CSS, and GSAP) to ensure each project is as functional as it is stunning.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-4 border-t border-[#1f1f2e]">
              {stats.map((stat, idx) => (
                <div key={idx} className="flex flex-col">
                  <span className="text-3xl md:text-4xl font-extrabold text-white tracking-tight bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                    {stat.value}
                  </span>
                  <span className="text-xs md:text-sm text-gray-400 mt-1 font-light">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-6 max-w-7xl mx-auto border-t border-[#1f1f2e] relative">
        <div className="absolute top-[30%] left-[50%] -translate-x-1/2 w-[350px] h-[350px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="mb-16 text-center">
          <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-2">My Work</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-white"> FAKE Projects</h3>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className={`group flex flex-col justify-between h-full bg-[#121216]/60 border border-[#1f1f2e] rounded-3xl p-6 transition-all duration-300 ${project.borderCol} hover:shadow-2xl hover:shadow-indigo-500/5 hover:-translate-y-1`}
            >
              <div>
                {/* Visual Image Banner Mockup */}
                <div className={`w-full aspect-[16/9] rounded-2xl bg-gradient-to-br ${project.imageBg} flex items-center justify-center mb-6 overflow-hidden relative border border-[#1f1f2e]`}>
                  <div className="text-white font-extrabold text-2xl tracking-widest opacity-20 select-none group-hover:scale-110 group-hover:opacity-40 transition-all duration-500">
                    {project.title.toUpperCase()}
                  </div>
                  <div className="absolute inset-0 bg-[#0a0a0c]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-medium uppercase tracking-wider scale-95 group-hover:scale-100 transition-all">
                      View Project
                    </span>
                  </div>
                </div>

                <h4 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-400 transition-colors">
                  {project.title}
                </h4>
                <p className="text-gray-400 font-light text-sm leading-relaxed mb-6">
                  {project.description}
                </p>
              </div>

              <div>
                {/* Tag Badges */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, tagIdx) => (
                    <span
                      key={tagIdx}
                      className="px-3 py-1 rounded-full text-xs font-medium bg-[#1c1c24] border border-[#1f1f2e] text-gray-400 group-hover:text-indigo-300 group-hover:border-indigo-500/20 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Project Links */}
                <div className="flex items-center gap-4 pt-4 border-t border-[#1f1f2e]/60">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-medium"
                  >
                    <FaGithub className="text-sm" />
                    FUTURE
                  </a>
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-medium"
                  >
                    <FaArrowUpRightFromSquare className="text-xs" />
                     Demo project 
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 max-w-4xl mx-auto border-t border-[#1f1f2e] relative">
        <div className="absolute bottom-0 right-[20%] w-[250px] h-[250px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="mb-16 text-center">
          <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-2">Get In Touch</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-white">Let's Create Something Great ? Feature not added , Do Email </h3>
        </div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#121216]/60 border border-[#1f1f2e] rounded-3xl p-8 md:p-12 backdrop-blur-sm relative"
        >
          {formSubmitted ? (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col items-center justify-center text-center py-12"
            >
              <div className="w-16 h-16 bg-green-500/10 border border-green-500/30 text-green-400 rounded-full flex items-center justify-center text-2xl mb-6 shadow-lg shadow-green-500/5 animate-bounce">
                🎉
              </div>
              <h4 className="text-2xl font-bold text-white mb-2">Message Sent!</h4>
              <p className="text-gray-400 font-light text-sm max-w-sm">
                Thank you so much for reaching out. I'll review your message and get back to you within 24 hours.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col space-y-2">
                  <label htmlFor="name" className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name"
                    className="bg-[#0a0a0c]/60 border border-[#1f1f2e] hover:border-indigo-500/30 focus:border-indigo-500 rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-600 focus:outline-none transition-colors"
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <label htmlFor="email" className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Enter your email"
                    className="bg-[#0a0a0c]/60 border border-[#1f1f2e] hover:border-indigo-500/30 focus:border-indigo-500 rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-600 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="flex flex-col space-y-2">
                <label htmlFor="message" className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Your Message</label>
                <textarea
                  id="message"
                  required
                  rows="5"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell me about your project..."
                  className="bg-[#0a0a0c]/60 border border-[#1f1f2e] hover:border-indigo-500/30 focus:border-indigo-500 rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-600 focus:outline-none transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 group shadow-lg shadow-indigo-500/10"
              >
                Send Message
                <FaPaperPlane className="text-xs group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </form>
          )}
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-[#1f1f2e] text-center text-xs text-gray-600 font-light">
        <p>&copy; {new Date().getFullYear()} Ayush. All rights reserved. </p>
        <p className="mt-2 text-[10px] text-gray-700">Built with React, Vite, Tailwind CSS, and Framer Motion.</p>
      </footer>

      {/* Photo Lightbox Popup */}
      <AnimatePresence>
        {isPhotoModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsPhotoModalOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0c]/90 backdrop-blur-md p-4 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg w-full max-h-[85vh] rounded-3xl overflow-hidden border border-[#1f1f2e] bg-[#121216]/80 shadow-2xl flex flex-col items-center p-3 cursor-default"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsPhotoModalOpen(false)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-[#0a0a0c]/60 border border-[#1f1f2e] text-gray-400 hover:text-white flex items-center justify-center text-lg transition-colors hover:border-red-500/40 hover:bg-red-500/10 cursor-pointer"
                aria-label="Close"
              >
                <FaXmark />
              </button>

              <img
                src="/my-photo.jpeg"
                alt="Ayush"
                className="w-full h-auto max-h-[75vh] object-contain rounded-2xl"
              />

              <div className="py-3 text-center">
                <span className="text-sm font-semibold tracking-wider text-indigo-400 uppercase">Ayush Singh</span>
                <p className="text-xs text-gray-500 mt-0.5">Rust and Web Developer</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
