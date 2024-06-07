'use client';

import {
  Cross2Icon,
  DoubleArrowRightIcon,
  SymbolIcon,
} from '@radix-ui/react-icons';
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
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

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

  const analyzeImage = async () => {
    // Simulate an ML prediction
    const randomRating = Math.floor(Math.random() * 5) + 1;
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

      <section className='h-28'></section>

      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
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

        {/* {rating !== null && (
          <div className='group rounded-lg border border-transparent px-5 py-4 transition-colors hover:bg-gray-100  hover:dark:bg-neutral-800/30'>
            <h2 className='mb-3 text-2xl font-semibold'>Rating</h2>
            <div className='mt-4 text-xl font-bold'>
              Rating: {rating} out of 5
              <p className='text-lg mt-2'>{getRatingMessage(rating)}</p>
            </div>
          </div>
        )} */}
      </motion.section>
    </main>
  );
}
// {
//     "id": "70604ad6-8db4-44a9-b1b8-e24f67c6cfda",
//     "project": "eaec1732-b7f7-462b-baf8-46d9ba7aedc2",
//     "iteration": "f2bd2ea7-fe7c-41cf-8fbf-a3d06bad44f7",
//     "created": "2024-06-07T13:27:56.131Z",
//     "predictions": [
//         {
//             "probability": 0.9201728,
//             "tagId": "ee4a294a-711a-47ca-bc2c-2a3b40b8ff2c",
//             "tagName": "3"
//         },
//         {
//             "probability": 0.05030095,
//             "tagId": "585dc096-2db1-4698-bbb1-393b4eec1a73",
//             "tagName": "4"
//         },
//         {
//             "probability": 0.029526105,
//             "tagId": "269d7c4f-b596-49d3-a988-74751e7ac598",
//             "tagName": "2"
//         },
//         {
//             "probability": 5.7301055E-08,
//             "tagId": "94de266d-6af0-4584-9b0c-69f4d7ef7571",
//             "tagName": "1"
//         },
//         {
//             "probability": 4.3157595E-08,
//             "tagId": "3054fead-006b-41ee-9bc8-ec637457ef15",
//             "tagName": "5"
//         }
//     ]
// }
interface PredictionResponse {
  id: string;
  project: string;
  iteration: string;
  created: string;
  predictions: Prediction[];
}

interface Prediction {
  probability: number;
  tagId: string;
  tagName: string;
}

async function makePrediction(
  image: string,
): Promise<PredictionResponse | undefined> {
  // Convert Base64 image to Blob
  const base64Response = await fetch(image);
  const blob = await base64Response.blob();

  const myHeaders = new Headers();
  myHeaders.append('Prediction-Key', 'fec306f015044fde8a6c87b9a5adbbc7');

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: blob,
  };

  try {
    const response = await fetch(
      'https://projetazureprediction.cognitiveservices.azure.com/customvision/v3.0/Prediction/eaec1732-b7f7-462b-baf8-46d9ba7aedc2/classify/iterations/Iteration1/image',
      requestOptions,
    );

    if (!response.ok) {
      alert(`An error occurred: ${response.statusText}`);
      return undefined;
    }

    const predictionResponse: PredictionResponse = await response.json();
    return predictionResponse;
  } catch (error) {
    alert('An error occurred while making the prediction');
    return undefined;
  }
}

function getRatingFromPrediction(
  predictionResponse: PredictionResponse,
): number {
  const finalRating: number = predictionResponse.predictions.reduce(
    (acc, prediction) => {
      const tagName = parseInt(prediction.tagName);
      return acc + prediction.probability * tagName;
    },
    0,
  );
  console.log('finalRating', finalRating);
  return Math.round(finalRating * 100) / 100;
}
