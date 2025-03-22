import * as SQLite from "expo-sqlite";
import { SQLiteDatabase } from "expo-sqlite";
import moment from "moment";

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

export const addTestHabits = async (db: SQLiteDatabase) => {
  const habits = [
    {
      name: "Exercise",
      description: "Do physical exercises",
      goal: "weekly",
      goal_count: 4,
      days: "1,2,3",
      hour: "06:00",
      category: "Health",
    },
    {
      name: "Read",
      description: "Read a book",
      goal: "daily",
      goal_count: 7,
      days: "1,2,3,4,5,6,7",
      hour: "20:00",
      category: "Development",
    },
    {
      name: "Meditate",
      description: "Practice meditation",
      goal: "weekly",
      goal_count: 5,
      days: "1,5,6",
      hour: "07:00",
      category: "Health",
    },
    {
      name: "Drink Water",
      description: "Drink 2 liters of water per day",
      goal: "daily",
      goal_count: 7,
      days: "1,2,3,4,5,6,7",
      hour: "10:00",
      category: "Health",
    },
    {
      name: "Study",
      description: "Study programming",
      goal: "weekly",
      goal_count: 5,
      days: "1,2,3",
      hour: "08:00",
      category: "Development",
    },
  ];

  for (const habit of habits) {
    const { name, description, goal, goal_count, days, hour, category } = habit;
    try {
      await db.runAsync(
        "INSERT INTO habits (name, description, goal, goal_count, days, hour, category) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [name, description, goal, goal_count, days, hour, category]
      );
    } catch (error) {
      console.error("Error adding test habits:", error);
    }
  }
  console.log("Add habit Test");
};

export const addTestHabitCompletions = async (db: SQLiteDatabase) => {
  const habitIds = [1, 2, 3, 4, 5];
  const today = moment();
  const daysToGenerate = 15;

  for (let i = 0; i < daysToGenerate; i++) {
    const date = moment(today).subtract(i, "days").format("YYYY-MM-DD");

    for (const habitId of habitIds) {
      const shouldComplete = Math.random() > 0.3;

      if (shouldComplete) {
        try {
          await db.runAsync(
            "INSERT INTO habit_completions (habit_id, completion_date) VALUES (?, ?)",
            [habitId, date]
          );
        } catch (error) {
          console.error(
            `Error to add habit completion, habit_id ${habitId} in date ${date}:`,
            error
          );
        }
      }
    }
  }
  console.log("Add Test Completions!");
};

export const resetDatabase = async (db: SQLiteDatabase) => {
  try {
    await db.execAsync("PRAGMA foreign_keys=OFF;");
    await db.execAsync("DROP TABLE IF EXISTS habits;");
    await db.execAsync("DROP TABLE IF EXISTS habit_completions;");
    await db.execAsync("DELETE FROM sqlite_sequence;");
    await db.execAsync("PRAGMA foreign_keys=ON;");
    
    console.log("Database reset completed successfully!");
  } catch (error) {
    console.error("Error during database reset:", error);
    throw error;
  }
};

export const listarTabelas = async (db: SQLiteDatabase) => {
  try {
    const result = await db.getAllAsync(
      "SELECT name FROM sqlite_master WHERE type='table';"
    );
    const tabelas = result.map((row: any) => row.name);
    console.log("Tabelas no banco de dados:", tabelas);
    return tabelas;
  } catch (error) {
    console.error("Erro ao listar tabelas:", error);
    throw error;
  }
};

export const listarColunas = async (db: SQLiteDatabase, nomeTabela: string) => {
  try {
    const result = await db.getAllAsync(`PRAGMA table_info(${nomeTabela});`);
    const colunas = result.map((row: any) => ({
      id: row.cid,
      nome: row.name,
      tipo: row.type,
      notNull: row.notnull === 1 ? "Sim" : "Não",
      valorPadrao: row.dflt_value,
      chavePrimaria: row.pk === 1 ? "Sim" : "Não",
    }));
    console.log(`Colunas da tabela "${nomeTabela}":`, colunas);
    return colunas;
  } catch (error) {
    console.error(`Erro ao listar colunas da tabela "${nomeTabela}":`, error);
    throw error;
  }
};

export const initializeDatabase = async (db: SQLiteDatabase) => {
  // await resetDatabase(db);
  await createTables(db);
  // await listarTabelas(db);
  // await listarColunas(db, 'habits')
  // await addTestHabits(db);
  // await addTestHabitCompletions(db);
};