import { ColorWheelIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import HexAlphaColor from "../components/HexAlphaColor";
import { useLocalState } from "../../../../context/CleanLocalState";
import { styleDivContainer, styleInput, styleLabel } from "./styleTypeTailwindcss";

export default function LayerIcons() {
  const { layerIconProperties, setLayerIconProperties } = useLocalState();
  const [iconProperties, setIconProperties] = useState({
    openIconColor: false,
    colorIconState: "#6e548c"
  });

  const handleColorChange = (colorProp) => {
    setIconProperties({ ...iconProperties, colorIconState: colorProp });
    setLayerIconProperties({ ...layerIconProperties, color: colorProp });
  };

  return (
    <div className="text-center relative top-5 flex flex-col gap-5">
      <div className={`${styleDivContainer} `}>
        <label className={styleLabel}>Color:</label>
        <button
          onClick={() => setIconProperties({ ...iconProperties, openIconColor: true })}
          className={`tooltip hover:bg-gray-300 p-1 right-3 top-[-4px] rounded-md ${
              iconProperties.openIconColor ? "bg-gray-300" : ""
            }`}
        >
          <ColorWheelIcon />
          <span className="tooltiptextup">
            {iconProperties.openIconColor ? "Finalice la acción anterior" : "Cambiar estilo"}
          </span>
        </button>
      </div>
      {iconProperties.openIconColor && (
        <HexAlphaColor colorIconState={iconProperties.colorIconState} handleColorChange={handleColorChange} setOpenIconColor={setIconProperties} />
      )}
      <div className={`${styleDivContainer} `}>
        <label className={styleLabel}>Icono</label>
        <select
          className={styleInput}
          value={layerIconProperties.icon}
          onChange={(e) => setLayerIconProperties({ ...layerIconProperties, icon: e.target.value })}
        >
          <option value="">Pick an icon</option>
          <option value="mountain" label="Mountain" />
          <option value="city" label="City" />
          <option value="lake" label="Lake" />
        </select>
      </div>
      <div className={` ${styleDivContainer} `}>
        <label className={styleLabel}>Ancho del Halo</label>
        <input
          className={styleInput}
          type="number"
          min={0}
          max={10}
          value={layerIconProperties.haloWidth}
          onChange={(e) => setLayerIconProperties({ ...layerIconProperties, haloWidth: Number.parseInt(e.target.value) })}
        />
      </div>
      {layerIconProperties.haloWidth > 0 && (
        <>
          <div className={` ${styleDivContainer} `}>
            <label className={styleLabel}>Color del Halo</label>
            <select
              className={styleInput}
              value={layerIconProperties.haloColor}
              onChange={(e) => setLayerIconProperties({ ...layerIconProperties, haloColor: e.target.value })}
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
              onChange={(e) => setLayerIconProperties({ ...layerIconProperties, haloBlur: Number.parseFloat(e.target.value) })}
            />
          </div>
        </>
      )}
      <div className={` ${styleDivContainer} `}>
        <label className={styleLabel}>Overlap</label>
        <select
          className={styleInput}
          value={layerIconProperties.overlap}
          onChange={(e) => setLayerIconProperties({ ...layerIconProperties, overlap: e.target.value })}
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
          onChange={(e) => setLayerIconProperties({ ...layerIconProperties, rotate: Number.parseInt(e.target.value) })}
        />
      </div>
      <div className={`${styleDivContainer} `}>
        <label className={styleLabel}>Alineación de tono</label>
        <select
          className={styleInput}
          value={layerIconProperties.pitchAlignment}
          onChange={(e) => setLayerIconProperties({ ...layerIconProperties, pitchAlignment: e.target.value })}
        >
          <option value="auto" label="Auto" />
          <option value="map" label="Map" />
          <option value="viewport" label="Viewport" />
        </select>
      </div>
    </div>
  );
}
