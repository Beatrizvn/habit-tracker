import React, { useState } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { Text } from "./Text";
import theme from "@/styles/Theme";

type SelectWeekDaysProps = {
  onSelect: (value: string) => void;
  selectedValue?: string;
};

const SelectWeekDays = ({ onSelect, selectedValue }: SelectWeekDaysProps) => {
  const weekDays = ["M", "T", "W", "T", "F", "S", "S"];
  const [days, setDays] = useState<boolean[]>(Array(7).fill(''));

  const toggleDay = (index: number) => {
    setDays((prevDays) => {
      const updatedDays = [...prevDays];
      updatedDays[index] = !updatedDays[index];
  
      const selectedDaysString = updatedDays
        .map((selected, i) => (selected ? i + 1 : null))
        .filter(Boolean)
        .join(",");
  
      onSelect(selectedDaysString);
  
      return updatedDays;
    });
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.daysContainer}>
        {weekDays.map((day, index) => (
          <View key={index} style={styles.dayWrapper}>
            <Pressable
              style={[
                styles.circle,
                {
                  backgroundColor: days[index]
                    ? theme.colors.primary
                    : theme.colors.lighter_background,
                },
              ]}
              onPress={() => toggleDay(index)}
            />
            <Text style={styles.dayText}>{day}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.darker_background,
    borderRadius: 8,
    padding: 10,
    marginVertical: 5,
  },
  daysContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dayWrapper: {
    alignItems: "center",
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginBottom: 5,
  },
  dayText: {
    fontSize: 12,
  },
});

export default SelectWeekDays;
