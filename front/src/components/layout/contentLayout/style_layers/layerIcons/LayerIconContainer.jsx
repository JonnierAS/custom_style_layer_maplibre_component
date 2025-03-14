import React, { useEffect } from 'react'
import LayerIcons from './components/LayerIcons'
import TextStyleIcon from './components/TextStyleIcon'
import { useSelector } from 'react-redux'
import axios from 'axios';
import xmljs from 'xml-js';
import { useLocalState } from '../../../../context/CleanLocalState';

export default function LayerIconContainer({mapRender}) {
  const {setCapaProperties}=useLocalState()
  const layerName = useSelector(state => state.layerName?.label)

  /* Se encarga de obtener las propiedades de las capas para mostrarlas en el select de etiquetas */
  useEffect(() => {
    const handleGetProperties = async()=>{
      try {
        if(!layerName || layerName === "Sin Capa") return;
        const proxyServerUrl = import.meta.env.VITE_URL_GEOSERVER;
        const wfsUrl = `${proxyServerUrl}/wfs?request=DescribeFeatureType&service=WFS&version=2.0.0&typeName=${layerName}`;
        
        const response = await axios.get(wfsUrl);
        const result = JSON.parse(xmljs.xml2json(response.data, { compact: true, spaces: 5 }));
        const properties = result['xsd:schema']['xsd:complexType']['xsd:complexContent']['xsd:extension']['xsd:sequence']['xsd:element'];
        const propertyNames = properties.map(property => property._attributes.name);
        setCapaProperties(propertyNames);
      } catch (error) {
        console.log(error);
      }
      }
      handleGetProperties()
  }, [layerName])
  return (
    <div>
        <LayerIcons mapRender={mapRender} />
        {mapRender !== "deckGl" &&<TextStyleIcon /> }
    </div>
  )
}
