import { getFontDisplayProperties } from "./text";

function drawHandler(ctx: CanvasRenderingContext2D, element: any) {
  let { points, type, width, height, posX, posY, rotation } = element;

  const handleSize = 6;

  if (type == "rect" || type == "image") {
    width = element.width;
    height = element.height;
    posX = element.posX;
    posY = element.posY;
  }

  if (type == "pen"){

    // points from the origin;  
    let highestPoint  :{x:number,y:number}= points[0];
    let lowestpoint  :{x:number,y:number}= points[0];
    let farthestPoint :{x:number,y:number}= points[0];
    let nearestPoint:{x:number,y:number}= points[0];
    
    points.forEach((point:{x:number,y:number}) => {
        if(point.y > highestPoint.y)highestPoint = point; 
        if(point.y < lowestpoint.y)lowestpoint = point; 
        if(point.x > farthestPoint.x)farthestPoint = point; 
        if(point.x < nearestPoint.x) nearestPoint = point; 
    });


    width = (farthestPoint.x - nearestPoint.x);
    height = (highestPoint.y - lowestpoint.y);
    posX = nearestPoint.x;
    posY = lowestpoint.y;
  }

  if (type == "ellipse") {
    const size = Math.max(element.radiusX, element.radiusY);
    height = size * 2;
    width = size * 2;
    posX = element.posX - size;
    posY = element.posY - size;
  }

  if (type == "text") {
    const font = getFontDisplayProperties(element);
    ctx.save();
    ctx.font = font;
    width = ctx.measureText(element.innerText).width;
    height = parseInt(ctx.font);
    posX = element.posX - width / 2;
    posY = element.posY - height / 2;
    ctx.restore();
    rotation = 0;
  }

  if (type == "line") return;

  ctx.save();
  //handle
  ctx.rotate(rotation);
  ctx.strokeStyle = "#rgb(56, 56, 174)";
  ctx.lineWidth = 0.3;
  ctx.strokeRect(posX - 3, posY - 3, width + 6, height + 6);

  ctx.fillStyle = "blue";

  //top left
  ctx.fillRect(
    //
    posX - handleSize / 2 - 4,
    posY - handleSize / 2 - 4,
    handleSize,
    handleSize
  );

  //leftMiddle
  ctx.fillRect(
    posX - handleSize / 2 - 4,
    posY + height / 2 - 4,
    handleSize,
    handleSize
  );

  //top Middle
  ctx.fillRect(
    //
    posX + width / 2 - 3,
    posY - handleSize / 2 - 4,
    handleSize,
    handleSize
  );

  //rotation handler
  {
    ctx.beginPath();
    ctx.moveTo(posX + width / 2, posY - handleSize / 2);
    ctx.lineTo(posX + width / 2, posY - 30);
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.arc(posX + width / 2, posY - 30, 6, 0, 2 * Math.PI);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
  }

  ctx.fillStyle = "blue";
  //top right
  ctx.fillRect(
    posX + width - handleSize / 2 + 3,
    posY - handleSize / 2 - 4,
    handleSize,
    handleSize
  );

  //right mid
  ctx.fillRect(
    posX + width - handleSize / 2 + 3,
    posY + height / 2 - 4,
    handleSize,
    handleSize
  );

  //bottom right
  ctx.fillRect(
    posX + width - handleSize / 2 + 3,
    posY + height - handleSize / 2 + 3,
    handleSize,
    handleSize
  );

  //bottom left
  ctx.fillRect(
    posX - handleSize / 2 - 3,
    posY + height - handleSize / 2 + 3,
    handleSize,
    handleSize
  );

  //bottom mid
  ctx.fillRect(
    posX + width / 2 - 4,
    posY + height - handleSize / 2 + 3,
    handleSize,
    handleSize
  );

  ctx.restore();
}

function getHandleBar(shape: any) {
  return {
    posX: shape.posX,
    posY: shape.posY,
    width: shape.width,
    height: shape.height,
  };
}

export { drawHandler, getHandleBar };
