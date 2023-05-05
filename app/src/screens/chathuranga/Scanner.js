import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Scanner = () => {
  return (
    <View style={styles.container}>
      <Text>Scanner</Text>
    </View>
  );
};

export default Scanner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
