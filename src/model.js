import * as tf from "@tensorflow/tfjs";

export const model = async () => {
  return await tf.loadLayersModel("../model/model.json");
}
