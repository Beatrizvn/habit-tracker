import * as SQLite from 'expo-sqlite';
import { SQLiteDatabase } from 'expo-sqlite';
import moment from 'moment';

export const openDatabase = async () => {
  const db = await SQLite.openDatabaseAsync('habit_tracker.db');
  return db;
};

export const createTables = async (db: SQLiteDatabase) => {
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS habits (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE,
      description TEXT,
      goal TEXT,
      goal_count INTEGER,
      reminders TEXT,
      categories TEXT
    );
    CREATE TABLE IF NOT EXISTS habit_completions (
      habit_id INTEGER,
      completion_date TEXT,
      FOREIGN KEY (habit_id) REFERENCES habits(id),
      UNIQUE (habit_id, completion_date)
    );
  `);
};

export const addTestHabits = async (db: SQLiteDatabase) => {
  const habits = [
    { name: 'Exercise', description: 'Do physical exercises', goal: 'weekly', goal_count: 4, reminders: '06:00', categories: 'Health' },
    { name: 'Read', description: 'Read a book', goal: 'daily', goal_count: 7, reminders: '20:00', categories: 'Development' },
    { name: 'Meditate', description: 'Practice meditation', goal: 'weekly', goal_count: 5, reminders: '07:00', categories: 'Health' },
    { name: 'Drink Water', description: 'Drink 2 liters of water per day', goal: 'daily', goal_count: 7, reminders: '10:00, 14:00, 18:00', categories: 'Health' },
    { name: 'Study', description: 'Study programming', goal: 'weekly', goal_count: 5, reminders: '08:00', categories: 'Development' },
  ];

  for (const habit of habits) {
    const { name, description, goal, goal_count, reminders, categories } = habit;
    try {
      await db.runAsync(
        'INSERT INTO habits (name, description, goal, goal_count, reminders, categories) VALUES (?, ?, ?, ?, ?, ?)',
        [name, description, goal, goal_count, reminders, categories]
      );
    } catch (error) {
      console.error('Erro ao adicionar hábitos de teste:', error);
    }
  }
  console.log('Add habit Test');
};

export const addTestHabitCompletions = async (db: SQLiteDatabase) => {

  const habitIds = [1, 2, 3, 4, 5]; 
  const today = moment(); 
  const daysToGenerate = 15; 

  for (let i = 0; i < daysToGenerate; i++) {
    const date = moment(today).subtract(i, 'days').format('YYYY-MM-DD'); 

    for (const habitId of habitIds) {
      const shouldComplete = Math.random() > 0.3;

      if (shouldComplete) {
        try {
          await db.runAsync(
            'INSERT INTO habit_completions (habit_id, completion_date) VALUES (?, ?)',
            [habitId, date]
          );
        } catch (error) {
          console.error(`Error to add habit completion, habit_id ${habitId} in date ${date}:`, error);
        }
      }
    }
  }
  console.log('Add Test Completions!');
};

export const resetDatabase = async (db: SQLiteDatabase) => {
  try {
    await db.execAsync('PRAGMA foreign_keys=OFF;'); // Disable foreign keys temporarily
    await db.execAsync('DELETE FROM habits;');
    await db.execAsync('DELETE FROM habit_completions;');
    await db.execAsync('DELETE FROM sqlite_sequence WHERE name = "habits";'); // Reset habits sequence
    await db.execAsync('DELETE FROM sqlite_sequence WHERE name = "habit_completions";'); // Reset completions sequence
    await db.execAsync('PRAGMA foreign_keys=ON;'); // Re-enable foreign keys
    console.log('Database reset completed successfully and ID sequences reinitialized!');
  } catch (error) {
    console.error('Error during database reset:', error);
  }
};

export const initializeDatabase = async (db: SQLiteDatabase) => {
  // await resetDatabase(db);
  await createTables(db); 
  // await addTestHabits(db);
  // await addTestHabitCompletions(db);
};

