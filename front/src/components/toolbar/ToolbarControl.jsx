import React, { forwardRef, useEffect, useImperativeHandle } from 'react';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import { useControl } from 'react-map-gl';
import { setMapboxDrawRef } from '../../redux/actions/mapActions';
import { useDispatch, useSelector } from 'react-redux';

const DrawControl = forwardRef((props, ref) => {
  const dispatch = useDispatch()
  const draw = useControl(
    () => new MapboxDraw({props, userProperties: true}),
    ({ map }) => {
      map.on('draw.create', props.onCreate);
      map.on('draw.update', props.onUpdate);
      map.on('draw.delete', props.onDelete);
      map.on('draw.modechange', props.modeChange);
      map.on('draw.combine', props.onCombine);
      map.on('draw.uncombine', props.onUncombine);
    },
    ({ map }) => {
      map.off('draw.create', props.onCreate);
      map.off('draw.update', props.onUpdate);
      map.off('draw.delete', props.onDelete);
      map.off('draw.modechange', props.modeChange);
      map.off('draw.combine', props.onCombine);
      map.off('draw.uncombine', props.onUncombine);
    },
    {
      position: props.position
    }
  );
  
  useEffect(()=>{
    dispatch(setMapboxDrawRef({current: draw}));
  },[draw])

  useImperativeHandle(ref, () => ({
    add: draw.add.bind(draw),
    delete: draw.delete.bind(draw),
    getAll: draw.getAll.bind(draw),
  }));

  return null;
});

DrawControl.displayName = "DrawControl";

DrawControl.defaultProps = {
  onCreate: () => {},
  onUpdate: () => {},
  onDelete: () => {},
  modeChange: () => {},
  onCombine: () => {},
  onUncombine: () => {}
};

export default DrawControl;
