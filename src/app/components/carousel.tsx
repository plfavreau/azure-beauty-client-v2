import { mockFaces } from '@/app/assets/data/mockFaces';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRef, useEffect } from 'react';

export default function InfiniteCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    let animationId: number;

    const scroll = () => {
      if (
        carousel.scrollLeft + carousel.clientWidth >=
        carousel.scrollWidth - 1
      ) {
        carousel.scrollLeft = 1;
      } else {
        carousel.scrollLeft += 1;
      }
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationId);
  }, []);

  const triplefaces = [...mockFaces, ...mockFaces, ...mockFaces];

  return (
    <section className='w-full mb-12 bg-black-500'>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className='relative overflow-hidden'
      >
        <div
          ref={carouselRef}
          className='flex space-x-4 overflow-x-scroll scrollbar-hide border p-8 rounded-3xl'
          style={{
            scrollbarWidth: 'none',
            scrollBehavior: 'auto',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {triplefaces.map((face, index) => (
            <div
              key={index}
              className='flex-shrink-0 w-48 p-4 rounded-lg shadow-md dark:bg-neutral-500/10'
            >
              <div className='relative'>
                <Image
                  src={face.src}
                  alt={`Face ${(index % mockFaces.length) + 1}`}
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
        <div className='absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black/20 via-black/10 to-transparent pointer-events-none backdrop-blur-[2px]'></div>
        <div className='absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-black/20 via-black/10 to-transparent pointer-events-none backdrop-blur-[2px]'></div>
      </motion.div>
    </section>
  );
}
