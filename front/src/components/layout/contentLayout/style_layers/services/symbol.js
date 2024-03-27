
// export function loadSymbols(map, icon) {
//   map.loadImage(`static/${icon}.png`, (error, image) => {
//     map.addImage(icon, image, { sdf: true });
//   });
// }

export function setLayoutProperties(map, layerId, properties) {
  for (const key in properties) {
    map.setLayoutProperty(layerId, key, properties[key]);
  }
}

export function setPaintProperties(map, layerId, properties) {
  for (const key in properties) {
    map.setPaintProperty(layerId, key, properties[key]);
  }
}