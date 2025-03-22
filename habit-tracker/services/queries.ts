import { SQLiteDatabase } from "expo-sqlite";
import { Habit } from "types/HabitTypes";
import moment from "moment";

export const getHabits = async (db: SQLiteDatabase) => {
  const today = moment().format('YYYY-MM-DD');
  const habits = await db.getAllAsync(
    `
      SELECT h.*, 
             CASE WHEN hc.completion_date IS NOT NULL THEN 1 ELSE 0 END AS is_completed
      FROM habits h
      LEFT JOIN habit_completions hc 
      ON h.id = hc.habit_id AND hc.completion_date = ?
    `,
    [today]
  );
  return habits as Habit[];
};

export const getHabitsCompletions = async (db: SQLiteDatabase) => {
  const habits = await db.getAllAsync('SELECT * from habit_completions');
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

export const getWeeklyHabitsForTracker = async (db: SQLiteDatabase) => {
  const startOfWeek = moment().startOf('isoWeek').format('YYYY-MM-DD'); 
  const endOfWeek = moment().endOf('isoWeek').format('YYYY-MM-DD'); 

  const habits = await db.getAllAsync('SELECT * FROM habits') as Habit[];

  const habitsWithDays = await Promise.all(
    habits.map(async (habit: Habit) => {
      const completions = await db.getAllAsync(
        `
        SELECT completion_date 
        FROM habit_completions 
        WHERE habit_id = ? AND completion_date BETWEEN ? AND ?
      `,
        [habit.id, startOfWeek, endOfWeek]
      );
      const days = Array(7).fill(false);

      completions.forEach((completion) => {
        const completionDate = moment(completion.completion_date);
        const dayIndex = completionDate.diff(moment(startOfWeek), 'days'); 
        // console.log(completionDate)
        if (dayIndex >= 0 && dayIndex < 7) {
          days[dayIndex] = true; 
        }
      });
      
      // Return the habit and his week completion
      return {
        id: habit.id,
        name: habit.name,
        category: habit.category,
        days,
      };
    })
  );
  // console.log(habitsWithDays)
  return habitsWithDays;
};