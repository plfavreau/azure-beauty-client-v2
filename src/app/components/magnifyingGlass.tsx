import React from 'react';
const DEFAULT_SCALE = 3;

export default function MagnifyingGlass({
  visible,
  position,
  backgroundImage,
}: {
  visible: boolean;
  position: { left: number; top: number };
  backgroundImage: string;
}) {
  const rotationsParams = [
    { rotation: 0, transformOrigin: '23% 2%' },
    { rotation: 25, transformOrigin: '16.5% 11%' },
    { rotation: 45, transformOrigin: '16.75% 18.5%' },
  ];

  const randomIndex = Math.floor(Math.random() * rotationsParams.length);
  const { rotation, transformOrigin } = rotationsParams[randomIndex];

  return (
    <div
      className={`absolute w-32 h-32 border-4 border-none rounded-full bg-no-repeat bg-contain bg-center ${visible ? 'transition-all' : `transition-none`} duration-500 ease-in-out ${visible ? 'opacity-100' : 'opacity-0'}`}
      style={{
        left: `${position.left}px`,
        top: `${position.top}px`,
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: '350px 350px',
        backgroundPosition: `${-position.left - 45}px ${-position.top - 45}px`,
      }}
    >
      <img
        className='absolute transition-all duration-500 ease-in-out'
        src='/magnifying-glass.svg'
        alt=''
        style={{
          transformOrigin: transformOrigin,
          transform: `scale(${DEFAULT_SCALE}) rotate(${rotation}deg)`,
        }}
      />
    </div>
  );
}
