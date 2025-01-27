import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Modal, Button, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const MapPage = () => {
  const defaultLocation = {
    latitude: 54.352, // Gdańsk
    longitude: 18.646, // Gdańsk
    latitudeDelta: 0.01, // Przybliżony widok
    longitudeDelta: 0.01, // Przybliżony widok
  };

  const [region, setRegion] = useState(defaultLocation);
  const [userLocation, setUserLocation] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState("");

  // Funkcja do ustawienia lokalizacji użytkownika
  useEffect(() => {
    const getUserLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }
      const location = await Location.getCurrentPositionAsync({});
      if (location) {
        setUserLocation(location.coords);
        setRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
      }
    };

    getUserLocation();
  }, []);

  // Funkcja do zmiany widoku na lokalizację użytkownika
  const goToUserLocation = () => {
    if (userLocation) {
      setRegion({
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        latitudeDelta: region.latitudeDelta,
        longitudeDelta: region.longitudeDelta,
      });
    }
  };

  // Funkcja do zmiany widoku na punkt (bus location)
  const goToBusLocation = () => {
    setRegion({
      latitude: 54.330380, // Punkt docelowy (Gdańsk - Pomorze)
      longitude: 19.178412,
      latitudeDelta: region.latitudeDelta,
      longitudeDelta: region.longitudeDelta,
    });
  };

  // Funkcja do otwierania modala po kliknięciu na marker
  const onBusMarkerPress = () => {
    setModalContent("Powinienem przybyć za ~5min");
    setModalVisible(true);
  };

  const onGridMarkerPress = () => {
    setModalContent("To jest marker związany z siatką!");
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        showsUserLocation={true}
        followsUserLocation={true}
        showsMyLocationButton={false}
        zoomEnabled={true}
        scrollEnabled={true}
        rotateEnabled={false}
      >
        {/* Użycie własnego obrazka jako pinezki dla busa */}
        <Marker
          coordinate={{ latitude: 54.330380, longitude: 19.178412 }}
          onPress={onBusMarkerPress} // Kliknięcie na markerze otworzy modal
        >
          <Image
            source={require('../assets/img/logo.png')} // Ścieżka do własnego obrazka
            style={{ width: 35, height: 35 }}
          />
        </Marker>

        {/* Użycie własnego obrazka jako pinezki dla siatki */}
        <Marker
          coordinate={{ latitude: 54.340380, longitude: 19.188412 }}
          onPress={onGridMarkerPress} // Kliknięcie na markerze otworzy modal
        >
          <Image
            source={require('../assets/img/logo.png')} // Ścieżka do własnego obrazka
            style={{ width: 50, height: 50 }}
          />
        </Marker>
      </MapView>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={goToUserLocation}>
          <Text style={styles.buttonText}>Show User Location</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={goToBusLocation}>
          <Text style={styles.buttonText}>Go to Bus</Text>
        </TouchableOpacity>
      </View>

      {/* Modal, który pojawia się po kliknięciu na marker */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{modalContent}</Text>
            <Button title="Zamknij" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F1F1F1',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  buttonsContainer: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    padding: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    width: '40%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Przezroczysty czarny tło dla modala
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: 250,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 15,
  },
});

export default MapPage;
