
import { useEffect, useState } from "react";
import { useLocalState } from "../../../../context/CleanLocalState";
import SelectLayers from "../components/SelectLayers";
import ContentlayerStyle from "./ContentlayerStyle";
import { useSelector } from "react-redux";
import { setPaintProperties } from "../services/symbol";

const styleInput = "absolute w-28 top-[-10px] left-28 py-1 px-2 text-sm rounded outline-none focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:ring-purple-500 dark:focus-visible:ring-purple-500 dark:focus-visible:ring-offset-gray-900 border border-gray-200 dark:border-gray-500 shadow-sm focus-visible:border-gray-200 dark:focus-visible:border-gray-300 hover:border-gray-300 dark:hover:border-gray-300 block dark:bg-transparent dark:text-gray-100"

function LayerStyle({mapRender}) {
  const mapRef = useSelector(state=> state.mapRef)
  const layerName = useSelector(state => state.layerName?.label)
    const { openModalChangeColor, setOpenModalChangeColor,
        layersPropertyStyle, setLayerPropertyStyle
      } = useLocalState();
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
              ? [
                  "interpolate",
                  ["linear"],
                  ["zoom"],
                  0,
                  [
                    "case",
                    ["boolean", ["feature-state", "isActive"], false],
                    50,
                    layersPropertyStyle.minZoomRadius,
                  ],
                  24,
                  [
                    "case",
                    ["boolean", ["feature-state", "isActive"], false],
                    50,
                    layersPropertyStyle.maxZoomRadius,
                  ],
                ]
              : ["case", ["boolean", ["feature-state", "isActive"], false], 50, 5],
          });
        }
      }, [mapRef, layersPropertyStyle]);
  return (
    <div className="text-center relative top-5">
      <div className="flex justify-center">
        <SelectLayers />
      </div>
      {layerName && layerName !== "Sin Capa" ? (
      <select 
      onChange={(e)=>hanldeInputTypeChange(e.target.value)}
      className={`${styleInput} w-32 relative top-[10px]`}
      > 
        <option value="null">Tipo de capa</option>
        <option value="polygon">Poligonos</option>
        <option value="circle">Puntos</option>
      </select>): null
      }
      {typeOfLayer && typeOfLayer !== "null" ? (
        <ContentlayerStyle mapRender={mapRender}
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