import { Command, Flags } from "@oclif/core";
import { getDietDatabase } from "../db/db.js";
import { addRecord } from "../services/diet.service.js";
import { MealType, MealTypes } from "../types/index.js";
import { parseDateFlag, readUserConfig } from "../utils/command.js";

export default class Add extends Command {
  static override description = "add a diet record for any meal type";

  static override examples = [
    `<%= config.bin %> <%= command.id %> --meal breakfast --foods "oatmeal" --at "2026-03-31 08:00" --calories 420 --protein 18 --carbs 62 --fat 11`,
    `<%= config.bin %> <%= command.id %> --meal dinner --foods "salmon(200g) + rice(one bowl)" --at "2026-03-31 19:30" --calories 560 --protein 42 --carbs 35 --fat 28`,
  ];

  static override flags = {
    meal: Flags.string({
      description: "meal type",
      options: Object.values(MealTypes),
      required: true,
    }),
    foods: Flags.string({
      description: 'what you eat, e.g. "rice(one bowl) + seaweed-soup(one bowl) + cola(250 ml)"',
      required: true,
    }),
    at: Flags.string({ description: 'meal datetime, e.g. "2026-03-31 12:30"', required: true }),
    calories: Flags.integer({ description: "energy in kilocalories (kcal)", required: true }),
    protein: Flags.integer({ description: "protein in grams (g)", required: true }),
    carbs: Flags.integer({ description: "carbohydrates in grams (g)", required: true }),
    fat: Flags.integer({ description: "fat in grams (g)", required: true }),
  };

  public async run() {
    const userConfig = readUserConfig(this);
    const { flags } = await this.parse(Add);
    const mealType = flags.meal as MealType;
    const foods = flags.foods.trim();

    if (foods.length === 0) {
      this.error("--foods cannot be empty");
    }

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

    const eatAt = parseDateFlag(this, flags.at, "--at", userConfig.timezone);

    const db = getDietDatabase(this.config.dataDir);
    const record = addRecord(db, {
      calories: flags.calories,
      protein: flags.protein,
      carbs: flags.carbs,
      fat: flags.fat,
      mealType,
      foods,
      eatAt,
    });

    process.stdout.write(`${JSON.stringify(record, null, 2)}\n`);
  }
}
