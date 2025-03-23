import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import theme from "@/styles/Theme";
import HomeScreen from "./HomeScreen";
import AddHabitScreen from "./AddHabitScreen";
import HabitDetailsScreen from "./HabitDetailsScreen";
import { RootTabParamList } from "types/Navigation";

const Tab = createBottomTabNavigator<RootTabParamList>(); 

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "HomeScreen") iconName = "home";
          else if (route.name === "AddHabit") iconName = "add-circle";
          else if (route.name === "HabitsDetails") iconName = "list";

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
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
      <Tab.Screen
        name="AddHabit"
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
      <Tab.Screen name="HabitsDetails" component={HabitDetailsScreen} />
    </Tab.Navigator>
  );
}
