import { Args, Command, Flags } from "@oclif/core";
import path from "node:path";
import { createDietDatabase } from "../db/db.js";
import type { AddFoodDto } from "../services/diet.service.js";
import { addRecord } from "../services/diet.service.js";

export abstract class AddMealCommand extends Command {
  protected abstract readonly mealType: AddFoodDto["mealType"];
  protected abstract readonly mealLabel: string;

  static override args = {
    food: Args.string({ description: "what you eat", required: true }),
  };

  static override flags = {
    title: Flags.string({ description: "optional title", required: true }),
    at: Flags.string({ description: 'meal datetime, e.g. "2026-03-31 12:30"', required: true }),
    calories: Flags.integer({ description: "energy in kilocalories (kcal)", required: true }),
    protein: Flags.integer({ description: "protein in grams (g)", required: true }),
    carbs: Flags.integer({ description: "carbohydrates in grams (g)", required: true }),
    fat: Flags.integer({ description: "fat in grams (g)", required: true }),
  };

  public async run(): Promise<void> {
    const { args, flags } = await this.parse(this.ctor as typeof AddMealCommand);

    const valuesToValidate = [
      ["calories", flags.calories],
      ["protein", flags.protein],
      ["carbs", flags.carbs],
      ["fat", flags.fat],
    ] as const;

    for (const [name, value] of valuesToValidate) {
      if (value < 0) {
        this.error(`--${name} must be >= 0`);
      }
    }

    const eatAt = new Date(flags.at);
    if (Number.isNaN(eatAt.getTime())) {
      this.error('--at must be a valid datetime, e.g. "2026-03-31 12:30"');
    }

    const db = createDietDatabase(path.join(this.config.dataDir, "diet.db"));
    const result = addRecord(db, {
      calories: flags.calories,
      protein: flags.protein,
      carbs: flags.carbs,
      fat: flags.fat,
      eatAt: flags.at,
      mealType: this.mealType,
      title: flags.title,
      food: args.food,
    });

    this.log(`Added ${this.mealLabel} #${result.lastInsertRowid}`);
    this.log(`Food: ${args.food}`);
    this.log(`EatAt: ${flags.at}`);
  }
}
