// pages/api/fetch-image.js

import { NextResponse } from 'next/server';

const FACES_GENERATOR_URL = 'https://thispersondoesnotexist.com';

export async function GET() {
  try {
    const urlWithCacheBusting = `${FACES_GENERATOR_URL}?${new Date().getTime()}`;
    const response = await fetch(urlWithCacheBusting, {
      headers: {
        accept: 'image/webp,image/apng,image/*,*/*;q=0.8',
      },
    });
    if (!response.ok) {
      throw new Error(`Error fetching image: ${response.statusText}`);
    }

    // Convert response to arrayBuffer
    const arrayBuffer = await response.arrayBuffer();

    // Convert arrayBuffer to base64
    const base64Image = Buffer.from(arrayBuffer).toString('base64');

    // Respond with base64 image data
    return new NextResponse(
      JSON.stringify({ image: `data:image/jpeg;base64,${base64Image}` }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  } catch (error) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({
        message: 'Failed to fetch image',
        error: JSON.stringify(error),
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  }
}
