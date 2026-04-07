import { Args, Command } from "@oclif/core";
import { getDietDatabase } from "../db/db.js";
import { deleteRecordById } from "../services/diet.service.js";

export default class Delete extends Command {
  static override description = "delete a diet record by id";

  static override examples = [`<%= config.bin %> <%= command.id %> 12`];

  static override args = {
    id: Args.integer({ description: "record id", required: true }),
  };

  public async run(): Promise<void> {
    const { args } = await this.parse(Delete);
    const id = args.id;

    if (id <= 0) {
      this.error("id must be a positive integer");
    }

    const db = getDietDatabase(this.config.dataDir);
    const deleted = deleteRecordById(db, id);

    if (!deleted) {
      this.error(`record #${id} not found`);
    }

    process.stdout.write(`Deleted record #${id}.\n`);
  }
}
