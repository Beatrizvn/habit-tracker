import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "./homeScreen";
import HabitDetailsScreen from "./habitDetailsScreen";
import AddHabitScreen from "./addHabitScreen";

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
        tabBarActiveTintColor: "#4CAF50",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Add Habit" component={AddHabitScreen} />
      <Tab.Screen name="Habits Details" component={HabitDetailsScreen} />
    </Tab.Navigator>
  );
}
