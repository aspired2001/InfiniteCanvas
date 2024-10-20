import { useSelector, useDispatch } from "react-redux";
import {
    arrangeLayer,
  changeActiveElementProperties,
  changeGlobalProperties,
  duplicateElement,
  removeElement,
} from "../features/canvasSlice";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  ArrowDown,
  ArrowDownToLine,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowUpToLine,
  Code,
  Copy,
  Link,
  Minus,
  Pen,
  Square,
  Trash2,
} from "lucide-react";

import RoundedCorner from "../assets/images/round-corner.png";
import hachure from "../assets/images/icons8-lines-100.png";

import {
  Background,
  FillStyle as FStyle,
  StrokeColor as SColor,
  StrokeWidth as SWidth,
  StrokeStyle as SStyle,
  EdgeStyle as EStyle,
  FontSize as FSize,
  FontFamily as FFamily,
  TextAlign as TAlign,
  Opacity as OOpacity,
  arrangeLayerAction,
} from "../types/propertiesTypes";
import { InitialState } from "../types/stateTypes";

type Props = {
  children: string | JSX.Element | JSX.Element[];
  clickHandler?: () => void;
};

export default function Properties() {
  const activeElement = useSelector(
    (state: InitialState) => state.activeElement
  );

  const isAnElementInFocus = activeElement.length > 0;
  let isPolygon;
  let hasInnerText;
  let isArrow;
  let isRect;

  if (isAnElementInFocus) {
    const elementType = activeElement[0].type;
    isPolygon = elementType == "rect" || elementType == "ellipse";
    isRect = elementType == "rect";
    if (elementType == "arrow") {
      hasInnerText = Boolean(activeElement[0].innerText);
    }
    if (elementType == "rect") {
      hasInnerText = Boolean(activeElement[0].innerText);
    }
    if (elementType == "ellipse") {
      hasInnerText = Boolean(activeElement[0].innerText);
    }
    if (elementType == "text") {
      hasInnerText = true;
    }
  }

  return (
    <div
      style={{
        scrollbarWidth: "thin",
        display: ` ${isAnElementInFocus ? "" : "none"}`,
      }}
      className={` flex flex-col mx-auto top-24 left-8 absolute text-sm max-h-[700px] min-h-5 rounded-md bg-white drop-shadow-md overflow-y-scroll 100 text-[12px] text-gray-700`}
    >
      {!activeElement ? null : (
        <>
          <StrokeColor />
          <StrokeStyle />
          <StrokeWidth />
          {isPolygon ? (
            <>
              <BackgroundColor />
              <FillStyle />
            </>
          ) : null}
          {isRect ? <EdgeStyle /> : null}
          {isArrow ? <ArrowHead /> : null}
          {hasInnerText ? (
            <>
              <FontSize />
              <FontFamily />
              <TextAlign />
            </>
          ) : null}
          <Opacity />
          <Layers />
          <Actions />
        </>
      )}
    </div>
  );
}

function StrokeColor() {
  const dispatch = useDispatch();
  function clickHandler(value: SColor) {
    dispatch(changeActiveElementProperties({ strokeColor: value }));
    dispatch(changeGlobalProperties({ strokeColor: value }));
  }
  return (
    <div className="w-full px-2 mb-2">
      <p className="py-1">Stroke Color</p>
      <div className="w-full flex gap-2 ">
        <div
          onClick={() => clickHandler("black")}
          className="w-7 h-7 hover:cursor-pointer bg-black flex  hover:border-solid hover:border-2 hover:border-black rounded-md"
        ></div>
        <div
          onClick={() => clickHandler("blue")}
          className="w-7 h-7 hover:cursor-pointer bg-blue-700 flex  hover:border-solid hover:border-2 hover:border-black rounded-md"
        ></div>
        <div
          onClick={() => clickHandler("purple")}
          className="w-7 h-7 hover:cursor-pointer bg-purple-700 flex  hover:border-solid hover:border-2 hover:border-black rounded-md"
        ></div>
        <div
          onClick={() => clickHandler("red")}
          className="w-7 h-7 hover:cursor-pointer bg-red-700 flex  hover:border-solid hover:border-2 hover:border-black rounded-md"
        ></div>
        <div
          onClick={() => clickHandler("black")}
          className="w-[1px] bg-gray-200"
        ></div>
        <div
          onClick={() => clickHandler("orange")}
          className="w-7 h-7 hover:cursor-pointer bg-orange-400 flex  hover:border-solid hover:border-2 hover:border-black rounded-md"
        ></div>
      </div>
    </div>
  );
}
function BackgroundColor() {
  const dispatch = useDispatch();
  function clickHandler(value: Background) {
    dispatch(changeActiveElementProperties({ fillColor: value }));
    dispatch(changeGlobalProperties({ fillColor: value }));
  }
  return (
    <div className="w-full px-2 mb-2">
      <p className="py-1">Fill Color</p>
      <Options>
        <div
          onClick={() => clickHandler("#bfdbfe")}
          className="w-7 h-7 hover:cursor-pointer bg-blue-200 flex  hover:border-solid hover:border-2 hover:border-black rounded-md"
        ></div>
        <div
          onClick={() => clickHandler("#fecaca")}
          className="w-7 h-7 hover:cursor-pointer bg-red-200 flex  hover:border-solid hover:border-2 hover:border-black rounded-md"
        ></div>
        <div
          onClick={() => clickHandler("#bbf7d0")}
          className="w-7 h-7 hover:cursor-pointer bg-green-200 flex  hover:border-solid hover:border-2 hover:border-black rounded-md"
        ></div>
        <div
          onClick={() => clickHandler("#fef08a")}
          className="w-7 h-7 hover:cursor-pointer bg-yellow-200 flex  hover:border-solid hover:border-2 hover:border-black rounded-md"
        ></div>
        <div className="w-[1px] bg-gray-200"></div>
        <div
          onClick={() => clickHandler("transparent")}
          className="w-7 h-7 border-none p-0 border-transparent hover:cursor-pointer hover:border-solid hover:border-2 hover:border-black rounded-md"
        ></div>
      </Options>
    </div>
  );
}
function FillStyle() {
  const dispatch = useDispatch();
  function clickHandler(value: FStyle) {
    dispatch(changeActiveElementProperties({ fillStyle: value }));
    dispatch(changeGlobalProperties({ fillStyle: value }));
  }
  return (
    <div className="w-full px-2 mb-2">
      <p className="py-1">Fill Style</p>
      <Options>
        <Option clickHandler={() => clickHandler("solid")}>
          <Square
            width={20}
            height={20}
            color="black"
            fill="black"
            opacity={0.2}
          />
        </Option>
        <Option clickHandler={() => clickHandler("hachure")}>
          <img src={hachure} width={20} height={20} />
        </Option>
      </Options>
    </div>
  );
}

function StrokeWidth() {
  const dispatch = useDispatch();
  function clickHandler(value: SWidth) {
    dispatch(changeActiveElementProperties({ strokeWidth: value }));
    dispatch(changeGlobalProperties({ strokeWidth: value }));
  }
  return (
    <div className="w-full px-2 mb-2">
      <p className="py-1">Stroke Width</p>
      <Options>
        <Option clickHandler={() => clickHandler(1)}>1px</Option>
        <Option clickHandler={() => clickHandler(3)}>2px</Option>
        <Option clickHandler={() => clickHandler(6)}>3px</Option>
      </Options>
    </div>
  );
}
function StrokeStyle() {
  const dispatch = useDispatch();
  function clickHandler(value: SStyle) {
    dispatch(changeActiveElementProperties({ strokeStyle: value }));
    dispatch(changeGlobalProperties({ strokeStyle: value }));
  }
  return (
    <div className="w-full px-2 mb-2">
      <p className="py-1">Stroke Style</p>
      <Options>
        <Option clickHandler={() => clickHandler("solid")}>
          <Minus width={20} height={20} color="black" />
        </Option>
        <Option clickHandler={() => clickHandler("dashed")}>
          <Minus strokeDasharray={3} width={20} height={20} color="black" />
        </Option>
        <Option clickHandler={() => clickHandler("dotted")}>
          <Minus strokeDasharray={1} width={20} height={20} color="black" />
        </Option>
      </Options>
    </div>
  );
}
function EdgeStyle() {
  const dispatch = useDispatch();
  function clickHandler(value: EStyle) {
    dispatch(changeActiveElementProperties({ edgeStyle: value }));
    dispatch(changeGlobalProperties({ edgeStyle: value }));
  }
  return (
    <div className="w-full px-2 mb-2">
      <p className="py-1">Edge Style</p>
      <Options>
        <Option clickHandler={() => clickHandler("rounded")}>
          <img src={RoundedCorner} width={20} height={20} alt="" />
        </Option>
        <Option clickHandler={() => clickHandler("sharp")}>
          <Square height={20} strokeWidth={20} color="black" />
        </Option>
      </Options>
    </div>
  );
}
function FontSize() {
  const dispatch = useDispatch();
  function clickHandler(value: FSize) {
    dispatch(changeActiveElementProperties({ fontSize: value }));
    dispatch(changeGlobalProperties({ fontSize: value }));
  }
  return (
    <div className="w-full px-2 mb-2">
      <p className="py-1">Font Size</p>
      <Options>
        <Option clickHandler={() => clickHandler(12)}>S</Option>
        <Option clickHandler={() => clickHandler(16)}>M</Option>
        <Option clickHandler={() => clickHandler(20)}>L</Option>
        <Option clickHandler={() => clickHandler(24)}>XL</Option>
      </Options>
    </div>
  );
}
function FontFamily() {
  const dispatch = useDispatch();
  function clickHandler(value: FFamily) {
    dispatch(changeActiveElementProperties({ fontFamily: value }));
    dispatch(changeGlobalProperties({ fontFamily: value }));
  }
  return (
    <div className="w-full px-2 mb-2">
      <p className="py-1">Font Family</p>
      <Options>
        <Option clickHandler={() => clickHandler("code")}>
          <Code width={20} height={20} color="black" />
        </Option>
        <Option clickHandler={() => clickHandler("paint")}>
          <Pen width={20} height={20} color="black" />
        </Option>
        <Option clickHandler={() => clickHandler("normal")}>
          <p className="text-xl">A</p>
        </Option>
      </Options>
    </div>
  );
}
function TextAlign() {
  const dispatch = useDispatch();
  function clickHandler(value: TAlign) {
    dispatch(changeActiveElementProperties({ textAlign: value }));
    dispatch(changeGlobalProperties({ textAlign: value }));
  }
  return (
    <div className="w-full px-2 mb-2">
      <p className="py-1">Text Align</p>
      <Options>
        <Option clickHandler={() => clickHandler("right")}>
          <AlignLeft width={20} height={20} color="black" />
        </Option>
        <Option clickHandler={() => clickHandler("center")}>
          <AlignCenter width={20} height={20} color="black" />
        </Option>
        <Option clickHandler={() => clickHandler("left")}>
          <AlignRight width={20} height={20} color="black" />
        </Option>
      </Options>
    </div>
  );
}
function Opacity() {
  const dispatch = useDispatch();
  function clickHandler(value: OOpacity) {
    dispatch(changeActiveElementProperties({ opacity: value }));
    dispatch(changeGlobalProperties({ opacity: value }));
  }
  return (
    <div className="w-full px-2 mb-2">
      <p className="py-1">Opacity</p>
      <input
        onChange={(e) => {
          console.log(e.target.value);

          clickHandler(Number(e.target.value));
        }}
        className="w-full"
        type="range"
        defaultValue={100}
        min={0}
        max={100}
      />
    </div>
  );
}
function ArrowHead() {
  // const dispatch = useDispatch();
  // function clickHandler(value: ArrowHeadLeft | ArrowHeadRight) {
  //   dispatch(changeActiveElementProperties({ arrowHeadLeft: value }));
  // }
  return (
    <div className="w-full px-2 mb-2">
      <p className="py-1">Arrow Head</p>
      <Options>
        <Option>
          <ArrowLeft width={20} height={20} color="black" />
        </Option>
        <Option>
          <ArrowRight width={20} height={20} color="black" />
        </Option>
      </Options>
    </div>
  );
}
function Layers() {
  const dispatch = useDispatch();
function handleArrangeLayer(type:arrangeLayerAction) {
    dispatch(arrangeLayer(type))
}
  return (
    <div className="w-full px-2 mb-2">
      <p className="py-1">Layers</p>
      <Options>
        <Option clickHandler={()=>handleArrangeLayer("toBack")}>
          <ArrowDownToLine width={20} height={20} color="black" />
        </Option>
        <Option clickHandler={()=>handleArrangeLayer("backward")}>
          <ArrowDown width={20} height={20} color="black" />
        </Option>
        <Option clickHandler={()=>handleArrangeLayer("forward")}>
          <ArrowUp width={20} height={20} color="black" />
        </Option>
        <Option clickHandler={()=>handleArrangeLayer("toFront")}>
          <ArrowUpToLine width={20} height={20} color="black" />
        </Option>
      </Options>
    </div>
  );
}
function Actions() {
  const dispatch = useDispatch();
  function deleteElement() {
    dispatch(removeElement());
  }

  function duplicate() {
    dispatch(duplicateElement());
  }
  return (
    <div className="w-full px-2 mb-2">
      <p className="py-1">Action</p>
      <Options>
        <Option clickHandler={() => deleteElement()}>
          <Trash2 width={20} height={20} color="black" />
        </Option>
        <Option>
          <Link width={20} height={20} color="black"></Link>
        </Option>
        <Option clickHandler={() => duplicate()}>
          <Copy width={20} height={20} color="black"></Copy>
        </Option>
      </Options>
    </div>
  );
}

function Options({ children }: Props) {
  return <div className="w-full flex gap-2 ">{children}</div>;
}

function Option({ children, clickHandler }: Props) {
  return (
    <div
      onClick={clickHandler}
      className="w-8 h-8 hover:cursor-pointer flex bg-gray-100 hover:bg-blue-100 hover:border-solid hover:border-[1px] hover:border-black rounded-md justify-center items-center"
    >
      {children}
    </div>
  );
}
