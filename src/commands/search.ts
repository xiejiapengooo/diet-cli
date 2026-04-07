import { Args, Command, Flags } from "@oclif/core";
import { getDietDatabase } from "../db/db.js";
import { searchRecords } from "../services/diet.service.js";
import { MealType, MealTypes } from "../types/index.js";
import { parseDateFlag, readUserConfig } from "../utils/command.js";

export default class Search extends Command {
  static override description = "search diet records by keyword";

  static override examples = [
    `<%= config.bin %> <%= command.id %> "beef"`,
    `<%= config.bin %> <%= command.id %> "salmon" --meal dinner --from "2026-03-30 00:00" --to "2026-03-31 23:59"`,
  ];

  static override args = {
    keyword: Args.string({ description: "keyword to match in foods", required: true }),
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
    const userConfig = readUserConfig(this);
    const { args, flags } = await this.parse(Search);

    const keyword = args.keyword.trim();
    if (keyword.length === 0) {
      this.error("keyword cannot be empty");
    }

    const mealType = flags.meal as MealType | undefined;
    const fromEatAt = flags.from ? parseDateFlag(this, flags.from, "--from", userConfig.timezone) : void 0;
    const toEatAt = flags.to ? parseDateFlag(this, flags.to, "--to", userConfig.timezone) : void 0;

    const db = getDietDatabase(this.config.dataDir);
    const records = searchRecords(db, {
      keyword,
      fromEatAt,
      toEatAt,
      mealType,
    });

    if (records.length === 0) {
      process.stdout.write("No matched records.\n");
      return;
    }

    const headers = ["id", "meal", "eat_at", "foods", "kcal", "P(g)", "C(g)", "F(g)"];
    const rows = records.map((record) => [
      String(record.id),
      record.meal_type,
      record.eat_at,
      record.foods,
      String(record.calories),
      String(record.protein),
      String(record.carbs),
      String(record.fat),
    ]);

    process.stdout.write(this.renderTable(headers, rows));
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
