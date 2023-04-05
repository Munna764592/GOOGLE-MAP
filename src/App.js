import React, { useEffect } from "react";
import { Routes, Route } from 'react-router-dom';
import Navbar from "./components/navbar.js";
import Map from "./components/map.js";
import "./App.css";

function App() {
  navigator.geolocation.getCurrentPosition((position) => {
    const { lat, lng } = position.coords;
    window.lat = lat;
    window.lng = lng;
  })
  return (
    <>
      <Routes>
        <Route path='/' element={<Navbar latitude="{window.lat}" longitude={window.lng} />} />
        <Route path='/map' element={<Map />} />
      </Routes>
    </>
  );
}

export default App;
