import { createBrowserRouter } from "react-router-dom";
import MapContainer from "./components/Map";
import MapContainerDeckGl from "./components/MapDeckGl";

const router = createBrowserRouter([
  {
    path: '/web/style/mapLibre',
    element: <MapContainer />
  },
  {
    path: '/web/style',
    element: <MapContainerDeckGl />
  },

 
])
export default router
