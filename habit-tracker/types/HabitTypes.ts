export type Habit = {
  id: number,
  name: string,
  description: string,
  goal: "daily" | "weekly" | "monthly",
  goal_count: number,
  days: string,
  hour: string,
  category: string,
  is_completed?: string;
};

export type HabitCompletion = {
  habit_id: number,
  completion_date: string,
};

export type HabitTracker = {
  id: number,
  name: string,
  category: string,
  days: boolean[],
}