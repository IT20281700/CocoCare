import { StyleSheet, Text, View, Dimensions, Platform } from "react-native";
import React, { useEffect, useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { auth } from "../../../../firebase";
import { onAuthStateChanged } from "firebase/auth";

import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";

// screens
import SplashScreen from "./SplashScreen";
import Login from "./Login";
import Home from "./Home";
import Profile from "./Profile";
import Notification from "./Notification";
import Settings from "./Settings";
import Analysis from "../nadeeka/Analysis";
import Predictor from "../nikela/Predictor";
import Scanner from "../chathuranga/Scanner";
import Controller from "../chamod/Controller";

// components
import CustomDrawer from "../../components/common/CustomDrawer";

const Drawer = createDrawerNavigator();

const AuthStack = () => {
  const [dimensions, setDimensions] = useState(0);
  const [isLogged, setIsLogged] = useState(false);
  const [isAppFirstLaunched, setIsAppFirstLaunched] = useState(null);
  useEffect(() => {
    const windowDimensions = Dimensions.get("window").width;
    setDimensions(windowDimensions);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLogged(true);
      } else {
        setIsLogged(false);
      }
    });
  }, []);

  React.useEffect(() => {
    async function fetchData() {
      const appData = await AsyncStorage.getItem("isAppFirstLaunched");
      if (appData == null) {
        setIsAppFirstLaunched(true);
        const appData = await AsyncStorage.setItem(
          "isAppFirstLaunched",
          "false"
        );
      } else {
        Platform.OS == "web"
          ? setIsAppFirstLaunched(true)
          : setIsAppFirstLaunched(false);
      }
    }
    fetchData();
  }, []);
  return (
    isAppFirstLaunched != null && (
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawer {...props} />}
        screenOptions={{
          headerShown: true,
          drawerActiveBackgroundColor: "#aa18ea",
          drawerActiveTintColor: "#fff",
          drawerInactiveTintColor: "#333",
          drawerLabelStyle: {
            marginLeft: -25,
            fontSize: 15,
          },
          drawerType: isLogged
            ? dimensions >= 768
              ? "permanent"
              : "front"
            : "front",
          drawerStyle: dimensions >= 1247 ? { width: "20%" } : null,
          swipeEnabled: isLogged ? true : false,
        }}
      >
        {/* && Platform.OS != "web" */}
        {isAppFirstLaunched && (
          <Drawer.Screen
            name="Splash"
            component={SplashScreen}
            options={{ drawerItemStyle: { height: 0 }, headerShown: false }}
          />
        )}
        <Drawer.Screen
          name="Login"
          component={Login}
          options={{ drawerItemStyle: { height: 0 }, headerShown: false }}
        />
        <Drawer.Screen
          name="Home"
          component={Home}
          options={{
            drawerIcon: ({ color }) => (
              <Ionicons name="home-outline" size={22} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="Profile"
          component={Profile}
          options={{
            drawerIcon: ({ color }) => (
              <Ionicons name="person-outline" size={22} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="Notification"
          component={Notification}
          options={{
            drawerIcon: ({ color }) => (
              <Ionicons name="notifications-outline" size={22} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="Settings"
          component={Settings}
          options={{
            drawerIcon: ({ color }) => (
              <Ionicons name="settings-outline" size={22} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="Analysis"
          component={Analysis}
          options={{ drawerItemStyle: { height: 0 } }}
        />
        <Drawer.Screen
          name="Predictor"
          component={Predictor}
          options={{ drawerItemStyle: { height: 0 } }}
        />
        <Drawer.Screen
          name="Scanner"
          component={Scanner}
          options={{ drawerItemStyle: { height: 0 } }}
        />
        <Drawer.Screen
          name="Controller"
          component={Controller}
          options={{ drawerItemStyle: { height: 0 } }}
        />
      </Drawer.Navigator>
    )
  );
};

export default AuthStack;

const styles = StyleSheet.create({});
