import { PredictionResponse } from '../types/predictions';

export async function makePrediction(
  image: string,
): Promise<PredictionResponse | undefined> {
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
      'https://projetazureprediction.cognitiveservices.azure.com/customvision/v3.0/Prediction/eaec1732-b7f7-462b-baf8-46d9ba7aedc2/classify/iterations/Iteration2/image',
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
