import createCanvas from "./canvas.js";

import * as tf from "@tensorflow/tfjs";
// const tf = require("@tensorflow/tfjs");

const model = await tf.loadLayersModel("./model/model.json"); // model.json is copied to the dist directory by webpack

const canvas = document.querySelector("#canvas");
const canvas2 = document.querySelector("#canvas2");
const context = canvas.getContext("2d");

createCanvas(canvas, canvas2, context);

const predictButton = document.querySelector("#predict");
const predictionText = document.querySelector("#prediction");
predictionText.hidden = true;

predictButton.addEventListener("click", function () {
  const img = context.getImageData(0, 0, canvas.width, canvas.height);
  // Read image from HTML canvas Converts the 280x280x1 image into a 1x280x280x1 image
  // then normalizes data (divides by 255)
  let image = tf.browser.fromPixels(img, 1).toFloat().expandDims(0).div(255);
  let feature = tf.image.resizeBilinear(image, [28, 28]);

  const preds = model.predict(feature);
  const { _, indices } = tf.topk(preds.as1D());
  feature = feature.reshape([28, 28, 1]);
  tf.browser.toPixels(feature, canvas2);
  predictionText.hidden = false;
  predictionText.textContent = `This is probably a ${Array.from(
    indices.dataSync()
  )}`;
});

const clearButton = document.querySelector("#clear");
clearButton.addEventListener("click", function () {
  context.clearRect(0, 0, canvas.width, canvas.height);
  console.clear();
  predictionText.hidden = true;
});
