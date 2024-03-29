import {ColorWheelIcon} from "@radix-ui/react-icons";
import { styleDivContainer, styleLabel } from "../layerIcons/helper/styleTypeTailwindcss";
import { useState } from "react";
import HexAlphaColor from "../components/HexAlphaColor";

export default function ContentlayerStyle({typeOfLayer, styleInput, openModalChangeColor, setOpenModalChangeColor, setLayerPropertyStyle, layersPropertyStyle}) {
    const [textProperties, settextProperties] = useState({
      opentextColor: false,
      colortextState: "#6e548c"
    });
    const openModalChangeColorHandler = (typeColor) => {
        setOpenModalChangeColor({state: true, type: typeColor});
      };
      const handleColorChange = (colorProp) => {
        settextProperties({ ...textProperties, colortextState: colorProp });
        setLayerPropertyStyle({...layersPropertyStyle,textColor: colorProp})
      };
    return (
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
        {typeOfLayer !== "polygon" && 
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
        }
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

        {/* Texto para las capas de poligonos */}
        {typeOfLayer === "polygon" && 
        <>
        <div className={"flex w-40 justify-between relative left-3 top-[93px]"}>
          <label className={styleLabel}>Color de Texto:</label>
          <button
            onClick={() =>
                settextProperties({ ...textProperties, opentextColor: true })
            }
            className={`tooltip hover:bg-gray-300 p-1 right-6 top-[-4px] rounded-md ${
                textProperties.opentextColor ? "bg-gray-300" : ""
            }`}
          >
            <ColorWheelIcon />
            <span className="tooltiptextup">
              {textProperties.opentextColor
                ? "Finalice la acción anterior"
                : "Cambiar estilo"}
            </span>
          </button>
        </div>
        <div className={"flex w-40 justify-between relative left-3 top-[103px]"}>
            <label className={styleLabel}>Tamaño</label>
            <input
            className={styleInput}
            type="number"
            value={layersPropertyStyle.textSize}
            min={12}
            max={32}
            step={2}
            onChange={(e) =>
                setLayerPropertyStyle({...layersPropertyStyle,textSize: Number.parseInt(e.target.value)})
            }
            ></input>
        </div>
        <div className={"flex w-40 justify-between relative left-3 top-[123px]"}>
          <label className={styleLabel}>Ancla</label>
          <select
            className={styleInput}
            value={layersPropertyStyle.textAnchor}
            onChange={(e) => setLayerPropertyStyle({...layersPropertyStyle,textAnchor: e.target.value})}
          >
            <option value="center" label="Center"></option>
            <option value="top" label="Top"></option>
            <option value="bottom" label="Bottom"></option>
            <option value="left" label="Left"></option>
            <option value="right" label="Right"></option>
          </select>
        </div>
        <div className={"flex w-40 justify-between relative left-3 top-[143px]"}>
          <label className={styleLabel}>Superposición</label>
          <select
            className={styleInput}
            value={layersPropertyStyle.textOverlap}
            onChange={(e) => setLayerPropertyStyle({...layersPropertyStyle, textOverlap: e.target.value})}
          >
            <option value={false} label="Never"></option>
            <option value={true} label="Always"></option>
          </select>
        </div>
        </>
        }
        {textProperties.opentextColor && (
          <HexAlphaColor
            colorIconState={textProperties.colortextState}
            handleColorChange={handleColorChange}
            setOpenIconColor={settextProperties}
          />
        )}

        {typeOfLayer !== "polygon" && 
        <>
            <div className="flex w-40 justify-between relative left-3 top-[89px]">
                <label className="font-medium">Alineación de tono:</label>
                <select
                value={layersPropertyStyle.pitchAligment}
                onChange={(e)=>setLayerPropertyStyle({...layersPropertyStyle, pitchAligment: e.target.value})}
                className={`${styleInput}`}
                >
                    <option value="map" label="Map" />
                    <option value="viewport" label="Viewport" />   
                </select>
            </div>
            
            <div className="flex w-40 justify-between relative left-3 top-[108px]">
                <label className="font-medium">Escala de tono:</label>
                <select
                value={layersPropertyStyle.pitchScale}
                onChange={(e)=>setLayerPropertyStyle({...layersPropertyStyle, pitchScale: e.target.value})}
                className={`${styleInput}`}
                >
                    <option value="map" label="Map" />
                    <option value="viewport" label="Viewport" />
                </select>
            </div>
            <div className="flex w-40 justify-between relative left-3 top-[120px]">
            <label className="font-medium">Adapt on zoom</label>
            <input id="circle-adapt-on-zoom"
            type="checkbox"
            value={layersPropertyStyle.adaptOnZoom}
            onChange={(e) => {
                setLayerPropertyStyle({...layersPropertyStyle, adaptOnZoom: e.target.checked});
            }} />
            </div>
        </>
        }
      </div>
  )
}
