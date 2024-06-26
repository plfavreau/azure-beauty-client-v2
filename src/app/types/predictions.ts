export interface PredictionResponse {
  id: string;
  project: string;
  iteration: string;
  created: string;
  predictions: Prediction[];
}

export interface Prediction {
  probability: number;
  tagId: string;
  tagName: string;
}
