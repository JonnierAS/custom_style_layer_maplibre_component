import {
    HexColorInput,
    HexAlphaColorPicker,RgbaColorPicker
  } from "react-colorful";

export default function HexAlphaColor({openModalChangeColor,mapRender,colorIconState,setOpenIconColor,layersPropertyStyle, handleColorChange, setOpenModalChangeColor}) {
  
  const handleClick = ()=>{
    setOpenIconColor 
    ? setOpenIconColor(false)
    : setOpenModalChangeColor({state: false, type: ""})
  }

  return (
    <div className="absolute z-[1000] bg-white w-[160px] h-[220px] rounded-lg p-1 flex items-center justify-center text-xs right-5 border-2">
            <div className="space-y-1 flex flex-col p-1">
              {mapRender === "deckGl" ? (
                <RgbaColorPicker
                color={colorIconState || layersPropertyStyle?.colorBaseDeck || layersPropertyStyle?.lineColorDeck || "110, 84, 140"}
                onChange={handleColorChange}
                className="color-demographic"
                style={{ height: "140px", width: "140px" }}
              />
              ): (
              <>
              <HexAlphaColorPicker
                color={colorIconState || layersPropertyStyle?.colorBase || layersPropertyStyle?.lineColor}
                onChange={handleColorChange}
                className="color-demographic"
                style={{ height: "140px", width: "140px" }}
              />
              <HexColorInput
                className={`p-3 rounded border-2 font-sans font-medium h-6 w-full`}
                prefixed
                alpha
                color={ openModalChangeColor?.type === "line" ? layersPropertyStyle?.lineColor : layersPropertyStyle?.colorBase || colorIconState}
                onChange={handleColorChange}
              />
              </>
              )}
              
              <button
                onClick={handleClick}
                className="w-full p-1 border-2 font-medium rounded hover:bg-gray-300 "
              >
                Finalizar / Cerrar
              </button>
            </div>
          </div>
  )
}
