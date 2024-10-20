import {
  StrokeWidth,
  Opacity,
  Background,
  EdgeStyle,
  FontSize,
  FontFamily,
  TextAlign,
  FillStyle,
  StrokeStyle,
  ArrowHeadRight,
  ArrowHeadLeft,
} from "./propertiesTypes";

export interface Shape {
  id: string; //nanoid
  type:
    | "rect"
    | "line"
    | "ellipse"
    | "diamond"
    | "arrow"
    | "image"
    | "pen"
    | "text";
  posX: number;
  posY: number;
  strokeColor: string;
  strokeWidth: StrokeWidth;
  rotation: number;
  opacity: Opacity;
  strokeStyle: StrokeStyle;
  isTextEditing: Boolean;
}

export interface Polygon extends Shape {
  fillColor: Background;
  innerText: string;
  edgeStyle: EdgeStyle;
  fontSize: FontSize;
  fontFamily: FontFamily;
  textAlign: TextAlign;
  fillStyle: FillStyle;
  strokeStyle: StrokeStyle;
}

export interface Rect extends Polygon {
  type: "rect";
  height: number;
  width: number;
}

export interface Ellipse extends Polygon {
  type: "ellipse";
  radiusX: number;
  radiusY: number;
}

export interface Diamond extends Polygon {
  type: "diamond";
  radius: number; // radius of the circle
  edgeStyle: EdgeStyle;
}

export interface Line extends Shape {
  type: "line";
  length: number;
  middlePoint: number;
  strokeStyle: StrokeStyle;
}

export interface Arrow extends Shape {
  type: "arrow";
  endX: number;
  endY: number;
  middlePoint: number;
  innerText: string;
  arrowHeadRight: ArrowHeadRight;
  arrowHeadLeft: ArrowHeadLeft;
  fontSize: FontSize;
  fontFamily: FontFamily;
}

export interface Img extends Omit<Shape, "isTextEditing"> {
  type: "image";
  src: ImageBitmap;
  width: number;
  height: number;
}

export interface Pen extends Shape {
  type: "pen";
  points: { x: number; y: number }[];
}

export interface Text extends Shape {
  textAlign: TextAlign;
  fontSize: FontSize;
  fontFamily: FontFamily;
  type: "text";
  innerText: string;
}

export type AllShape = Arrow | Line | Rect | Ellipse | Img | Pen | Text;
