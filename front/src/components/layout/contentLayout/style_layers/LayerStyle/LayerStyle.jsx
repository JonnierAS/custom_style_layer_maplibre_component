
import { useEffect, useState } from "react";
import { useLocalState } from "../../../../context/CleanLocalState";
import SelectLayers from "../components/SelectLayers";
import ContentlayerStyle from "./ContentlayerStyle";
import { useSelector } from "react-redux";
import { setPaintProperties } from "../services/symbol";
import StyleManageContainer from "../components/StyleManageContainer";
import { styleInput } from "../helper/styleTypeTailwindcss";

function LayerStyle() {
  const mapRef = useSelector(state=> state.mapRef)
  const layerName = useSelector(state => state.layerName?.label)
    const { openModalChangeColor, setOpenModalChangeColor, layersPropertyStyle, setLayerPropertyStyle } = useLocalState();
      const [typeOfLayer, setTypeOfLayer] = useState(null)

      const hanldeInputTypeChange = (type)=>{
        setTypeOfLayer(type)
      }
      useEffect(() => {
        if(!mapRef?.current) return;
        const iconMap = mapRef.current.getMap()
        const layerId = `${layerName}-circle`
        if (iconMap) {
          setPaintProperties(iconMap, layerId, {
            "circle-radius": layersPropertyStyle.adaptOnZoom
              ? ["interpolate",["linear"], ["zoom"], 0,
                  ["case", ["boolean", ["feature-state", "isActive"], false],50, layersPropertyStyle.minZoomRadius], 24,
                  ["case",["boolean", ["feature-state", "isActive"], false], 50,layersPropertyStyle.maxZoomRadius],
                ]
              : ["case", ["boolean", ["feature-state", "isActive"], false], 50, 5],
          });
        }
      }, [mapRef, layersPropertyStyle]);


  return (
    <div className="text-center relative top-5">
      <div className="flex justify-center text-center items-center gap-1">
        <SelectLayers />
        <StyleManageContainer />
      </div>

      {layerName && layerName !== "Sin Capa" ? (
      <select onChange={(e)=>hanldeInputTypeChange(e.target.value)} className={`${styleInput} w-32 relative top-[10px]`}> 
        <option value="null">Tipo de capa</option>
        <option value="polygon">Poligonos</option>
        <option value="circle">Puntos</option>
      </select>): null
      }
      {typeOfLayer && typeOfLayer !== "null" ? (
        <ContentlayerStyle
        typeOfLayer={typeOfLayer}
        openModalChangeColor={openModalChangeColor} 
        setOpenModalChangeColor={setOpenModalChangeColor} 
        setLayerPropertyStyle={setLayerPropertyStyle} 
        layersPropertyStyle={layersPropertyStyle} 
        styleInput={styleInput}
        />) : null
      }
      
    </div>
  );
}

export default LayerStyle;