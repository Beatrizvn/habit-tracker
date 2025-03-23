import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "./Text";
import theme from "@/styles/Theme";
import { HabitTracker } from "types/HabitTypes";
import { Ionicons } from "@expo/vector-icons";

type HabitTrackerItemProps = HabitTracker & {
  onDelete: () => void;
};

const HabitTrackerItem = ({ name, category, days, onDelete }: HabitTrackerItemProps) => {
  const weekDays = ["M", "T", "W", "T", "F", "S", "S"];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          {name} - {category}
        </Text>
        <TouchableOpacity onPress={onDelete}>
          <Ionicons name="trash" size={20} color={theme.colors.danger} />
        </TouchableOpacity>
      </View>
      <Text style={styles.subtitle}>This Week</Text>
      <View style={styles.daysContainer}>
        {weekDays.map((day, index) => (
          <View key={index} style={styles.dayWrapper}>
            <View
              style={[
                styles.circle,
                {
                  backgroundColor: days[index]
                    ? theme.colors.primary
                    : theme.colors.lighter_background,
                },
              ]}
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
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderRadius: 8,
    padding: 10,
    marginVertical: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 5,
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

export default HabitTrackerItem;
