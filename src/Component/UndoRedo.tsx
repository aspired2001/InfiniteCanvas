import { Undo, Redo } from "lucide-react";

export default function UndoRedo() {
  return (
    <div
      id="zoom"
      style={{
        left: "230px",
        top: "93%",
        transform: "translate(-50%, 0)",
      }}
      className=" flex mx-auto top-5 absolute  gap-2  min-w-[70px] min-h-5 rounded-md bg-white drop-shadow-md"
    >
      <div className=" w-full h-full p-2 hover:bg-blue-100 hover:cursor-pointer rounded-l-lg flex justify-center items-center">
        <Undo />
      </div>
      <div className="w-full h-full p-2 hover:bg-blue-100 hover:cursor-pointer rounded-r-lg flex justify-center items-center">
        <Redo />
      </div>
    </div>
  );
}
