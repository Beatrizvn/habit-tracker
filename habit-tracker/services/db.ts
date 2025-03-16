import * as SQLite from 'expo-sqlite';
import { SQLiteDatabase } from 'expo-sqlite';

export const openDatabase = async () => {
  const db = await SQLite.openDatabaseAsync('habit_tracker.db');
  return db;
};

export const createTables = async (db: SQLiteDatabase) => {
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS habits (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      description TEXT,
      goal TEXT,
      goal_count INTEGER,
      reminders TEXT,
      categories TEXT
    );
    CREATE TABLE IF NOT EXISTS habit_completions (
      habit_id INTEGER,
      completion_date TEXT,
      FOREIGN KEY (habit_id) REFERENCES habits(id)
    );
  `);
};

export const addTestHabits = async () => {
  const db = await openDatabase();
  const habits = [
    { name: 'Exercitar', description: 'Fazer exercícios físicos', goal: 'daily', goal_count: 7, reminders: '06:00', categories: 'Saúde' },
    { name: 'Ler', description: 'Ler um livro', goal: 'daily', goal_count: 7, reminders: '20:00', categories: 'Desenvolvimento' },
    { name: 'Meditar', description: 'Fazer meditação', goal: 'daily', goal_count: 7, reminders: '07:00', categories: 'Saúde' },
    { name: 'Beber Água', description: 'Beber 2 litros de água por dia', goal: 'daily', goal_count: 7, reminders: '10:00, 14:00, 18:00', categories: 'Saúde' },
    { name: 'Estudar', description: 'Estudar programação', goal: 'daily', goal_count: 7, reminders: '08:00', categories: 'Desenvolvimento' },
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
  console.log('Hábitos de teste adicionados!');
};

export const initializeDatabase = async (db: SQLiteDatabase) => {
  await createTables(db); 
};

