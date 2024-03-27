import { ColorWheelIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import HexAlphaColor from "../../components/HexAlphaColor";
import { useLocalState } from "../../../../../context/CleanLocalState";
import { styleDivContainer, styleInput, styleLabel } from "../helper/styleTypeTailwindcss";
import { useSelector } from "react-redux";
import { setLayoutProperties } from "../../services/symbol";

export default function LayerIcons() {
  const mapRef = useSelector(state=> state.mapRef)
  const layerName = useSelector(state => state.layerName?.label)
  const { layerIconProperties, setLayerIconProperties } = useLocalState();
  const [iconProperties, setIconProperties] = useState({
    openIconColor: false,
    colorIconState: "#6e548c"
  });

  const handleColorChange = (colorProp) => {
    setIconProperties({ ...iconProperties, colorIconState: colorProp });
    setLayerIconProperties({ ...layerIconProperties, color: colorProp });
  };

  useEffect(() => {
    if(layerName === "Sin Capa" || !mapRef?.current  || !layerName) return;
    const iconMap = mapRef?.current.getMap()
    const layerId = `${layerName}-icon`
    if (iconMap) {
      setLayoutProperties(iconMap, layerId, {
        "icon-size": layerIconProperties.adaptOnZoom
          ? [
              "interpolate",
              ["linear"],
              ["zoom"],
              0,
              layerIconProperties.minZoomIconSize,
              24,
              layerIconProperties.maxZoomIconSize,
            ]
          : 1,
      });
    }
  }, [mapRef,layerIconProperties]);

  return (
    <div className="text-center relative top-5 flex flex-col gap-5">
      <div className={styleDivContainer}>
        <label className={styleLabel}>Color:</label>
        <button
          onClick={() =>
            setIconProperties({ ...iconProperties, openIconColor: true })
          }
          className={`tooltip hover:bg-gray-300 p-1 right-3 top-[-4px] rounded-md ${
            iconProperties.openIconColor ? "bg-gray-300" : ""
          }`}
        >
          <ColorWheelIcon />
          <span className="tooltiptextup">
            {iconProperties.openIconColor
              ? "Finalice la acción anterior"
              : "Cambiar estilo"}
          </span>
        </button>
      </div>
      {iconProperties.openIconColor && (
        <HexAlphaColor
          colorIconState={iconProperties.colorIconState}
          handleColorChange={handleColorChange}
          setOpenIconColor={setIconProperties}
        />
      )}
      <div className={styleDivContainer}>
        <label className={styleLabel}>Icono</label>
        <select
          className={styleInput}
          value={layerIconProperties.icon}
          onChange={(e) =>
            setLayerIconProperties({
              ...layerIconProperties,
              icon: e.target.value,
            })
          }
        >
          <option value="">Pick an icon</option>
          <option value="mountain" label="Mountain" />
          <option value="city" label="City" />
          <option value="lake" label="Lake" />
        </select>
      </div>
      <div className={` ${styleDivContainer} `}>
        <label className={styleLabel}>Tamaño del icono</label>
        <input
          className={styleInput}
          type="number"
          step={0.1}
          min={0}
          max={2}
          value={layerIconProperties.size}
          onChange={(e) =>
            setLayerIconProperties({
              ...layerIconProperties,
              size: Number.parseFloat(e.target.value),
            })
          }
        />
      </div>
      <div className={` ${styleDivContainer} `}>
        <label className={styleLabel}>Ancho del Halo</label>
        <input
          className={styleInput}
          type="number"
          min={0}
          max={10}
          value={layerIconProperties.haloWidth}
          onChange={(e) =>
            setLayerIconProperties({
              ...layerIconProperties,
              haloWidth: Number.parseInt(e.target.value),
            })
          }
        />
      </div>
      {layerIconProperties.haloWidth > 0 && (
        <>
          <div className={` ${styleDivContainer} `}>
            <label className={styleLabel}>Color del Halo</label>
            <select
              className={styleInput}
              value={layerIconProperties.haloColor}
              onChange={(e) =>
                setLayerIconProperties({
                  ...layerIconProperties,
                  haloColor: e.target.value,
                })
              }
            >
              <option value="">Pick a color</option>
              <option value="red" label="Red" />
              <option value="green" label="Green" />
              <option value="blue" label="Blue" />
            </select>
          </div>
          <div className={` ${styleDivContainer} `}>
            <label className={styleLabel}>Desenfoque del Halo</label>
            <input
              type="number"
              min={0}
              step={0.25}
              max={5}
              className={styleInput}
              value={layerIconProperties.haloBlur}
              onChange={(e) =>
                setLayerIconProperties({
                  ...layerIconProperties,
                  haloBlur: Number.parseFloat(e.target.value),
                })
              }
            />
          </div>
        </>
      )}
      <div className={` ${styleDivContainer} `}>
        <label className={styleLabel}>Superposición</label>
        <select
          className={styleInput}
          value={layerIconProperties.overlap}
          onChange={(e) =>
            setLayerIconProperties({
              ...layerIconProperties,
              overlap: e.target.value,
            })
          }
        >
          <option value="never" label="Never" />
          <option value="always" label="Always" />
          <option value="cooperative" label="Cooperative" />
        </select>
      </div>
      <div className={` ${styleDivContainer} `}>
        <label className={styleLabel}>Rotación</label>
        <input
          type="number"
          min={0}
          max={360}
          step={45}
          className={styleInput}
          value={layerIconProperties.rotate}
          onChange={(e) =>
            setLayerIconProperties({
              ...layerIconProperties,
              rotate: Number.parseInt(e.target.value),
            })
          }
        />
      </div>
      <div className={styleDivContainer}>
        <label className={styleLabel}>Alineación de tono</label>
        <select
          className={styleInput}
          value={layerIconProperties.pitchAlignment}
          onChange={(e) =>
            setLayerIconProperties({
              ...layerIconProperties,
              pitchAlignment: e.target.value,
            })
          }
        >
          <option value="auto" label="Auto" />
          <option value="map" label="Map" />
          <option value="viewport" label="Viewport" />
        </select>
      </div>
      <div className={styleDivContainer}>
        <label className={styleLabel}>Adapt on zoom</label>
        <input
          type="checkbox"
          value={layerIconProperties.adaptOnZoom}
          onChange={(e) => {
            setLayerIconProperties({
              ...layerIconProperties,
              adaptOnZoom: e.target.checked,
            });
          }}
        />
      </div>
      {layerIconProperties.adaptOnZoom && (
         <div className="relative text-[11px]">
         <div className="flex w-60 justify-between relative left-4">
           <label className="font-medium w-24">
             Tamaño del icono (at zoom 0)
           </label>
           <input type="number"
           value={layerIconProperties.minZoomIconSize}
           className={`${styleInput} relative left-[-5px]`}
           onChange={(e) =>
            setLayerIconProperties({...layerIconProperties, minZoomIconSize: Number.parseFloat(e.target.value)})
           }
           step={0.1}
           min={0.1} />
         </div>
         <div className="flex w-46 justify-between relative top-3 left-3 ">
           <label className="font-medium w-24">
           Tamaño del icono (at zoom 24)
           </label>
           <input id="circle-adapt-on-max-zoom-radius"
           type="number"
           value={layerIconProperties.maxZoomIconSize}
           className={`${styleInput}`}
           onChange={(e) =>
            setLayerIconProperties({...layerIconProperties, maxZoomIconSize: Number.parseFloat(e.target.value)})
           }
           step={0.1} />
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
