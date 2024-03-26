export function updateIconImage(map, layerId, iconImage, sdf = false) {
    if (!map.hasImage(iconImage)) {
      map.loadImage(`static/${iconImage}.png`, (error, image) => {
        map.addImage(iconImage, image, { sdf });
        updateIconImage(map, layerId, iconImage);
      });
    }
    map.setLayoutProperty(layerId, "icon-image", iconImage);
  }