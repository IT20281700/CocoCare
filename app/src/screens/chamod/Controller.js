import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Controller = () => {
  return (
    <View style={styles.container}>
      <Text>Controller</Text>
    </View>
  );
};

export default Controller;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
