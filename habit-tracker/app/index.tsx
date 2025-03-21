import TabNavigator from "@/tabs/TabNavigator";
import { StyleSheet, Text, View } from "react-native";
import { SQLiteProvider } from "expo-sqlite/build/hooks";

export default function App() {
  return (
    <View style={styles.container}>
      <SQLiteProvider databaseName="habit_tracker.db">
        <TabNavigator />
      </SQLiteProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
