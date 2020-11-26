// from https://towardsdatascience.com/deploying-your-first-deep-learning-model-mnist-in-production-environment-510bfdc4808d
export default function createCanvas(canvas, canvas2, context) {
  const canvastop = canvas.offsetTop;
  canvas.width = 280;
  canvas.height = 280;
  canvas2.width = 28;
  canvas2.height = 28;
  let lastx;
  let lasty;
  context.lineCap = "round";
  context.lineJoin = "round";
  context.lineWidth = 20;

  function dot(x, y) {
    context.beginPath();
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
  context.color = "#FF0000";
  context.lineJoin = context.lineCap = "round";

  const onPaint = function () {
    context.lineJoin = "round";
    context.lineCap = "round";
    context.strokeStyle = context.color;
    context.beginPath();
    context.moveTo(lastMouse.x, lastMouse.y);
    context.lineTo(Mouse.x, Mouse.y);
    context.closePath();
    context.stroke();
  };

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
    function () {
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
}
