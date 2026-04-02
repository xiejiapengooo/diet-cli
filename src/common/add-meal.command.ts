import path from "node:path";
import { Args, Command, Flags } from "@oclif/core";
import { createDietDatabase } from "../db/db.js";
import { addRecord } from "../services/diet.service.js";
import { MealType } from "../types/index.js";

export abstract class AddMealCommand extends Command {
  protected abstract readonly mealType: MealType;

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
    const { args, flags } = await this.parseMealInput();

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

    const eatAt = this.parseDateFlag(flags.at, "--at");

    const db = createDietDatabase(path.join(this.config.dataDir, "diet.db"));
    const result = addRecord(db, {
      calories: flags.calories,
      protein: flags.protein,
      carbs: flags.carbs,
      fat: flags.fat,
      eatAt,
      mealType: this.mealType,
      title: flags.title,
      food: args.food,
    });

    process.stdout.write(`Added ${this.mealType} #${result.lastInsertRowid}\n`);
    process.stdout.write(`Food: ${args.food}\n`);
    process.stdout.write(`EatAt: ${flags.at}\n`);
  }

  protected parseMealInput() {
    const ctor = this.ctor;
    return this.parse({
      args: ctor.args,
      flags: ctor.flags,
      strict: ctor.strict,
      baseFlags: ctor.baseFlags,
      enableJsonFlag: ctor.enableJsonFlag,
    });
  }

  private parseDateFlag(value: string, flagName: "--at"): Date {
    if (!value) {
      this.error(`${flagName} must be a valid datetime, e.g. "2026-03-31 12:30"`);
    }

    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) {
      this.error(`${flagName} must be a valid datetime, e.g. "2026-03-31 12:30"`);
    }

    return parsed;
  }
}
