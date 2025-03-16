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

export const getWeeklyHabitsForTracker = async (db: SQLiteDatabase) => {
  const startOfWeek = moment().startOf('isoWeek').format('YYYY-MM-DD'); // Segunda-feira
  const endOfWeek = moment().endOf('isoWeek').format('YYYY-MM-DD'); // Domingo

  // Pegar todos os hábitos
  const habits = await db.getAllAsync('SELECT * FROM habits');

  // Pra cada hábito, buscar as marcações na semana atual e gerar o array `days`
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
        const dayIndex = completionDate.diff(moment(startOfWeek), 'days'); // Índice do dia (0 a 6)
        if (dayIndex >= 0 && dayIndex < 7) {
          days[dayIndex] = true; // Marca como preenchido
        }
      });

      return {
        id: habit.id,
        name: habit.name,
        category: habit.categories,
        days,
      };
    })
  );

  return habitsWithDays;
};