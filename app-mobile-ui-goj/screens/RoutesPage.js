import { Text, View, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView } from "react-native";
import RouteBoxCopy from "../components/RouteBox";
import Separator from "../components/Separator";
import TimeInput from "../components/TimeInput";
import DateInput from "../components/DateInput";
import SearchButton from "../components/SearchButton";
import SettingsButton from "../components/SettingsButton";
import { useEffect, useState} from "react";

const routesData = [
  {
    symbol: "bus.png",
    routeNumber: 870,
    arrivalTime: "12:05",
    timeLeft: "5",
    departureStationName: "Gdynia",
    arrivalStationName: "Sztutowo",
  },
  {
    symbol: "bus.png",
    routeNumber: 870,
    arrivalTime: "12:15",
    timeLeft: "15",
    departureStationName: "Sopot",
    arrivalStationName: "Sztutowo",
  },
  {
  
    symbol: "bus.png",
    routeNumber: 870,
    arrivalTime: "12:20",
    timeLeft: "20",
    departureStationName: "Przejazdowo",
    arrivalStationName: "Sztutowo",
  },
  {
   
    symbol: "bus.png",
    routeNumber: 870,
    arrivalTime: "12:25",
    timeLeft: "25",
    departureStationName: "Dworek",
    arrivalStationName: "Sztutowo",
  },
  {
  
    symbol: "bus.png",
    routeNumber: 870,
    arrivalTime: "12:30",
    timeLeft: "30",
    departureStationName: "Cedry",
    arrivalStationName: "Sztutowo",
  },
  {
    
    symbol: "bus.png",
    routeNumber: 870,
    arrivalTime: "12:40",
    timeLeft: "40",
    departureStationName: "Mosty",
    arrivalStationName: "Sztutowo",
  },
  {
    
    symbol: "bus.png",
    routeNumber: 870,
    arrivalTime: "12:50",
    timeLeft: "50",
    departureStationName: "Drewnica",
    arrivalStationName: "Sztutowo",
  },
  {

    symbol: "bus.png",
    routeNumber: 870,
    arrivalTime: "13:00",
    timeLeft: "1h",
    departureStationName: "Mikoszewo",
    arrivalStationName: "Sztutowo",
  },
  {

    symbol: "bus.png",
    routeNumber: 870,
    arrivalTime: "13:10",
    timeLeft: ">1h",
    departureStationName: "Jantar",
    arrivalStationName: "Sztutowo",
  },
  {

    symbol: "bus.png",
    routeNumber: 870,
    arrivalTime: "13:20",
    timeLeft: ">1h",
    departureStationName: "Stegna",
    arrivalStationName: "Sztutowo",
  },
];
function RoutesPage({route, navigation}) {
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [time, setTime] = useState(new Date());
  const [date, setDate] = useState(new Date());
  const [visibleRoutes, setVisibleRoutes] = useState(3);

  useEffect(() => {
    if (route.params) {
      console.log(route.params); // Zobacz, co jest przekazywane w params
      setStartLocation(route.params.startLocation || "");
      setEndLocation(route.params.endLocation || "");
      setTime(route.params.time ? new Date(route.params.time) : new Date());
      setDate(route.params.date ? new Date(route.params.date) : new Date());
    }
  }, [route.params]);

  const loadMoreRoutes = () => {
    if (visibleRoutes + 3 <= routesData.length) {
      setVisibleRoutes(visibleRoutes + 3); // Zwiększamy o 3
    } else {
      setVisibleRoutes(routesData.length); // Ustawiamy maksymalną liczbę tras
    }
  };

  const handleTimeChange = (newTime) => {
    setTime(newTime);
  };

  const handleMapPage = () => {
    navigation.navigate('MapPage'); // 'ProfilePage' to nazwa strony, na którą ma przejść użytkownik.
  };

  return (
    <View style={styles.routesPageContainer}>
      <Text style={styles.routesPageTextHeader}>Dostępne trasy dla:</Text>

      <View style={styles.primarySearchContainer}>
        <View style={styles.fromToRow}>
          <TextInput
            style={styles.input}
            placeholder="Miejscowość startowa"
            value={startLocation}
            onChangeText={setStartLocation}
          />
          <View style={styles.dash}></View>
          <TextInput
            style={styles.input}
            placeholder="Miejscowość końcowa"
            value={endLocation}
            onChangeText={setEndLocation}
          />
        </View>
        <View style={styles.inputRow}>
          <TimeInput value={"2025-01-10T11:00:00"} onTimeChange={handleTimeChange} />
          <DateInput value={date ? date.toLocaleDateString() : ""} onChange={setDate} />
          <SearchButton />
        </View>
      </View>

      <ScrollView style={styles.routesList}>
        {routesData.slice(0, visibleRoutes).map((route, index) => (
          <View key={index}>
            <RouteBoxCopy data={route} />
            {index < visibleRoutes - 1 && <Separator />}
          </View>
        ))}

        {visibleRoutes < routesData.length && (
          <View style={styles.showMoreStopsContainer}>
            <Text style={styles.showMoreStopsText}>Pokaż kolejne przystanki</Text>
            <TouchableOpacity onPress={loadMoreRoutes}>
              <Image style={styles.plusIcon} source={require("../assets/img/plusIcon.png")} />
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      <TouchableOpacity style={styles.seeOnMapButton} onPress={handleMapPage}>
        <Image style={styles.mapIcon} source={require("../assets/img/mapIcon.png")} />
        <Text style={styles.seeOnMapText}>Zobacz autobus na mapie</Text>
      </TouchableOpacity>

      <SettingsButton />
    </View>
  );
}

const styles = StyleSheet.create({
  primarySearchContainer: {
      backgroundColor: "#CECECE",
      
      alignItems: "center",
      // padding: 15,
    

    },
    input: {
      margin: 7,
      borderWidth: 1,
      borderColor: "black",
      width: 180,
      borderRadius: 5,
      backgroundColor: "#D9D9D9",
    },
    timeInput: {
      width: 40,
      textAlign: "center",
    },
  
    rowIcon: {
      width: 26,
      height: 26,
    },
    inputRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-around",
      paddingHorizontal: 6,
      width: "100%",
    },
    inputsContainer: {
      flexDirection: "row",
      alignItems: "center",
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
      height: 500,
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
      // justifyContent: "center",
      // alignItems: "center",
      
    },
routesPageContainer: {
  backgroundColor: "#CECECE",
  alignItems:'center',
  // flex: 1,
  height:'100%',
  justifyContent: 'space-between',
},

showMoreStopsContainer:{
  flexDirection:'row',
  justifyContent:'center',
  alignItems:'center',
  marginTop:20
  
},
plusIcon:{
  width:40,
  height:40
},
showMoreStopsText:{
  fontSize:20,
  marginRight:10
},
mapIcon:{
  width:50,
  height:50,
},
seeOnMapButton:{
  width:180,
  height:80,
  backgroundColor:"#CCBE51",
  flexDirection:'row',
  padding:10,
  justifyContent:'center',
  alignItems:'center',
  borderRadius:10,
  borderBlockColor:'black',
  borderWidth:2,
  marginBottom:20
},
seeOnMapText:{
  width:100,
  textAlign:'center',
  fontSize:16,
  fontWeight:600,
  color:"white",
  marginLeft:10
},
fromToRow:{
  flexDirection:'row',
  alignItems:'center'
},
dash:{
  width:10,
  height:5,
  backgroundColor:'black',
},
routesPageTextHeader:{
  fontSize:40,
  marginTop:50,
  fontWeight:700
},
container:{
flex:1,
height:'100%',
backgroundColor: "#CECECE",
}
});
export default RoutesPage;
