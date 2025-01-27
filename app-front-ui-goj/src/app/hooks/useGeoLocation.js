import React, { useState, useEffect, useCallback } from "react";

const useGeoLocation = () => {
  const [location, setLocation] = useState({
    loaded: false,
    coordinates: { lat: "", lng: "" },
    error: null,
  });

  const onSuccess = useCallback((location) => {
    setLocation({
      loaded: true,
      coordinates: {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      },
    });
  }, []);

  const onCancel = useCallback((cancel) => {
    setLocation({
      loaded: true,
      error: {
        code: cancel.code,
        message: cancel.message,
      },
    });
  }, []);

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
