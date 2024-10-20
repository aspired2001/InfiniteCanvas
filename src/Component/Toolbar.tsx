import {
  Minus,
  Square,
  Circle,
  Pen,
  ArrowRight,
  Eraser,
  Hand,
  LockKeyhole,
  MousePointer,
  LockKeyholeOpen,
  Text,
  ImageIcon,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  setActiveTool,
  toggleLock,
  addNewElement,
} from "../features/canvasSlice";
import { useRef } from "react";
import { nanoid } from "nanoid";
import { Active, InitialState } from "../types/stateTypes";
import { Img } from "../types/shapeTypes";

export default function Toolbar() {
  const { locked } = useSelector((state: InitialState) => state.canvasState);
  const { active } = useSelector((state: InitialState) => state.toolState);
  const dispatch = useDispatch();
  const imageInputElement = useRef<HTMLInputElement>(null);
  const handleClick = (type: Active) => {
    dispatch(setActiveTool(type));
  };

  const handleFileChange = (e: React.FormEvent<HTMLInputElement>) => {
    if (e.currentTarget && e.currentTarget.files) {
      const file = e.currentTarget.files[0];
      if (file) {
        // Check if the selected file is an image
        if (file.type) {
          const reader = new FileReader();
          reader.onloadend = () => {
            //runs when reader done with reading
            const img = new Image();
            img.src = reader.result as string;
            img.onload = () => {
              createImageBitmap(img).then((res) => {
                const imageElement: Img = {
                  type: "image",
                  posX: 300,
                  posY: 700,
                  width: img.width / 3,
                  height: img.height / 3,
                  id: nanoid(),
                  rotation: 0,
                  src: res,
                  opacity: 100,
                  strokeColor: "red",
                  strokeWidth: 3,
                  strokeStyle: "dotted",
                };

                console.log(imageElement);
                dispatch(addNewElement(imageElement));
              });
            };
          };
          reader.readAsDataURL(file);
        } else {
          alert("Please select a valid image file.");
        }
      }
    }
  };
  return (
    <>
      <div
        id="toolbar"
        style={{
          left: "50%",
          transform: "translate(-50%, 0)",
        }}
        className=" flex mx-auto top-5 absolute  gap-2 p-1 md:min-w-[300px] lg:min-w-[500px] min-h-10 rounded-md bg-white drop-shadow-md"
      >
        <div
          style={{ backgroundColor: locked ? "#dbeafe" : "" }}
          className="md:w-10 w-7 h-10 p-2 hover:bg-blue-100 hover:cursor-pointer rounded-lg flex justify-center items-center"
          onClick={() => dispatch(toggleLock())}
        >
          {locked ? (
            <LockKeyhole
              width={20}
              height={20}
              fill={"blue"}
              fillOpacity={0.2}
            />
          ) : (
            <LockKeyholeOpen width={20} height={20} />
          )}
        </div>

        <div className="w-[1px] bg-gray-200"></div>

        <div
          onClick={() => {
            handleClick("hand");
          }}
          style={{ background: active == "hand" ? "#dbeafe" : "white" }}
          className={`md:w-10 w-7 h-10 p-2 ${
            active == "hand" ? "bg-blue-100" : ""
          } hover:bg-blue-100 hover:cursor-pointer rounded-lg flex justify-center items-center`}
        >
          {active == "hand" ? (
            <Hand width={20} height={20} fill={"blue"} fillOpacity={0.2} />
          ) : (
            <Hand width={20} height={20} />
          )}
        </div>

        <div
          onClick={() => {
            handleClick("pointer");
          }}
          className={`md:w-10 w-7 h-10 p-2 ${
            active == "pointer" ? "bg-blue-100" : ""
          } hover:bg-blue-100 hover:cursor-pointer rounded-lg flex justify-center items-center`}
        >
          {active == "pointer" ? (
            <MousePointer
              width={20}
              height={20}
              fill={"blue"}
              fillOpacity={0.2}
            />
          ) : (
            <MousePointer width={20} height={20} />
          )}
        </div>
        <div className="w-[1px] bg-gray-200"></div>

        <div
          onClick={() => {
            handleClick("rect");
          }}
          className={`md:w-10 w-7 h-10 p-2 ${
            active == "rect" ? "bg-blue-100" : ""
          } hover:bg-blue-100 hover:cursor-pointer rounded-lg flex justify-center items-center`}
        >
          {active == "rect" ? (
            <Square width={20} height={20} fill={"blue"} fillOpacity={0.2} />
          ) : (
            <Square width={20} height={20} />
          )}
        </div>
        {/* <div
          onClick={() => {
            handleClick("diamond");
          }}
          className={`md:w-10 w-7 h-10 p-2 ${
            active == "diamond" ? "bg-blue-100" : ""
          } hover:bg-blue-100 hover:cursor-pointer rounded-lg flex justify-center items-center`}
        > */}
        {/* {active == "diamond" ? (
            <Diamond width={20} height={20} fill={"blue"} fillOpacity={0.2} />
          ) : (
            <Diamond width={20} height={20} />
          )}
        </div> */}
        <div
          onClick={() => {
            handleClick("ellipse");
          }}
          className={`md:w-10 w-7 h-10 p-2 ${
            active == "ellipse" ? "bg-blue-100" : ""
          } hover:bg-blue-100 hover:cursor-pointer rounded-lg flex justify-center items-center`}
        >
          {active == "ellipse" ? (
            <Circle width={20} height={20} fill={"blue"} fillOpacity={0.2} />
          ) : (
            <Circle width={20} height={20} />
          )}
        </div>
        <div
          onClick={() => {
            handleClick("line");
          }}
          className={`md:w-10 w-7 h-10 p-2 ${
            active == "line" ? "bg-blue-100" : ""
          } hover:bg-blue-100 hover:cursor-pointer rounded-lg flex justify-center items-center`}
        >
          {active == "line" ? (
            <Minus width={20} height={20} fill={"blue"} fillOpacity={0.2} />
          ) : (
            <Minus width={20} height={20} />
          )}
        </div>
        <div
          onClick={() => {
            handleClick("arrow");
          }}
          className={`md:w-10 w-7 h-10 p-2 ${
            active == "arrow" ? "bg-blue-100" : ""
          } hover:bg-blue-100 hover:cursor-pointer rounded-lg flex justify-center items-center`}
        >
          {active == "arrow" ? (
            <ArrowRight
              width={20}
              height={20}
              fill={"blue"}
              fillOpacity={0.2}
            />
          ) : (
            <ArrowRight width={20} height={20} />
          )}
        </div>
        <div
          onClick={() => {
            handleClick("pen");
          }}
          className={`md:w-10 w-7 h-10 p-2 ${
            active == "pen" ? "bg-blue-100" : ""
          } hover:bg-blue-100 hover:cursor-pointer rounded-lg flex justify-center items-center`}
        >
          {active == "pen" ? (
            <Pen width={20} height={20} fill={"blue"} fillOpacity={0.2} />
          ) : (
            <Pen width={20} height={20} />
          )}
        </div>
        <div
          onClick={() => {
            handleClick("text");
          }}
          className={`md:w-10 w-7 h-10 p-2 ${
            active == "text" ? "bg-blue-100" : ""
          } hover:bg-blue-100 hover:cursor-pointer rounded-lg flex justify-center items-center`}
        >
          {active == "text" ? (
            <Text width={20} height={20} fill={"blue"} fillOpacity={0.2} />
          ) : (
            <Text width={20} height={20} />
          )}
        </div>
        <div
          onClick={() => {
            handleClick("image");
            imageInputElement.current?.click();
          }}
          className={`md:w-10 w-7 h-10 p-2 ${
            active == "image" ? "bg-blue-100" : ""
          } hover:bg-blue-100 hover:cursor-pointer rounded-lg flex justify-center items-center`}
        >
          {active == "image" ? (
            <ImageIcon width={20} height={20} fill={"blue"} fillOpacity={0.2} />
          ) : (
            <ImageIcon width={20} height={20} />
          )}
          <input
            onChange={handleFileChange}
            type="file"
            style={{ display: "none" }}
            ref={imageInputElement}
          />
        </div>
        <div
          onClick={() => {
            handleClick("eraser");
          }}
          className={`md:w-10 w-7 h-10 p-2 ${
            active == "eraser" ? "bg-blue-100" : ""
          } hover:bg-blue-100 hover:cursor-pointer rounded-lg flex justify-center items-center`}
        >
          {active == "eraser" ? (
            <Eraser width={20} height={20} fill={"blue"} fillOpacity={0.2} />
          ) : (
            <Eraser width={20} height={20} />
          )}
        </div>
      </div>
    </>
  );
}
