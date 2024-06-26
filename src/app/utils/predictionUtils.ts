import { PredictionResponse } from '@/app/types/predictions';

export function getRatingFromPrediction(
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
  // tofixedd
  return finalRating.toFixed(2) as unknown as number;
}
