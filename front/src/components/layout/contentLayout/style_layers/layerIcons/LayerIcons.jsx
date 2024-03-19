import {ColorWheelIcon} from "@radix-ui/react-icons";
import { useState } from "react";
import HexAlphaColor from "../components/HexAlphaColor";

export default function LayerIcons() {
    const [openIconColor, setOpenIconColor] = useState(false)
    const [colorIconState, setColorIconState] = useState("#6e548c")
    
    const handleColorChange = (color)=>{
        setColorIconState(color)
    }
  
    return (
    <div className="text-center relative top-5">
        <div className="flex w-40 justify-between relative left-3 top-5">
            <label className="font-medium">Color:</label>
            <button
            onClick={()=>setOpenIconColor(true)}
            className={`${
                openIconColor
                ? "bg-gray-300"
                : ""
            } tooltip hover:bg-gray-300  p-1 right-7 top-[-4px] rounded-md `}
            >
            <ColorWheelIcon />
            <span className="tooltiptextup">
                {openIconColor
                ? "Finalice la accion anterior"
                : "Cambiar estilo"}
            </span>
            </button>
        </div>
        {openIconColor  && (
          <HexAlphaColor colorIconState={colorIconState} handleColorChange={handleColorChange} setOpenIconColor={setOpenIconColor} />
        )}
    </div>
  )
}
