import { SQLiteDatabase } from "expo-sqlite";
import { Habit, HabitCompletion } from "types/HabitTypes";
import moment from "moment";

export const markAsCompleted = async (db: SQLiteDatabase, habit_id: number) => {
  try {
    const result = await db.runAsync(
      'INSERT INTO habit_completions (habit_id, completion_date) VALUES (?, ?)', habit_id, moment().format('YYYY-MM-DD')
    );
    return result;
  } catch (error) {
    console.error("Error marking habit as completed:", error);
    throw error;
  }
};

export const unMarkAsCompleted = async (db: SQLiteDatabase, habit_id: number) => {
  try {
    const result = await db.runAsync(
      'DELETE FROM habit_completions WHERE habit_id = ? AND completion_date = ?', habit_id, moment().format('YYYY-MM-DD')
    );
    return result;
  } catch (error) {
    console.error("Error unmarking habit as completed:", error);
    throw error;
  }
};