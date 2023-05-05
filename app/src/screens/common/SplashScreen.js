import {
  StyleSheet,
  Text,
  View,
  Platform,
  ImageBackground,
} from "react-native";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../../firebase";
import { SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { FlatList } from "react-native";
import { Dimensions } from "react-native";
import { Image } from "react-native";
import { Alert } from "react-native";
import SplashScreenWeb from "./SplashScreenWeb";

const { height, width } = Dimensions.get("window");
const COLOR = { primary: "#282534", white: "#fff" };
const slides = [
  {
    id: "1",
    image: require("../../../../assets/splash/splash-1.jpg"),
    title: "Understanding the Threats to Your Coconut Trees",
    subtitle:
      " Learn about the most common diseases that can harm your coconut trees and how to identify them early.",
  },

  {
    id: "2",
    image: require("../../../../assets/splash/splash-2.jpg"),
    title: "Protecting Your Trees from Harm",
    subtitle:
      " Discover practical and effective solutions for preventing and treating common coconut tree diseases, and keep your trees healthy and productive.",
  },
  //
  {
    id: "3",
    image: require("../../../../assets/splash/splash-3.jpg"),
    title: "Ensuring a Bountiful Harvest",
    subtitle:
      "Get expert tips on caring for your coconut trees, from planting and fertilizing to pruning and pest control, and help your trees thrive for years to come.",
  },
  //
];

const Slide = ({ item }) => {
  return (
    <View style={{ alignItems: "center" }}>
      <Image
        source={item.image}
        style={{ height: "75%", width, resizeMode: "cover" }}
      />
      <View style={styles.titleCover}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subtitle}>{item.subtitle}</Text>
      </View>
    </View>
  );
};

const SplashScreen = ({ navigation }) => {
  // if already logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.navigate("Home");
      }
    });

    return unsubscribe;
  }, []);

  if (Platform.OS == "android" || Platform.OS == "ios") {
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const ref = React.useRef(null);
    const Footer = () => {
      return (
        <View
          style={{
            height: height * 0.25,
            justifyContent: "space-between",
            paddingHorizontal: 20,
            width: width,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 20,
            }}
          >
            {slides.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.indicator,
                  currentSlideIndex == index && {
                    backgroundColor: COLOR.white,
                    width: 25,
                  },
                ]}
              />
            ))}
          </View>
          <View style={{ marginBottom: 20 }}>
            {currentSlideIndex == slides.length - 1 ? (
              <View style={{ height: 50 }}>
                <TouchableOpacity
                  style={[styles.nextBtn]}
                  onPress={() => {
                    navigation.navigate("Login");
                  }}
                >
                  <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                    GET STARTED
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  style={[
                    styles.nextBtn,
                    {
                      backgroundColor: "transparent",
                      borderWidth: 1,
                      borderColor: COLOR.white,
                    },
                  ]}
                  onPress={skip}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 15,
                      color: COLOR.white,
                    }}
                  >
                    SKIP
                  </Text>
                </TouchableOpacity>
                <View style={{ width: 15 }} />
                <TouchableOpacity
                  style={[styles.nextBtn]}
                  onPress={goNextSlide}
                >
                  <Text style={{ fontWeight: "bold", fontSize: 15 }}>NEXT</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      );
    };
    const updateCurrentSlideIndex = (e) => {
      const contentOffsetX = e.nativeEvent.contentOffset.x;
      const currentIndex = Math.round(contentOffsetX / width);
      setCurrentSlideIndex(currentIndex);
    };
    const goNextSlide = () => {
      const nextSlideIndex = currentSlideIndex + 1;
      if (nextSlideIndex != slides.length) {
        const offset = nextSlideIndex * width;
        ref?.current?.scrollToOffset({ offset });
        setCurrentSlideIndex(nextSlideIndex);
      }
    };
    const skip = () => {
      const lastSlideIndex = slides.length - 1;
      const offset = lastSlideIndex * width;
      ref?.current?.scrollToOffset({ offset });
      setCurrentSlideIndex(lastSlideIndex);
    };
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" />
        <FlatList
          ref={ref}
          onMomentumScrollEnd={updateCurrentSlideIndex}
          pagingEnabled
          data={slides}
          contntContainerStyle={{ height: height * 0.75 }}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => <Slide item={item} />}
        />
        <Footer />
      </SafeAreaView>
    );
  } else {
    return (
      <View style={stylesWeb.container}>
        <ImageBackground
          source={require("../../../../assets/login-bg.jpeg")}
          style={stylesWeb.backgroundImage}
        >
          <Text style={stylesWeb.header}>Protect Your Coconut Trees</Text>
          <TouchableOpacity
            style={stylesWeb.loginButton}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={stylesWeb.loginText}>Login</Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    );
  }
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLOR.primary,
  },
  button: {
    borderColor: "black",
    borderWidth: 2,
    paddingVertical: 20,
    width: "60%",
    alignItems: "center",
    borderRadius: 15,
    backgroundColor: "#24a0ed",
    borderColor: "#24a0ed",
  },
  buttonText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#e4eefc",
  },
  titleCover: {
    borderTopWidth: 10,
    borderColor: "white",
    alignItems: "center",
    width: width,
  },
  title: {
    color: COLOR.white,
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "center",
    maxWidth: "70%",
  },
  subtitle: {
    color: COLOR.white,
    fontSize: 13,
    marginTop: 25,
    textAlign: "center",
    maxWidth: "70%",
  },
  indicator: {
    height: 2.5,
    width: 10,
    backgroundColor: "grey",
    marginHorizontal: 3,
    borderRadius: 2,
  },
  nextBtn: {
    flex: 1,
    height: 50,
    borderRadius: 5,
    backgroundColor: COLOR.white,
    justifyContent: "center",
    alignItems: "center",
  },
});

const stylesWeb = {
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
