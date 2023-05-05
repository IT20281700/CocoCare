import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Alert,
  BackHandler,
} from "react-native";
import React, { useCallback, useState } from "react";
import { useBackHandler } from "@react-native-community/hooks";

const { width, height } = Dimensions.get("window");
const COLOR = { red: "red", white: "white", green: "green", lgrey: "#f5f5f5" };

const Boxes = ({ nav }) => {
  const [boxes] = useState([
    {
      title: "ANALYSIS",
      screen: "Analysis",
    },
    {
      title: "PREDICTOR",
      screen: "Predictor",
    },
    {
      title: "SCANNER",
      screen: "Scanner",
    },
    {
      title: "CONTROLLER",
      screen: "Controller",
    },
    {
      title: "PROFILE",
      screen: "Profile",
    },
    {
      title: "SETTINGS",
      screen: "Settings",
    },
  ]);
  return (
    <ScrollView contentContainerStyle={styles.boxContainer}>
      {boxes.map((box, i) => (
        <TouchableOpacity
          onPress={() => nav.navigate(box.screen)}
          key={i}
          style={styles.box}
        >
          <Text style={styles.b_title}>{box.title}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const Home = ({ navigation }) => {
  useBackHandler(
    useCallback(() => {
      navigation.navigate("Home");
      return true;
    })
  );
  return (
    <View style={styles.body}>
      <View style={[styles.section]}>
        <View style={styles.container}>
          <Boxes nav={navigation} />
        </View>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    margin: 0,
    padding: 0,
    backgroundColor: COLOR.lgrey,
    color: "#111",
  },
  section: {
    flex: 1,
    maxWidth: width,
  },
  container: {
    width: "100%",
    padding: 10,
    marginLeft: "auto",
    marginRight: "auto",
    flex: 1,
  },
  boxContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  box: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    margin: 10,
    minWidth: Platform.OS == "android" ? width / 3 : width / 4,
    minHeight: Platform.OS == "android" ? height / 4 : height / 3,
    justifyContent: "center",
    alignItems: "center",
  },
  b_title: {
    fontWeight: "700",
    fontSize: 20,
  },
});
