import axios from "axios"
export const saveNewStyle = async(style)=>{
    try {
        const response = await axios.post("http://localhost:4001/api/v1/capa/add-style-layer", {style: style}); 
        return response
    } catch (error) {
        console.log(error);
    }
}