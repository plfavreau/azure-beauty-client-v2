import { PredictionResponse } from '../types/predictions';

export async function makePrediction(
  image: string,
): Promise<PredictionResponse | undefined> {
  const base64Response = await fetch(image);
  const blob = await base64Response.blob();
  const url = 'http://localhost:8080/image'


  const requestOptions = {
    method: 'POST',
    body: blob,
  };

  try {
    const response = await fetch(
      url,
      requestOptions,
    );

    if (!response.ok) {
      return undefined;
    }

    const predictionResponse: PredictionResponse = await response.json();
    return predictionResponse;
  } catch (error) {
    return undefined;
  }
}
