import { View,Image,Text,StyleSheet } from "react-native";

function AppHeader(){
    return(
<View style={styles.headerContainer}>
    <Image style={styles.logoImg} source={require('../assets/img/logo.png')}/>
    <Text style={styles.titleText}>GdzieOnJest?</Text>
</View>
)
}

export default AppHeader;

const styles = StyleSheet.create({
    headerContainer:{
        width:'100%',
        height:100,
        backgroundColor:"#767676",
        flexDirection:"row",
        padding:20,
        marginTop:30
    },
    logoImg:{
        width:50,
        height:50
    },
    titleText:{
        fontSize:40,
        marginLeft:15
    }
})