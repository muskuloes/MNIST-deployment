const canvas = document.querySelector("#canvas");
canvas.width = 280;
canvas.height = 280;
const context = canvas.getContext("2d");
const canvastop = canvas.offsetTop;
let lastx;
let lasty;
context.strokeStyle = "#c0392b";
context.lineCap = "round";
context.lineJoin = "round";
context.lineWidth = 5;
function dot(x, y) {
  context.beginPath();
  context.fillStyle = "#c0392b";
  context.arc(x, y, 1, 0, Math.PI * 2, true);
  context.fill();
  context.stroke();
  context.closePath();
}
function line(fromx, fromy, tox, toy) {
  context.beginPath();
  context.moveTo(fromx, fromy);
  context.lineTo(tox, toy);
  context.stroke();
  context.closePath();
}
canvas.ontouchstart = function (event) {
  event.preventDefault();
  lastx = event.touches[0].clientX;
  lasty = event.touches[0].clientY - canvastop;
  dot(lastx, lasty);
};
canvas.ontouchmove = function (event) {
  event.preventDefault();
  let newx = event.touches[0].clientX;
  let newy = event.touches[0].clientY - canvastop;
  line(lastx, lasty, newx, newy);
  lastx = newx;
  lasty = newy;
};
let Mouse = { x: 0, y: 0 };
let lastMouse = { x: 0, y: 0 };
context.fillStyle = "white";
context.fillRect(0, 0, canvas.width, canvas.height);
context.color = "#c0392b";
context.lineWidth = 10;
context.lineJoin = context.lineCap = "round";

canvas.addEventListener(
  "mousemove",
  function (e) {
    lastMouse.x = Mouse.x;
    lastMouse.y = Mouse.y;
    Mouse.x = e.pageX - this.offsetLeft;
    Mouse.y = e.pageY - this.offsetTop;
  },
  false
);
canvas.addEventListener(
  "mousedown",
  function (e) {
    canvas.addEventListener("mousemove", onPaint, false);
  },
  false
);
canvas.addEventListener(
  "mouseup",
  function () {
    canvas.removeEventListener("mousemove", onPaint, false);
  },
  false
);
const onPaint = function () {
  context.lineWidth = context.lineWidth;
  context.lineJoin = "round";
  context.lineCap = "round";
  context.strokeStyle = context.color;
  context.beginPath();
  context.moveTo(lastMouse.x, lastMouse.y);
  context.lineTo(Mouse.x, Mouse.y);
  context.closePath();
  context.stroke();
};

const clearButton = document.querySelector("#clear");
clearButton.addEventListener("click", function () {
  context.clearRect(0, 0, canvas.width, canvas.height);
});
