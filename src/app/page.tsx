'use client';

import { Cross2Icon } from '@radix-ui/react-icons';
import { motion } from 'framer-motion';
import { Inter } from 'next/font/google';
import Image from 'next/image';
import { useState } from 'react';
import { DownArrow } from './components/iconsComponents/DownArrow';
import MagicWandIcon from './components/iconsComponents/MagicWand';
import { mockFaces } from './assets/data/mockFaces';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [rating, setRating] = useState<number | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setRating(null); // Reset rating when a new image is uploaded
      };
      reader.readAsDataURL(file);
    }
  };

  const deleteImage = () => {
    setSelectedImage(null);
    setRating(null);
  };

  const analyzeImage = () => {
    // Simulate an ML prediction
    const randomRating = Math.floor(Math.random() * 5) + 1;
    setRating(randomRating);
  };

  const getRatingMessage = (rating: number | null) => {
    if (rating === null) return '';
    const messages = [
      '😢 Oh no! Better luck next time.',
      '😐 Meh, not bad, not great.',
      "😊 Nice! You're pretty good.",
      '😎 Awesome! Almost perfect.',
      "🤩 Wow! You're a superstar!",
    ];
    return messages[rating - 1];
  };

  return (
    <main
      className={`flex flex-col items-center min-h-screen p-24 ${inter.className}`}
    >
      {/* Logo Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
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

      {/* Title and Catchlines Section */}
      <section className='text-center mb-12'>
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className='text-5xl font-bold mb-4'
        >
          Azure Beauty Reveal
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className='text-lg mb-8'
        >
          Do you really need surgery ?
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className='text-lg font-semibold'
        >
          Join the <strong>thousands</strong> of satisfied users...
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className='mt-6'
        ></motion.div>
      </section>

      {/* Carousel Section */}
      <section className='w-full mb-12'>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
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

      <motion.div
        className='flex flex-col items-center w-full mb-12'
        initial={{ opacity: 0, y: -42 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1, bounce: 0.5 }}
      >
        <div className='text-lg font-bold mb-3'>✨ Try it by yourself! ✨</div>
        <div
          className='hover:bg-gray-100 hover:dark:bg-neutral-600/40 rounded-3xl p-2 cursor-pointer flex justify-center w-fit'
          onClick={() => {
            // scroll to the bottom of the page
            window.scrollTo({
              top: document.body.scrollHeight,
              behavior: 'smooth',
            });
          }}
        >
          <DownArrow />
        </div>
      </motion.div>

      {/* Spacer Section to force scroll */}
      <section className='h-64'></section>

      {/* Tool Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className='flex w-full flex-col items-center rounded-2xl mt-4 p-4 lg:items-start lg:flex-row border-neutral-700 bg-gray-100 dark:bg-neutral-800/30'
      >
        <div className='group rounded-lg border border-transparent px-5 py-4 transition-colors mb-10 lg:mb-0 lg:mr-10'>
          <h2 className='mb-3 text-2xl font-semibold'>Upload Image</h2>
          {!selectedImage && (
            <label className='block mb-3'>
              <span className='sr-only'>Choose File</span>
              <input
                type='file'
                accept='image/*'
                onChange={handleImageUpload}
                className='block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100'
              />
            </label>
          )}
          {selectedImage && (
            <div className='relative inline-block'>
              <Image
                src={selectedImage}
                alt='Uploaded Image'
                width={200}
                height={200}
                className='rounded-lg'
              />
              <button
                onClick={deleteImage}
                className='absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-75 hover:opacity-100 shadow-black shadow-xl m-1'
              >
                <Cross2Icon />
              </button>
              <button
                onClick={analyzeImage}
                className='mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
              >
                Analyze
                <div className='pl-2'>
                  <MagicWandIcon />
                </div>
              </button>
            </div>
          )}
        </div>

        {rating !== null && (
          <div className='group rounded-lg border border-transparent px-5 py-4 transition-colors hover:bg-gray-100  hover:dark:bg-neutral-800/30'>
            <h2 className='mb-3 text-2xl font-semibold'>Rating</h2>
            <div className='mt-4 text-xl font-bold'>
              Rating: {rating} out of 5
              <p className='text-lg mt-2'>{getRatingMessage(rating)}</p>
            </div>
          </div>
        )}
      </motion.section>
    </main>
  );
}
