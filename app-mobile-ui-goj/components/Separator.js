import { View, StyleSheet } from "react-native"

function Separator(){

    return (
        <View style={styles.separatorContainer}>
            <View style={styles.separatorElement}></View>
            <View style={styles.separatorElement}></View>
            <View style={styles.separatorElement}></View>
        </View>
    )
}

export default Separator

const styles = StyleSheet.create({
    separatorContainer: {
        alignItems: "center", // Wyśrodkowanie separatora
      },
    separatorElement:{
        width: 5,  // Szerokość kropki
        height: 5, // Wysokość kropki
        backgroundColor: "black",  // Kolor tła kropki
        borderRadius: 10,  // Zrobić kropkę okrągłą
        marginVertical: 3,  // Odstęp pionowy między kropkami
    }
})