import { useState } from 'react';

export function DownArrow() {
  return (
    <div className={`svg-container`}>
      <svg
        className={`w-10 h-10 mx-auto`}
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='2'
          d='M19 9l-7 7-7-7'
        ></path>
      </svg>
    </div>
  );
}
