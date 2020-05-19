import "./canvas.js";

import * as tf from "@tensorflow/tfjs";

const model = await tf.loadLayersModel("./model/model.json"); // model.json is copied to the dist directory by webpack

const canvas = document.querySelector("#canvas");
const context = canvas.getContext("2d");

const predictButton = document.querySelector("#predict");

predictButton.addEventListener("click", function () {
  const img = context.getImageData(0, 0, canvas.width, canvas.height);
  let image = tf.browser
    .fromPixels(img, 3)
    .mean(2)
    .toFloat()
    .expandDims(0)
    .expandDims(-1);
  console.log(image.print());
  let feature = tf.image.resizeBilinear(image, [28, 28]);
  const prediction = model.predict(feature);
  console.log(prediction.print());
  // let test = tf.tensor(Object.values(three)).expandDims(0).expandDims(-1);
  // console.log(test.shape);
});
