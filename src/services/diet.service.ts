import Database from "better-sqlite3";

export interface AddFoodDto {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  eatAt: string;
  mealType: "breakfast" | "lunch" | "dinner" | "snack";
  title: string;
  food: string;
}

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
