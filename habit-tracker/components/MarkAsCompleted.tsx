import { Habit } from "types/HabitTypes";
import { View, StyleSheet, Pressable } from "react-native";
import { Text } from "./Text";
import theme from "@/styles/Theme";
import React, { useEffect, useState } from "react";
import Checkbox from "expo-checkbox";

type MarkAsCompletedProps = {
  habit: Habit; 
  onClick: (habit_id: number, isMark: boolean) => void;
};

export const MarkAsCompleted = ({ habit, onClick }: MarkAsCompletedProps) => {
  const [isSelected, setSelection] = useState<boolean>(!!habit.is_completed); 

  useEffect(() => {
    setSelection(!!habit.is_completed); 
  }, [habit.is_completed]);

  const handleCheckboxChange = (newValue: boolean) => {
    setSelection(newValue);
    onClick(habit.id, newValue); 
  };

  return (
    <Pressable onPress={() => handleCheckboxChange(!isSelected)}>
      <View style={styles.container}>
        <View style={{ flex: 3 }}>
          <Text type="subtitle">
            {habit.name} - {habit.categories}
          </Text>
          <Text>
            {habit.goal?.toUpperCase()} - {habit.reminders}
          </Text>
        </View>
        <Checkbox
          value={isSelected}
          onValueChange={handleCheckboxChange}
          style={styles.checkbox}
          color={isSelected ? theme.colors.primary : undefined}
        />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#222",
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderRadius: 8,
    padding: 10,
    marginVertical: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderColor: theme.colors.primary,
  },
});