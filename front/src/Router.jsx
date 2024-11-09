import { createBrowserRouter } from "react-router-dom";
import MapContainer from "./components/Map";

const router = createBrowserRouter([
  {
    path: '/',
    element: <MapContainer />
  },
])
export default router
