import { Line } from "../types/shapeTypes";
import { Pan } from "../types/stateTypes";

function drawLine(ctx: CanvasRenderingContext2D, line: Line) {
  const { posX, posY, length, rotation } = line;

  ctx.save();
  //opacity
  ctx.globalAlpha = line.opacity / 100;

  //Stroke style
  let strokeStyle: number[];
  switch (line.strokeStyle) {
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
  ctx.strokeStyle = line.strokeColor;
  //Line Width
  ctx.lineWidth = line.strokeWidth;

  const angleInRadians = rotation;

  // Calculate the end point (x, y)
  const endX = posX + length * Math.cos(angleInRadians);
  const endY = posY + length * Math.sin(angleInRadians);

  ctx.beginPath(); // Start a new path
  ctx.moveTo(posX, posY); // Move the pen to (30, 50)
  ctx.lineTo(endX, endY); // Draw a line to (150, 100)
  ctx.stroke(); // Render the path
  ctx.closePath();

  // Add text in the middle
  ctx.restore();
}

function isPointOnLine(
  event: MouseEvent,
  canvas: HTMLCanvasElement,
  scale: number,
  pan: Pan,
  shape: Line
) {
  const { posX, posY, length, rotation } = shape;

  const angleInRadians = rotation;

  // Calculate the end point (x, y)
  const endX = posX + length * Math.cos(angleInRadians);
  const endY = posY + length * Math.sin(angleInRadians);

  // Calculate distance from the point to the two ends of the line
  var mouseX =
    (event.clientX - canvas.getBoundingClientRect().left - pan.x) / scale;
  var mouseY =
    (event.clientY - canvas.getBoundingClientRect().top - pan.y) / scale;

  const d1 = distance(mouseX, mouseY, posX, posY);
  const d2 = distance(mouseX, mouseY, endX, endY);
  // Calculate the length of the line
  const lineLength = distance(posX, posY, endX, endY);
  // Check if the sum of the distances is approximately equal to the length of the line
  return d1 + d2 >= lineLength - 0.5 && d1 + d2 <= lineLength + 0.5;
}

// Function to calculate distance between two points
function distance(x1: number, y1: number, x2: number, y2: number) {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

export { drawLine, isPointOnLine };
