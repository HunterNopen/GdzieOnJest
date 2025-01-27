import { Text,View, StyleSheet, Image, Settings,TouchableOpacity} from "react-native"
import { useNavigation } from "@react-navigation/native";

function SettingsButton({}){
    const navigation = useNavigation(); // Inicjalizujemy useNavigation

    const handlePress = () => {
        navigation.navigate('SettingsPage'); // Przechodzimy na stronę ustawień
    };



    return (<TouchableOpacity  style={styles.buttonContainer} onPress={handlePress}>
        <Image style={styles.settingsIcon} source={require("../assets/img/settingsIcon.png")}/>
        <Text style={styles.settingsText}>Ustawienia</Text>
    </TouchableOpacity >)
}

export default SettingsButton

const styles = StyleSheet.create({
    buttonContainer:{
        width: '100%',
        height: 60,
        backgroundColor: '#939393',
        justifyContent: 'center',
        flexDirection:'row',
        alignItems:'center'
    },
    settingsIcon:{
        width:40,
        height:40, 
    },
    settingsText:{
        marginLeft:5,
        fontSize:36,
    
        color:"#171717",
        fontWeight:900
    }
})