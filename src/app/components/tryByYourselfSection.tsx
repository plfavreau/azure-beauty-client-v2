import { DownArrow } from '@/app/components/iconsComponents/DownArrow';
import { motion } from 'framer-motion';

export default function TryByYourselfSection() {
  const handleScrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth',
    });
  };
  return (
    <motion.div
      className='flex flex-col items-center w-full mb-12'
      initial={{
        opacity: 0,
        y: -42,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 1,
        delay: 1,
        bounce: 0.5,
      }}
    >
      <div className='text-lg font-bold mb-3'>✨ Try it by yourself! ✨</div>
      <div
        className='hover:bg-gray-100 hover:dark:bg-neutral-600/40 rounded-3xl p-2 cursor-pointer flex justify-center w-fit'
        onClick={handleScrollToBottom}
      >
        <DownArrow />
      </div>
    </motion.div>
  );
}
