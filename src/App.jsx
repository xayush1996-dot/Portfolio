import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Loader from './component/Loader.jsx';
import Navbar from './component/Navbar.jsx';
import Socials from './component/Socials.jsx';
import Home from './pages/Home.jsx';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVisible, setCursorVisible] = useState(false);

  useEffect(() => {
    const mouseMoveHandler = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const mouseEnterHandler = () => setCursorVisible(true);
    const mouseLeaveHandler = () => setCursorVisible(false);

    window.addEventListener('mousemove', mouseMoveHandler);
    document.body.addEventListener('mouseenter', mouseEnterHandler);
    document.body.addEventListener('mouseleave', mouseLeaveHandler);

    return () => {
      window.removeEventListener('mousemove', mouseMoveHandler);
      document.body.removeEventListener('mouseenter', mouseEnterHandler);
      document.body.removeEventListener('mouseleave', mouseLeaveHandler);
    };
  }, []);

  return (
    <>
      {/* Custom Spring Cursor */}
      {cursorVisible && !loading && (
        <motion.div
          className="fixed top-0 left-0 w-8 h-8 rounded-full border border-indigo-400/40 pointer-events-none z-50 mix-blend-difference hidden lg:block"
          animate={{
            x: mousePosition.x - 16,
            y: mousePosition.y - 16,
          }}
          transition={{
            type: "spring",
            damping: 25,
            stiffness: 250,
            mass: 0.5
          }}
        />
      )}
      {cursorVisible && !loading && (
        <motion.div
          className="fixed top-0 left-0 w-2 h-2 rounded-full bg-indigo-500 pointer-events-none z-50 hidden lg:block"
          animate={{
            x: mousePosition.x - 4,
            y: mousePosition.y - 4,
          }}
          transition={{
            type: "spring",
            damping: 15,
            stiffness: 450,
            mass: 0.1
          }}
        />
      )}

      {/* Main Layout */}
      <AnimatePresence mode="wait">
        {loading ? (
          <Loader key="loader" onComplete={() => setLoading(false)} />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Global floating decoration */}
            <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-950/20 via-[#0a0a0c] to-[#0a0a0c] pointer-events-none z-0" />
            
            <Navbar />
            <Socials />
            
            <main className="relative z-10">
              <Home />
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
