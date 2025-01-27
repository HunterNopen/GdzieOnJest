import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";

function TimeInput({onTimeChange}) {
   const [time, setTime] = useState(new Date(2025, 0, 10, 12, 0));
  const [showTimePicker, setShowTimePicker] = useState(false);


  const handleTimeChange=(event,selectedTime)=>{
    setShowTimePicker(false);
    if (selectedTime) {
      setTime(selectedTime);
      onTimeChange(selectedTime)
    }
  }

  
    
 

  return (
    <View style={styles.inputsContainer}>
      <TouchableOpacity onPress={() => setShowTimePicker(true)}>
        <Text style={[styles.input, styles.timeInput]}>
          {time.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })}
        </Text>
      </TouchableOpacity>
      {showTimePicker && (
        <DateTimePicker
          value={time}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={handleTimeChange}
        />
      )}
      <Image
        style={styles.rowIcon}
        source={require("../assets/img/clock.png")}
      />
    </View>
  );
}

export default TimeInput;

const styles = StyleSheet.create({
    inputsContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    input: {
      margin: 7,
      height: 40,
      borderWidth: 1,
      borderColor: "black",
      width: 336,
      borderRadius: 5,
      backgroundColor: "#D9D9D9",
      textAlign: 'center',
      lineHeight: 40, 
      textAlignVertical: 'center',
    },
    timeInput: {
      width: 60,
      textAlign: "center",
      fontSize:18
    },
    rowIcon: {
      width: 26,
      height: 26,
    },
  });
