import {ColorWheelIcon} from "@radix-ui/react-icons";

export default function ContentlayerStyle({typeOfLayer, styleInput, openModalChangeColor, setOpenModalChangeColor, setLayerPropertyStyle, layersPropertyStyle}) {
    const openModalChangeColorHandler = (typeColor) => {
        setOpenModalChangeColor({state: true, type: typeColor});
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
