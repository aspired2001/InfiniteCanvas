import { drawEllipse } from "../elements/ellipse";
import { drawImage } from "../elements/image";
import { drawLine } from "../elements/line";
import { drawPath } from "../elements/path";
import { drawRect } from "../elements/rect";
import { drawText } from "../elements/text";
import { AllShape } from "../types/shapeTypes";

const updateCanvas = (ctx: CanvasRenderingContext2D, elements: AllShape[]) => {
  elements.forEach((element) => {
    switch (element.type) {
      case "rect":
        drawRect(ctx, element);
        break;
      case "ellipse":
        drawEllipse(ctx, element);
        break;
      case "line":
        drawLine(ctx, element);
        break;
      case "arrow":
        //drawArrow(ctx,element)
        break;
      case "image":
        drawImage(ctx, element);
        break;
      case "text":
        drawText(ctx, element);
        break;
      case "pen":
        drawPath(ctx, element);
        break;
      default:
        break;
    }
  });
};

export { updateCanvas };
