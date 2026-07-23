import React from 'react';
import { motion } from 'framer-motion';

// Premium full‑screen animated background for the Hero section with vivid colors.
// Colors are stronger and opacity higher for a bold, immersive effect.

const BackgroundMesh = () => {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Rotating mesh gradient – bright pink/cyan */}
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#ff7eb966_0%,#7afcff66_70%,transparent_100%)]"
        style={{ opacity: 0.7 }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
      />

      {/* Soft moving vivid blobs */}
      {[
        { size: 300, bg: '#ff6b6b66', top: '10%', left: '-15%', delay: 0 },
        { size: 400, bg: '#ffb86c66', top: '70%', left: '80%', delay: 5 },
        { size: 250, bg: '#8be9fd66', top: '40%', left: '55%', delay: 2 },
      ].map((b, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: b.size,
            height: b.size,
            background: b.bg,
            filter: 'blur(120px)',
            top: b.top,
            left: b.left,
          }}
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
            opacity: [0.7, 0.4, 0.7],
          }}
          transition={{
            repeat: Infinity,
            duration: 18,
            ease: 'easeInOut',
            delay: b.delay,
          }}
        />
      ))}

      {/* Aurora light strip – brighter white gradient */}
      <motion.div
        className="absolute inset-0 bg-[linear-gradient(180deg,#ffffff00_0%,#ffffff55_50%,#ffffff00_100%)]"
        style={{ mixBlendMode: 'screen' }}
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut' }}
      />
    </div>
  );
};

export default BackgroundMesh;

