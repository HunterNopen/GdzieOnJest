import React, { useState, useEffect } from "react";

const useGeoLocation = () => {
  const [location, setLocation] = useState({
    loaded: false,
    coordinates: { lat: "", lng: "" },
  });

  const onSuccess = (location) => {
    setLocation({
      loaded: true,
      coordinates: {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      },
    });
  };

  const onCancel = (error) => {
    setLocation({
      loaded: true,
      error: {
        code: error.code,
        message: error.message,
      },
    });
  };

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      onCancel({
        code: 0,
        message: "Geolocation not supported",
      });
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onCancel);
  }, []);

  return location;
};

export default useGeoLocation;
