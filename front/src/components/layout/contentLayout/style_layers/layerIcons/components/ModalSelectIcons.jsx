import { useLocalState } from "../../../../../context/CleanLocalState";
import iconData from "../../data_icons.json"
const iconToOmit = ["road_3", "road_4", "road_5", "road_6", "us-state_3", "us-state_4", "us-state_5", "us-state_6"];

export default function ModalSelectIcons() {
    const { setOpenIconSelect, setLayerIconProperties, layerIconProperties} = useLocalState()
    const handleIconSelect = (iconName) => {
        setLayerIconProperties({...layerIconProperties, icon: iconName})
      };
      return (
        <div className="absolute p-2 z-[50] bg-[#fff] border rounded">
            <div className=' flex flex-col overflow-y-auto overflow-x-hidden  w-[250px] h-[250px] bg-[#fff] border rounded '>
            <div className=" relative">
                {Object.entries(iconData).map(([iconName, iconInfo]) => (
                !iconToOmit.includes(iconName) &&
                <button key={iconName} onClick={() => handleIconSelect(iconName)}
                    className="tooltip relative border rounded w-10 h-10 m-1 pr-4 pb-4"
                >
                    <span className="absolute"
                    style={{
                        width: `${iconInfo.width}px`,
                        height: `${iconInfo.height}px`,
                        backgroundImage: 'url(https://demotiles.maplibre.org/styles/osm-bright-gl-style/sprite.png)',
                        backgroundPosition: `-${iconInfo.x}px -${iconInfo.y}px`,
                    }} 
                    />
                <span key={iconName} className="tooltiptextup absolute top-5">{iconName}</span>

                </button>
                ))}
            </div>
        
            </div>
            <div>
                <button className="p-1 border rounded mt-1" onClick={()=>setOpenIconSelect(false)}>Cerrar</button>
            </div>
        </div>
      );
}


