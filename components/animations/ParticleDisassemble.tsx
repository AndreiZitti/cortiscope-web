'use client';
import { motion } from 'framer-motion';

export default function ParticleDisassemble() {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    finalX: (Math.random() - 0.5) * 400,
    finalY: (Math.random() - 0.5) * 400,
    delay: Math.random() * 0.3
  }));

  return (
    <div className="relative w-[120px] h-[160px]">
      {/* Logo disappears as particles */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 1, scale: 1 }}
        animate={{ opacity: 0, scale: 0.8 }}
        transition={{
          delay: 0.5,
          duration: 0.5,
          ease: "easeIn"
        }}
      >
        <svg
          width="120"
          height="160"
          viewBox="0 0 81.31 108.37"
        >
          <path
            d="M75.23,41.69l-22.04-12.73-22.03,12.72-3.04,1.76-3.04,1.75v32.46l22.04,12.73,6.07,3.51,3.05-1.76,25.07-14.47v-32.46l-6.08-3.51ZM53.19,35.98l19,10.97-18.99,10.97-19-10.97,18.99-10.97ZM31.15,74.15v-21.93l19,10.97v21.93l-19-10.97ZM75.23,74.15l-18.99,10.96v-21.92l18.99-10.97v21.93Z"
            fill="#00aeef"
          />
          <path
            d="M53.19,0l-28.11,16.24v21.95l6.08-3.51v-14.94l22.03-12.72,22.04,12.72v14.94l6.08,3.51v-21.95L53.19,0Z"
            fill="#231f20"
          />
          <path
            d="M41.03,93.89l-12.91,7.46-22.03-12.73v-25.44l12.91-7.46v-7.02L0,59.66v32.47l28.11,16.24,18.99-10.98-6.08-3.51Z"
            fill="#231f20"
          />
        </svg>
      </motion.div>

      {/* Particles fly away */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-2 h-2 bg-blue-400 rounded-full"
          initial={{
            x: 0,
            y: 0,
            opacity: 0
          }}
          animate={{
            x: particle.finalX,
            y: particle.finalY,
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 1.5,
            delay: 0.5 + particle.delay,
            ease: "easeOut"
          }}
          style={{
            left: '50%',
            top: '50%'
          }}
        />
      ))}
    </div>
  );
}
