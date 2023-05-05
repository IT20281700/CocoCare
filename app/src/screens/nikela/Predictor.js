import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Predictor = () => {
  return (
    <View style={styles.container}>
      <Text>Predictor</Text>
    </View>
  );
};

export default Predictor;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
