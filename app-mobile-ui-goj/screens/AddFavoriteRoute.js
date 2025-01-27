import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from "react-native";

function AddFavoriteRoute({ navigation }) {
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [routeNumber, setRouteNumber] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");
  const [routeName, setRouteName] = useState(""); // Nowe pole na nazwę trasy
  
  const handleSaveRoute = () => {
    // Utwórz nową trasę na podstawie formularza
    const newRoute = {
      label: routeName || 'Trasa Testowa', // Jeśli nie podano nazwy, ustaw domyślną
      routeNumber: routeNumber,
      arrivalTime: arrivalTime,
      timeLeft: 10, // Możesz to ustawić dynamicznie
      departureStationName: startLocation,
      arrivalStationName: endLocation,
    };

    // Przekaż nową trasę do MainPage
    navigation.navigate('MainPage', { newRoute });
  };

  return (
    <View style={styles.container}>
      <View style={styles.rectangle}>
        <Text style={styles.title}>Dodaj trasę</Text>

        <TextInput
          style={styles.input}
          placeholder="Nazwa trasy"
          value={routeName}
          onChangeText={setRouteName}
        />
        <TextInput
          style={styles.input}
          placeholder="Miejscowość początkowa"
          value={startLocation}
          onChangeText={setStartLocation}
        />
        <TextInput
          style={styles.input}
          placeholder="Miejscowość końcowa"
          value={endLocation}
          onChangeText={setEndLocation}
        />
        <TextInput
          style={styles.input}
          placeholder="Numer linii"
          value={routeNumber}
          onChangeText={setRouteNumber}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Godzina przyjazdu"
          value={arrivalTime}
          onChangeText={setArrivalTime}
        />
        
        <TouchableOpacity style={styles.button} onPress={handleSaveRoute}>
          <Text style={styles.buttonText}>Zapisz trasę</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d3d3d3', // Light gray background
    padding: 16,
  },
  rectangle: {
    width: '80%',
    padding: 20,
    backgroundColor: '#f7f3b6', // Light yellow rectangle
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#888',
    padding: 12,
    marginBottom: 16,
    borderRadius: 6,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#f6d03d', // Yellow button
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default AddFavoriteRoute;
