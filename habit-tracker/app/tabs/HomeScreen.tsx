import ScreenLayout from "@/styles/ScreenLayout";
import { MarkAsCompleted } from "@components/MarkAsCompleted";
import { Text } from "@components/Text";
import { initializeDatabase } from "@services/db";
import { getHabits, getHabitsCompletions } from "@services/queries";
import { useSQLiteContext } from "expo-sqlite/build/hooks";
import { useEffect, useState } from "react";
import { FlatList, ScrollView } from "react-native";
import { Habit } from "types/HabitTypes";
import { markAsCompleted, unMarkAsCompleted } from "@services/mutations";
import { useFocusEffect } from "expo-router/build/useFocusEffect";
import React from "react";


export default function HomeScreen() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const db = useSQLiteContext();

  const habitsQuery = async () => {
    const result = await getHabits(db);
    setHabits(result);
  };

  useEffect(() => {
    initializeDatabase(db);
    habitsQuery();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      habitsQuery();
    }, [])
  );

  const onClick = (habit_id: number, isMark: boolean) => {
    const result = async () => {
      try {
        const mark = isMark
          ? await markAsCompleted(db, habit_id)
          : await unMarkAsCompleted(db, habit_id);
        const updatedHabits = await getHabits(db); 
        setHabits(updatedHabits);
        return mark;
      } catch (error) {
        console.error("Error in onClick:", error);
      }
    };
    result();
    return result;
  };

  return (
    <ScreenLayout>
      <Text type="title">Today</Text>
      <FlatList
        data={habits}
        renderItem={({ item }) => (
          <MarkAsCompleted habit={item} onClick={onClick} />
        )}
        keyExtractor={(item) => item?.id?.toString() ?? ""}
      />
    </ScreenLayout>
  );
}
