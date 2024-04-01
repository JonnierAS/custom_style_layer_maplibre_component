import Select from "react-select";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import xmljs from "xml-js";
import { setNameOfLayers } from "../../../../../redux/actions/mapActions";

function SelectLayers() {
  const [layers, setLayers] = useState([]);

  const dispatch = useDispatch();

  const handleChangeCapas = (capa) => {
    dispatch(setNameOfLayers(capa));
  };

  useEffect(() => {
    const fetchLayers = async () => {
      try {
        const capabilitiesUrl = `${import.meta.env.VITE_URL_GEOSERVER}/wms?request=GetCapabilities&service=WMS&version=1.3.0&namespace=${import.meta.env.VITE_WORK_SPACE_GEOSERVER}`;
        const response = await axios.get(capabilitiesUrl);
        const result = JSON.parse(xmljs.xml2json(response.data, { compact: true, spaces: 5, depth: 30 }));

        const layersArray = result.WMS_Capabilities.Capability.Layer.Layer.map(
          (layer) => {
            if (layer && layer.Name && layer.Name._text && layer.Title && layer.Title._text) {
              return {
                id: layer.Name._text,
                value: layer.Name._text,
                label: layer.Title._text,
              };
            } else {
              return null;
            }
          }
        ).filter(layer => layer && layer.label !== null && layer.label !== undefined && layer.value !== "");
        setLayers(layersArray);
      } catch (error) {
        console.error("Error al obtener las capas de GeoServer:", error);
      }
    };

    fetchLayers();
  }, []);
 
  const capas = layers ? [
    { id: 0, value: "null", label: "Sin Capa" },
    ...layers.map((layer, index) => ({
      id: index + 1,
      value: layer.value,
      label: layer.label,
    })).filter(layer => layer.label !== "" && layer.value !== "")
  ] : null;

  return (
        <Select
          name="Capas"
          id="Capas"
          placeholder="Capas"
          onChange={handleChangeCapas}
          options={capas}
          isSearchable
          className="w-40"
        />
  );
}

export default SelectLayers;
