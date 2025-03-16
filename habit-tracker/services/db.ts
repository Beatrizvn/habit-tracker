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
  // console.log('Hábitos de teste adicionados!');
};

export const addTestHabitCompletions = async () => {
  const db = await openDatabase();

  // Supondo que os hábitos têm IDs de 1 a 5 (baseado na ordem de inserção)
  const habitIds = [1, 2, 3, 4, 5]; // Exercitar, Ler, Meditar, Beber Água, Estudar

  // Gerar marcações para os últimos 15 dias (incluindo a semana atual)
  const today = moment(); // 16 de março de 2025
  const daysToGenerate = 15; // 15 dias de histórico

  for (let i = 0; i < daysToGenerate; i++) {
    const date = moment(today).subtract(i, 'days').format('YYYY-MM-DD'); // Gera datas retrocedendo

    // Para cada dia, decidir quais hábitos foram completados (aleatoriamente, pra simular uso real)
    for (const habitId of habitIds) {
      // Probabilidade de 70% de completar o hábito (pra não ser 100% preenchido)
      const shouldComplete = Math.random() > 0.3;

      if (shouldComplete) {
        try {
          await db.runAsync(
            'INSERT INTO habit_completions (habit_id, completion_date) VALUES (?, ?)',
            [habitId, date]
          );
        } catch (error) {
          console.error(`Erro ao adicionar conclusão para habit_id ${habitId} na data ${date}:`, error);
        }
      }
    }
  }

  // console.log('Conclusões de teste adicionadas à tabela habit_completions!');
};

export const initializeDatabase = async (db: SQLiteDatabase) => {
  await createTables(db); 
  // await addTestHabitCompletions();
};

