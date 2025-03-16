import { SQLiteDatabase } from "expo-sqlite";
import { Habit } from "types/HabitTypes";
import moment from "moment";

export const getHabits = async (db: SQLiteDatabase) => {
  const habits = await db.getAllAsync('SELECT * from habits');
  return habits as Habit[];
};

export const getTodayHabits = async (db: SQLiteDatabase) => {
  const today = moment().format('YYYY-MM-DD');
  const todayHabits = await db.getAllAsync(`
    SELECT * FROM habits
    WHERE id NOT IN (
      SELECT habit_id FROM habit_completions
      WHERE completion_date = ?
    )
  `, [today]);
  return todayHabits as Habit[];
};
