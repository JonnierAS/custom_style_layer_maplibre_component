import {
    SET_MAP_BOX_DRAW,
    SET_MAP_REF,
    SET_LAYERS_NAME
  } from "../types";

export const setMapboxDrawRef = (state) => ({
    type: SET_MAP_BOX_DRAW,
    payload: state,
  });

  export const setMapref = (ref) => ({
    type: SET_MAP_REF,
    payload: ref,
  });

export const setNameOfLayers = (layersName) =>({
  type: SET_LAYERS_NAME,
  payload: layersName
})