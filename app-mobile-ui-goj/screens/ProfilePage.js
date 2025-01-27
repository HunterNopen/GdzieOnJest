import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";

const ProfilePage = ({ navigation }) => {
  
  
  const logoutHandler = () => {
    navigation.navigate('SignInPage'); // 'ProfilePage' to nazwa strony, na którą ma przejść użytkownik.
  };
  
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Konto</Text>
        </View>
        <View style={styles.profilImageSection}>
          <Image
            style={styles.profileImage}
            source={require("../assets/img/profile.png")}
          />
          <Text style={styles.changeImgText}>Zmień zdjęcie</Text>
        </View>

        {/** Input Fields */}
        <View style={styles.inputBackground}>
          <View style={styles.inputRowLeft}>
            <Image source={require("../assets/img/user.png")} style={styles.icon} />
            <Text>Imię</Text>
          </View>
          <View style={styles.inputRowRight}>
            <TextInput style={styles.input} placeholder="Imię" value="Jan" />
          </View>
        </View>

        <View style={styles.inputBackground}>
          <View style={styles.inputRowLeft}>
            <Image source={require("../assets/img/user.png")} style={styles.icon} />
            <Text>Nazwisko</Text>
          </View>
          <View style={styles.inputRowRight}>
            <TextInput style={styles.input} placeholder="Nazwisko" value="Kowalski" />
          </View>
        </View>

        <View style={styles.inputBackground}>
          <View style={styles.inputRowLeft}>
            <Image source={require("../assets/img/email.png")} style={styles.icon} />
            <Text>Email</Text>
          </View>
          <View style={styles.inputRowRight}>
            <TextInput style={styles.input} placeholder="Email" value="janKowalski@gmail.com" />
          </View>
        </View>

        <View style={styles.inputBackground}>
          <View style={styles.inputRowLeft}>
            <Image source={require("../assets/img/key.png")} style={styles.icon} />
            <Text>Hasło</Text>
          </View>
          <View style={styles.inputRowRight}>
            <TextInput style={styles.input} placeholder="Hasło" value="********" secureTextEntry />
          </View>
        </View>

        <TouchableOpacity style={styles.logOutButton} onPress={logoutHandler}>
          <Text style={styles.logOutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#767676",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  header: {
    marginTop: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 40,
    fontWeight: "600",
    color: "#EAEDA0",
  },
  profilImageSection: {
    margin: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  profileImage: {
    width: 200,
    height: 200,
  },
  changeImgText: {
    margin: 5,
    color: "#EAEDA0",
  },
  inputBackground: {
    width: 350,
    height: 60,
    backgroundColor: "#D9D9D9",
    borderRadius: 20,
    flexDirection: "row",
    margin: 12,
    alignItems: "center",
  },
  icon: {
    width: 30,
    height: 30,
    margin: 10,
  },
  inputRowLeft: {
    flexDirection: "row",
    flex: 0.25,
    alignItems: "center",
  },
  inputRowRight: {
    flexDirection: "row",
    flex: 0.75,
  },
  input: {
    flex: 1,
    margin: 10,
    textAlign: "right",
  },
  logOutButton: {
    backgroundColor: "#EAEDA0",
    width: 250,
    height: 60,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    margin: 12,
  },
  logOutText: {
    fontSize: 40,
    fontWeight: "600",
    color: "#171717",
  },
});

export default ProfilePage;
