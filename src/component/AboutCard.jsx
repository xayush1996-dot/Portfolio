import React, { useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function AboutCard({ onPhotoClick }) {
  const cardRef = useRef(null);

  // Motion values for normalized coordinates relative to card center (-0.5 to 0.5)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for rotations (max rotation of 15 degrees)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), { damping: 25, stiffness: 200 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), { damping: 25, stiffness: 200 });

  // Handle desktop mouse movement tilt
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const relativeX = (e.clientX - rect.left) / width - 0.5;
    const relativeY = (e.clientY - rect.top) / height - 0.5;
    
    x.set(relativeX);
    y.set(relativeY);
  };

  // Reset rotation when mouse leaves
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Handle mobile device orientation (gyroscope)
  useEffect(() => {
    const handleOrientation = (e) => {
      if (e.beta === null || e.gamma === null) return;
      
      // Normalize beta around typical phone holding angle (e.g. 45 degrees)
      const betaOffset = e.beta - 45;
      const clampedBeta = Math.min(Math.max(betaOffset, -25), 25);
      const clampedGamma = Math.min(Math.max(e.gamma, -25), 25);
      
      // Map to [-0.5, 0.5] range
      x.set(clampedGamma / 50);
      y.set(clampedBeta / 50);
    };

    window.addEventListener('deviceorientation', handleOrientation);
    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, [x, y]);

  return (
    <div className="w-full flex justify-center items-center py-4" style={{ perspective: 1200 }}>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative w-full max-w-[370px] aspect-[4/5.2] rounded-[2.2rem] border border-white/[0.08] bg-[#0c0c10]/95 p-8 flex flex-col justify-between shadow-[0_30px_100px_rgba(0,0,0,0.85)] backdrop-blur-xl group hover:border-indigo-500/30 transition-colors duration-500 select-none cursor-pointer"
      >
        {/* Subtle Ambient top-right card glow */}
        <div className="absolute top-0 right-0 w-[180px] h-[180px] bg-indigo-500/10 rounded-full blur-[60px] group-hover:bg-indigo-500/20 transition-all duration-700 pointer-events-none" />

        {/* 1. Header (Z-layer 30px) */}
        <div style={{ transform: 'translateZ(30px)', transformStyle: 'preserve-3d' }} className="z-10">
          <span className="text-[11px] font-bold tracking-[0.15em] text-indigo-400 uppercase select-none">
            Interactive Developer
          </span>
          <h3 className="text-4xl font-extrabold text-white mt-1.5 tracking-tight select-none">
            Ayush
          </h3>
        </div>

        {/* 2. Photo Container (Z-layer 55px for strong pop-out) */}
        <div 
          style={{ transform: 'translateZ(55px)', transformStyle: 'preserve-3d' }} 
          className="my-auto w-full flex justify-center items-center z-10"
        >
          <button
            onClick={onPhotoClick}
            className="relative w-full aspect-[1.05] rounded-[2rem] overflow-hidden border border-white/[0.08] bg-[#050507]/60 hover:border-indigo-500/40 transition-colors duration-500 shadow-2xl flex items-center justify-center cursor-zoom-in group/photo focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
          >
            <img
              src="/my-photo.jpeg"
              alt="Ayush"
              className="w-full h-full object-cover transition-transform duration-700 group-hover/photo:scale-[1.06]"
            />
            <div className="absolute inset-0 bg-[#0a0a0c]/10 group-hover/photo:bg-transparent transition-colors duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c]/50 via-transparent to-transparent opacity-80 pointer-events-none" />
          </button>
        </div>

        {/* 3. Footer Details (Z-layer 40px) */}
        <div style={{ transform: 'translateZ(40px)', transformStyle: 'preserve-3d' }} className="z-10 space-y-5">
          {/* Accent Line Capsule */}
          <div className="w-16 h-[5px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full" />
          
          {/* Paragraph (Z-layer 20px) */}
          <p 
            style={{ transform: 'translateZ(20px)' }}
            className="text-[14px] text-gray-400 leading-relaxed font-light select-none"
          >
            Focused on crafting beautiful user interfaces that combine cutting-edge technology with aesthetic simplicity.
          </p>
          
          {/* Footer Tags (Z-layer 30px) */}
          <div 
            style={{ transform: 'translateZ(30px)' }}
            className="flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.16em] text-indigo-400/90"
          >
            <span>Code</span>
            <span className="text-gray-600 font-normal text-xs">•</span>
            <span>Design</span>
            <span className="text-gray-600 font-normal text-xs">•</span>
            <span>Animate</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
