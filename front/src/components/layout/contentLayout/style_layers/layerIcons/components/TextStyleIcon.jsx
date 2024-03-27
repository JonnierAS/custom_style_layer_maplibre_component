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
    setLayerIconProperties({ ...layerIconProperties, textColor: colorProp });
  };
  return (
    <fieldset className={`${styleDivContainer} flex-col gap-5 top-10`}>
        <legend className='text-lg text-center'>Texto</legend>
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
        {/* Select properties */}
        <div className={styleDivContainer}>
          <label className={styleLabel}>Elegir etiqueta</label>
          <select
            className={styleInput}
            value={layerIconProperties.textField}
            onChange={(e) => setLayerIconProperties({ ...layerIconProperties, textField: e.target.value })}
          >
            {capaProperties && capaProperties?.map((name, index) => (
              <option key={index} value={name}>{name}</option>
            ))}
          </select>
        </div>

        <div className={styleDivContainer}>
          <label className={styleLabel}>Tamaño</label>
          <input
            className={styleInput}
            type="number"
            value={layerIconProperties.textSize}
            min={12}
            max={32}
            step={2}
            onChange={(e) =>
              setLayerIconProperties({...layerIconProperties,textSize: Number.parseInt(e.target.value)})
            }
          ></input>
        </div>
        <div className={styleDivContainer}>
          <label className={styleLabel}>Transformacion</label>
          <select
            className={styleInput}
            value={layerIconProperties.textTransform}
            onChange={(e) => setLayerIconProperties({...layerIconProperties,textTransform: e.target.value})}
          >
            <option value="none" label="none"></option>
            <option value="uppercase" label="Uppercase"></option>
            <option value="lowercase" label="Lowercase"></option>
          </select>
        </div>
        <div className={styleDivContainer}>
          <label className={styleLabel}>Desplazamiento X</label>
          <input
            className={styleInput}
            value={layerIconProperties.textOffsetX}
            type="number"
            min={0}
            step={1}
            max={20}
            onChange={(e) =>
              setLayerIconProperties({...layerIconProperties, textOffsetX: Number.parseInt(e.target.value)})
            }
          ></input>
        </div>
        <div className={styleDivContainer}>
          <label className={styleLabel}>Desplazamiento Y</label>
          <input
            className={styleInput}
            value={layerIconProperties.textOffsetY}
            type="number"
            min={0}
            step={1}
            max={20}
            onChange={(e) =>
              setLayerIconProperties({...layerIconProperties,textOffsetY: Number.parseInt(e.target.value)})
            }
          ></input>
        </div>
        <div className={styleDivContainer}>
          <label className={styleLabel}>Superposición</label>
          <select
            className={styleInput}
            value={layerIconProperties.textOverlap}
            onChange={(e) => setLayerIconProperties({...layerIconProperties, textOverlap: e.target.value})}
          >
            <option value={false} label="Never"></option>
            <option value={true} label="Always"></option>
          </select>
        </div>
        <div className={styleDivContainer}>
          <label className={styleLabel}>Rotacion</label>
          <input
            className={styleInput}
            type="number"
            min={0}
            max={360}
            step={45}
            value={layerIconProperties.textRotate}
            onChange={(e) =>
              setLayerIconProperties({...layerIconProperties,textRotate: Number.parseInt(e.target.value)})
            }
          ></input>
        </div>
        <div className={styleDivContainer}>
          <label className={styleLabel}>Ancla</label>
          <select
            className={styleInput}
            value={layerIconProperties.textAnchor}
            onChange={(e) => setLayerIconProperties({...layerIconProperties,textAnchor: e.target.value})}
          >
            <option value="center" label="Center"></option>
            <option value="top" label="Top"></option>
            <option value="bottom" label="Bottom"></option>
            <option value="left" label="Left"></option>
            <option value="right" label="Right"></option>
          </select>
        </div>
        <div className={styleDivContainer}>
          <label className={styleLabel}>Texto Visible</label>
          <input
            type="checkbox"
            checked={layerIconProperties.textOptional}
            onChange={(e) => {
              setLayerIconProperties({...layerIconProperties,textOptional: e.target.checked});
            }}
          ></input>
        </div>
      </fieldset>
  )
}
