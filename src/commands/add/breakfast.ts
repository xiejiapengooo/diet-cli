import { AddMealCommand } from "../../common/add-meal.command.js";

export default class AddBreakfast extends AddMealCommand {
  static override description = "add what you eat at breakfast time";

  static override examples = [
    `<%= config.bin %> <%= command.id %> "oatmeal" --title "Oatmeal with banana" --at "2026-03-31 08:00" --calories 420 --protein 18 --carbs 62 --fat 11`,
  ];

  protected override readonly mealType = "breakfast";
}
