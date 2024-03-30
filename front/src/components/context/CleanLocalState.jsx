import React, { createContext, useContext, useState } from "react";

const LocalStateContext = createContext();

export const LocalStateProvider = ({ children }) => {
 /* sidepanel */
  const [layersPropertyStyle, setLayerPropertyStyle] = useState({
    colorBase: "110, 84, 140",
    lineColor: "110, 84, 140",
    radius: 4,
    blurLayer: 0.2,
    strokeWidth: 1,
    pitchAligment: "map",
    pitchScale: "map",
    adaptOnZoom: false,
    minZoomRadius: 0,
    maxZoomRadius: 20,
    textColor: "black",
    textSize: 16,
    textAnchor: "center",
    textOverlap: false,
    textField: "Example",
    textOptional: true
  })
  const [layerIconProperties, setLayerIconProperties] = useState({
    color: "black",
    icon: "marker",
    size: 1,
    haloBlur: 0,
    haloColor: "white",
    haloWidth: 0,
    overlap: "never",
    rotate: 0,
    pitchAlignment: "auto",
    textColor: "black",
    textOverlap: false,
    textRotate: 0,
    textSize: 16,
    textOffsetX: 0,
    textOffsetY: 0,
    textAnchor: "center",
    textOptional: true,
    textTransform: "none",
    textField: "example",
    adaptOnZoom: false,
    minZoomIconSize: 0.1,
    maxZoomIconSize: 1,
    showIcon: false,
  });
  const [capaProperties, setCapaProperties] = useState(null);
  const [openModalChangeColor, setOpenModalChangeColor] = useState({state: false, type: ""});
  const [openIconSelect, setOpenIconSelect] = useState(false);
  const [applyTransition , setApplyTransition] = useState(false)
  const [showPanel, setShowPanel] = useState(false)

  return (
    <LocalStateContext.Provider
      value={{
        openModalChangeColor, setOpenModalChangeColor,
        showPanel, setShowPanel,
        applyTransition , setApplyTransition,
        layersPropertyStyle, setLayerPropertyStyle,
        layerIconProperties, setLayerIconProperties,
        openIconSelect, setOpenIconSelect,
        setCapaProperties,capaProperties
      }}
    >
      {children}
    </LocalStateContext.Provider>
  );
};

export const useLocalState = () => {
  return useContext(LocalStateContext);
};
