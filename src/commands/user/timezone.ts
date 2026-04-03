import fs from "node:fs";
import path from "node:path";
import { Args, Command } from "@oclif/core";

export default class UserTimezone extends Command {
  static override description = "set user timezone";

  static override examples = [
    `<%= config.bin %> <%= command.id %> "Asia/Shanghai"`,
    `<%= config.bin %> <%= command.id %> "America/Los_Angeles"`,
  ];

  static override args = {
    timezone: Args.string({ description: "IANA timezone, e.g. Asia/Shanghai", required: true }),
  };

  public async run(): Promise<void> {
    const { args } = await this.parse(UserTimezone);

    const timezone = args.timezone.trim();
    if (timezone.length === 0) {
      this.error("timezone cannot be empty");
    }

    const normalizedTimezone = this.normalizeTimezone(timezone);

    const userConfigPath = path.join(this.config.dataDir, "user.json");
    fs.mkdirSync(path.dirname(userConfigPath), { recursive: true });
    fs.writeFileSync(userConfigPath, `${JSON.stringify({ timezone: normalizedTimezone }, null, 2)}\n`, {
      encoding: "utf-8",
    });

    process.stdout.write(`User timezone set to ${normalizedTimezone}`);
  }

  private normalizeTimezone(timezone: string): string {
    try {
      return new Intl.DateTimeFormat("en-US", { timeZone: timezone }).resolvedOptions().timeZone;
    } catch {
      this.error(`invalid timezone "${timezone}". Please use IANA format like "Asia/Shanghai".`);
    }
  }
}
