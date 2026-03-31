import {createDatabase} from '../db/db.js'

export interface AddMealRecordInput {
  calories?: number
  carbs?: number
  fat?: number
  food: string
  mealAt: Date
  mealType: string
  note?: string
  protein?: number
  title?: string
}

export interface AddMealRecordResult {
  id: number
}

export function addMealRecord(dbPath: string, input: AddMealRecordInput): AddMealRecordResult {
  const db = createDatabase(dbPath)

  try {
    const title = input.title?.trim() || input.note?.trim() || input.food

    const statement = db.prepare(`
      INSERT INTO food (create_at, eat_at, meal_type, title, food, calories, protein, carbs, fat)
      VALUES (@create_at, @eat_at, @meal_type, @title, @food, @calories, @protein, @carbs, @fat)
    `)

    const result = statement.run({
      calories: input.calories ?? null,
      carbs: input.carbs ?? null,
      create_at: new Date().toISOString(),
      eat_at: input.mealAt.toISOString(),
      fat: input.fat ?? null,
      food: input.food,
      meal_type: input.mealType,
      protein: input.protein ?? null,
      title,
    })

    return {
      id: Number(result.lastInsertRowid),
    }
  } finally {
    db.close()
  }
}

export function addLunchRecord(
  dbPath: string,
  input: Omit<AddMealRecordInput, 'mealType'>,
): AddMealRecordResult {
  return addMealRecord(dbPath, {
    ...input,
    mealType: 'lunch',
  })
}
