import React, { useEffect } from 'react'
import { useLocalState } from '../../../../context/CleanLocalState'
import { useSelector } from 'react-redux';
import { saveNewStyle } from '../services/styleManage';

export default function StyleManageContainer() {
    const layerName = useSelector(state => state.layerName?.label)
    const {layerIconProperties,layersPropertyStyle} = useLocalState()

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
        if(!layerName){
            console.log("No hay capa seleccionada");
            return;
        }
       const response = await saveNewStyle(data)
       console.log(response);
    }

    return (
    <div>
        <button className='tooltip border p-1 rounded'
            onClick={handleClickSaveStyle}
        >
            Guardar
            <span className="tooltiptextup">Guardar estilo</span>  
        </button>
    </div>
  )
}
