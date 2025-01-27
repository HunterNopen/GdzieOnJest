import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";

function DateInput({onDateChange}) {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange=(event,selectedDate)=>{
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
      onDateChange(selectedDate)
    }
  }

  return (
    <View style={styles.inputsContainer}>
      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <Text style={[styles.input, styles.dateInput]}>
          {date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
      <Image
        style={styles.rowIcon}
        source={require("../assets/img/calendar.png")}
      />
    </View>
  );
}

export default DateInput;

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
    dateInput: {
      width: 110,
      textAlign: "center",
      fontSize:18
    },
    rowIcon: {
      width: 26,
      height: 26,
    },
  });