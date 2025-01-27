import { View, Text, StyleSheet, Image } from "react-native";





function RouteBox({data}) {

    const timeLeftColor = data.timeLeft < 6 ? 'red' : (data.timeLeft < 16 ? 'orange' : 'green');
  return (
    <View style={styles.routeContainer}>
      <View style={styles.routeFirstRow}>
       
        <Image style={styles.symbol} source={require(`../assets/img/bus.png`)}></Image>
        <Text style={styles.routeNumber}>{data.routeNumber}</Text>
        <Text style={styles.arrivalTime}>{data.arrivalTime}</Text>
        
        <Text style={[styles.timeLeft,{color:timeLeftColor}]}>{data.timeLeft}</Text>
      </View>
      <View style={styles.routeSecondRow}>
        <Text style={styles.departureStationName}>{data.departureStationName}</Text>
        <Text style={styles.arrivalStationName}>{data.arrivalStationName}</Text>
      </View>
    </View>
  );
}

export default RouteBox;

const styles = StyleSheet.create({
  routeContainer: {
    width: 330,
    height: 70,
    backgroundColor: "#D9D9D9",
    borderRadius: 5,
    justifyContent: "center",
    marginVertical:10,
    borderWidth:2
},
  routeFirstRow:{
    height:40,
    flexDirection:'row',
    justifyContent:'space-between',
    paddingHorizontal:15,
    alignItems:'center'    
  },
  routeSecondRow:{
    borderTopColor:'black',
    borderTopWidth:2,
    height:40,
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center'
},
    // label:{
    // fontWeight:'900',
    // fontSize:20
    // },
  symbol:{
    width:25,
    height:25
  },
  routeNumber:{
    fontSize:20
  },
  arrivalTime:{
    fontSize:20
  },
  timeLeft:{
    fontSize:20
  },
  arrivalStationName:{
    fontSize:20
  },
  departureStationName:{
    fontSize:20
  }

});
