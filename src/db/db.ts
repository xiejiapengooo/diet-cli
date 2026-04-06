import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";

export function getDietDatabase(dbDirPath: string): Database.Database {
  fs.mkdirSync(dbDirPath, { recursive: true });

  const db = new Database(path.join(dbDirPath, "diet.db"));
  db.pragma("journal_mode = WAL");
  db.exec(`
    CREATE TABLE IF NOT EXISTS diet (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      create_at TEXT NOT NULL,
      eat_at TEXT NOT NULL,
      meal_type TEXT NOT NULL,
      foods TEXT NOT NULL,
      calories INTEGER,
      protein INTEGER,
      carbs INTEGER,
      fat INTEGER
    );
  `);

  return db;
}
