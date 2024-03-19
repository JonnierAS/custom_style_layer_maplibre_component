import {ColorWheelIcon} from "@radix-ui/react-icons";

import { useLocalState } from "../../../../context/CleanLocalState";
import HexAlphaColor from "../components/HexAlphaColor";
import SelectLayers from "../components/SelectLayers";

const styleInput = "absolute w-28 top-[-10px] left-28 py-1 px-2 text-sm rounded outline-none focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:ring-purple-500 dark:focus-visible:ring-purple-500 dark:focus-visible:ring-offset-gray-900 border border-gray-200 dark:border-gray-500 shadow-sm focus-visible:border-gray-200 dark:focus-visible:border-gray-300 hover:border-gray-300 dark:hover:border-gray-300 block dark:bg-transparent dark:text-gray-100"

function LayerStyle() {
    const { openModalChangeColor, setOpenModalChangeColor,
        layersPropertyStyle, setLayerPropertyStyle
      } = useLocalState();

      const openModalChangeColorHandler = (typeColor) => {
        setOpenModalChangeColor({state: true, type: typeColor});
      };

      const handleColorChange = (color) => {
        if(openModalChangeColor.type === "base"){
          setLayerPropertyStyle({...layersPropertyStyle, colorBase: color})
        }
        if(openModalChangeColor.type === "line"){
          setLayerPropertyStyle({...layersPropertyStyle, lineColor: color})
        }
      };
  return (
    <div className="text-center relative top-5">
      <div className="flex justify-center">
        <SelectLayers />
      </div>
      <div className="flex-col">
        <div className="flex w-40 justify-between relative left-3 top-5">
            <label className="font-medium">Color base:</label>
            <button
            disabled={openModalChangeColor.type === "line"}
            onClick={()=>openModalChangeColorHandler("base")}
            className={`${
                openModalChangeColor.type === "base"
                ? "bg-gray-300"
                : ""
            } ${openModalChangeColor.type === "line" ? "cursor-not-allowed":""} tooltip hover:bg-gray-300  p-1 right-7 top-[-4px] rounded-md `}
            >
            <ColorWheelIcon />
            <span className="tooltiptextup">
                {openModalChangeColor.state && openModalChangeColor.type === "line"
                ? "Finalice la accion anterior"
                : "Cambiar estilo"}
            </span>
            </button>
        </div>
        <div className="flex w-40 justify-between relative left-3 top-5">
            <label className="font-medium">Color de Linea:</label>
            <button
            disabled={openModalChangeColor.type === "base"}
            onClick={()=>openModalChangeColorHandler("line")}
            className={`${
              openModalChangeColor.type === "line"
                ? "bg-gray-300"
                : ""
            } ${openModalChangeColor.type === "base" ? "cursor-not-allowed":""} tooltip hover:bg-gray-300  p-1 right-7 top-[-4px] rounded-md `}
            >
            <ColorWheelIcon />
            <span className="tooltiptextup">
                {openModalChangeColor.state && openModalChangeColor.type === "base"
                ? "Finalice la accion anterior"
                : "Cambiar estilo"}
            </span>
            </button>
        </div>
        <div className="flex w-40 justify-between relative left-3 top-10">
            <label className="font-medium">Radio:</label>
            <input
            className={`${styleInput}`}
            type="number" 
            min={1}
            value={layersPropertyStyle.radius}
            onChange={(e)=>setLayerPropertyStyle({...layersPropertyStyle, radius: Number.parseInt(e.target.value)})}
            />
        </div>
        <div className="flex w-40 justify-between relative left-3 top-14">
            <label className="font-medium">Desenfoque:</label>
            <input
            className={`${styleInput}`}
            type="number"
            min={0}
            step={0.2} 
            value={layersPropertyStyle.blurLayer}
            onChange={(e)=>setLayerPropertyStyle({...layersPropertyStyle, blurLayer: Number.parseFloat(e.target.value)})}
            />
        </div>
        <div className="flex w-40 justify-between relative left-3 top-[73px]">
            <label className="font-medium">Ancho de Linea:</label>
            <input
            className={`${styleInput}`}
            type="number" 
            min={0}
            onChange={(e)=>setLayerPropertyStyle({...layersPropertyStyle, strokeWidth: Number.parseFloat(e.target.value)})}
            value={layersPropertyStyle.strokeWidth}
            />
        </div>
        <div className="flex w-40 justify-between relative left-3 top-[89px]">
            <label className="font-medium">Alineación de tono:</label>
            <select
            value={layersPropertyStyle.pitchAligment}
            onChange={(e)=>setLayerPropertyStyle({...layersPropertyStyle, pitchAligment: Number.parseFloat(e.target.value)})}
            className={`${styleInput}`}
            >
                <option value="map" label="Map"></option>
                <option value="viewport" label="Viewport"></option>   
            </select>
        </div>
        <div className="flex w-40 justify-between relative left-3 top-[108px]">
            <label className="font-medium">Escala de tono:</label>
            <select
            value={layersPropertyStyle.pitchScale}
            onChange={(e)=>setLayerPropertyStyle({...layersPropertyStyle, pitchScale: Number.parseFloat(e.target.value)})}
            className={`${styleInput}`}
            >
                <option value="map" label="Map"></option>
                <option value="viewport" label="Viewport"></option>
            </select>
        </div>
        <div className="flex w-40 justify-between relative left-3 top-[120px]">
          <label className="font-medium">Adapt on zoom</label>
          <input
            id="circle-adapt-on-zoom"
            type="checkbox"
            value={layersPropertyStyle.adaptOnZoom}
            onChange={(e) => {
              setLayerPropertyStyle({...layersPropertyStyle, adaptOnZoom: e.target.checked});
            }}
          ></input>
        </div>
      </div>
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
             max={layersPropertyStyle.maxZoomRadius}
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
             min={layersPropertyStyle.minZoomRadius}
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