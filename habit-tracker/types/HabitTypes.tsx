export type Habit = {
  id?: number;
  name: string;
  description: string;
  goal: "daily" | "weekly" | "monthly";
  goal_count: number;
  reminders: string;
  categories: string;
};

export type HabitCompletion = {
  habit_id: number;
  completion_date: string;
};
