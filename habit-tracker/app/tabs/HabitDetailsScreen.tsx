import ScreenLayout from "@/styles/ScreenLayout";
import HabitTrackerItem from "@components/HabitTrackerItem";
import { Text } from "@components/Text";
import { deleteHabit } from "@services/mutations";
import { getWeeklyHabitsForTracker } from "@services/queries";
import { useFocusEffect } from "expo-router/build/useFocusEffect";
import { useSQLiteContext } from "expo-sqlite/build/hooks";
import React from "react";
import { useState } from "react";
import { FlatList } from "react-native";
import { HabitTracker } from "types/HabitTypes";

export default function HabitDetailsScreen() {
  const db = useSQLiteContext();
  const [completedHabits, setCompletedHabits] = useState<HabitTracker[]>([]);

  const fetchHabits = async () => {
    const habitsData = await getWeeklyHabitsForTracker(db);
    setCompletedHabits(habitsData.filter((habit) => habit.id !== undefined) as HabitTracker[]);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteHabit(db, id);
      await fetchHabits(); 
    } catch (error) {
      console.error("Failed to delete habit:", error);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      fetchHabits();
    }, [])
  );

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
            onDelete={() => handleDelete(item.id)}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </ScreenLayout>
  );
}
