import { useState } from "react";
import LayerStyle from "./style_layers/LayerStyle/LayerStyle";


  export default function ContentLayout({showPanel}) {
    const [openLayerCircle, setOpenLayerCircle] = useState(true);
    const [openLayerIcon, setOpenLayerIcon] = useState(false);


    return (
      <div className='relative -left-0 text-xs'>
        <div className="flex">
          <button className={`${openLayerCircle ? "border-b-transparent":"bg-gray-200"} border p-1 w-full`}
          onClick={()=>{setOpenLayerCircle(true),setOpenLayerIcon(false)}}
          >
            Estilizar Capa
          </button>
          <button className={`${openLayerIcon ? "border-b-transparent":"bg-gray-200"}  border p-1 w-full`}
          onClick={()=>{setOpenLayerIcon(true) , setOpenLayerCircle(false)}}
          >
            Circle Icon
          </button>
        </div>
        {openLayerCircle && 
          <LayerStyle />
        }
      </div>
    );
  }
