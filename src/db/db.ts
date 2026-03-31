import Database from 'better-sqlite3'
import fs from 'node:fs'
import path from 'node:path'

export function createDatabase(dbPath: string): Database.Database {
  const dbDir = path.dirname(dbPath)
  if (dbDir && dbDir !== '.') {
    fs.mkdirSync(dbDir, {recursive: true})
  }

  const db = new Database(dbPath)
  db.pragma('journal_mode = WAL')
  db.exec(`
    CREATE TABLE IF NOT EXISTS food (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      create_at TEXT NOT NULL,
      eat_at TEXT NOT NULL,
      meal_type TEXT NOT NULL,
      title TEXT NOT NULL,
      food TEXT NOT NULL,
      calories INTEGER,
      protein INTEGER,
      carbs INTEGER,
      fat INTEGER
    );

    DROP INDEX IF EXISTS idx_records_meal_type_meal_at;
    CREATE INDEX IF NOT EXISTS idx_food_meal_type_eat_at
      ON food (meal_type, eat_at);
  `)

  return db
}
