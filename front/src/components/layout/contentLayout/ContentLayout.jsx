import { useState } from "react";
import LayerCircleForm from "./style_layers/style_layer_circle/LayerCircleForm";


  export default function ContentLayout({showPanel}) {
    const [openLayerCircle, setOpenLayerCircle] = useState(true);
    const [openLayerIcon, setOpenLayerIcon] = useState(false);


    return (
      <div className='relative -left-0'>
        <div className="flex">
          <button className={`${openLayerCircle ? "border-b-transparent":"bg-gray-200"} border w-full`}
          onClick={()=>{setOpenLayerCircle(true),setOpenLayerIcon(false)}}
          >
            Circle Layer
          </button>
          <button className={`${openLayerIcon ? "border-b-transparent":"bg-gray-200"}  border w-full`}
          onClick={()=>{setOpenLayerIcon(true) , setOpenLayerCircle(false)}}
          >
            Circle Icon
          </button>
        </div>
        {openLayerCircle && 
          <LayerCircleForm />
        }
      </div>
    );
  }
