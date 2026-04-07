import Database from "better-sqlite3";
import { AddMealDto, SearchDietDto, DietRecord } from "../types/index.js";

export function addRecord(db: Database.Database, dto: AddMealDto) {
  try {
    const statement = db.prepare(`
      INSERT INTO diet (create_at, eat_at, meal_type, foods, calories, protein, carbs, fat)
      VALUES (@create_at, @eat_at, @meal_type, @foods, @calories, @protein, @carbs, @fat)
    `);

    const data = {
      calories: dto.calories ?? 0,
      carbs: dto.carbs ?? 0,
      fat: dto.fat ?? 0,
      protein: dto.protein ?? 0,
      create_at: new Date().toISOString(),
      eat_at: dto.eatAt.toISOString(),
      foods: dto.foods,
      meal_type: dto.mealType,
    };

    const result = statement.run(data);

    return {
      id: result.lastInsertRowid,
      ...data,
    };
  } finally {
    db.close();
  }
}

export function searchRecords(db: Database.Database, dto: SearchDietDto): DietRecord[] {
  try {
    const conditions: string[] = ["(foods LIKE @keyword COLLATE NOCASE)"];
    const params: Record<string, unknown> = {
      keyword: `%${dto.keyword}%`,
    };

    if (dto.mealType) {
      conditions.push("meal_type = @meal_type");
      params.meal_type = dto.mealType;
    }

    if (dto.fromEatAt) {
      conditions.push("eat_at >= @from_eat_at");
      params.from_eat_at = dto.fromEatAt.toISOString();
    }

    if (dto.toEatAt) {
      conditions.push("eat_at <= @to_eat_at");
      params.to_eat_at = dto.toEatAt.toISOString();
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";
    const statement = db.prepare<any, DietRecord>(`
      SELECT * FROM diet ${whereClause} ORDER BY eat_at DESC
    `);

    return statement.all(params);
  } finally {
    db.close();
  }
}
