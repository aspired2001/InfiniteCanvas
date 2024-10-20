import { Img } from "../types/shapeTypes";

export function drawImage(ctx: CanvasRenderingContext2D, image: Img) {
  const {
    posX,
    posY,
    rotation,
    opacity,
    width,
    height,
    src,
    strokeColor,
    strokeWidth,
    strokeStyle,
  } = image;

  ctx.save();
  ctx.rotate((Math.PI / 180) * rotation);
  //opacity
  ctx.globalAlpha = opacity / 100;
  //Stroke style
  let strokeType: number[];
  switch (strokeStyle) {
    case "dotted":
      strokeType = [3, 10];
      break;
    case "dashed":
      strokeType = [15, 15];
      break;
    default:
      strokeType = [];
      break;
  }
  ctx.setLineDash(strokeType);
  //Stroke Color
  ctx.strokeStyle = strokeColor;
  ctx.strokeRect(posX, posY, width, height);
  //Line Width
  ctx.lineWidth = strokeWidth;
  ctx.drawImage(src, posX, posY, width, height);

  ctx.restore();
}

export function isMouseInsideImage(
  event: MouseEvent,
  canvas: HTMLCanvasElement,
  scale: number,
  pan: { x: number; y: number },
  { posX, posY, width, height }: Img
): boolean {
  var mouseX =
    (event.clientX - canvas.getBoundingClientRect().left - pan.x) / scale;
  var mouseY =
    (event.clientY - canvas.getBoundingClientRect().top - pan.y) / scale;

  // Check if mouse coordinates are inside rectangle bounds
  const isInside =
    mouseX >= posX &&
    mouseX <= posX + width &&
    mouseY >= posY &&
    mouseY <= posY + height;

  return isInside;
}
