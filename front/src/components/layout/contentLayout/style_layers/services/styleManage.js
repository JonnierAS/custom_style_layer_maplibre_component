import axios from "axios"
export const saveNewStyle = async(style)=>{
    try {
        const response = await axios.post(`${import.meta.env.VITE_API_V1_NODE}/capa/add-style-layer`, {style: style}); 
        return response
    } catch (error) {
        console.log(error);
    }
}