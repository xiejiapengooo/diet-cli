import { Args, Command, Flags } from "@oclif/core";
import path from "node:path";
import { createDietDatabase } from "../db/db.js";
import { searchRecords } from "../services/diet.service.js";
import { MealType, MealTypes } from "../types/index.js";

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

    const fromEatAt = this.parseDateFlag(flags.from, "--from");
    const toEatAt = this.parseDateFlag(flags.to, "--to");

    const db = createDietDatabase(path.join(this.config.dataDir, "diet.db"));
    const records = searchRecords(db, {
      keyword,
      fromEatAt,
      toEatAt,
      mealType: flags.meal as MealType | undefined,
    });

    if (records.length === 0) {
      process.stdout.write("No matched records.\n");
      return;
    }

    const headers = ["id", "meal", "eat_at", "title", "food", "kcal", "P(g)", "C(g)", "F(g)"];
    const rows = records.map((record) => [
      String(record.id),
      record.meal_type,
      record.eat_at,
      record.title,
      record.food,
      String(record.calories),
      String(record.protein),
      String(record.carbs),
      String(record.fat),
    ]);

    process.stdout.write(this.renderTable(headers, rows));
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

  private renderTable(headers: string[], rows: string[][]): string {
    const columnWidths = headers.map((header, columnIndex) =>
      Math.max(header.length, ...rows.map((row) => row[columnIndex].length)),
    );

    const createBorder = () => `+${columnWidths.map((width) => "-".repeat(width + 2)).join("+")}+\n`;
    const createRow = (values: string[]) =>
      `| ${values.map((value, index) => value.padEnd(columnWidths[index], " ")).join(" | ")} |\n`;

    let output = "";
    output += createBorder();
    output += createRow(headers);
    output += createBorder();

    for (const row of rows) {
      output += createRow(row);
    }

    output += createBorder();
    return output;
  }
}
