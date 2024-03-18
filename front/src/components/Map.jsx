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

export default function MapContainer() {
  const mapRef = useRef(null);
  const dispatch = useDispatch()
  const {showPanel, setShowPanel,applyTransition} = useLocalState()
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
  
  return (
    <div className=''>

          <SidePanel side={"right"} panelWidth={panelWidth} setPanelWidth={setPanelWidth} setShowPanel={setShowPanel} showPanel={showPanel} />
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
        style={{ width: showPanel ? `${screenWidth - panelWidth}px` : "100vw",  height: "100vh", transition: applyTransition ? "width 0.5s ease" : "" }}
        mapStyle={getStyleUrl(mapType)} 
      > 
      <NavigationControl position="bottom-left" />
      {/* <DrawControl 
          position="bottom-left"
          displayControlsDefault={true}
          
          // modeChange={modeChange}
          /> */}

          <RightPanelLayoutBtn side={"right"} setShowPanel={setShowPanel} showPanel={showPanel} />
      </Map>
    </div>
  )
}
