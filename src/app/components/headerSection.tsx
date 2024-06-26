import { motion } from 'framer-motion';

export default function HeaderSection() {
  return (
    <section className='text-center mb-12'>
      <motion.h1
        initial={{
          opacity: 0,
          y: -50,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.8,
          delay: 0.1,
        }}
        className='text-5xl font-bold mb-4'
      >
        Azure Beauty Reveal
      </motion.h1>
      <motion.p
        initial={{
          opacity: 0,
          y: -50,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.8,
          delay: 0.2,
        }}
        className='text-lg mb-8'
      >
        Do you really need surgery ?
      </motion.p>
      <motion.p
        initial={{
          opacity: 0,
          y: -50,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.8,
          delay: 0.4,
        }}
        className='text-lg font-semibold'
      >
        Join the <strong>thousands</strong> of satisfied users...
      </motion.p>
      <motion.div
        initial={{
          opacity: 0,
          y: -50,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.8,
          delay: 0.6,
        }}
        className='mt-6'
      ></motion.div>
    </section>
  );
}
