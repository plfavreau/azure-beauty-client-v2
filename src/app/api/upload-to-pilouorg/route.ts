// pages/api/upload-to-pilouorg.js
import formidable from 'formidable';
import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import fetch from 'node-fetch';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return new NextResponse(null, {
      status: 405,
      statusText: 'Method not allowed',
    });
  }

  // dispaly the content type of req.body

  try {
    const response = await fetch(
      'https://www.pilou.org/azure_beauty_project/upload/',
      {
        method: 'POST',
        body: req.body,
      },
    );

    // Check the details of the response
    if (!response.ok) {
      console.error(response);
      throw new Error(`Error uploading image: ${response.statusText}`);
    }

    return new NextResponse(
      JSON.stringify({ message: 'Image uploaded to pilou.org' }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        message: 'Failed to upload image to pilou.org',
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
