import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "./homeScreen";
import HabitDetailsScreen from "./habitDetailsScreen";
import AddHabitScreen from "./addHabitScreen";
import { StyleSheet, Text, View } from "react-native";
import theme from "@/styles/Theme";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Home") iconName = "home";
          else if (route.name === "Add Habit") iconName = "add-circle";
          else if (route.name === "Habits Details") iconName = "list";

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          backgroundColor: theme.colors.background, // Change this to your desired color
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen
        name=" "
        component={AddHabitScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <View
              style={{
                width: 60,
                height: 60,
                borderRadius: 30,
                backgroundColor: color,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Ionicons name="add-circle" size={size} color={theme.colors.lighter_background} />
            </View>
          ),
        }}
      />
      <Tab.Screen name="Habits Details" component={HabitDetailsScreen} />
    </Tab.Navigator>
  );
}
