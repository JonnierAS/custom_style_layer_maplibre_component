import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";

import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import "maplibre-gl/dist/maplibre-gl.css";
import "mapbox-gl/dist/mapbox-gl.css";
import './index.css'

import router from "./Router.jsx";
import store from "./redux/store.js";
import { LocalStateProvider } from "./components/context/CleanLocalState.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <LocalStateProvider>
        <RouterProvider router={router} />
      </LocalStateProvider>
    </Provider>
  </React.StrictMode>,
)
