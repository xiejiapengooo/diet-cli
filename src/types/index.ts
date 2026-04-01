export const MealTypes = {
  breakfast: "breakfast",
  lunch: "lunch",
  dinner: "dinner",
  snack: "snack",
} as const;

export type MealType = (typeof MealTypes)[keyof typeof MealTypes];

export interface AddFoodDto {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  eatAt: string;
  mealType: MealType;
  title: string;
  food: string;
}

export interface SearchDietDto {
  keyword: string;
  mealType?: MealType;
  fromEatAt?: string;
  toEatAt?: string;
}

export interface DietRecord {
  id: number;
  createAt: string;
  eatAt: string;
  mealType: MealType;
  title: string;
  food: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}
