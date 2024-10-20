export type AnyIndividualProperty =
  | { fillColor: Background }
  | { fillStyle: FillStyle }
  | { strokeColor: StrokeColor }
  | { strokeWidth: StrokeWidth }
  | { strokeStyle: StrokeStyle }
  | { edgeStyle: EdgeStyle }
  | { fontSize: FontSize }
  | { fontFamily: FontFamily }
  | { textAlign: TextAlign }
  | { opacity: Opacity }
  | { arrowHeadRight: ArrowHeadRight }
  | { arrowHeadLeft: ArrowHeadLeft };
export type StrokeColor = "black" | "red" | "purple" | "blue" | "orange";
export type Background =
  | "transparent"
  | "#bbf7d0" //green
  | "#fef08a" //yellow
  | "#bfdbfe" //blue
  | "#fecaca"; //pink
export type FillStyle = "solid" | "hachure";
export type StrokeWidth = 1 | 3 | 6;
export type StrokeStyle = "solid" | "dashed" | "dotted";
export type EdgeStyle = "sharp" | "rounded";
export type FontSize = 12 | 16 | 20 | 24;
export type FontFamily = "normal" | "paint" | "code";
export type TextAlign = "left" | "center" | "right";
export type Opacity = number;
export type ArrowHeadRight = "arrow";
export type ArrowHeadLeft = "arrow";
export type arrangeLayerAction = "toBack" | 'toFront' | "forward" | "backward";


export type GlobalProperties = {
  fillStyle: FillStyle;
  strokeWidth: StrokeWidth;
  strokeStyle: StrokeStyle;
  strokeColor: StrokeColor;
  edgeStyle: EdgeStyle;
  fontSize: FontSize;
  fontFamily: FontFamily;
  textAlign: TextAlign;
  opacity: Opacity;
  arrowHeadLeft: ArrowHeadLeft;
  arrowHeadRight: ArrowHeadRight;
  fillColor: Background;
};
