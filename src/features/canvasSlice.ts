import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import { AnyIndividualProperty, arrangeLayerAction } from "../types/propertiesTypes";
import { AllShape } from "../types/shapeTypes";
import { InitialState, Pan } from "../types/stateTypes";
import { SCALE_FACTOR } from "../utils/constant";

const initialState: InitialState = {
  hoverElement: [],
  activeElement: [],
  canvasState: {
    pan: {
      x: 100,
      y: 100,
    },
    scale: 100, //percent
    locked: false,
  },
  allElements: [],
  toolState: {
    active: "",
  },
  mouseState: {
    mouseX: 0,
    mouseY: 0,
  },
  globalProperties: {
    fillStyle: "solid",
    strokeWidth: 3,
    strokeStyle: "solid",
    strokeColor: "black",
    edgeStyle: "sharp",
    fontSize: 24,
    fontFamily: "code",
    textAlign: "center",
    opacity: 100,
    arrowHeadLeft: "arrow",
    arrowHeadRight: "arrow",
    fillColor: "#fecaca",
  },
};

export const canvasSlice = createSlice({
  name: "canvasState",
  initialState,
  reducers: {
    increaseScale: ({ canvasState }: InitialState) => {
      if (canvasState.scale <= 2000 - SCALE_FACTOR) {
        const scale = canvasState.scale + SCALE_FACTOR;
        canvasState.scale = scale;
      } else {
        canvasState.scale = 2000;
      }
    },
    decreaseScale: ({ canvasState }: InitialState) => {
      if (canvasState.scale >= 10 + SCALE_FACTOR) {
        const scale = canvasState.scale - SCALE_FACTOR;
        canvasState.scale = scale;
      } else {
        canvasState.scale = 10;
      }
    },
    resetScale: ({ canvasState }: InitialState) => {
      canvasState.scale = 100;
    },
    toggleLock: ({ canvasState }: InitialState) => {
      canvasState.locked = !canvasState.locked;
    },
    resetPan: ({ canvasState }: InitialState) => {
      canvasState.pan = { x: 100, y: 100 };
    },
    setPan: ({ canvasState }: InitialState, action: PayloadAction<Pan>) => {
      canvasState.pan = {
        x: action.payload.x,
        y: action.payload.y,
      };
    },
    setActiveTool: ({ toolState }, action) => {
      toolState.active = action.payload;
    },
    resetCanvas: (state) => {
      state.allElements = [];
    },
    setActiveElement: (state, action) => {
      state.activeElement = state.allElements.filter((element) => {
        return element.id == action.payload.id;
      });
    },
    setHoverElement: (state, action) => {
      state.hoverElement = state.allElements.filter((element) => {
        return element.id == action.payload.id;
      });
    },
    clearHoverElement: (state) => {
      state.hoverElement = [];
    },
    clearActiveElement: (state) => {
      state.activeElement = [];
    },
    changeActiveElementProperties(
      state,
      { payload }: PayloadAction<AnyIndividualProperty>,
    ) {
      const newAllElement = state.allElements.map((element) => {
        return element.id == state.activeElement[0].id
          ? { ...element, ...payload }
          : element;
      });

      state.allElements = newAllElement;
    },
    addElement(state, action) {
      state.allElements = action.payload;
    },
    setElementPosition(
      state,
      { payload }: PayloadAction<{ posX: number; posY: number }>,
    ) {
      let newCords: {
        posX: number;
        posY: number;
        endX?: number;
        endY?: number;
      } = {
        posX: 0,
        posY: 0,
      };
      if (
        state.activeElement[0].type == "rect" ||
        state.activeElement[0].type == "image"
      ) {
        newCords.posX = payload.posX - state.activeElement[0].width / 2;
        newCords.posY = payload.posY - state.activeElement[0].height / 2;
      }
      if (
        state.activeElement[0].type == "ellipse" ||
        state.activeElement[0].type == "text"
      ) {
        newCords = { ...payload };
      }
      if (state.activeElement[0].type == "line") {
        newCords = {
          ...payload,
        };
      }

      const newAllElement = state.allElements.map((element) => {
        return element.id == state.activeElement[0].id
          ? {
              ...element,
              ...newCords,
            }
          : element;
      });

      state.activeElement[0] = { ...state.activeElement[0], ...newCords };
      state.allElements = newAllElement;
    },
    setHoverElementActive(state) {
      if (state.toolState.active == "pointer") {
        if (state.hoverElement.length > 0) {
          state.activeElement = state.hoverElement;
        } else {
          state.activeElement = [];
        }
      } else if (state.toolState.active == "eraser") {
        if (state.hoverElement.length > 0) {
          state.activeElement = state.hoverElement;
        } else {
          state.activeElement = [];
        }
        removeElement();
      }
    },
    addNewElement(state, action) {
      if (action.payload != undefined) {
        state.allElements.push(action.payload);
        state.activeElement[0] = action.payload;
        state.toolState.active = "pointer";
      }
    },
    removeElement(state) {
      state.allElements = state.allElements.filter(
        (element) => element.id !== state.activeElement[0].id,
      );
      state.activeElement = [];
    },
    duplicateElement(state) {
      const activeElement = state.activeElement[0];
      const newElement = {
        ...activeElement,
        id: nanoid(),
        posX: activeElement.posX + 15,
        posY: activeElement.posY + 15,
      };
      state.allElements.push(newElement);
      state.activeElement[0] = newElement;
    },

    changeGlobalProperties(
      state,
      { payload }: PayloadAction<AnyIndividualProperty>,
    ) {
      let newGlobalPropertiesState = {
        ...state.globalProperties,
        ...payload,
      };
      state.globalProperties = newGlobalPropertiesState;
    },
    arrangeLayer(state, action: PayloadAction<arrangeLayerAction> ){

       const indexActiveElement = state.allElements.findIndex(el=>el.id === state.activeElement[0].id)
       switch (action.payload) {
        case "backward":
        if(indexActiveElement === 0){
            return ;
        }else{
            const newState = state.allElements;
            const temp = newState[indexActiveElement];
            newState[indexActiveElement] = newState[indexActiveElement - 1]
            newState[indexActiveElement - 1] = temp;
            state.allElements = newState;
                    }
            break;
        case "toBack":
        if(indexActiveElement === 0){
                return;
            }else{
                const temp = state.allElements[indexActiveElement];
                const newState = state.allElements.filter(function(item) {
                    return item.id !== temp.id;
                })
                state.allElements = [temp,...newState];
            }

            break;
        case "forward":
            if(indexActiveElement === state.allElements.length-1){
                return;
            }else{
                const newState = state.allElements;
                const temp = newState[indexActiveElement];
                newState[indexActiveElement] = newState[indexActiveElement + 1]
                newState[indexActiveElement + 1] = temp;
            state.allElements = newState;
            }

            break;
        case "toFront":
            if(indexActiveElement === state.allElements.length-1){
                return;
            }else{
                const temp = state.allElements[indexActiveElement];
                const newState = state.allElements.filter(function(item) {
                    return item.id !== temp.id;
                })
                state.allElements = [...newState, temp];
            }

            break;

        default:
            break;
       }
    }
  },

});

export const {
  setActiveTool,
  setActiveElement,
  clearActiveElement,
  increaseScale,
  decreaseScale,
  resetScale,
  toggleLock,
  resetPan,
  setPan,
  resetCanvas,
  changeActiveElementProperties,
  addElement,
  setElementPosition,
  setHoverElement,
  clearHoverElement,
  setHoverElementActive,
  addNewElement,
  removeElement,
  duplicateElement,
  changeGlobalProperties,
  arrangeLayer,
} = canvasSlice.actions;
export default canvasSlice.reducer;

export const dummyShapes: AllShape[] = [
  {
    type: "rect",
    height: 100,
    width: 100,
    fillColor: "#bbf7d0",
    strokeColor: "blue",
    strokeWidth: 3,
    innerText: "kaise ho!!",
    posX: 100,
    posY: 100,
    id: nanoid(),
    rotation: 0,
    edgeStyle: "rounded",
    fontFamily: "code",
    fontSize: 16,
    textAlign: "center",
    fillStyle: "solid",
    opacity: 100,
    strokeStyle: "dashed",
    isTextEditing: false,
  },
  {
    type: "rect",
    height: 300,
    width: 100,
    fillColor: "#fecaca",
    strokeColor: "blue",
    strokeWidth: 3,
    innerText: "",
    posX: 300,
    posY: 100,
    id: nanoid(),
    rotation: 0,
    edgeStyle: "sharp",
    fontFamily: "code",
    fontSize: 12,
    textAlign: "center",
    fillStyle: "solid",
    opacity: 100,
    strokeStyle: "dotted",
    isTextEditing: false,
  },
  {
    type: "ellipse",
    radiusX: 50,
    radiusY: 50,
    fillColor: "#bfdbfe",
    strokeColor: "blue",
    strokeWidth: 3,
    innerText: "This is an ellipse",
    posX: 300,
    posY: 500,
    id: nanoid(),
    rotation: 0,
    edgeStyle: "sharp",
    fontFamily: "code",
    fontSize: 12,
    textAlign: "center",
    fillStyle: "solid",
    opacity: 100,
    strokeStyle: "solid",
    isTextEditing: false,
  },
  {
    type: "line",
    strokeColor: "blue",
    strokeWidth: 3,
    strokeStyle: "dashed",
    posX: 350,
    posY: 350,
    length: 100,
    id: nanoid(),
    rotation: 100,
    opacity: 100,
    middlePoint: 50,
    isTextEditing: false,
  },
];
