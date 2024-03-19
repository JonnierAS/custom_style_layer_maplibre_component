import {
    SET_MAP_BOX_DRAW,
    SET_MAP_REF,
    SET_LAYERS_NAME
  } from "../types";
  
const initialState = {
    mapBoxDrawStateRef: null,
    mapRef: null,
    layerName: null
  };
  
  const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
      case SET_MAP_BOX_DRAW:
        return { ...state, mapBoxDrawStateRef: payload };
      case SET_MAP_REF:
        return { ...state, mapRef: payload };
      case SET_LAYERS_NAME:
        return {...state, layerName: payload}
      default:
        return { ...state };
    }
  };
  
  export default reducer;
  