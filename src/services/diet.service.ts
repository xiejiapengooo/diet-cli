import Database from "better-sqlite3";
import { AddFoodDto, SearchDietDto, DietRecord } from "../types/index.js";

export function addRecord(db: Database.Database, dto: AddFoodDto) {
  try {
    const statement = db.prepare(`
      INSERT INTO diet (create_at, eat_at, meal_type, title, food, calories, protein, carbs, fat)
      VALUES (@create_at, @eat_at, @meal_type, @title, @food, @calories, @protein, @carbs, @fat)
    `);

    return statement.run({
      calories: dto.calories ?? 0,
      carbs: dto.carbs ?? 0,
      fat: dto.fat ?? 0,
      protein: dto.protein ?? 0,
      create_at: new Date().toISOString(),
      eat_at: new Date(dto.eatAt).toISOString(),
      food: dto.food,
      meal_type: dto.mealType,
      title: dto.title,
    });
  } finally {
    db.close();
  }
}

export function searchRecords(db: Database.Database, dto: SearchDietDto): DietRecord[] {
  try {
    const conditions: string[] = ["(title LIKE @keyword COLLATE NOCASE OR food LIKE @keyword COLLATE NOCASE)"];
    const params: Record<string, unknown> = {
      keyword: `%${dto.keyword}%`,
    };

    if (dto.mealType) {
      conditions.push("meal_type = @meal_type");
      params.meal_type = dto.mealType;
    }

    if (dto.fromEatAt) {
      conditions.push("eat_at >= @from_eat_at");
      params.from_eat_at = dto.fromEatAt;
    }

    if (dto.toEatAt) {
      conditions.push("eat_at <= @to_eat_at");
      params.to_eat_at = dto.toEatAt;
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";
    const statement = db.prepare(`
      SELECT
        id,
        create_at AS createAt,
        eat_at AS eatAt,
        meal_type AS mealType,
        title,
        food,
        calories,
        protein,
        carbs,
        fat
      FROM diet
      ${whereClause}
      ORDER BY eat_at DESC
    `);

    return statement.all(params) as DietRecord[];
  } finally {
    db.close();
  }
}
