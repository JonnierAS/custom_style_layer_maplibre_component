import React, { useEffect, useRef, useState } from 'react'
import Map, { NavigationControl } from "react-map-gl/maplibre";
import mapLibregl from "maplibre-gl";


/* Components */
import DrawControl from "./toolbar/ToolbarControl"
import { RightPanelLayoutBtn, SidePanel } from './layout/RightPanelLayout';
import { setMapref } from '../redux/actions/mapActions';
import { useLocalState } from './context/CleanLocalState';
import { useDispatch, useSelector } from 'react-redux';
import { getStyleUrl } from "./helpers/getStyleURL";
import RenderMapLibreLayers from './RenderMapLibreLayers';

const LONG = -77.05035612125732;
const LAT = -12.056058217891378;
const ZOOM = 12;

export default function MapContainer() {
  const mapRef = useRef(null);
  const dispatch = useDispatch()
  const {showPanel, setShowPanel,applyTransition, layerIconProperties} = useLocalState()
  const [panelWidth, setPanelWidth] = useState(360);
  const [screenWidth, setScreenWidth] = useState("100vw");
  const [mapType, setMapType] = useState("https://carto.com/help/images/building-maps/basemaps/voyager_labels.png");
  
  const layerName = useSelector(state => state.layerName?.label)

  useEffect(() => {
    const screenWidth = window.innerWidth;
    setScreenWidth(screenWidth)
    dispatch(setMapref(mapRef))
    if(showPanel === false){
      setPanelWidth(360)
    }
    
  }, [mapRef,showPanel,screenWidth]);
  
  useEffect(() => {
    if (mapRef.current && layerName){
      mapRef.current.setSprite("https://demotiles.maplibre.org/styles/osm-bright-gl-style/sprite")
    }
  }, [mapRef,layerIconProperties]);
  return (
    <>
      <SidePanel side={"right"} panelWidth={panelWidth} setPanelWidth={setPanelWidth} setShowPanel={setShowPanel} showPanel={showPanel} />
      <Map ref={mapRef}
        attributionControl={false}
        initialViewState={{longitude: LONG, latitude: LAT, zoom: ZOOM}}
        minPitch={20} maxPitch={70} mapLib={mapLibregl}  interactive={true}
        mapStyle={getStyleUrl(mapType)}
        style={{width: showPanel ? `${screenWidth - panelWidth}px` : "100vw", height: "100vh", transition: applyTransition ? "width 0.5s ease" : ""}}
      >
        <RenderMapLibreLayers />
        <NavigationControl position="bottom-left" />
        <DrawControl position="bottom-left" displayControlsDefault={true}/>
        <RightPanelLayoutBtn side={"right"} setShowPanel={setShowPanel} showPanel={showPanel}/>
      </Map>
    </>
  );
}
