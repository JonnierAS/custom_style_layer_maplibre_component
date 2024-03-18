import {ColorWheelIcon} from "@radix-ui/react-icons";

import { useLocalState } from "../../../../context/CleanLocalState";
import HexAlphaColor from "../components/HexAlphaColor";
const styleInput = "absolute w-28 top-[-10px] left-28 py-1 px-2 text-sm rounded outline-none focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:ring-purple-500 dark:focus-visible:ring-purple-500 dark:focus-visible:ring-offset-gray-900 border border-gray-200 dark:border-gray-500 shadow-sm focus-visible:border-gray-200 dark:focus-visible:border-gray-300 hover:border-gray-300 dark:hover:border-gray-300 block dark:bg-transparent dark:text-gray-100"
function LayerCircleForm() {
    const { openModalChangeColor, setOpenModalChangeColor,
        colorState, setColor,
        strokeWidth, setStrokeWidth, setBlurRadius,blurRadius, 
        radius, setRadius, pitchAligment, setPitchAligment,
        pitchScale, setPitchScale, adaptOnZoom, setAdaptOnZoom,
        minZoomRadius, setMinZoomRadius,
        maxZoomRadius, setMaxZoomRadius
      } = useLocalState();

      const openModalChangeColorHandler = () => {
        setOpenModalChangeColor(!openModalChangeColor);
      };
     
      const handleColorChange = (color) => {
        setColor(color);
      };
      const handleChangeStrokeWidth = (width)=>{
        setStrokeWidth(width)
      }
      const handleChangeBlur = (blur)=>{
        setBlurRadius(blur)
      }
      const handleChangeRadius = (radius)=>{
        setRadius(radius)
      }
      const handleChangePitch = (pitch)=>{
        setPitchAligment(pitch)
      }
      const handleChangePitchScale= (scale)=> {
        setPitchScale(scale)
      }
      const handleChangeadaptOnZoom = (bool)=>{
        setAdaptOnZoom(bool)
      }
      const handleChangeminZoomRadius=(min)=>{
        console.log(min);
        setMinZoomRadius(min)
      }
      const handleChangemaxZoomRadius= (max)=>{
        setMaxZoomRadius(max)
      }
  return (
    <div className="text-center relative top-5">
      <div className="flex-col">
        <div className="flex w-40 justify-between relative left-3 top-5">
            <label className="font-medium">Color:</label>
            <button
            onClick={openModalChangeColorHandler}
            className={`${
                openModalChangeColor
                ? "bg-gray-300"
                : ""
            } tooltip hover:bg-gray-300  p-1 right-7 top-[-4px] rounded-md `}
            >
            <ColorWheelIcon />
            <span className="tooltiptextup">
                {openModalChangeColor
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
            value={radius}
            onChange={(e)=>handleChangeRadius(Number.parseInt(e.target.value))}
            />
        </div>
        <div className="flex w-40 justify-between relative left-3 top-14">
            <label className="font-medium">Desenfoque:</label>
            <input
            className={`${styleInput}`}
            type="number"
            min={0}
            step={0.2} 
            value={blurRadius}
            onChange={(e)=>handleChangeBlur(Number.parseFloat(e.target.value))}
            />
        </div>
        <div className="flex w-40 justify-between relative left-3 top-[73px]">
            <label className="font-medium">Ancho de Linea:</label>
            <input
            className={`${styleInput}`}
            type="number" 
            min={0}
            onChange={(e)=>handleChangeStrokeWidth(Number.parseInt(e.target.value))}
            value={strokeWidth}
            />
        </div>
        <div className="flex w-40 justify-between relative left-3 top-[89px]">
            <label className="font-medium">Alineación de tono:</label>
            <select
            value={pitchAligment}
            onChange={(e)=>handleChangePitch(e.target.value)}
            className={`${styleInput}`}
            >
                <option value="map" label="Map"></option>
                <option value="viewport" label="Viewport"></option>   
            </select>
        </div>
        <div className="flex w-40 justify-between relative left-3 top-[108px]">
            <label className="font-medium">Escala de tono:</label>
            <select
            value={pitchScale}
            onChange={(e)=>handleChangePitchScale(e.target.value)}
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
            value={adaptOnZoom}
            onChange={(e) => {
              handleChangeadaptOnZoom(e.target.checked);
            }}
          ></input>
        </div>
      </div>
      {adaptOnZoom && (
         <div className="relative top-[140px]">
         <div className="flex w-60 justify-between relative left-3 top-1">
           <label className="font-medium w-24">
             Radio del circulo (at zoom 0)
           </label>
           <input
             id="circle-adapt-on-min-zoom-radius"
             type="number"
             value={minZoomRadius}
             className={`${styleInput} relative left-[-16px]`}
             onChange={(e) =>
               handleChangeminZoomRadius(Number.parseFloat(e.target.value))
             }
             step={0.1}
             min={0.1}
             max={maxZoomRadius}
           ></input>
         </div>
         <div className="flex w-46 justify-between relative top-3 left-3 ">
           <label className="font-medium w-24">
             Radio del circulo (at zoom 24)
           </label>
           <input
             id="circle-adapt-on-max-zoom-radius"
             type="number"
             value={maxZoomRadius}
             className={`${styleInput}`}
             onChange={(e) =>
               handleChangemaxZoomRadius(Number.parseFloat(e.target.value))
             }
             step={0.1}
             min={minZoomRadius}
           ></input>
         </div>
         <p className="mt-4 justify-start">
         Las propiedades que admiten expresiones de interpolación pueden cambiar cuando
           Cambie de zoom. Se puede establecer un valor para cada nivel de zoom
         </p>
       </div>
      )}
      {openModalChangeColor === true  && (
          <HexAlphaColor colorState={colorState} handleColorChange={handleColorChange} setOpenModalChangeColor={setOpenModalChangeColor} />
        )}
    </div>
  );
}

export default LayerCircleForm;