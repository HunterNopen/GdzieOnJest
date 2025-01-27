import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import Line from "../components/Line";
import RouteBox from "../components/RouteBox";
import SelectButton from "../components/SelectButton";
import SettingsButton from "../components/SettingsButton";
import TimeInput from "../components/TimeInput";
import DateInput from "../components/DateInput";
import SearchButton from "../components/SearchButton";
import dummyRoutesData from "../assets/DummyData";

function MainPage({ navigation, route }) {
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [routesData, setRoutesData] = useState([]);  // Początkowo pusta lista tras
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    // Jeśli nowa trasa została przekazana (np. po dodaniu jej), dodajemy ją do listy
    if (route.params?.newRoute) {
      setRoutesData((prevRoutes) => [...prevRoutes, route.params.newRoute]);  // Dodajemy nową trasę
    }

    // Po zaktualizowaniu tras, załaduj dane mockowe, ale nie nadpisuj nowych tras
    if (isLoading) {
      setTimeout(() => {
        if (routesData.length === 0) {  // Dodajemy tylko jeśli nie ma jeszcze tras
          setRoutesData(dummyRoutesData);
        }
        setIsLoading(false);
      }, 1000);
    }
  }, [route.params?.newRoute, isLoading]);  // Używamy useEffect, aby zaktualizować stan tylko wtedy, gdy nowa trasa jest przekazywana

  const validateForm = () => {
    if (!startLocation.trim()) {
      Alert.alert("Błąd", "Należy podać miejscowość początkową");
      return false;
    }
    if (!endLocation.trim()) {
      Alert.alert("Błąd", "Należy podać miejscowość końcową");
      return false;
    }
    return true;
  };

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  const handleTimeChange = (newTime) => {
    setSelectedTime(newTime);
  };

  const handleProfilePress = () => {
    navigation.navigate('ProfilePage');
  };

  const handleAddFavouriteRoute = () => {
    navigation.navigate('AddFavoriteRoute');  // Strona formularza dodawania nowej trasy
  };

  const handleSettingsPress = () => {
    navigation.navigate('SettingsPage');
  };

  const pressHandler = () => {
    if (validateForm()) {
      navigation.navigate('RoutesPage', {
        startLocation,
        endLocation,
        date: selectedDate.toISOString(),
        time: selectedTime.toISOString()
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.primarySearchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Miejscowość startowa"
          value={startLocation}
          onChangeText={setStartLocation}
        />
        <TextInput
          style={styles.input}
          placeholder="Miejscowość końcowa"
          value={endLocation}
          onChangeText={setEndLocation}
        />
        <View style={styles.inputRow}>
          <TimeInput onTimeChange={handleTimeChange} />
          <DateInput onDateChange={handleDateChange} />
          <SearchButton onPress={pressHandler} />
        </View>
      </View>
      <Line />
      <View style={styles.checkLineContainer}>
        <Text style={styles.checkLineText}>Sprawdź rozkład linii</Text>
        <SelectButton />
      </View>
      <Line />

      <LinearGradient
        colors={["#DFD1B6", "#C8C08F", "#E7DC53"]}
        style={styles.yourRoutesContainer}
      >
        <View style={styles.userHeader}>
          <TouchableOpacity onPress={handleProfilePress}>
            <Image
              style={styles.userProfileImg}
              source={require("../assets/img/profile.png")}
            />
          </TouchableOpacity>
          <Text style={styles.userHeaderText}>Twoje trasy</Text>
        </View>

        <ScrollView contentContainerStyle={styles.routesList}>
          {isLoading ? (
            <Text>Ładowanie...</Text>
          ) : (
            routesData.map((route, index) => (
              <RouteBox key={index} data={route} />
            ))
          )}
          <TouchableOpacity
            style={styles.addRoutesContainer}
            onPress={handleAddFavouriteRoute}
          >
            <Text style={styles.addRoutesText}>Dodaj trasy</Text>
            <Image
              style={styles.addRoutesImg}
              source={require("../assets/img/plusIcon.png")}
            />
          </TouchableOpacity>
        </ScrollView>

        <SettingsButton style={styles.settingsButton} onPress={handleSettingsPress} />
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#CECECE",
    height: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  primarySearchContainer: {
    backgroundColor: "#CECECE",
    marginTop: 50,
    alignItems: "center",
  },
  input: {
    margin: 7,
    borderWidth: 1,
    borderColor: "black",
    width: 336,
    borderRadius: 5,
    backgroundColor: "#D9D9D9",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 6,
    width: "100%",
  },
  checkLineContainer: {
    backgroundColor: "#CECECE",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  checkLineText: {
    fontSize: 22,
  },
  yourRoutesContainer: {
    flex: 1,
  },
  userHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 30,
    gap: 10,
    marginVertical: 15,
  },
  userProfileImg: {
    width: 90,
    height: 90,
  },
  userHeaderText: {
    fontSize: 40,
  },
  routesList: {
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
  },
  settingsButton: {
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  addRoutesContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  addRoutesImg: {
    width: 45,
    height: 45,
  },
  addRoutesText: {
    fontSize: 25,
    marginRight: 5,
  }
});

export default MainPage;
