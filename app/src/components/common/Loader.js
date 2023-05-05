import React from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";

const Loader = () => {
  return (
    <View style={styles.overlay}>
      <View style={styles.loader}>
        <ActivityIndicator size={80} color="#0000ff" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
  loader: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
  },
});

export default Loader;
