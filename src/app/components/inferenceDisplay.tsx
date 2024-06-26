import MagicWandIcon from '@/app/components/iconsComponents/MagicWand';
import {
  Cross2Icon,
  DoubleArrowRightIcon,
  SymbolIcon,
} from '@radix-ui/react-icons';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import MagnifyingGlass from './magnifyingGlass';
import { getRatingFromPrediction } from '../utils/predictionUtils';
import { makePrediction } from '../services/azurePredictionService';

export default function InferenceDisplay() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [rating, setRating] = useState<number | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [magnifyingGlassVisible, setMagnifyingGlassVisible] =
    useState<boolean>(false);
  const [magnifyingGlassPosition, setMagnifyingGlassPosition] = useState<{
    left: number;
    top: number;
  }>({ left: 0, top: 0 });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setRating(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const deleteImage = () => {
    setSelectedImage(null);
    setRating(null);
  };

  const magnifyingGlassAnimation = async () => {
    const positions = [
      { left: 10, top: 10 },
      { left: 100, top: 100 },
      { left: 140, top: 40 },
      { left: 32, top: 115 },
      { left: 5, top: 85 },
    ];

    setMagnifyingGlassVisible(true);
    for (let i = 0; i < positions.length; i++) {
      setMagnifyingGlassPosition(positions[i]);
      await new Promise(resolve => setTimeout(resolve, 875));
    }
    setMagnifyingGlassVisible(false);
  };

  const analyzeImage = async () => {
    if (isProcessing) return;
    setIsProcessing(true);

    try {
      const [predictionResponse] = await Promise.all([
        makePrediction(selectedImage as string),
        magnifyingGlassAnimation(),
      ]);

      if (!predictionResponse) {
        setIsProcessing(false);
        return;
      }

      const rating = getRatingFromPrediction(predictionResponse);
      setRating(rating);
    } catch (error) {
      console.error('Error during image analysis:', error);
    } finally {
      setIsProcessing(false);
    }
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
      className='flex w-full flex-col items-center border justify-around rounded-2xl mt-4 p-4 lg:items-start lg:flex-row border-neutral-700 bg-gray-100 dark:bg-neutral-800/30 py-24'
    >
      <div className='group rounded-lg border border-transparent px-5 py-4 transition-colors mb-10 lg:mb-0 lg:mr-10'>
        {!selectedImage && (
          <>
            <h2 className='mb-3 text-2xl font-semibold'>Upload a face here!</h2>
            <label className='block mb-3'>
              <span className='sr-only'>Choose File</span>
              <input
                type='file'
                accept='image/*'
                onChange={handleImageUpload}
                className='block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100'
              />
            </label>
          </>
        )}
        {selectedImage && (
          <div className='flex flex-row items-center justify-center space-x-8'>
            <div className='relative inline-block'>
              <div className={`${isProcessing && 'opacity-40'}`}>
                <Image
                  src={selectedImage}
                  alt='Uploaded Image'
                  width={300}
                  height={300}
                  className={`rounded-lg ${isProcessing && 'animate-pulse'}`}
                />
              </div>
              <MagnifyingGlass
                visible={magnifyingGlassVisible}
                position={magnifyingGlassPosition}
                backgroundImage={selectedImage}
              />
              <button
                onClick={deleteImage}
                className='absolute top-0 right-0 bg-gray-400 text-white rounded-full w-5 h-5 flex items-center justify-center hover:bg-red-500 shadow-black shadow-xl m-1 p-0'
              >
                <Cross2Icon className='w-4 h-4' />
              </button>
            </div>
            <div className='flex flex-row items-center space-x-8'>
              <div className='pt-3'>
                <DoubleArrowRightIcon />
              </div>
              <button
                onClick={analyzeImage}
                className={`mt-4 inline-flex items-center h-12 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${isProcessing ? 'bg-gray-600 hover:bg-gray-700' : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'} focus:outline-none focus:ring-2 focus:ring-offset-2`}
              >
                {isProcessing ? 'Processing...' : 'Analyze Image'}
                <div className='pl-2'>
                  {!isProcessing ? (
                    <MagicWandIcon />
                  ) : (
                    <div className='animate-spin'>
                      <SymbolIcon />
                    </div>
                  )}
                </div>
              </button>
              {rating !== null && (
                <div
                  className={`flex space-x-8 justify-center items-center ${isProcessing && 'animate-pulse'}`}
                >
                  <div className='pt-3'>
                    <DoubleArrowRightIcon />
                  </div>
                  <div>
                    Rating: {rating} out of 5
                    <p className='text-lg mt-2'>{getRatingMessage(rating)}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </motion.section>
  );
}
