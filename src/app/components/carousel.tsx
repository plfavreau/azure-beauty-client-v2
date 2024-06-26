import { mockFaces } from '@/app/assets/data/mockFaces';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function InfiniteCarousel() {
  return (
    <section className='w-full mb-12'>
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 1,
          delay: 1,
        }}
        className='relative overflow-hidden'
      >
        <div className='flex space-x-4 animate-scroll border border-neutral-200/30 p-8'>
          {mockFaces.concat(mockFaces).map((face, index) => (
            <div
              draggable
              key={index}
              className='flex-shrink-0 w-48 p-4 bg-white rounded-lg shadow-md dark:bg-neutral-500/10'
            >
              <div className='relative'>
                <Image
                  src={face.src}
                  alt={`Face ${index + 1}`}
                  width={224}
                  height={224}
                  className='rounded-lg mb-4'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-black/10 pointer-events-none rounded-lg'></div>
              </div>
              <h3 className='text-lg font-semibold'>
                {face.name || 'Anonymous'}
              </h3>
              <p className='text-sm text-gray-400'>{face.quote}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
