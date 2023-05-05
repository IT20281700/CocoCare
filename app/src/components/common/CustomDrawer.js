import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Image,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import Ionicons from "react-native-vector-icons/Ionicons";
import { auth } from "../../../../firebase";
import { signOut } from "firebase/auth";
import Loader from "./Loader";

export default function CustomDrawer(props) {
  const [loading, setLoading] = useState(false);
  const handleLogout = () => {
    setLoading(true);
    signOut(auth)
      .then(() => {
        console.log("User logout!");
        alert("Logout successfull.");
        setLoading(false);
        props.navigation.navigate("Login");
      })
      .catch((err) => {
        setLoading(false);
        alert(err.message);
      });
  };
  const loader = () => {
    if (loading) {
      return <Loader />;
    }
  };
  return (
    <View style={{ flex: 1 }}>
      {loader()}
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: "#8200d6" }}
      >
        <ImageBackground
          source={require("../../../../assets/menu-bg.jpeg")}
          style={{ padding: 20 }}
        >
          <Pressable
            onPress={() => {
              props.navigation.navigate("Profile");
            }}
            style={styles.profile_image}
          >
            <Image
              source={require("../../../../assets/user-profile.jpg")}
              style={styles.profile_image}
            />
          </Pressable>
          <Text style={{ color: "#fff", fontSize: 18 }}>
            {auth.currentUser?.email}
          </Text>
        </ImageBackground>
        <View style={{ flex: 1, backgroundColor: "#fff", paddingTop: 10 }}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: "#ccc" }}>
        <TouchableOpacity onPress={() => {}} style={{ paddingVertical: 15 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="share-social-outline" size={22} />
            <Text
              style={{
                fontSize: 15,
                marginLeft: 5,
              }}
            >
              Our Custom Text
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={(e) => {
            handleLogout();
          }}
          style={{ paddingVertical: 15 }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="log-out-outline" size={22} />
            <Text
              style={{
                fontSize: 15,
                marginLeft: 5,
              }}
            >
              Sign Out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  profile_image: {
    height: 80,
    width: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
});
