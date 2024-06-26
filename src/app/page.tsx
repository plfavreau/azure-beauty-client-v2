'use client';

import { motion } from 'framer-motion';
import { Inter } from 'next/font/google';
import Image from 'next/image';
import InfiniteCarousel from './components/carousel';
import HeaderSection from './components/headerSection';
import InferenceDisplay from './components/inferenceDisplay';
import TryByYourselfSection from './components/tryByYourselfSection';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <main
      className={`flex flex-col items-center min-h-screen p-24 ${inter.className}`}
    >
      <LogoSection />
      <HeaderSection />
      <InfiniteCarousel />
      <TryByYourselfSection />
      <section className='h-96'></section>
      <InferenceDisplay />
    </main>
  );
}

function LogoSection() {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        duration: 0.5,
      }}
      className='absolute top-0 left-0 m-4'
    >
      <Image
        className='rounded-3xl'
        src='/azure_beauty.png'
        alt='Azure Beauty Logo'
        width={100}
        height={37}
        priority
      />
    </motion.div>
  );
}
