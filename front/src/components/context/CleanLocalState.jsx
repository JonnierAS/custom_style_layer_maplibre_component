import React, { createContext, useContext, useState } from "react";

const LocalStateContext = createContext();

export const LocalStateProvider = ({ children }) => {
 /* sidepanel */
  const [layersPropertyStyle, setLayerPropertyStyle] = useState({
    colorBase: "#6e548c",
    lineColor: "#000000",
    radius: 4,
    blurLayer: 0.2,
    strokeWidth: 1,
    pitchAligment: "map",
    pitchScale: "map",
    adaptOnZoom: false,
    minZoomRadius: 0.5,
    maxZoomRadius: 24
  })
  const [layerIconProperties, setLayerIconProperties] = useState({
    color: "black",
    icon: "marker",
    opacity: 1,
    haloBlur: 0,
    haloColor: "white",
    haloWidth: 0,
    overlap: "always",
    rotate: 0,
    pitchAlignment: "auto",
    textColor: "black",
    textOverlap: "never",
    textRotate: 0,
    textSize: 16,
    textOffsetX: 0,
    textOffsetY: 0,
    textAnchor: "center",
    textOptional: true,
    textTransform: "none",
    textOpacity: 1,
    adaptOnZoom: false,
    minZoomIconSize: 0.1,
    maxZoomIconSize: 1,
  });
  const [openModalChangeColor, setOpenModalChangeColor] = useState({state: false, type: ""});
  
  const [applyTransition , setApplyTransition] = useState(false)
  const [showPanel, setShowPanel] = useState(false)

  return (
    <LocalStateContext.Provider
      value={{
        openModalChangeColor, setOpenModalChangeColor,
        showPanel, setShowPanel,
        applyTransition , setApplyTransition,
        layersPropertyStyle, setLayerPropertyStyle,
        layerIconProperties, setLayerIconProperties
      }}
    >
      {children}
    </LocalStateContext.Provider>
  );
};

export const useLocalState = () => {
  return useContext(LocalStateContext);
};
