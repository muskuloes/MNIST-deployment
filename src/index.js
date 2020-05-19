import "./canvas.js";
import { model } from "./model.js";

let modeljs = model();
modeljs.compile({
  optimizer: "adam",
  loss: "categoricalCrossentropy",
  metrics: ["accuracy"],
});
