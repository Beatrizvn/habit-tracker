import { Habit } from "./HabitTypes";

export const defaultHabit: Habit = {
  id: 0,
  name: "",
  description: "",
  goal: "daily",
  goal_count: 7,
  days: '0',
  hour: new Date(),
  category: "",
};