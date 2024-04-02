import React, { useEffect } from 'react'
import { useLocalState } from '../../../../context/CleanLocalState'
import { useSelector } from 'react-redux';
import { getStyleOfLayerSelected, saveNewStyle } from '../services/styleManage';

export default function StyleManageContainer() {
    const layerName = useSelector(state => state.layerName?.label)
    const {layerIconProperties,setLayerIconProperties,layersPropertyStyle,setLayerPropertyStyle} = useLocalState()

    const data = {
        name_Layer: layerName,
        fill_color:  layersPropertyStyle.colorBase,
        line_color: layersPropertyStyle.lineColor,
        line_width: layersPropertyStyle.strokeWidth,
        line_blur: layersPropertyStyle.blurLayer,
        text_color: layersPropertyStyle.textColor,
        text_anchor: layersPropertyStyle.textAnchor,
        text_field: layersPropertyStyle.textField,
        line_size: layersPropertyStyle.strokeWidth,
        text_allow_overlap: layersPropertyStyle.textOverlap,
        circle_color: layersPropertyStyle.colorBase,
        circle_stroke_width: layersPropertyStyle.strokeWidth,
        circle_stroke_color: layersPropertyStyle.lineColor,
        circle_blur: layersPropertyStyle.blurLayer,
        circle_radius: layersPropertyStyle.radius,
        circle_pitch_alignment: layersPropertyStyle.pitchAligment,
        circle_pitch_scale: layersPropertyStyle.pitchScale,
        icon_color: layerIconProperties.iconColor,
        icon_image: layerIconProperties.icon,
        icon_overlap: layerIconProperties.iconOverlap,
        icon_rotate: layerIconProperties.iconRotate,
        icon_halo_width: layerIconProperties.iconHaloWidth,
        icon_halo_color: layerIconProperties.iconHaloColor,
        icon_pitch_alignment: layerIconProperties.iconPitchAlignment,
        icon_size: layerIconProperties.iconSize,
        icon_text_field: layerIconProperties.iconTextField,
        icon_text_color: layerIconProperties.iconTextColor,
        icon_text_size: layerIconProperties.iconTextSize,
        icon_text_transform: layerIconProperties.iconTextTransform,
        icon_text_offset: [layerIconProperties.iconTextOffsetX,layerIconProperties.iconTextOffsetY],
        icon_text_allow_overlap: layerIconProperties.iconTextOverlap,
        icon_text_rotate: layerIconProperties.iconTextRotate,
        icon_text_anchor: layerIconProperties.iconTextAnchor,
        icon_text_optional: layerIconProperties.iconTextOptional,
    }
    const handleClickSaveStyle = async()=>{
        if(!layerName || layerName === "Sin Capa"){
            alert("No hay capa seleccionada");
            return;
        }
       await saveNewStyle(data)
    }

    useEffect(()=>{
        const getStyle = async()=>{
            if(!layerName || layerName === "Sin Capa") return;
            const response = await getStyleOfLayerSelected(layerName)
            const data = response.data.data
            if(data === null) return;
            setLayerPropertyStyle({
                ...layersPropertyStyle,
                colorBase: data.fill_color,
                lineColor: data.line_color,
                radius: data.circle_radius,
                blurLayer: data.line_blur,
                strokeWidth: data.line_width,
                pitchAligment: data.circle_pitch_alignment,
                pitchScale: data.circle_pitch_scale,
                textColor: data.text_color,
                textAnchor: data.text_anchor,
                textOverlap: data.text_allow_overlap,
                textField: data.text_field
            })
            setLayerIconProperties({
                ...layerIconProperties,
                iconColor: data.icon_color,
                icon: data.icon_image,
                iconSize: data.icon_size,
                iconHaloColor: data.icon_halo_color,
                iconHaloWidth: data.icon_halo_width,
                iconOverlap: data.icon_overlap,
                iconRotate: data.icon_rotate,
                iconPitchAlignment: data.icon_pitch_alignment,
                iconTextColor: data.icon_text_color,
                iconTextOverlap: data.icon_text_allow_overlap,
                iconTextRotate: data.icon_text_rotate,
                iconTextSize: data.icon_text_size,
                iconTextOffsetX: data.icon_text_offset[0],
                iconTextOffsetY: data.icon_text_offset[1],
                iconTextAnchor: data.icon_text_anchor,
                iconTextOptional: data.icon_text_optional,
                iconTextTransform: data.icon_text_transform,
                iconTextField: data.icon_text_field,
            })
        }
        getStyle()
    },[layerName])

    return (
    <div>
        <button className='tooltip border p-1 rounded' onClick={handleClickSaveStyle}>
            Guardar
            <span className="tooltiptextup">Guardar estilo</span>  
        </button>
    </div>
  )
}
