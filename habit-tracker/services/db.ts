import * as SQLite from "expo-sqlite";
import { SQLiteDatabase } from "expo-sqlite";

export const openDatabase = async () => {
  const db = await SQLite.openDatabaseAsync("habit_tracker.db");
  return db;
};

export const createTables = async (db: SQLiteDatabase) => {
  try {
    await db.execAsync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS habits (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE,
        description TEXT,
        goal TEXT,
        goal_count INTEGER,
        days TEXT,
        hour TEXT,
        category TEXT
      );
      CREATE TABLE IF NOT EXISTS habit_completions (
        habit_id INTEGER,
        completion_date TEXT,
        FOREIGN KEY (habit_id) REFERENCES habits(id),
        UNIQUE (habit_id, completion_date)
      );
    `);
    console.log("Tables created successfully!");
  } catch (error) {
    console.error("Error creating tables:", error);
  }
};

export const initializeDatabase = async (db: SQLiteDatabase) => {
  // await resetDatabase(db);
  await createTables(db);
  // await listTables(db);
  // await listColumns(db, 'habits')
  // await addTestHabits(db);
  // await addTestHabitCompletions(db);
};
