import {Map, NavigationControl, useControl} from 'react-map-gl/maplibre';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import maplibregl from "maplibre-gl";

import { RightPanelLayoutBtn, SidePanel } from './layout/RightPanelLayout';
import { useLocalState } from './context/CleanLocalState';
import { setMapref } from '../redux/actions/mapActions';
import DeckGlOverLay from './deckGl/DeckGlOverLay';
import DrawControl from './toolbar/ToolbarControl';

const INITIAL_VIEW_STATE = {
  latitude: -12.056058217891378,
  longitude: -77.05035612125732,
  zoom: 4,
  pitch: 30
};
const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json';

export default function MapContainerDeckGl() {
  const {showPanel, setShowPanel, applyTransition} = useLocalState()
  const [panelWidth, setPanelWidth] = useState(360);
  const [screenWidth, setScreenWidth] = useState("100vw");
  const dispatch = useDispatch()
  const mapRef = useRef(null);

  useEffect(() => {
    const screenWidth = window.innerWidth;
    setScreenWidth(screenWidth)
    dispatch(setMapref(mapRef))
    if(showPanel === false){
      setPanelWidth(360)
    }
  }, [mapRef,showPanel,screenWidth]);

  return (
    <>
      <SidePanel side={"right"}  panelWidth={panelWidth} setPanelWidth={setPanelWidth} setShowPanel={setShowPanel}
        showPanel={showPanel} mapFeature={"deckGl"}
      />
      <Map
        ref={mapRef}
        initialViewState={INITIAL_VIEW_STATE}
        mapStyle={MAP_STYLE}
        mapLib={maplibregl}
        style={{width: showPanel ? `${screenWidth - panelWidth}px` : "100vw",height: "100vh",transition: applyTransition ? "width 0.5s ease" : ""}}
      >
        <DeckGlOverLay />
        <NavigationControl position="bottom-left" />
        <DrawControl position="bottom-left"  displayControlsDefault={true}/>
        <RightPanelLayoutBtn side={"right"}  setShowPanel={setShowPanel} showPanel={showPanel}/>
      </Map>
    </>
  );
}