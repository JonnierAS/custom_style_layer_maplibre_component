import {GeoJsonLayer, IconLayer,MVTLayer,TextLayer, ScatterplotLayer} from 'deck.gl';
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
    const {layerIconProperties, layersPropertyStyle} = useLocalState()
    const layerName = useSelector(state => state.layerName?.label)
    const [data, setData] = useState([]);

    useEffect(() => {
        if(!layerName) return;
      fetchData();
    }, [layerName,layerIconProperties?.showIcon]);
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

    const geoJsonLayer = new GeoJsonLayer({
      id: 'Asesoras',
      data: `${import.meta.env.VITE_URL_GEOSERVER}/${import.meta.env.VITE_WORK_SPACE_GEOSERVER}/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=${import.meta.env.VITE_WORK_SPACE_GEOSERVER}:${layerName}&outputFormat=application/json`,
      filled: true,
      pointRadiusMinPixels: layersPropertyStyle.radius,
      pointRadiusScale: 5,
      getFillColor: [layersPropertyStyle?.colorBaseDeck.r,layersPropertyStyle?.colorBaseDeck.g,layersPropertyStyle?.colorBaseDeck.b],
      getPosition: d => d.coordinates,
      minZoom: layersPropertyStyle.minZoomRadius,
      maxZoom: layersPropertyStyle.maxZoomRadius,
      getLineColor: [layersPropertyStyle?.lineColorDeck.r,layersPropertyStyle?.lineColorDeck.g,layersPropertyStyle?.lineColorDeck.b],
      lineWidthMinPixels: layersPropertyStyle?.strokeWidth,
      opacity: layersPropertyStyle?.colorBaseDeck.a || 0.8,
      visible: !layerIconProperties.showIcon
    })

    const iconLayer = new IconLayer({
      id: 'icon-layer',
      data: data,
      pickable: true,
      iconAtlas: 'https://demotiles.maplibre.org/styles/osm-bright-gl-style/sprite.png',
      iconMapping: iconData,
      getIcon: d => layerIconProperties.icon,
      sizeScale: layerIconProperties.size,
      getPosition: d => d.coordinates,
      getSize: 5,
      billboard: true,
      getAngle: layerIconProperties.rotate,
      visible: layerIconProperties.showIcon
    })
    const pointsLayer = new MVTLayer({
      data: `${import.meta.env.VITE_URL_GEOSERVER}/${import.meta.env.VITE_WORK_SPACE_GEOSERVER}/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=${import.meta.env.VITE_WORK_SPACE_GEOSERVER}:${layerName}&outputFormat=application/json`,
      pointRadiusUnits: 'pixels',
      getRadius: 5,
      getFillColor: [230, 0, 0]
    });
    // const textLayer = new TextLayer({
    //   id: 'text-layer',
    //   data: `${import.meta.env.VITE_URL_GEOSERVER}/${import.meta.env.VITE_WORK_SPACE_GEOSERVER}/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=${import.meta.env.VITE_WORK_SPACE_GEOSERVER}:${layerName}&outputFormat=application/json`,
    //   pickable: true,
    //   getPosition: d => d.coordinates,
    //   getText: d => "example",
    //   getSize: 12,
    //   getAngle: 0,
    //   getTextAnchor: 'middle',
    //   getAlignmentBaseline: 'center'
    // });

  return (
    <DeckGLOverlay 
    layers={[
      //  geoJsonLayer, 
       iconLayer,
       pointsLayer
      // textLayer
    ]} 
    interleaved={true}  />
  )
}
