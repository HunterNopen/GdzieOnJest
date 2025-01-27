import { StyleSheet,Text,View } from "react-native"

function Line(){
return (
    <View style={styles.line}></View>
)
}

export default Line


const styles = StyleSheet.create({
    line:{
        height:4,
        width:'100%',
        backgroundColor:'black'
    }
})

