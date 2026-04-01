import { Args, Command, Flags } from "@oclif/core";
import path from "node:path";
import { createDietDatabase } from "../db/db.js";
import { searchRecords } from "../services/diet.service.js";
import { MealTypes } from "../types/index.js";

export default class Search extends Command {
  static override description = "search diet records by keyword";

  static override examples = [
    `<%= config.bin %> <%= command.id %> "beef"`,
    `<%= config.bin %> <%= command.id %> "salmon" --meal dinner --from "2026-03-30 00:00" --to "2026-03-31 23:59"`,
  ];

  static override args = {
    keyword: Args.string({ description: "keyword to match in title or food", required: true }),
  };

  static override flags = {
    meal: Flags.string({
      description: "filter by meal type",
      options: Object.values(MealTypes),
    }),
    from: Flags.string({
      description: 'start datetime (inclusive), e.g. "2026-03-31 00:00"',
    }),
    to: Flags.string({
      description: 'end datetime (inclusive), e.g. "2026-03-31 23:59"',
    }),
  };

  public async run(): Promise<void> {
    const { args, flags } = await this.parse(Search);

    const keyword = args.keyword.trim();
    if (keyword.length === 0) {
      this.error("keyword cannot be empty");
    }

    const fromDate = this.parseDateFlag(flags.from, "--from");
    const toDate = this.parseDateFlag(flags.to, "--to");
    if (fromDate && toDate && fromDate.getTime() > toDate.getTime()) {
      this.error("--from must be earlier than or equal to --to");
    }

    const db = createDietDatabase(path.join(this.config.dataDir, "diet.db"));
    const records = searchRecords(db, {
      keyword,
      mealType: flags.meal,
      fromEatAt: fromDate?.toISOString(),
      toEatAt: toDate?.toISOString(),
    });

    if (records.length === 0) {
      process.stdout.write("No matched records.\n");
      return;
    }

    for (const record of records) {
      process.stdout.write(`#${record.id} | ${record.mealType} | ${record.eatAt}\n`);
      process.stdout.write(`Title: ${record.title}\n`);
      process.stdout.write(`Food: ${record.food}\n`);
      process.stdout.write(
        `Nutrition: kcal=${this.formatNullableNumber(record.calories)} ` +
          `P=${this.formatNullableNumber(record.protein)}g ` +
          `C=${this.formatNullableNumber(record.carbs)}g ` +
          `F=${this.formatNullableNumber(record.fat)}g\n`,
      );
      process.stdout.write("\n");
    }
  }

  private parseDateFlag(value: string | undefined, flagName: "--from" | "--to"): Date | undefined {
    if (!value) {
      return undefined;
    }

    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) {
      this.error(`${flagName} must be a valid datetime, e.g. "2026-03-31 12:30"`);
    }

    return parsed;
  }

  private formatNullableNumber(value: number | null): string {
    return value === null ? "-" : String(value);
  }
}
