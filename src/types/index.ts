export const MealTypes = {
  breakfast: "breakfast",
  lunch: "lunch",
  dinner: "dinner",
  snack: "snack",
} as const;

export type MealType = (typeof MealTypes)[keyof typeof MealTypes];

export interface AddMealDto {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  eatAt: Date;
  mealType: MealType;
  foods: string;
}

export interface SearchDietDto {
  keyword?: string;
  mealType?: MealType;
  fromEatAt?: Date;
  toEatAt?: Date;
}

export interface DietRecord {
  id: number;
  create_at: string;
  eat_at: string;
  meal_type: MealType;
  foods: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface UserConfig {
  timezone: string;
}
