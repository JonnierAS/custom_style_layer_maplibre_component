import React, { useEffect, useRef, useState } from 'react'
import Map, { NavigationControl } from "react-map-gl/maplibre";
import { Layer, Source } from "react-map-gl";
import mapLibregl from "maplibre-gl";


/* Components */
import DrawControl from "./toolbar/ToolbarControl"
import { RightPanelLayoutBtn, SidePanel } from './layout/RightPanelLayout';
import { setMapref } from '../redux/actions/mapActions';
import { useLocalState } from './context/CleanLocalState';
import { useDispatch, useSelector } from 'react-redux';
import { getStyleUrl } from "./helpers/getStyleURL";
import { updateIconImage } from './layout/contentLayout/style_layers/services/updateIconImage';
import {loadSymbols} from "./layout/contentLayout/style_layers/services/symbol"
const LONG = -77.05035612125732;
const LAT = -12.056058217891378;
const ZOOM = 12;

export default function MapContainer() {
  const mapRef = useRef(null);
  const dispatch = useDispatch()
  const {showPanel, setShowPanel,applyTransition,
        layersPropertyStyle, layerIconProperties
        } = useLocalState()
  const [panelWidth, setPanelWidth] = useState(360);
  const [screenWidth, setScreenWidth] = useState("100vw");
  const [mapType, setMapType] = useState("https://carto.com/help/images/building-maps/basemaps/voyager_labels.png");
  
  const mapBoxDrawStateRef = useSelector(state => state.mapBoxDrawStateRef)
  const layerName = useSelector(state => state.layerName?.label)

  useEffect(() => {
    const screenWidth = window.innerWidth;
    setScreenWidth(screenWidth)
    dispatch(setMapref(mapRef))
    if(showPanel === false){
      setPanelWidth(360)
    }
    
    if (mapRef.current) {
      const mapCanvas = mapRef.current.getCanvas();
      mapCanvas.classList.add("cursor-default");
    }
  }, [mapRef,showPanel,screenWidth,mapBoxDrawStateRef]);
  
  useEffect(() => {
    if (mapRef.current && layerName){
      const iconMap = mapRef.current.getMap() 
      const layerId = `${layerName}-icon`
      if(layerIconProperties.icon === "marker"){
        loadSymbols(iconMap, layerIconProperties.icon)
      }
      updateIconImage(iconMap, layerId, layerIconProperties.icon || "marker", true);
    }
  }, [mapRef, layerIconProperties]);

  // useEffect(() => {
  //   if (LAYER && mapRef?.current) {
  //     const map = mapRef.current.getMap();
  //     map.setPaintProperty(LAYER + 1, "circle", {
  //       "circle-radius": adaptOnZoom
  //         ? [
  //             "interpolate",
  //             ["linear"],
  //             ["zoom"],
  //             0,
  //             minZoomRadius !== undefined ? minZoomRadius : 5,
  //             24,
  //             maxZoomRadius !== undefined ? maxZoomRadius : 50,
  //           ]
  //         : 5,
  //     });
  //   }
  // }, [LAYER, adaptOnZoom, minZoomRadius, maxZoomRadius,mapRef]);
  return (
    <div className="">
      <SidePanel
        side={"right"}
        panelWidth={panelWidth}
        setPanelWidth={setPanelWidth}
        setShowPanel={setShowPanel}
        showPanel={showPanel}
      />
      <Map
        // onClick={handleclickSelect}
        ref={mapRef}
        attributionControl={false}
        initialViewState={{
          longitude: LONG,
          latitude: LAT,
          zoom: ZOOM,
        }}
        minPitch={20}
        maxPitch={70}
        mapLib={mapLibregl}
        interactive={true}
        style={{
          width: showPanel ? `${screenWidth - panelWidth}px` : "100vw",
          height: "100vh",
          transition: applyTransition ? "width 0.5s ease" : "",
        }}
        mapStyle={getStyleUrl(mapType)}
      >
        {layerName && layerName !== "Sin Capa" ? (
          <>
            <Source
            key={layerName + "layers"}
            id={layerName}
            type="vector"
            scheme="tms"
            name={layerName}
            tiles={[
              `${
                import.meta.env.VITE_URL_GEOSERVER
              }/gwc/service/tms/1.0.0/azzorti_vt:${layerName}@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf`,
            ]}
          >
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
                "line-blur": layersPropertyStyle.blurLayer || 1,
                
              }}
            />
            <Layer
              id={`${layerName}-label`}
              key={`${layerName}-label`}
              type="symbol"
              source={layerName}
              source-layer={layerName}
              layout={{
                "text-anchor": "center",
                // "text-field": `{${property}}`,
                "text-font": ["Open Sans Regular"],
                "text-size": 12,
              }}
              paint={{
                "text-color": "#ffffff",
              }}
            />
          </Source>
          <Source
            key={`${layerName}-`}
            id={`${layerName}-`}
            type="vector"
            scheme="tms"
            name={layerName}
            tiles={[
              `${
                import.meta.env.VITE_URL_GEOSERVER
              }/gwc/service/tms/1.0.0/azzorti_vt:${layerName}@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf`,
            ]}
          >
            {/* <Layer
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
            /> */}
            <Layer
              type="symbol"
              source={layerName}
              id={`${layerName}-icon`}
              key={`${layerName}-icon`}
              source-layer={layerName}
              filter={["==", "$type", "Point"]}
              layout={{
                "icon-overlap": layerIconProperties.overlap,
                "icon-rotate": layerIconProperties.rotate,
                "icon-pitch-alignment": layerIconProperties.pitchAlignment,
                "icon-size": layerIconProperties.size,
                "text-field": layerIconProperties.textOptional ? "Example": null,
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
            {/* <Layer
              id={`${layerName}-label-icon`}
              key={`${layerName}-label-icon`}
              type="symbol"
              source={layerName}
              source-layer={layerName}
              layout={{
                "text-field": `Example`,
                "text-font": ["Open Sans Regular"],
                "text-size": layerIconProperties.textSize,
                "text-transform": layerIconProperties.textTransform,
                "text-offset":  [layerIconProperties.textOffsetX,layerIconProperties.textOffsetY],
                "text-allow-overlap": true,
                "text-rotate": layerIconProperties.textRotate,
                "text-anchor": layerIconProperties.textAnchor,
                "text-optional": layerIconProperties.textOptional
              }}
              paint={{
                "text-color": layerIconProperties.textColor,
              }}
            /> */}
          </Source>
        </>
        ): null}
        <NavigationControl position="bottom-left" />
        <DrawControl 
          position="bottom-left"
          displayControlsDefault={true}
          
          />

        <RightPanelLayoutBtn
          side={"right"}
          setShowPanel={setShowPanel}
          showPanel={showPanel}
        />
      </Map>
    </div>
  );
}
