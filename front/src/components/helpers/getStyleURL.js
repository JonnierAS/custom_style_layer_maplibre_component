export const getStyleUrl = (type) => {
  switch (type) {
    case "base":
      return "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json";
    case "Satelite":
      return "https://api.maptiler.com/maps/satellite/style.json?key=7E7fFAcuUoQg6PSA3UVF";
      case "dark":
      return "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json";
    case "Positron":
      return "https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json";
    default:
      return "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json";
  }
};
