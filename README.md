# custom_style_layer_maplibre_component

Componente para estilizar capas de puntos y polygonos en map Libre.

Realizado bajo el entorno de `Node.js`, `React.js`, `mapbox-gl`, `maplibre-gl`, `react-map-gl`, `@mapbox/mapbox-gl-draw`.

# Nota*
Se esta usando `geoserver` para obtener las capas a mostrar. Por lo que es necesario tener una instancia levantada


# Para Levantar el proyecto:
- Para instalar dependencias: <br> 
```bash
$npm install 
```

- Para levantar el proyecto: <br>
```bash
$npm run dev
```

- Variables de entorno necesarias: <br>
```bash
VITE_URL_GEOSERVER="http://localhost:8080/geoserver"
VITE_WORK_SPACE_GEOSERVER="work_space"
```

![alt text](image.png)