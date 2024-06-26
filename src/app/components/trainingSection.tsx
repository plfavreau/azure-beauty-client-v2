import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function TrainingSection() {
  const [currentFaceToRate, setCurrentFaceToRate] = useState<string | null>(
    null,
  );

  useEffect(() => {
    handleRateClick(undefined);
  }, []);
  const handleRateClick = async (rating: number | undefined) => {
    try {
      setCurrentFaceToRate(null);

      if (rating && currentFaceToRate) {
        const base64Response = await fetch(currentFaceToRate);
        const blob = await base64Response.blob();
        const formData = new FormData();
        const fileUuid = uuidv4();
        const fileName = `${rating}_${fileUuid}.jpg`;

        formData.append('file', blob, fileName);
        formData.append('fileName', fileName);
        const uploadResponse = await fetch(
          'https://www.pilou.org/azure_beauty_project/upload/',
          {
            method: 'POST',
            body: formData,
          },
        );

        if (uploadResponse.ok) {
          console.log('Image uploaded successfully');
        } else {
          alert('Failed to upload image :/');
        }
      }

      const response = await fetch('/api/fetch-random-face');
      const data = await response.json();
      if (response.ok) {
        setCurrentFaceToRate(data.image);
      } else {
        setCurrentFaceToRate(null);
        console.error('Failed to fetch image:', data.message);
      }
      if (!rating) return;
    } catch (error) {
      alert('Failed to process the request :/ : ' + JSON.stringify(error));
    }
  };
  return (
    <motion.section
      initial={{
        opacity: 0,
      }}
      whileInView={{
        opacity: 1,
      }}
      transition={{
        duration: 1,
      }}
      className='flex w-full flex-col items-center border justify-around rounded-2xl mt-4 p-4 lg:items-start lg:flex-row border-neutral-700 bg-gray-100 dark:bg-neutral-800/30'
    >
      <div className='group rounded-lg border border-transparent px-5 py-4 transition-colors mb-10 lg:mb-0 lg:mr-10'>
        <h2 className='mb-3 text-2xl font-semibold'>
          Contribute to the model training
        </h2>
        <div className='flex flex-col items-center justify-between space-y-8'>
          {currentFaceToRate ? (
            <div>
              <Image
                className='rounded-3xl'
                src={currentFaceToRate}
                alt='Fetched face rating'
                width={256}
                height={256}
                priority
              />
            </div>
          ) : (
            <div className='py-8 flex items-center font-semibold h-64 text-xl animate-pulse'>
              Loading ...
            </div>
          )}
          <div
            className={`flex space-x-5 ${!currentFaceToRate && 'pointer-events-none opacity-30'}`}
          >
            {Array.from([1, 2, 3, 4, 5]).map(i => (
              <button
                key={i}
                onClick={() => handleRateClick(i)}
                className='px-4 py-2 hover:bg-blue-500 border border-gray-500 text-white rounded-lg'
              >
                {i}
              </button>
            ))}
            <button
              onClick={() => handleRateClick(undefined)}
              className='rounded-lg border hover:bg-slate-400/30 border-gray-500 p-2'
            >
              Skip
            </button>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
