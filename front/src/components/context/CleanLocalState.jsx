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
  const [openModalChangeColor, setOpenModalChangeColor] = useState({state: false, type: ""});
  
  const [applyTransition , setApplyTransition] = useState(false)
  const [showPanel, setShowPanel] = useState(false)

  return (
    <LocalStateContext.Provider
      value={{
        openModalChangeColor, setOpenModalChangeColor,
        showPanel, setShowPanel,
        applyTransition , setApplyTransition,
        layersPropertyStyle, setLayerPropertyStyle
      }}
    >
      {children}
    </LocalStateContext.Provider>
  );
};

export const useLocalState = () => {
  return useContext(LocalStateContext);
};
