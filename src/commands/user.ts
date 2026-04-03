import path from "node:path";
import { Args, Command, Flags } from "@oclif/core";
import { createDietDatabase } from "../db/db.js";
import { addRecord } from "../services/diet.service.js";
import { MealType } from "../types/index.js";

export abstract class UserCommand extends Command {
  static override args = {
    area: Args.string({ description: "what you eat", required: true }),
  };

  static override flags = {};

  public async run(): Promise<void> {
    const { args, flags } = await this.parse(UserCommand);
  }
}
