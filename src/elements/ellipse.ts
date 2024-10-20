import { Ellipse } from "../types/shapeTypes";

function drawEllipse(ctx: CanvasRenderingContext2D, ellipse: Ellipse) {
  ctx.save();
  const { posX, posY, radiusX, radiusY, innerText, textAlign, rotation } =
    ellipse;

  //opacity
  ctx.globalAlpha = ellipse.opacity / 100;

  //fillOptions
  ctx.fillStyle = ellipse.fillColor;

  //Stroke style
  let strokeStyle: number[];
  switch (ellipse.strokeStyle) {
    case "dotted":
      strokeStyle = [3, 10];
      break;
    case "dashed":
      strokeStyle = [15, 15];
      break;
    default:
      strokeStyle = [];
      break;
  }
  ctx.setLineDash(strokeStyle);
  //Stroke Color
  ctx.strokeStyle = ellipse.strokeColor;

  //Line Width
  ctx.lineWidth = ellipse.strokeWidth;

  ctx.beginPath();
  ctx.ellipse(
    posX,
    posY,
    radiusX,
    radiusY,
    (Math.PI / 180) * -rotation,
    0,
    Math.PI * 2
  );
  ctx.fill();
  ctx.stroke();

  //Inner Text Style
  ctx.textAlign = ellipse.textAlign || "center";
  let font;
  let fontSize;

  switch (ellipse.fontSize) {
    case 12:
      fontSize = 12;
      break;
    case 16:
      fontSize = 16;
      break;
    case 20:
      fontSize = 20;
      break;
    default:
      fontSize = 24;
      break;
  }

  switch (ellipse.fontFamily) {
    case "code":
      font = `${fontSize}px Courier New`;
      break;
    case "paint":
      font = `${fontSize}px Brush Script MT`;
      break;
    default:
      font = `${fontSize}px Arial`;
      break;
  }

  ctx.textAlign = textAlign;
  ctx.textBaseline = "middle";
  ctx.font = font;

  // Add text in the middle
  if (innerText) {
    ctx.fillStyle = "black"; // You can change the color here
    ctx.fillText(innerText, posX, posY);
  }

  ctx.restore();
}

function isPointInsideRotatedEllipse(
  event: MouseEvent,
  canvas: HTMLCanvasElement,
  scale: number,
  pan: { x: number; y: number },
  shape: Ellipse
) {
  const { posX, posY, radiusX, radiusY, rotation } = shape;

  var mouseX =
    (event.clientX - canvas.getBoundingClientRect().left - pan.x) / scale;
  var mouseY =
    (event.clientY - canvas.getBoundingClientRect().top - pan.y) / scale;

  // Translate the point and ellipse to the origin
  const dx = mouseX - posX;
  const dy = mouseY - posY;

  // Rotate the point back by -rotation
  const cosAngle = Math.cos(-(Math.PI / 180) * -rotation);
  const sinAngle = Math.sin(-(Math.PI / 180) * -rotation);
  const xRotated = dx * cosAngle - dy * sinAngle;
  const yRotated = dx * sinAngle + dy * cosAngle;

  // Check if the point is inside the rotated ellipse equation
  const isInside =
    (xRotated * xRotated) / (radiusX * radiusX) +
      (yRotated * yRotated) / (radiusY * radiusY) <=
    1;

  return isInside;
}

export { drawEllipse, isPointInsideRotatedEllipse };
