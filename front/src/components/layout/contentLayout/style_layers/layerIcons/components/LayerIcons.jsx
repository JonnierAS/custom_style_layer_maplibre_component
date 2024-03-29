import { MixIcon } from "@radix-ui/react-icons";
import { useEffect } from "react";
import { useLocalState } from "../../../../../context/CleanLocalState";
import { styleDivContainer, styleInput, styleLabel } from "../helper/styleTypeTailwindcss";
import { useSelector } from "react-redux";
import { setLayoutProperties } from "../../services/symbol";
import ModalSelectIcons from "./ModalSelectIcons";

export default function LayerIcons() {
  const mapRef = useSelector(state=> state.mapRef)
  const layerName = useSelector(state => state.layerName?.label)
  const { layerIconProperties, setLayerIconProperties,openIconSelect, setOpenIconSelect } = useLocalState();
  


  useEffect(() => {
    if(layerName === "Sin Capa" || !mapRef?.current  || !layerName) return;
    const iconMap = mapRef.current.getMap();
    const layerId = `${layerName}-icon`;
    if (iconMap) {
      setLayoutProperties(iconMap, layerId, {
        "icon-size": layerIconProperties.adaptOnZoom
          ? ["interpolate", ["linear"], ["zoom"], 0, layerIconProperties.minZoomIconSize, 24, layerIconProperties.maxZoomIconSize]
          : 1,
      });
    }
  }, [mapRef, layerIconProperties]);

  return (
    <div className="text-center relative top-5 flex flex-col gap-5">
      <div className={styleDivContainer}>
        <div>
          <label className={styleLabel}>Icono</label>
          <button className={`tooltip relative right-[-95px] p-1 rounded ${openIconSelect && "bg-gray-300"}`} onClick={()=>setOpenIconSelect(true)}>
            <MixIcon />
            <span className="tooltiptextup">Elegir icono</span>

          </button>
        </div>
        <div className="relative left-[100px]">
          <label className={styleLabel}>Mostrar icono</label>
          <input type="checkbox" 
            className="relative left-3 top-1" value={layerIconProperties.showIcon}
            onChange={(e) => setLayerIconProperties({...layerIconProperties,showIcon: e.target.checked,})}
          />
        </div>
      </div>
      {openIconSelect &&
        <ModalSelectIcons setOpenIconSelect={setOpenIconSelect} />
      }

      <div className={` ${styleDivContainer} `}>
        <label className={styleLabel}>Tamaño del icono</label>
        <input className={styleInput} type="number" step={0.5}
          min={0} max={10} value={layerIconProperties.size}
          onChange={(e) => setLayerIconProperties({ ...layerIconProperties, size: Number.parseFloat(e.target.value)})}/>
      </div>

      <div className={` ${styleDivContainer} `}>
        <label className={styleLabel}>Superposición</label>
        <select className={styleInput} value={layerIconProperties.overlap}
          onChange={(e) => setLayerIconProperties({...layerIconProperties, overlap: e.target.value})} >
          <option value="never" label="Never" />
          <option value="always" label="Always" />
          <option value="cooperative" label="Cooperative" />
        </select>
      </div>

      <div className={` ${styleDivContainer} `}>
        <label className={styleLabel}>Rotación</label>
        <input type="number" min={0}  max={360}  step={45} className={styleInput}
          value={layerIconProperties.rotate}
          onChange={(e) =>setLayerIconProperties({...layerIconProperties, rotate: Number.parseInt(e.target.value)})} />
      </div>

      <div className={styleDivContainer}>
        <label className={styleLabel}>Alineación de tono</label>
        <select className={styleInput} value={layerIconProperties.pitchAlignment}
          onChange={(e) =>setLayerIconProperties({...layerIconProperties,pitchAlignment: e.target.value})}>
          <option value="auto" label="Auto" />
          <option value="map" label="Map" />
          <option value="viewport" label="Viewport" />
        </select>
      </div>

      <div className={styleDivContainer}>
        <label className={styleLabel}>Adapt on zoom</label>
        <input type="checkbox" value={layerIconProperties.adaptOnZoom}
          onChange={(e) => setLayerIconProperties({...layerIconProperties,adaptOnZoom: e.target.checked,})}/>
      </div>

      {layerIconProperties.adaptOnZoom && (
        <div className="relative text-[11px]">
          <div className="flex w-60 justify-between relative left-4">
            <label className="font-medium w-24">Tamaño del icono (at zoom 0)</label>
            <input type="number" value={layerIconProperties.minZoomIconSize}
              className={`${styleInput} relative left-[-5px]`}
              onChange={(e) =>setLayerIconProperties({...layerIconProperties, minZoomIconSize: Number.parseFloat(e.target.value)})}
              step={0.1}min={0.1} />
          </div>

          <div className="flex w-46 justify-between relative top-3 left-3 ">
            <label className="font-medium w-24">Tamaño del icono (at zoom 24)</label>
            <input type="number" value={layerIconProperties.maxZoomIconSize}
              className={`${styleInput}`}
              onChange={(e) =>setLayerIconProperties({...layerIconProperties, maxZoomIconSize: Number.parseFloat(e.target.value)})}
              step={0.1} 
            />
          </div>
          <p className="mt-4 justify-start">
              Las propiedades que admiten expresiones de interpolación pueden cambiar cuando
              Cambia de zoom. Se puede establecer un valor para cada nivel de zoom
          </p>
       </div>
      )}
    </div>
  );
}
