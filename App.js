import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./app/src/screens/common/AuthStack";

export default function App() {
  return (
    <NavigationContainer>
      <AuthStack />
    </NavigationContainer>
  );
}
