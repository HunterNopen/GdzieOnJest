import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import osm from "./osm-provides";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import useGeoLocation from "../hooks/useGeoLocation";

const markerIcon = new L.Icon({
  iconUrl: require("../../assets/images/busIcon.png"),
  iconSize: [35, 35],
});

const userLocationIcon = new L.Icon({
  iconUrl: require("../../assets/images/geoIcon.png"),
  iconSize: [35, 35],
});

function MyLocation({ location }) {
  const map = useMap();

  const panToLocation = () => {
    if (location.loaded && !location.error) {
      map.panTo([location.coordinates.lat, location.coordinates.lng]);
    } else {
      alert(location.error.message);
    }
  };

  return (
    <button className="btn btn-primary" onClick={panToLocation}>
      Locate Me
    </button>
  );
}

function Map() {
  const [center, setCenter] = useState({ lat: 54.352, lng: 18.6466 });
  const ZOOM_LEVEL = 10;
  const location = useGeoLocation();

  return (
    <div className="row">
      <div className="col text-center">
        <h2>GdzieOnJest</h2>
        <p>Map of Gdansk</p>
        <div className="col">
          <MapContainer
            center={center}
            zoom={ZOOM_LEVEL}
            style={{ height: "650px", width: "100%" }}
          >
            <TileLayer
              url={osm.maptiler.url}
              attribution={osm.maptiler.attribution}
            />
            {/* Marker of User location */}
            {location.loaded && !location.error && (
              <Marker
                icon={userLocationIcon}
                position={[location.coordinates.lat, location.coordinates.lng]}
              />
            )}
            {/* Bus marker */}
            <Marker position={[54.3261, 19.1791]} icon={markerIcon}>
              <Popup>
                <b>Some info about bus</b>
              </Popup>
            </Marker>

            {/* Showing location */}
            <MyLocation location={location} />
          </MapContainer>
        </div>
      </div>
    </div>
  );
}

export default Map;
