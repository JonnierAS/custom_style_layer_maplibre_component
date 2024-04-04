import React, { createContext, useContext, useState } from "react";

const LocalStateContext = createContext();

export const LocalStateProvider = ({ children }) => {
 /* sidepanel */
  const [layersPropertyStyle, setLayerPropertyStyle] = useState({
    colorBase: "#6e548c",
    lineColor: "#6e548c",
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
    iconColor: "black",
    icon: "marker",
    iconSize: 1,
    iconHaloBlur: 0,
    iconHaloColor: "white",
    iconHaloWidth: 0,
    iconOverlap: "never",
    iconRotate: 0,
    iconPitchAlignment: "auto",
    iconTextColor: "black",
    iconTextOverlap: false,
    iconTextRotate: 0,
    iconTextSize: 16,
    iconTextOffsetX: 0,
    iconTextOffsetY: 0,
    iconTextAnchor: "center",
    iconTextOptional: true,
    iconTextTransform: "none",
    iconTextField: "example",
    iconAdaptOnZoom: false,
    iconMinZoomIconSize: 0.1,
    iconMaxZoomIconSize: 1,
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
