import { Pen } from "../types/shapeTypes";
import {Pan} from "../types/stateTypes";

function drawPath(ctx: CanvasRenderingContext2D, pen:Pen) {
  const { points } = pen;

  ctx.save();
  //opacity
  ctx.globalAlpha = pen.opacity / 100;

  //Stroke style
  let strokeStyle: number[];
  switch (pen.strokeStyle) {
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
  ctx.lineCap ="round";
  //Stroke Color
  ctx.strokeStyle = pen.strokeColor;
  //Line Width
  ctx.lineWidth = pen.strokeWidth;


  ctx.beginPath(); // Start a new path
  ctx.moveTo(points[0].x, points[0].y); // Move to the first point

  // Iterate through the points and draw lines
  for (let i = 1; i < points.length - 1; i++) {
    const xc = (points[i].x + points[i + 1].x) / 2;
    const yc = (points[i].y + points[i + 1].y) / 2;
    ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
}
ctx.quadraticCurveTo(
    points[points.length - 1].x,
    points[points.length - 1].y,
    points[points.length - 1].x,
    points[points.length - 1].y
);

  ctx.stroke(); // Outline the path
  ctx.closePath();
  // Add text in the middle
  ctx.restore();
}


function calculateDistance(x1:number, y1:number, x2:number, y2:number) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function isPointOnPath(event:MouseEvent, canvas:HTMLCanvasElement,scale: number, pan:Pan,shape:Pen){

  const {  points, strokeWidth    } = shape;
let tolerance = 10 * strokeWidth / 2; //in pixel;

  var mouseX =
    (event.clientX - canvas.getBoundingClientRect().left - pan.x) / scale;
  var mouseY =
    (event.clientY - canvas.getBoundingClientRect().top - pan.y) / scale;

            console.log('this ran but waiting for confirmation!')
 for (let i = 0; i < points.length; i++) {
        let point = points[i];
        let distance = calculateDistance(mouseX, mouseY, point.x, point.y);

        if (distance <= tolerance) {
            console.log('this ran when condition was true');
            return true; // The mouse is near this point on the path
        }
    }
    return false; 
}
export { drawPath, isPointOnPath};
