import {GeoJsonLayer, IconLayer, ScatterplotLayer} from 'deck.gl';
import {MapboxOverlay as DeckOverlay} from '@deck.gl/mapbox';
import {useControl} from 'react-map-gl/maplibre';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import iconData from "../layout/contentLayout/style_layers/data_icons.json"
import { useLocalState } from '../context/CleanLocalState';

function DeckGLOverlay(props) {
    const overlay = useControl(() => new DeckOverlay(props));
    overlay.setProps(props);
    return null;
  }
  const ICON_MAPPING = {
    marker: {x: 0, y: 0, width: 128, height: 128, mask: true}
  };
export default function DeckGlOverLay() {
    const {layerIconProperties} = useLocalState()
    const layerName = useSelector(state => state.layerName?.label)
    const [data, setData] = useState([]);

    useEffect(() => {
        if(!layerName) return;
      fetchData();
    }, [layerName, layerIconProperties]);
  
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_URL_GEOSERVER}/${import.meta.env.VITE_WORK_SPACE_GEOSERVER}/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=${import.meta.env.VITE_WORK_SPACE_GEOSERVER}:${layerName}&outputFormat=application/json`);
        const json = await response.json();
        setData(json.features.map(feature => ({
          coordinates: feature.geometry.coordinates,
          exits: feature.properties.exits
        })));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    const layers = [
        new GeoJsonLayer({
          id: 'Asesoras',
          data: `${import.meta.env.VITE_URL_GEOSERVER}/${import.meta.env.VITE_WORK_SPACE_GEOSERVER}/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=${import.meta.env.VITE_WORK_SPACE_GEOSERVER}:${layerName}&outputFormat=application/json`,
          filled: true,
          pointRadiusMinPixels: 2,
          pointRadiusScale: 5,
          getFillColor: [200, 0, 80, 180],
          getPosition: d => d.coordinates,
          minZoom: 0,
          maxZoom: 20,
          getLineColor: [255, 255, 255],
          lineWidthMinPixels: 1,
        }),
        new IconLayer({
          id: 'icon-layer',
          data: data,
          pickable: true,
          iconAtlas: 'https://demotiles.maplibre.org/styles/osm-bright-gl-style/sprite.png',
          iconMapping: iconData,
          getIcon: d => layerIconProperties.showIcon && layerIconProperties.icon,
          sizeScale: layerIconProperties.size,
          getPosition: d => d.coordinates,
          getSize: d => 5,
          getColor: d => [Math.sqrt(d.exits), 240, 0],
          billboard: true
        })
      ];
  return (
    <DeckGLOverlay layers={layers} interleaved={true}  />
  )
}
