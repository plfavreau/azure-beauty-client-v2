import MagicWandIcon from '@/app/components/iconsComponents/MagicWand';
import {
  Cross2Icon,
  DoubleArrowRightIcon,
  SymbolIcon,
} from '@radix-ui/react-icons';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { makePrediction } from '@/app/services/azurePredictionService';
import { getRatingFromPrediction } from '@/app/utils/predictionUtils';
import { useState } from 'react';
export default function InferenceDisplay() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [rating, setRating] = useState<number | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

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

  const analyzeImage = async () => {
    setIsProcessing(true);
    const predictionResponse = await makePrediction(selectedImage as string);
    if (!predictionResponse) {
      setIsProcessing(false);
      return;
    }
    const rating = getRatingFromPrediction(predictionResponse);
    setIsProcessing(false);
    setRating(rating);
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
      className='flex w-full flex-col items-center border justify-around rounded-2xl mt-4 p-4 lg:items-start lg:flex-row border-neutral-700 bg-gray-100 dark:bg-neutral-800/30'
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
          <div className='flex flex-row items-center justify-center space-x-8'>
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
            </div>
            <div className='flex flex-row items-center space-x-8'>
              <div className='pt-3'>
                <DoubleArrowRightIcon />
              </div>
              <button
                onClick={analyzeImage}
                className='mt-4 inline-flex items-center h-12 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
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
                  className={`flex space-x-8 justify-center  items-center ${isProcessing && 'animate-pulse'}`}
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
