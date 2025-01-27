import L from "leaflet";

export const markerIcon = new L.Icon({
  iconUrl: require("./images/busIcon.png"),
  iconSize: [35, 35],
});

export const userLocationIcon = new L.Icon({
  iconUrl: require("./images/geoIcon.png"),
  iconSize: [35, 35],
});
