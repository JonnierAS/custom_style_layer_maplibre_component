import React, { useEffect, useRef, useState } from 'react'
import Map, { NavigationControl, Popup } from "react-map-gl/maplibre";
import mapLibregl from "maplibre-gl";
import { Layer, Source } from "react-map-gl";

import DrawControl from "./toolbar/ToolbarControl"
import { getStyleUrl } from "./helpers/getStyleURL";
import { RightPanelLayoutBtn, SidePanel } from './layout/RightPanelLayout';
import { useLocalState } from './context/CleanLocalState';
import { useDispatch, useSelector } from 'react-redux';
import { setMapref } from '../redux/actions/mapActions';

const LONG = -77.05035612125732;
const LAT = -12.056058217891378;
const ZOOM = 12;
const LAYER = "Bodegas_lima"
export default function MapContainer() {
  const mapRef = useRef(null);
  const dispatch = useDispatch()
  const {showPanel, setShowPanel,applyTransition, colorState,
        strokeWidth, blurRadius, radius, pitchAligment,
        pitchScale,adaptOnZoom, minZoomRadius, maxZoomRadius
        } = useLocalState()
  const [panelWidth, setPanelWidth] = useState(360);
  const [screenWidth, setScreenWidth] = useState("100vw");
  const [mapType, setMapType] = useState("https://carto.com/help/images/building-maps/basemaps/voyager_labels.png");
  
  const mapBoxDrawStateRef = useSelector(state => state.mapBoxDrawStateRef)


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
        <Source
          key={LAYER + "layers"}
          id={LAYER}
          type="vector"
          scheme="tms"
          name={LAYER}
          tiles={[
            `${
              import.meta.env.VITE_URL_GEOSERVER
            }/gwc/service/tms/1.0.0/azzorti_vt:${LAYER}@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf`,
          ]}
        >
          <Layer
            id={LAYER}
            type="fill"
            source={LAYER}
            key={LAYER + 1}
            source-layer={LAYER}
            paint={{
              "fill-outline-color": "#000000",
              "fill-color": "#6e548c",
              "fill-opacity": 0.5,
            }}
          />
          <Layer
            id={`${LAYER}-line`}
            type="line"
            source={LAYER}
            key={LAYER+2}
            source-layer={LAYER}
            paint={{
              "line-color": "#222",
              "line-width": 1,
              "line-opacity": 1,
            }}
          />
          <Layer
            id={`${LAYER}-label`}
            type="symbol"
            source={LAYER}
            source-layer={LAYER}
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
          <Layer
            type="circle"
            source={LAYER}
            id={LAYER + 1}
            key={LAYER+3}
            source-layer={LAYER}
            filter={["==", "$type", "Point"]}
            paint={{
              "circle-color": colorState || "#6e548c",
              "circle-opacity": 0.5,
              "circle-stroke-width": strokeWidth || 1,
              "circle-blur": blurRadius || 1,
              "circle-radius": {
                stops: [[0, 9], [10, radius]],
                base: 1.75
              },
              "circle-pitch-alignment": pitchAligment,
              "circle-pitch-scale": pitchScale
            }}
          />
        </Source>

        <NavigationControl position="bottom-left" />
        {/* <DrawControl 
          position="bottom-left"
          displayControlsDefault={true}
          
          // modeChange={modeChange}
          /> */}

        <RightPanelLayoutBtn
          side={"right"}
          setShowPanel={setShowPanel}
          showPanel={showPanel}
        />
      </Map>
    </div>
  );
}
