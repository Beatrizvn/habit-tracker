import ScreenLayout from "@/styles/ScreenLayout";
import HabitTrackerItem from "@components/HabitTrackerItem";
import { Text } from "@components/Text";
import { getHabits, getWeeklyHabitsForTracker } from "@services/queries";
import { useSQLiteContext } from "expo-sqlite/build/hooks";
import { useEffect, useState } from "react";
import { FlatList, ScrollView } from "react-native";
import { HabitTracker } from "types/HabitTypes";


export default function HabitDetailsScreen() {
  const db = useSQLiteContext();
  const [completedHabits, setCompletedHabits] = useState<HabitTracker[]>([]);

  useEffect(() => {
    const fetchHabits = async () => {
      const habitsData = await getWeeklyHabitsForTracker(db);
      setCompletedHabits(habitsData); 
    };
    fetchHabits();
  }, []);

  return (
    <ScreenLayout>
      <Text type="title">Your Habits</Text>
      <FlatList
        data={completedHabits}
        renderItem={({ item }) => (
          <HabitTrackerItem
            id={item.id}
            key={item.id}
            name={item.name}
            category={item.category}
            days={item.days}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </ScreenLayout>
  );
}
