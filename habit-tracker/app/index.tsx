import TabNavigator from "@/tabs/TabNavigator";
import { StyleSheet, Text, View } from "react-native";
import theme from "./styles/Theme";

export default function App() {
  return (
    <View style={styles.container}>
      <TabNavigator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
