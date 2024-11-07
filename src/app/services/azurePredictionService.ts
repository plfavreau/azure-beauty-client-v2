import { PredictionResponse } from '../types/predictions';

export async function makePrediction(
  image: string,
): Promise<PredictionResponse | undefined> {
  const base64Response = await fetch(image);
  const blob = await base64Response.blob();

  const myHeaders = new Headers();
  myHeaders.append('Prediction-Key', '82986cc31c4240fa80e465989c9d6b1a');

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: blob,
  };

  try {
    const response = await fetch(
      'https://westeurope.api.cognitive.microsoft.com/customvision/v3.0/Prediction/7fbdba80-ee26-49f8-b456-b40f5263a62f/classify/iterations/Iteration1/image',
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
