import React, { createContext, useContext, useState } from "react";

const LocalStateContext = createContext();

export const LocalStateProvider = ({ children }) => {
  /* Admin */
  const [showModal, setShowModal] = useState(false)
  /* Map */
  const [selectedLayerInfo , setSelectedLayerInfo] = useState(null)
  const [allPolygonOnScreen, setAllPolygonsOnScreen] = useState(null);
  /* Navbar */
  const [layers, setLayers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [openMapaBase, setopenMapaBase]=useState(false);
  const [modalOpenLoadDownLoad, setModalOpenLoadDownLoad] = useState(false);
  const [valueToFilterPolygon, setValueToFilterPolygon] = useState("")
  const [listenerPolygonsActions, setListenerPolygonsActions] = useState(false)
  /* Carga */
  const [showDropzone, setShowDropzone] = useState(false);
  /* descarga */
  const [modalIsOpen, setModalIsOpen] = useState(false);
  /* Selector de colores */
  const [selectedColor, setSelectedColor] = useState('#6e548c'); // Color por defecto
  /* sidepanel */
  const [adaptOnZoom, setAdaptOnZoom] = useState(false)
  const [minZoomRadius, setMinZoomRadius] = useState(0.5)
  const [maxZoomRadius, setMaxZoomRadius] = useState(24)
  const [pitchScale, setPitchScale] = useState("map")
  const [pitchAligment, setPitchAligment] = useState("map")
  const [radius, setRadius]= useState(4)
  const [blurRadius, setBlurRadius] = useState(0.2)
  const [strokeWidth, setStrokeWidth] = useState(1)
  const [colorState, setColor] = useState('#6e548c')
  const [applyTransition , setApplyTransition] = useState(false)
  const [capaProperties, setCapaProperties] = useState(null);
  const [listOfPropertiesOfLayer, setListOfPropertiesOfLayer] = useState(null)
  const [tagToLayer, setTagToLayer] = useState(null)
  const [selectedTagIcon, setselectedTagIcon] = useState(null)
  const [openTagToLayer, setOpenTagToLayer] = useState(false)
  const [openOpacity, setOpenOpacity] = useState(false)
  const [openFilterCros,setOpenFilterCros] = useState(false)
  const [showPanel, setShowPanel] = useState(false)
  const [showDemographiOption, setShowDemographiOption] = useState(true)
  const [showTableOption, setShowTableOption] = useState(false)
  const [openModalChangeColor, setOpenModalChangeColor] = useState(false);
  const [polygonSelectedFillColor, setpolygonSelectedFillColor] = useState({color: '#6e548c'})
  /* response en el cruce demografico */
  const [filterResponse, setFilterResponse]=useState([])
  return (
    <LocalStateContext.Provider
      value={{
        showDropzone,
        setShowDropzone,
        modalIsOpen,
        setModalIsOpen,
        modalOpenLoadDownLoad,
        setModalOpenLoadDownLoad,
        selectedColor, setSelectedColor,
        allPolygonOnScreen, setAllPolygonsOnScreen,
        openModalChangeColor, setOpenModalChangeColor,
        filterResponse, setFilterResponse,
        showPanel, setShowPanel,
        showDemographiOption, setShowDemographiOption,
        showTableOption, setShowTableOption,
        polygonSelectedFillColor, setpolygonSelectedFillColor,
        valueToFilterPolygon, setValueToFilterPolygon,
        openMapaBase, setopenMapaBase,
        listenerPolygonsActions, setListenerPolygonsActions,
        modalVisible, setModalVisible,
        showModal, setShowModal,
        layers, setLayers,
        openOpacity, setOpenOpacity,
        openFilterCros,setOpenFilterCros,
        selectedTagIcon, setselectedTagIcon,
        openTagToLayer, setOpenTagToLayer,
        tagToLayer, setTagToLayer,
        listOfPropertiesOfLayer, setListOfPropertiesOfLayer,
        capaProperties, setCapaProperties,
        selectedLayerInfo , setSelectedLayerInfo,
        applyTransition , setApplyTransition,
        colorState, setColor,
        strokeWidth, setStrokeWidth,
        blurRadius, setBlurRadius,
        radius, setRadius,
        pitchAligment, setPitchAligment,
        pitchScale, setPitchScale,
        adaptOnZoom, setAdaptOnZoom,
        minZoomRadius, setMinZoomRadius,
        maxZoomRadius, setMaxZoomRadius
      }}
    >
      {children}
    </LocalStateContext.Provider>
  );
};

export const useLocalState = () => {
  return useContext(LocalStateContext);
};
