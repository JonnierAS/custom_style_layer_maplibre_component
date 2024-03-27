
import { useEffect, useState } from "react";
import { useLocalState } from "../../../../context/CleanLocalState";
import HexAlphaColor from "../components/HexAlphaColor";
import SelectLayers from "../components/SelectLayers";
import ContentlayerStyle from "./ContentlayerStyle";
import { useSelector } from "react-redux";
import { setPaintProperties } from "../services/symbol";

const styleInput = "absolute w-28 top-[-10px] left-28 py-1 px-2 text-sm rounded outline-none focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:ring-purple-500 dark:focus-visible:ring-purple-500 dark:focus-visible:ring-offset-gray-900 border border-gray-200 dark:border-gray-500 shadow-sm focus-visible:border-gray-200 dark:focus-visible:border-gray-300 hover:border-gray-300 dark:hover:border-gray-300 block dark:bg-transparent dark:text-gray-100"

function LayerStyle() {
  const mapRef = useSelector(state=> state.mapRef)
  const layerName = useSelector(state => state.layerName?.label)
    const { openModalChangeColor, setOpenModalChangeColor,
        layersPropertyStyle, setLayerPropertyStyle
      } = useLocalState();
      const [typeOfLayer, setTypeOfLayer] = useState(null)

      const hanldeInputTypeChange = (type)=>{
        setTypeOfLayer(type)
      }

      const handleColorChange = (color) => {
        if(openModalChangeColor.type === "base"){
          setLayerPropertyStyle({...layersPropertyStyle, colorBase: color})
        }
        if(openModalChangeColor.type === "line"){
          setLayerPropertyStyle({...layersPropertyStyle, lineColor: color})
        }
      };
      // useEffect(() => {
      //   if(!mapRef?.current) return;
      //   const iconMap = mapRef.current.getMap()
      //   const layerId = `${layerName}-circle`
      //   if (iconMap) {
      //     setPaintProperties(iconMap, layerId, {
      //       "circle-radius": layersPropertyStyle.adaptOnZoom
      //         ? [
      //             "interpolate",
      //             ["linear"],
      //             ["zoom"],
      //             0,
      //             [
      //               "case",
      //               ["boolean", ["feature-state", "isActive"], false],
      //               50,
      //               layersPropertyStyle.minZoomRadius,
      //             ],
      //             24,
      //             [
      //               "case",
      //               ["boolean", ["feature-state", "isActive"], false],
      //               50,
      //               layersPropertyStyle.maxZoomRadius,
      //             ],
      //           ]
      //         : ["case", ["boolean", ["feature-state", "isActive"], false], 50, 5],
      //     });
      //   }
      // }, [mapRef, layersPropertyStyle]);
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
        <ContentlayerStyle 
        typeOfLayer={typeOfLayer}
        openModalChangeColor={openModalChangeColor} 
        setOpenModalChangeColor={setOpenModalChangeColor} 
        setLayerPropertyStyle={setLayerPropertyStyle} 
        layersPropertyStyle={layersPropertyStyle} 
        styleInput={styleInput}
        />) : null
      }
      {layersPropertyStyle.adaptOnZoom && (
         <div className="relative top-[140px]">
         <div className="flex w-60 justify-between relative left-3 top-1">
           <label className="font-medium w-24">
             Radio del circulo (at zoom 0)
           </label>
           <input
             id="circle-adapt-on-min-zoom-radius"
             type="number"
             value={layersPropertyStyle.minZoomRadius}
             className={`${styleInput} relative left-[-16px]`}
             onChange={(e) =>
              setLayerPropertyStyle({...layersPropertyStyle, minZoomRadius: Number.parseFloat(e.target.value)})
             }
             step={0.1}
             min={0.1}
           ></input>
         </div>
         <div className="flex w-46 justify-between relative top-3 left-3 ">
           <label className="font-medium w-24">
             Radio del circulo (at zoom 24)
           </label>
           <input
             id="circle-adapt-on-max-zoom-radius"
             type="number"
             value={layersPropertyStyle.maxZoomRadius}
             className={`${styleInput}`}
             onChange={(e) =>
              setLayerPropertyStyle({...layersPropertyStyle, maxZoomRadius: Number.parseFloat(e.target.value)})
             }
             step={0.1}
           ></input>
         </div>
         <p className="mt-4 justify-start">
         Las propiedades que admiten expresiones de interpolación pueden cambiar cuando
           Cambie de zoom. Se puede establecer un valor para cada nivel de zoom
         </p>
       </div>
      )}
      {openModalChangeColor.state === true  && (
          <HexAlphaColor layersPropertyStyle={layersPropertyStyle} handleColorChange={handleColorChange} setOpenModalChangeColor={setOpenModalChangeColor} />
        )}
    </div>
  );
}

export default LayerStyle;