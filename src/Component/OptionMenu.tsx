import {
  Users,
  Folder,
  ImageDownIcon,
  Menu,
  HelpCircle,
  Trash2,
  Sun,
  MoonIcon,
  Laptop2,
} from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { resetCanvas } from "../features/canvasSlice";

export default function OptionMenu() {
  const dispatch = useDispatch();
  const [isCollapsed, setIsCollapsed] = useState(true);
  function handleResetCanvas() {
    dispatch(resetCanvas());
  }
  return (
    <div
      id="zoom"
      style={{
        left: "50px",
        transform: "translate(-50%, 0)",
      }}
      className=" flex mx-auto top-5 absolute  gap-2   min-h-5 rounded-md bg-white drop-shadow-md"
    >
      <div
        className="w-10 h-10 p-2 hover:bg-blue-100 hover:cursor-pointer rounded-lg flex justify-center items-center"
        onClick={() => setIsCollapsed((prev) => !prev)}
      >
        <Menu />
      </div>

      {isCollapsed ? null : (
        <div className="py-4 text-xs list-none absolute w-54 flex flex-col mx-auto top-12  gap-1 p-1  rounded-md bg-white drop-shadow-md">
          <div className=" flex flex-row w-full h-full drop-shadow-sm gap-2 items-center hover:bg-blue-50 hover:cursor-pointer   round-md p-1">
            <Folder />
            <p>Open</p>
          </div>
          <div className=" flex flex-row w-full h-full drop-shadow-sm gap-2 items-center hover:bg-blue-50 hover:cursor-pointer  round-md p-1">
            <ImageDownIcon />
            <p>Save to...</p>
          </div>
          <div className=" flex flex-row w-full h-full drop-shadow-sm gap-2 items-center hover:bg-blue-50 hover:cursor-pointer  round-md p-1">
            <Users />
            <p>Live Collaboration</p>
          </div>
          <div className=" flex flex-row w-full h-full drop-shadow-sm gap-2 items-center hover:bg-blue-50 hover:cursor-pointer  round-md p-1">
            <HelpCircle />
            <p>Help</p>
          </div>
          <div
            className=" flex flex-row w-full h-full drop-shadow-sm gap-2 items-center hover:bg-blue-50 hover:cursor-pointer  round-md p-1"
            onClick={handleResetCanvas}
          >
            <Trash2 />
            <p>Reset Canvas</p>
          </div>
          <hr />
          <div className="flex flex-col w-full h-full drop-shadow-sm gap-2 items-start  round-md p-1">
            <p>Theme</p>
            <div className="h-[40px] w-full gap-3 flex border-[.5px] rounded-md p-1">
              <div className=" flex justify-center items-center w-full h-full bg-white rounded-md  hover:bg-blue-50 hover:cursor-pointer">
                <Sun />
              </div>
              <div className="flex justify-center items-center w-full h-full bg-white rounded-md  hover:bg-blue-50 hover:cursor-pointer">
                <MoonIcon />
              </div>
              <div className="flex justify-center items-center w-full h-full bg-white rounded-md  hover:bg-blue-50 hover:cursor-pointer">
                <Laptop2 />
              </div>
            </div>
          </div>
          <div className=" flex flex-col w-full h-full drop-shadow-sm gap-2 items-start  rounded-md px-1">
            <p className="">Canvas background</p>
            <div className="flex justify-evenlyw-full flex-row gap-3 ">
              <div className="w-5 h-5 rounded-sm bg-red-50  hover:cursor-pointer border-[1px]"></div>
              <div className="w-5 h-5 rounded-sm bg-red-50  hover:cursor-pointer border-[1px]"></div>
              <div className="w-5 h-5 rounded-sm bg-red-50  hover:cursor-pointer border-[1px]"></div>
              <div className="w-5 h-5 rounded-sm bg-red-50  hover:cursor-pointer border-[1px]"></div>
              <div className="w-5 h-5 rounded-sm bg-red-50  hover:cursor-pointer border-[1px]"></div>
              <div className="w-[1px] bg-gray-200"></div>
              <div className="w-5 h-5 rounded-sm bg-red-50  hover:cursor-pointer border-[1px]"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
