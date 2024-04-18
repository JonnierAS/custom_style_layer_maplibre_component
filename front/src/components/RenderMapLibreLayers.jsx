import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Layer, Source } from "react-map-gl";
import { useLocalState } from './context/CleanLocalState'
import * as h3 from 'h3-js';
import SingaporeData from './SingaporeData';

export default function RenderMapLibreLayers() {
    const {layersPropertyStyle, layerIconProperties} = useLocalState()
    const [dataURL, setDataURl] = useState(null)
    const layerName = useSelector(state => state.layerName?.label)
    const dataUrlFetch = `${import.meta.env.VITE_URL_GEOSERVER}/${import.meta.env.VITE_WORK_SPACE_GEOSERVER}/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=${import.meta.env.VITE_WORK_SPACE_GEOSERVER}:Bodegas_lima&outputFormat=application/json`
    const urlTile = `${import.meta.env.VITE_URL_GEOSERVER}/gwc/service/tms/1.0.0/azzorti_vt:${layerName}@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf`

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         const response = await fetch(dataUrlFetch);
  //         const json = await response.json();
  //           // Función para generar índices H3 a partir de las coordenadas de los puntos
  //           const generateH3Indexes = (coordinates, resolution) => {
  //             if (!coordinates) return [];
  //             const h3Indexes = coordinates.map(feature => {
  //               // console.log(feature);
  //                 return h3.latLngToCell(feature.geometry.coordinates[1], feature.geometry.coordinates[0], resolution);
               
  //             });
            
  //             // Filtrar los elementos null del arreglo resultante
  //             return h3Indexes.filter(index => index !== null);
  //           };
      
  //         const h3Indexes = generateH3Indexes(json.features,10);
  //           console.log(h3Indexes);
  //         const getHexagonVertices = (h3Index) => {
  //           const hexagonBoundary = h3.cellToBoundary(h3Index);
  //           return [hexagonBoundary];
  //         };
  //           // Crear una FeatureCollection con los hexágonos
  //           setDataURl(h3Indexes.map((index, i) => ({
  //             type: 'Feature',
  //             geometry: {
  //               type: 'Polygon',
  //               coordinates: getHexagonVertices(index)
  //             },
  //             properties: {
  //               id: i
  //             }
  //           })))
  //       } catch (error) {
  //         console.error('Error fetching data:', error);
  //       }
  //     };
          
  //   fetchData();
  // }, []);
  return (
    <div>
      {/* <SingaporeData setDataURl={setDataURl}/> */}
       {/* Agregar una Source y Layers para los puntos H3 */}
       {dataURL && 
        <Source id="hexagons" type="geojson" data={{ type: 'FeatureCollection', features: dataURL }}>
        <Layer
          id="hexagons-layer"
          type="fill"
          source="hexagons"
          paint={{
            'fill-outline-color': 'white',
            "fill-color": ["get", "color"],
            "fill-opacity": ["get", "opacity"],
          }}
        />
      </Source>}
       
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
                minzoom={12}
              />
            }
          </Source>
        </>
        ): null}
    </div>
  )
}
