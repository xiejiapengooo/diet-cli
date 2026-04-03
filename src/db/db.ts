import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";

export function createDietDatabase(dbPath: string): Database.Database {
  fs.mkdirSync(path.dirname(dbPath), { recursive: true });

  const db = new Database(dbPath);
  db.pragma("journal_mode = WAL");
  db.exec(`
    CREATE TABLE IF NOT EXISTS diet (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      create_at TEXT NOT NULL,
      eat_at TEXT NOT NULL,
      meal_type TEXT NOT NULL,
      title TEXT NOT NULL,
      foods TEXT NOT NULL,
      calories INTEGER,
      protein INTEGER,
      carbs INTEGER,
      fat INTEGER
    );
  `);

  return db;
}
