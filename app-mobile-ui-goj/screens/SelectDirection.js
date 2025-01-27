import { View, Image, Text, ImageBackground, StyleSheet } from "react-native";
import AppHeader from "../components/AppHeader";
import SettingsButton from "../components/SettingsButton";

const SelectDirection = ({ route }) => {
  const { line } = route.params;

  return (
    <View style={styles.selectDirectionContainer}>
      <ImageBackground
        source={require("../assets/img/gdansk.jpg")}
        style={styles.imgContainer}
      >
        <View style={styles.overlay} />
        <Text style={styles.imgTitle}>Gdańsk</Text>
        <View style={styles.downloadContainer}>
          <Text style={styles.downloadText}>Pobierz rozkład</Text>
          <Image style={styles.pdfIcon} source={require("../assets/img/pdfIcon.png")} />
        </View>
      </ImageBackground>

      <View style={styles.textContainer}>
        <Text style={styles.textTitle}>{line}</Text>
      </View>

      <ImageBackground
        source={require("../assets/img/sztutowo.jpg")}
        style={styles.imgContainer}
      >
        <View style={styles.overlay} />
        <Text style={styles.imgTitle}>Sztutowo</Text>
        <View style={styles.downloadContainer}>
          <Text style={styles.downloadText}>Pobierz rozkład</Text>
          <Image style={styles.pdfIcon} source={require("../assets/img/pdfIcon.png")} />
        </View>
      </ImageBackground>

      <SettingsButton style={styles.settingsButton} />
    </View>
  );
}

export default SelectDirection;

const styles = StyleSheet.create({
  selectDirectionContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  imgContainer: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  imgTitle: {
    textAlign: "center",
    fontSize: 36,
    color: "white",
    textShadowColor: '#000',
    textShadowOffset: { width: -2, height: 2 },
    textShadowRadius: 1,
  },
  textContainer: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#282828",
  },
  textTitle: {
    fontSize: 36,
    color: "white",
  },
  pdfIcon: {
    width: 22,
    height: 22,
  },
  downloadContainer: {
    flexDirection: "row",
  },
  downloadText: {
    color: "white",
    marginRight: 5,
  },
  settingsButton: {
    marginBottom: 20,
  },
});
