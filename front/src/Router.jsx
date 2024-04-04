import { createBrowserRouter } from "react-router-dom";
import MapContainer from "./components/Map";

const router = createBrowserRouter([
  {
    path: '/web/style/maplibre',
    element: <MapContainer />
  },

 
])
export default router
