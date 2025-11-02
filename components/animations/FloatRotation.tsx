'use client';
import { motion } from 'framer-motion';

export default function FloatRotation() {
  return (
    <motion.svg
      width="120"
      height="160"
      viewBox="0 0 81.31 108.37"
      animate={{
        y: [0, -15, 0],
        rotate: [0, 360],
      }}
      transition={{
        y: {
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        },
        rotate: {
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }
      }}
    >
      <path
        d="M75.23,41.69l-22.04-12.73-22.03,12.72-3.04,1.76-3.04,1.75v32.46l22.04,12.73,6.07,3.51,3.05-1.76,25.07-14.47v-32.46l-6.08-3.51ZM53.19,35.98l19,10.97-18.99,10.97-19-10.97,18.99-10.97ZM31.15,74.15v-21.93l19,10.97v21.93l-19-10.97ZM75.23,74.15l-18.99,10.96v-21.92l18.99-10.97v21.93Z"
        fill="#00aeef"
        opacity="0.7"
      />
      <path
        d="M53.19,0l-28.11,16.24v21.95l6.08-3.51v-14.94l22.03-12.72,22.04,12.72v14.94l6.08,3.51v-21.95L53.19,0Z"
        fill="#231f20"
        opacity="0.7"
      />
      <path
        d="M41.03,93.89l-12.91,7.46-22.03-12.73v-25.44l12.91-7.46v-7.02L0,59.66v32.47l28.11,16.24,18.99-10.98-6.08-3.51Z"
        fill="#231f20"
        opacity="0.7"
      />
    </motion.svg>
  );
}
