import { Args, Command } from "@oclif/core";
import { getDietDatabase } from "../db/db.js";
import { deleteRecord } from "../services/diet.service.js";

export default class Delete extends Command {
  static override description = "delete a diet record by id";

  static override examples = [`<%= config.bin %> <%= command.id %> 12`];

  static override args = {
    id: Args.integer({ description: "record id", required: true }),
  };

  public async run(): Promise<void> {
    const { args } = await this.parse(Delete);
    const id = args.id;

    const db = getDietDatabase(this.config.dataDir);
    const deleted = deleteRecord(db, id);

    if (!deleted) {
      process.stdout.write(`Record #${id} not found\n`);
      return;
    }

    process.stdout.write(`Record #${id} deleted\n`);
  }
}
