import { useState, useEffect, useCallback } from "react";
import Geolocation from 'react-native-geolocation-service';
import { PermissionsAndroid, Platform } from 'react-native';

const useGeoLocation = () => {
  const [location, setLocation] = useState({
    loaded: false,
    coordinates: { lat: null, lng: null },
    error: null,
  });

  const requestLocationPermission = useCallback(async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Location Access Required",
            message: "This app needs to access your location",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      }
      return true; // iOS domyślnie pozwala na dostęp
    } catch (err) {
      console.warn(err);
      return false;
    }
  }, []);

  const onSuccess = useCallback((position) => {
    setLocation({
      loaded: true,
      coordinates: {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      },
      error: null,
    });
  }, []);

  const onError = useCallback((error) => {
    setLocation({
      loaded: true,
      coordinates: { lat: null, lng: null },
      error: {
        code: error.code,
        message: error.message,
      },
    });
  }, []);

  useEffect(() => {
    const fetchLocation = async () => {
      const hasPermission = await requestLocationPermission();
      if (hasPermission) {
        Geolocation.getCurrentPosition(onSuccess, onError, {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10000,
        });
      } else {
        setLocation({
          loaded: true,
          coordinates: { lat: null, lng: null },
          error: {
            code: 1,
            message: 'Location permission not granted',
          },
        });
      }
    };

    fetchLocation();
  }, [requestLocationPermission, onSuccess, onError]);

  return location;
};

export default useGeoLocation;
