import { TouchableOpacity,Text,View,Image,StyleSheet } from "react-native"

function SearchButton({onPress}){
return (
    <TouchableOpacity  style={styles.buttonContainer} onPress={onPress}>
        <Text style={styles.buttonText}>Szukaj</Text>
        <Image style={styles.iconImg} source={require('../assets/img/binoculars.png')}></Image>
    </TouchableOpacity>
)
}

export default SearchButton

const styles = StyleSheet.create({
    buttonText:{
        color:"white",
        marginRight:3
    },
    buttonContainer:{
        flexDirection:"row",
        backgroundColor:"#CCBE51",
        padding:5,
        alignItems:"center",
        borderWidth:1,
        borderColor:"black",
        borderRadius:5,
    },
    iconImg:{
        width:26,
        height:26,
    }
})