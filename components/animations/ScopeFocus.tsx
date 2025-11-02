'use client';
import { motion } from 'framer-motion';

export default function ScopeFocus() {
  return (
    <div className="relative w-[120px] h-[160px]">
      {/* Concentric circle scopes that fade out */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0.6, scale: 1.5 }}
        animate={{ opacity: 0, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <svg width="140" height="140" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="none" stroke="#00aeef" strokeWidth="1" opacity="0.3" />
          <circle cx="50" cy="50" r="35" fill="none" stroke="#00aeef" strokeWidth="1" opacity="0.4" />
          <circle cx="50" cy="50" r="25" fill="none" stroke="#00aeef" strokeWidth="1" opacity="0.5" />
          <circle cx="50" cy="50" r="15" fill="none" stroke="#00aeef" strokeWidth="2" opacity="0.6" />
        </svg>
      </motion.div>

      {/* Logo morphs from circle to actual shape with rotation */}
      <motion.svg
        width="120"
        height="160"
        viewBox="0 0 81.31 108.37"
        initial={{ rotate: -180, filter: "blur(8px)", opacity: 0 }}
        animate={{ rotate: 0, filter: "blur(0px)", opacity: 1 }}
        transition={{
          duration: 1.5,
          delay: 0.5,
          ease: "easeOut"
        }}
      >
        {/* Blue center hexagon - morphs from circle */}
        <motion.path
          d="M75.23,41.69l-22.04-12.73-22.03,12.72-3.04,1.76-3.04,1.75v32.46l22.04,12.73,6.07,3.51,3.05-1.76,25.07-14.47v-32.46l-6.08-3.51ZM53.19,35.98l19,10.97-18.99,10.97-19-10.97,18.99-10.97ZM31.15,74.15v-21.93l19,10.97v21.93l-19-10.97ZM75.23,74.15l-18.99,10.96v-21.92l18.99-10.97v21.93Z"
          initial={{
            scale: 0.3,
            opacity: 0
          }}
          animate={{
            scale: 1,
            opacity: 1
          }}
          transition={{
            duration: 1.2,
            delay: 0.8,
            ease: "backOut"
          }}
          fill="#00aeef"
        />

        {/* Top black piece - morphs from circle segment */}
        <motion.path
          d="M53.19,0l-28.11,16.24v21.95l6.08-3.51v-14.94l22.03-12.72,22.04,12.72v14.94l6.08,3.51v-21.95L53.19,0Z"
          initial={{
            y: -20,
            opacity: 0,
            scale: 0.5
          }}
          animate={{
            y: 0,
            opacity: 1,
            scale: 1
          }}
          transition={{
            duration: 1,
            delay: 1.2,
            ease: "backOut"
          }}
          fill="#231f20"
        />

        {/* Bottom black piece - morphs from circle segment */}
        <motion.path
          d="M41.03,93.89l-12.91,7.46-22.03-12.73v-25.44l12.91-7.46v-7.02L0,59.66v32.47l28.11,16.24,18.99-10.98-6.08-3.51Z"
          initial={{
            y: 20,
            opacity: 0,
            scale: 0.5
          }}
          animate={{
            y: 0,
            opacity: 1,
            scale: 1
          }}
          transition={{
            duration: 1,
            delay: 1.4,
            ease: "backOut"
          }}
          fill="#231f20"
        />
      </motion.svg>

      {/* Focusing crosshair effect */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        initial={{ opacity: 0.8, scale: 2 }}
        animate={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <svg width="160" height="160" viewBox="0 0 100 100">
          <line x1="50" y1="0" x2="50" y2="100" stroke="#00aeef" strokeWidth="0.5" opacity="0.5" />
          <line x1="0" y1="50" x2="100" y2="50" stroke="#00aeef" strokeWidth="0.5" opacity="0.5" />
        </svg>
      </motion.div>
    </div>
  );
}
