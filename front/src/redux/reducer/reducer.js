import {
    SET_MAP_BOX_DRAW,
    SET_MAP_REF
  } from "../types";
  
const initialState = {
    mapBoxDrawStateRef: null,
    mapRef: null,
  };
  
  const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
      case SET_MAP_BOX_DRAW:
        return { ...state, mapBoxDrawStateRef: payload };
      case SET_MAP_REF:
        return { ...state, mapRef: payload };
      default:
        return { ...state };
    }
  };
  
  export default reducer;
  