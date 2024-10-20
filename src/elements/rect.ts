import { Rect } from "../types/shapeTypes";

function drawRect(ctx: CanvasRenderingContext2D, rect: Rect) {
  const {
    posX,
    posY,
    width,
    height,
    innerText,
    textAlign,
    fontSize,
    rotation,
  } = rect;

  ctx.save();
  // ctx.translate(posX + width / 2, posY + height / 2);
  ctx.rotate((Math.PI / 180) * rotation);
  const size = Math.sqrt(width * height);

  //opacity
  ctx.globalAlpha = rect.opacity / 100;

  //fillOptions
  ctx.fillStyle = rect.fillColor;

  //Stroke style
  let strokeStyle: number[];
  switch (rect.strokeStyle) {
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
  ctx.strokeStyle = rect.strokeColor;

  //Line Width
  ctx.lineWidth = rect.strokeWidth;

  const cornerRadius = 20; // Adjust this value for different corner roundness
  ctx.fillStyle = rect.fillColor;

  //square with sharp corners
  if (rect.edgeStyle == "sharp") {
    ctx.fillRect(posX, posY, width, height);
    ctx.strokeRect(posX, posY, width, height);
  }
  // square with rounded corners
  if (rect.edgeStyle == "rounded") {
    ctx.beginPath();
    ctx.roundRect(posX, posY, width, height, cornerRadius);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }

  //Inner Text Style
  ctx.textAlign = rect.textAlign;
  let font;

  switch (rect.fontFamily) {
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
  ctx.font = font;

  // Add text in the middle
  if (innerText) {
    ctx.fillStyle = "black"; // You can change the color here
    ctx.fillText(innerText, posX + width / 2, posY + height / 2, size);
  }
  ctx.restore();
}

function isMouseInsideRect(
  coord: { x: number; y: number },
  canvas: HTMLCanvasElement,
  { posX, posY, width, height }: Rect,
  scale: number,
  pan: { x: number; y: number }
): boolean {
  var mouseX = (coord.x - canvas.getBoundingClientRect().left - pan.x) / scale;
  var mouseY = (coord.y - canvas.getBoundingClientRect().top - pan.y) / scale;

  // Check if mouse coordinates are inside rectangle bounds
  const isInside =
    mouseX >= posX &&
    mouseX <= posX + width &&
    mouseY >= posY &&
    mouseY <= posY + height;

  return isInside;
}

export { drawRect, isMouseInsideRect };
