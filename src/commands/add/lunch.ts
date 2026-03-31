import { Args, Command, Flags } from "@oclif/core";
import path from "node:path";
import { createDietDatabase } from "../../db/db.js";
import { addRecord } from "../../services/diet.service.js";

export default class AddLunch extends Command {
  static override description = "add what you eat at lunch time";

  static override args = {
    food: Args.string({ description: "what you eat at lunch", required: true }),
  };

  static override examples = [
    `<%= config.bin %> <%= command.id %> "beef" --title "A piece of beef" --at "2026-03-31 12:30" --calories 650 --protein 100 --carbs 100 --fat 300`,
  ];

  static override flags = {
    title: Flags.string({ description: "optional title", required: true }),
    at: Flags.string({ description: 'meal datetime, e.g. "2026-03-31 12:30"', required: true }),
    calories: Flags.integer({ description: "energy in kilocalories (kcal)", required: true }),
    protein: Flags.integer({ description: "protein in grams (g)", required: true }),
    carbs: Flags.integer({ description: "carbohydrates in grams (g)", required: true }),
    fat: Flags.integer({ description: "fat in grams (g)", required: true }),
  };

  public async run(): Promise<void> {
    const { args, flags } = await this.parse(AddLunch);

    if (flags.calories < 0) {
      this.error("--calories must be >= 0");
    }

    if (flags.calories < 0) {
      this.error("--protein must be >= 0");
    }

    if (flags.calories < 0) {
      this.error("--carbs must be >= 0");
    }

    if (flags.calories < 0) {
      this.error("--fat must be >= 0");
    }

    try {
      new Date(flags.at);
    } catch (error: any) {
      this.error(`--at ${error.message}`);
    }

    const db = createDietDatabase(path.join(this.config.dataDir, "diet.db"));
    const result = addRecord(db, {
      calories: flags.calories,
      protein: flags.protein,
      carbs: flags.carbs,
      fat: flags.fat,
      eatAt: flags.at,
      mealType: "lunch",
      title: flags.title,
      food: flags.food,
    });

    this.log(`Added lunch #${result.lastInsertRowid}`);
    this.log(`Food: ${args.food}`);
    this.log(`EatAt: ${flags.at}`);
  }
}
