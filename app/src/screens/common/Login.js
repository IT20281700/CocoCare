import { StatusBar } from "expo-status-bar";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Platform,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Image,
  Alert,
  BackHandler,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../../../../firebase";
import Loader from "../../components/common/Loader";
import { useBackHandler } from "@react-native-community/hooks";

const getDimension = () => {
  return Dimensions.get("window").width;
};

const Login = ({ navigation }) => {
  // states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.navigate("Home");
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });

    return unsubscribe;
  }, []);

  const backAction = () => {
    if (!isLoggedIn) {
      Alert.alert("", "Are you sure to exit the app?", [
        {
          text: "No",
          onPress: () => null,
          style: "cancel",
        },
        { text: "Yes", onPress: () => BackHandler.exitApp() },
      ]);
    }

    return !isLoggedIn;
  };
  useBackHandler(backAction);

  // register
  const handleRegister = () => {
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Registered with user.email: ", user.email);
        setEmail("");
        setPassword("");
        setLoading(false);
        alert(
          "User registration successfull!\nPlease login with your credentials"
        );
      })
      .catch((error) => {
        setLoading(false);
        alert(error.message);
      });
  };
  // login
  const handleLogin = () => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Logged in with user.email: ", user.email);
        setEmail("");
        setPassword("");
        setLoading(false);
        alert("Welcome to the CocoCare");
      })
      .catch((error) => {
        setLoading(false);
        alert(error.message);
      });
  };
  // Loader
  const loader = () => {
    if (loading) {
      return <Loader />;
    }
  };
  return (
    <ImageBackground
      source={require("../../../../assets/login-bg.jpeg")}
      style={{ height: "100%" }}
    >
      <View style={styles.container}>
        {loader()}
        <Image
          source={require("../../../../assets/cococare-logo.png")}
          style={styles.logo}
        />
        <View
          style={
            Platform.OS == "web"
              ? styles.inputContainerWeb
              : styles.inputContainer
          }
        >
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={styles.input}
            secureTextEntry
          />
        </View>
        <View
          style={
            Platform.OS == "web"
              ? styles.buttonContainerWeb
              : styles.buttonContainer
          }
        >
          <TouchableOpacity onPress={handleLogin} style={styles.button}>
            <Text style={styles.buttonText}>LOG IN</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleRegister}
            style={[styles.button, styles.buttonOutline]}
          >
            <Text style={styles.buttonOutlineText}>SIGN UP</Text>
          </TouchableOpacity>
        </View>
      </View>
      <StatusBar style="light" />
    </ImageBackground>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    width: "80%",
    paddingTop: 100,
  },
  inputContainerWeb: {
    width: getDimension() >= 768 ? "26%" : "80%",
    paddingTop: getDimension() >= 768 ? 40 : 100,
  },
  input: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 15,
    backgroundColor: "rgba(255,255,255, 0.6)",
    fontSize: 18,
  },
  buttonContainer: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  buttonContainerWeb: {
    width: getDimension() >= 768 ? "20%" : "80%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },

  button: {
    backgroundColor: "rgba(144, 238, 144, 1)",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "rgba(139, 69, 19, 1)",
    marginTop: 5,
    borderColor: "rgba(139, 69, 19, 0.5)",
    borderWidth: 2,
  },
  buttonText: {
    color: "#444444",
    fontWeight: "700",
    fontSize: 18,
  },
  buttonOutlineText: {
    color: "#F5DEB3",
    fontWeight: "700",
    fontSize: 18,
  },
  logo: {
    height: Platform.OS == "web" ? 240 : 150,
    width: Platform.OS == "web" ? 240 : 150,
    borderRadius: 40,
    marginBottom: 10,
    tintColor: "white",
  },
});
