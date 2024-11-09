import { createBrowserRouter } from "react-router-dom";
import MapContainer from "./components/Map";
import MapContainerDeckGl from "./components/MapDeckGl";

const router = createBrowserRouter([
  {
    path: '/',
    element: <MapContainer />
  },
  // {
  //   path: '/',
  //   element: <MapContainerDeckGl />
  // },

 
])
export default router
