import React from 'react';
import { motion } from 'framer-motion';

// Premium full‑screen animated background for the Hero section with vivid, high‑contrast colors.
// Colors are intensified and opacity increased for maximum visual impact.

const BackgroundMesh = () => {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Base subtle gradient layer to boost overall color richness */}
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#ff7eb9ff_0%,#7afcffff_70%,#ffb86cff_100%)]"
        style={{ opacity: 0.4 }}
        animate={{ opacity: [0.4, 0.6, 0.4] }}
        transition={{ repeat: Infinity, duration: 12, ease: 'easeInOut' }}
      />

      {/* Rotating mesh gradient – vivid pink/cyan with higher opacity */}
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#ff7eb9cc_0%,#7afcffcc_70%,transparent_100%)]"
        style={{ opacity: 0.9 }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
      />

      {/* Bold moving blobs with stronger colors */}
      {[
        { size: 320, bg: '#ff6b6b99', top: '12%', left: '-18%', delay: 0 },
        { size: 420, bg: '#ffb86c99', top: '68%', left: '78%', delay: 4 },
        { size: 260, bg: '#8be9fd99', top: '38%', left: '58%', delay: 2 },
      ].map((b, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: b.size,
            height: b.size,
            background: b.bg,
            filter: 'blur(130px)',
            top: b.top,
            left: b.left,
          }}
          animate={{
            x: [0, 35, 0],
            y: [0, -25, 0],
            opacity: [0.85, 0.5, 0.85],
          }}
          transition={{
            repeat: Infinity,
            duration: 16,
            ease: 'easeInOut',
            delay: b.delay,
          }}
        />
      ))}

      {/* Aurora light strip – brighter white gradient */}
      <motion.div
        className="absolute inset-0 bg-[linear-gradient(180deg,#ffffff00_0%,#ffffffaa_50%,#ffffff00_100%)]"
        style={{ mixBlendMode: 'screen' }}
        animate={{ opacity: [0.25, 0.55, 0.25] }}
        transition={{ repeat: Infinity, duration: 9, ease: 'easeInOut' }}
      />
    </div>
  );
};

export default BackgroundMesh;
