
export function loadSymbols(map, icon) {
  map.loadImage(`static/${icon}.png`, (error, image) => {
    map.addImage(icon, image, { sdf: true });
  });
}