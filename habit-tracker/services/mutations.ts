import { SQLiteDatabase } from "expo-sqlite";
import { Habit, HabitCompletion } from "types/HabitTypes";
import moment from "moment";

export const markAsCompleted = async (db: SQLiteDatabase, habit_id: number) => {
  try {
    const result = await db.runAsync(
      "INSERT INTO habit_completions (habit_id, completion_date) VALUES (?, ?)",
      habit_id,
      moment().format("YYYY-MM-DD")
    );
    return result;
  } catch (error) {
    console.error("Error marking habit as completed:", error);
    throw error;
  }
};

export const unMarkAsCompleted = async (
  db: SQLiteDatabase,
  habit_id: number
) => {
  try {
    const result = await db.runAsync(
      "DELETE FROM habit_completions WHERE habit_id = ? AND completion_date = ?",
      habit_id,
      moment().format("YYYY-MM-DD")
    );
    return result;
  } catch (error) {
    console.error("Error unmarking habit as completed:", error);
    throw error;
  }
};

export const createHabit = async (db: SQLiteDatabase, newHabit: Habit) => {
  try {
    const result = await db.runAsync(
      "INSERT INTO habits (name, goal, goal_count, days, hour, category) VALUES (?, ?, ?, ?, ?, ?)",
      newHabit.name,
      newHabit.goal,
      newHabit.goal_count,
      newHabit.days,
      (newHabit.hour ? newHabit.hour.toString() : null),
      newHabit.category
    );
    return result;
  } catch (error) {
    console.error("Error adding new habit:", error);
    throw error;
  }
};

export const deleteHabit = async (db: SQLiteDatabase, habitId: number) => {
  try {
    const resultHabit = await db.runAsync(
      "DELETE FROM habits WHERE id = ?",
      habitId
    );
    const resultCompletions = await db.runAsync(
      "DELETE FROM habit_completions WHERE habit_id = ?",
      habitId
    );
    if (resultHabit.changes > 0 && resultCompletions.changes >= 0) {
      return { success: true };
    }
  } catch (error) {
    console.error("Error deleting habit:", error);
    throw error;
  }
};