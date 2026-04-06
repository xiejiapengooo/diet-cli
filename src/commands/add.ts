import path from "node:path";
import { Command, Flags } from "@oclif/core";
import { createDietDatabase } from "../db/db.js";
import { addRecord } from "../services/diet.service.js";
import { MealType, MealTypes, UserConfig } from "../types/index.js";
import fs from "node:fs";
import datetime from "../utils/datetime.js";

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

  public async run(): Promise<void> {
    const userConfig = this.readUserConfig();
    const { flags } = await this.parse(Add);
    const mealType = flags.meal;
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

    const eatAt = this.parseDateFlag(flags.at, "--at", userConfig.timezone);

    const db = createDietDatabase(path.join(this.config.dataDir, "diet.db"));
    const result = addRecord(db, {
      calories: flags.calories,
      protein: flags.protein,
      carbs: flags.carbs,
      fat: flags.fat,
      mealType: flags.meal as any,
      foods,
      eatAt,
    });

    const eatAtDisplay = datetime(eatAt).tz(userConfig.timezone).format("YYYY-MM-DD HH:mm");
    process.stdout.write(`Added ${mealType} #${result.lastInsertRowid}\n`);
    process.stdout.write(`Food: ${foods}\n`);
    process.stdout.write(`EatAt: ${eatAtDisplay}\n`);
  }

  private readUserConfig() {
    const userConfigPath = path.join(this.config.dataDir, "user.json");
    let userConfigRaw = "";

    try {
      userConfigRaw = fs.readFileSync(userConfigPath, "utf-8");
    } catch {
      this.error('Set user timezone first, e.g. `diet user:timezone "Asia/Shanghai"`.');
    }

    let parsedConfig: UserConfig;
    try {
      parsedConfig = JSON.parse(userConfigRaw);
    } catch {
      this.error(`Invalid user config file at ${userConfigPath}. Please run user:timezone again.`);
    }

    const timezone = parsedConfig.timezone;
    if (!timezone) {
      this.error('Set user timezone first, e.g. `diet user:timezone "Asia/Shanghai"`.');
    }

    return parsedConfig;
  }

  private parseDateFlag(value: string, flagName: string, timezone: string): string {
    const normalized = value.trim();
    if (!normalized) {
      this.error(`${flagName} must be a valid datetime, e.g. "2026-03-31 12:30"`);
    }

    let parsed;
    try {
      parsed = datetime.tz(normalized, timezone);
    } catch {
      this.error(`invalid user timezone "${timezone}". Please run user:timezone again.`);
    }

    if (!parsed.isValid()) {
      this.error(`${flagName} must be a valid datetime, e.g. "2026-03-31 12:30"`);
    }

    return parsed.toISOString();
  }
}
