import React from 'react';
import {Map, NavigationControl, useControl} from 'react-map-gl/maplibre';
import {GeoJsonLayer, ArcLayer, ScatterplotLayer} from 'deck.gl';
import {MapboxOverlay as DeckOverlay} from '@deck.gl/mapbox';

const AIR_PORTS =
  'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_10m_airports.geojson';

const INITIAL_VIEW_STATE = {
  latitude: -12.056058217891378,
  longitude: -77.05035612125732,
  zoom: 4,
  pitch: 30
};

const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json';
function DeckGLOverlay(props) {
  const overlay = useControl(() => new DeckOverlay(props));
  overlay.setProps(props);
  return null;
}

export default function MapContainerDeckGl() {
  const onClick = info => {
    if (info.object) {
      // eslint-disable-next-line
      alert(`${info.object.properties.name} (${info.object.properties.abbrev})`);
    }
  };
  const layers = [
    new GeoJsonLayer({
      id: 'Asesoras',
      data: 'https://geosolution.ddns.net/web_azzorti_geoserver/azzorti_vt/wms?service=WMS&version=1.1.0&request=GetMap&layers=azzorti_vt%3AAsesoras&bbox=-81.31124877929688%2C-18.174219131469727%2C0.0%2C0.0&width=768&height=330&srs=EPSG%3A4326&styles=&format=geojson',
      filled: true,
      pointRadiusMinPixels: 2,
      pointRadiusScale: 15,
      getFillColor: [200, 0, 80, 180],
      minZoom: 0,
      maxZoom: 20,
      getLineColor: [255, 255, 255],
      lineWidthMinPixels: 1,
    })
  ];


  // const layers = [
  //   new GeoJsonLayer({
  //     id: 'airports',
  //     data: AIR_PORTS,
  //     // Styles
  //     filled: true,
  //     pointRadiusMinPixels: 2,
  //     pointRadiusScale: 2000,
  //     getPointRadius: f => 11 - f.properties.scalerank,
  //     getFillColor: [200, 0, 80, 180],
  //     // Interactive props
  //     pickable: true,
  //     autoHighlight: true,
  //     onClick,
  //     // beforeId: 'watername_ocean' // In interleaved mode, render the layer under map labels
  //   }),
  //   new ArcLayer({
  //     id: 'arcs',
  //     data: AIR_PORTS,
  //     dataTransform: d => d.features.filter(f => f.properties.scalerank < 4),
  //     // Styles
  //     getSourcePosition: f => [-0.4531566, 51.4709959], // London
  //     getTargetPosition: f => f.geometry.coordinates,
  //     getSourceColor: [0, 128, 200],
  //     getTargetColor: [200, 0, 80],
  //     getWidth: 1
  //   })
  // ];

  return (
    <Map
      initialViewState={INITIAL_VIEW_STATE}
      mapStyle={MAP_STYLE}
      style={{
        width: "100vw",
        height: "100vh",
      }}
    >
      <NavigationControl position='top-left' />
      <DeckGLOverlay layers={layers}  />
    </Map>
  );
}