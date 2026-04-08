import path from "node:path";
import fs from "node:fs";
import { UserConfig } from "../types/index.js";
import { Command } from "@oclif/core";
import datetime from "./datetime.js";

export function readUserConfig(that: Command) {
  const userConfigPath = path.join(that.config.dataDir, "user.json");
  let userConfigRaw = "";

  try {
    userConfigRaw = fs.readFileSync(userConfigPath, "utf-8");
  } catch {
    that.error('Set user timezone first, e.g. `diet user:timezone "<IANA_TIMEZONE>"`.');
  }

  let parsedConfig: UserConfig;
  try {
    parsedConfig = JSON.parse(userConfigRaw);
  } catch {
    that.error(`Invalid user config file at ${userConfigPath}. Please run user:timezone again.`);
  }

  const timezone = parsedConfig.timezone;
  if (!timezone) {
    that.error('Set user timezone first, e.g. `diet user:timezone "<IANA_TIMEZONE>"`.');
  }

  return parsedConfig;
}

export function parseDateFlag(that: Command, value: string, flagName: string, timezone: string) {
  const normalized = value.trim();
  if (!normalized) {
    that.error(`${flagName} must be a valid datetime, e.g. "2026-03-31 12:30"`);
  }

  let parsed;
  try {
    parsed = datetime.tz(normalized, timezone);
  } catch {
    that.error(`invalid user timezone "${timezone}". Please run user:timezone again.`);
  }

  if (!parsed.isValid()) {
    that.error(`${flagName} must be a valid datetime, e.g. "2026-03-31 12:30"`);
  }

  return parsed.toDate();
}
