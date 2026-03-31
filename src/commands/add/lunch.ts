import { AddMealCommand } from "../../common/add-meal.command.js";

export default class AddLunch extends AddMealCommand {
  static override description = "add what you eat at lunch time";

  static override examples = [
    `<%= config.bin %> <%= command.id %> "beef" --title "A piece of beef" --at "2026-03-31 12:30" --calories 650 --protein 100 --carbs 100 --fat 300`,
  ];

  protected override readonly mealType = "lunch";
  protected override readonly mealLabel = "lunch";
}
