import { AddMealCommand } from "../../common/add-meal.command.js";

export default class AddDinner extends AddMealCommand {
  static override description = "add what you eat at dinner time";

  static override examples = [
    `<%= config.bin %> <%= command.id %> "salmon" --title "Salmon and vegetables" --at "2026-03-31 19:30" --calories 560 --protein 42 --carbs 35 --fat 28`,
  ];

  protected override readonly mealType = "dinner";
}
