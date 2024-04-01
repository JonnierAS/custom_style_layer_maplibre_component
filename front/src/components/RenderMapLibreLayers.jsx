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
            {!layerIconProperties.showIcon && 
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
            />}
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
                  "icon-overlap": layerIconProperties.overlap,
                  "icon-rotate": layerIconProperties.rotate,
                  "icon-pitch-alignment": layerIconProperties.pitchAlignment,
                  "icon-size": layerIconProperties.size,
                  "text-field": layerIconProperties.textOptional ? `{${layerIconProperties.textField}}`: null,
                  "text-font": ["Open Sans Regular"],
                  "text-size": layerIconProperties.textSize,
                  "text-transform": layerIconProperties.textTransform,
                  "text-offset":  [layerIconProperties.textOffsetX,layerIconProperties.textOffsetY],
                  "text-allow-overlap": layerIconProperties.textOverlap,
                  "text-rotate": layerIconProperties.textRotate,
                  "text-anchor": layerIconProperties.textAnchor,
                  "text-optional": layerIconProperties.textOptional
                }}
                paint={{
                  "icon-color": layerIconProperties.color || "#6e548c",
                  "icon-halo-width": layerIconProperties.haloWidth|| 1,
                  "icon-halo-color": layerIconProperties.haloColor || "#000000",
                  "text-color": layerIconProperties.textColor,
                }}
              />
            }
          </Source>
        </>
        ): null}
    </div>
  )
}
