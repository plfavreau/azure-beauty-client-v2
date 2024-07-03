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
        Face the facts: do you really need cosmetic surgery?
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
        <p className='pb-4 font-normal'>
          You've arrived on this site because you're likely considering surgery.
          However, this is not without risks and should not be taken lightly.
          Our site will help you determine your needs based on beauty criteria
          certified by our <strong>experts</strong>.
        </p>
        <p className='font-normal'>
          Join the <strong>thousands</strong> of satisfied users...
        </p>
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
