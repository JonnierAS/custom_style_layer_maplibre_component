import React from 'react'
import { useSelector } from 'react-redux'
import { Layer, Source } from "react-map-gl";
import { useLocalState } from './context/CleanLocalState'

export default function RenderMapLibreLayers() {
    const {layersPropertyStyle, layerIconProperties} = useLocalState()
    const layerName = useSelector(state => state.layerName?.label)
    const urlTile = `${import.meta.env.VITE_URL_GEOSERVER}/gwc/service/tms/1.0.0/azzorti_vt:${layerName}@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf`
  return (
    <div>
        {layerName && layerName !== "Sin Capa" ? (
          <>
            <Source key={layerName + "layers"} id={layerName} type="vector" scheme="tms" name={layerName} tiles={[urlTile]}>
            <Layer
              id={`${layerName}-layer`}
              type="fill"
              source={layerName}
              key={`${layerName}-layer`}
              source-layer={layerName}
              paint={{
                "fill-color": layersPropertyStyle.colorBase || "#6e548c",
              }}
            />
            <Layer
              id={`${layerName}-line`}
              type="line"
              source={layerName}
              key={`${layerName}-line`}
              source-layer={layerName}
              paint={{
                "line-color": layersPropertyStyle.lineColor ||  "#222",
                "line-width": layersPropertyStyle.strokeWidth || 1,
                "line-blur": layersPropertyStyle.blurLayer || 1
              }}
            />
            <Layer
              id={`${layerName}-label`}
              key={`${layerName}-label`}
              type="symbol"
              source={layerName}
              source-layer={layerName}
              filter={["!=", "$type", "Point"]}
              layout={{
                "text-anchor": layersPropertyStyle.textAnchor,
                "text-field": layersPropertyStyle.textOptional ? `{${layersPropertyStyle.textField}}`: null,
                "text-font": ["Open Sans Regular"],
                "text-size": layersPropertyStyle.textSize,
                "text-allow-overlap": layersPropertyStyle.textOverlap == true,
              }}
              paint={{"text-color": layersPropertyStyle.textColor}}
            />
          </Source>
          <Source key={`${layerName}-`} id={`${layerName}-`} type="vector" scheme="tms" name={layerName} tiles={[urlTile]}>
          
            <Layer
              type="circle"
              source={layerName}
              id={`${layerName}-circle`}
              key={`${layerName}-circle`}
              source-layer={layerName}
              filter={["==", "$type", "Point"]}
              paint={{
                "circle-color": layersPropertyStyle.colorBase || "#6e548c",
                "circle-stroke-width": layersPropertyStyle.strokeWidth || 1,
                "circle-stroke-color": layersPropertyStyle.lineColor || "#000000",
                "circle-blur": layersPropertyStyle.blurLayer || 1,
                "circle-radius": {
                  stops: [[0, 9], [10,layersPropertyStyle.radius]],
                  base: 1.75
                },
                "circle-pitch-alignment": layersPropertyStyle.pitchAligment,
                "circle-pitch-scale": layersPropertyStyle.pitchScale
              }}
              maxzoom={layerIconProperties.showIcon ? 12 : 24}
            />
          
            {layerIconProperties.showIcon && 
              <Layer
                type="symbol"
                source={layerName}
                id={`${layerName}-icon`}
                key={`${layerName}-icon`}
                source-layer={layerName}
                filter={["==", "$type", "Point"]}
                layout={{
                  "icon-image": layerIconProperties.icon,
                  "icon-overlap": layerIconProperties.iconOverlap,
                  "icon-rotate": layerIconProperties.iconRotate,
                  "icon-pitch-alignment": layerIconProperties.iconPitchAlignment,
                  "icon-size": layerIconProperties.iconSize,
                  "text-field": layerIconProperties.iconTextOptional ? `{${layerIconProperties.iconTextField}}`: "",
                  "text-font": ["Open Sans Regular"],
                  "text-size": layerIconProperties.iconTextSize,
                  "text-transform": layerIconProperties.iconTextTransform,
                  "text-offset":  [layerIconProperties.iconTextOffsetX,layerIconProperties.iconTextOffsetY],
                  "text-allow-overlap": layerIconProperties.iconTextOverlap == true,
                  "text-rotate": layerIconProperties.iconTextRotate,
                  "text-anchor": layerIconProperties.iconTextAnchor,
                  "text-optional": layerIconProperties.iconTextOptional
                }}
                paint={{
                  "icon-color": layerIconProperties.iconColor || "#6e548c",
                  "icon-halo-width": layerIconProperties.iconHaloWidth|| 1,
                  "icon-halo-color": layerIconProperties.iconHaloColor || "#000000",
                  "text-color": layerIconProperties.iconTextColor,
                }}
                minzoom={11}
              />
            }
          </Source>
        </>
        ): null}
    </div>
  )
}
