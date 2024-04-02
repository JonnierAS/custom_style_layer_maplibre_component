import axios from "axios"
export const saveNewStyle = async(style)=>{
    try {
        const response = await axios.post(`${import.meta.env.VITE_API_V1_NODE}/capa/add-style-layer`, {style: style}); 
        alert("Estilo guardado con exito!")
        return response
    } catch (error) {
        console.log(error);
    }
}

export const getStyleOfLayerSelected = async(name)=>{
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_V1_NODE}/capa/get-styles-layers/${name}`); 
        return response
    } catch (error) {
        console.log(error);
    }
}