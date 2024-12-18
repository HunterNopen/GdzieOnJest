import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { osm } from "../services/helpers/osm-provides.js";
import "leaflet/dist/leaflet.css";
import useGeoLocation from "../hooks/useGeoLocation";
import { markerIcon, userLocationIcon } from "../../../src/assets/assets.tsx";
import "../../assets/styles/map.css";

const latitude = 54.352;
const longitude = 18.6466;

function Map() {
  const [center, setCenter] = useState({ lat: latitude, lng: longitude });
  const zoom = 10;
  const location = useGeoLocation();

  return (
    <div className="row">
      <div className="col text-center">
        <h2>GdzieOnJest</h2>
        <p>Map of Gdansk</p>
        <div className="col">
          <MapContainer center={center} zoom={zoom} className="map-container">
            <TileLayer
              url={osm.maptiler.url}
              attribution={osm.maptiler.attribution}
            />
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
          </MapContainer>
        </div>
      </div>
    </div>
  );
}

export default Map;
