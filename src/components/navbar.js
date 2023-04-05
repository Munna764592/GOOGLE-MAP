import React, { useEffect, useState } from "react";
import GoogleMapReact from 'google-map-react';
import { NavLink } from "react-router-dom";

const Marker = ({ text }) => <div><i style={{ marginLeft: "5px" }} className="fa-solid fa-map-pin fa-bounce fa-2xl"></i></div>;
function Navbar({ latitude, longitude }) {
  const [lat1, setlatitude] = useState();
  const [lng1, setlogitude] = useState();

  const handleApiLoaded = (map, maps) => {
    console.log(latitude + " " + longitude)
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setlatitude(latitude);
      setlogitude(longitude)
    })
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <h3>Google Map</h3>
          <NavLink to="/map">Map2</NavLink>
        </div>
      </nav>
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "API_KEY" }}
          center={{ lat: 28.7523714, lng: 77.1146606 }}
          zoom={14}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
        >
          <Marker
            lat="28.7523714"
            lng="77.1146606"
            text="YOUR LOCATION"
            onLoad={marker => {
              const geocoder = new window.google.maps.Geocoder();
              geocoder.geocode({ location: { lat: marker.getPosition().lat(), lng: marker.getPosition().lng() } }, (results, status) => {
                if (status === "OK" && results[0]) {
                  for (let i = 0; i < results[0].address_components.length; i++) {
                    const component = results[0].address_components[i];
                    if (component.types.includes(110054)) {
                      const postalCode = component.short_name;
                      console.log(postalCode);
                      // Do something with the postal code
                      break;
                    }
                  }
                }
              });
            }}
          />
        </GoogleMapReact>
      </div>
    </>
  );
}

export default Navbar;
