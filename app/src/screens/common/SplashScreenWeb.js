import React from "react";
import { View, Text, ImageBackground, TouchableOpacity } from "react-native";

const SplashScreenWeb = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../../../assets/login-bg.jpeg")}
        style={styles.backgroundImage}
      >
        <Text style={styles.header}>Protect Your Coconut Trees</Text>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => {
            alert(navigation);
            navigation.navigate("Login");
          }}
        >
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 50,
  },
  loginButton: {
    backgroundColor: "#1E90FF",
    padding: 10,
    borderRadius: 5,
  },
  loginText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
};

export default SplashScreenWeb;
