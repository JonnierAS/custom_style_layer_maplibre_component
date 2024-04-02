import React, { useState } from 'react'
import { ColorWheelIcon } from "@radix-ui/react-icons";
import { useLocalState } from '../../../../../context/CleanLocalState';
import { styleDivContainer, styleInput, styleLabel } from '../helper/styleTypeTailwindcss';
import HexAlphaColor from '../../components/HexAlphaColor';

export default function TextStyleIcon() {
  const {layerIconProperties,capaProperties, setLayerIconProperties} = useLocalState()
  const [iconProperties, setIconProperties] = useState({
    openIconColor: false,
    colorIconState: "#6e548c"
  });
  
  const handleColorChange = (colorProp) => {
    setIconProperties({ ...iconProperties, colorIconState: colorProp });
    setLayerIconProperties({ ...layerIconProperties, iconTextColor: colorProp });
  };
  return (
    <fieldset className={`${styleDivContainer} flex-col gap-5 top-10`}>
        <legend className='text-lg text-center'>Texto</legend>
          <div className={styleDivContainer}>
          <label className={styleLabel}>Color:</label>
          <button onClick={() =>setIconProperties({ ...iconProperties, openIconColor: true })}
            className={`tooltip hover:bg-gray-300 p-1 right-3 top-[-4px] rounded-md ${iconProperties.openIconColor ? "bg-gray-300" : ""}`}
          >
            <ColorWheelIcon />
            <span className="tooltiptextup">{iconProperties.openIconColor ? "Finalice la acción anterior" : "Cambiar estilo"}</span>
          </button>
        </div>

        {iconProperties.openIconColor && (
          <HexAlphaColor colorIconState={iconProperties.colorIconState} handleColorChange={handleColorChange} setOpenIconColor={setIconProperties}/>
        )}

        {/* Select properties */}
        <div className={styleDivContainer}>
          <label className={styleLabel}>Elegir etiqueta</label>
          <select className={styleInput} value={layerIconProperties.iconTextField}
            onChange={(e) => setLayerIconProperties({ ...layerIconProperties, iconTextField: e.target.value })}
          >
            {capaProperties && capaProperties?.map((name, index) => (
              <option key={index} value={name}>{name}</option>
            ))}
          </select>
        </div>

        <div className={styleDivContainer}>
          <label className={styleLabel}>Tamaño</label>
          <input className={styleInput} type="number" value={layerIconProperties.iconTextSize} min={12} max={32} step={2} 
          onChange={(e) =>setLayerIconProperties({...layerIconProperties,iconTextSize: Number.parseInt(e.target.value)})} />
        </div>
        <div className={styleDivContainer}>
          <label className={styleLabel}>Transformacion</label>
          <select className={styleInput} value={layerIconProperties.iconTextTransform}
            onChange={(e) => setLayerIconProperties({...layerIconProperties,iconTextTransform: e.target.value})}
          >
            <option value="none" label="none"/>
            <option value="uppercase" label="Uppercase"/>
            <option value="lowercase" label="Lowercase"/>
          </select>
        </div>
        <div className={styleDivContainer}>
          <label className={styleLabel}>Desplazamiento X</label>
          <input className={styleInput} value={layerIconProperties.iconTextOffsetX} type="number" min={0} step={1} max={20}
            onChange={(e) =>setLayerIconProperties({...layerIconProperties, iconTextOffsetX: Number.parseInt(e.target.value)})}
          />
        </div>

        <div className={styleDivContainer}>
          <label className={styleLabel}>Desplazamiento Y</label>
          <input className={styleInput} value={layerIconProperties.iconTextOffsetY} type="number" min={0} step={1} max={20}
            onChange={(e) =>setLayerIconProperties({...layerIconProperties,iconTextOffsetY: Number.parseInt(e.target.value)})}
          />
        </div>

        <div className={styleDivContainer}>
          <label className={styleLabel}>Superposición</label>
          <select className={styleInput}  value={layerIconProperties.iconTextOverlap}
            onChange={(e) => setLayerIconProperties({...layerIconProperties, iconTextOverlap: e.target.value})}
          >
            <option value={false} label="Never"/>
            <option value={true} label="Always"/>
          </select>
        </div>
        <div className={styleDivContainer}>
          <label className={styleLabel}>Rotacion</label>
          <input className={styleInput} type="number" min={0} max={360} step={45}  value={layerIconProperties.iconTextRotate}
            onChange={(e) =>setLayerIconProperties({...layerIconProperties,iconTextRotate: Number.parseInt(e.target.value)})}
          />
        </div>

        <div className={styleDivContainer}>
          <label className={styleLabel}>Ancla</label>
          <select  className={styleInput} value={layerIconProperties.iconTextAnchor}
            onChange={(e) => setLayerIconProperties({...layerIconProperties,iconTextAnchor: e.target.value})}
          >
            <option value="center" label="Center"/>
            <option value="top" label="Top"/>
            <option value="bottom" label="Bottom"/>
            <option value="left" label="Left"/>
            <option value="right" label="Right"/>
          </select>
        </div>
        <div className={styleDivContainer}>
          <label className={styleLabel}>Texto Visible</label>
          <input type="checkbox" checked={layerIconProperties.iconTextOptional}
            onChange={(e) => {setLayerIconProperties({...layerIconProperties,iconTextOptional: e.target.checked})}}
          />
        </div>
      </fieldset>
  )
}
