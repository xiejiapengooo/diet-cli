import { AddMealCommand } from "../../common/add-meal.command.js";

export default class AddSnack extends AddMealCommand {
  static override description = "add what you eat for snacks";

  static override examples = [
    `<%= config.bin %> <%= command.id %> "nuts" --title "Mixed nuts" --at "2026-03-31 15:30" --calories 260 --protein 8 --carbs 10 --fat 22`,
  ];

  protected override readonly mealType = "snack";
}
