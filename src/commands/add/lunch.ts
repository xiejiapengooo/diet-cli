import {Args, Command, Flags} from '@oclif/core'
import path from 'node:path'

import {addLunchRecord} from '../../services/record.service.js'

export default class AddLunch extends Command {
  static override args = {
    food: Args.string({description: 'what you eat at lunch', required: true}),
  }

  static override description = 'add what you eat at lunch time'
  static override examples = [
    '<%= config.bin %> <%= command.id %> "beef noodle soup" --calories 650',
    '<%= config.bin %> <%= command.id %> "salad" --at "2026-03-31 12:30" --title "light meal"',
  ]

  static override flags = {
    at: Flags.string({description: 'meal datetime, e.g. "2026-03-31 12:30"'}),
    calories: Flags.integer({char: 'c', description: 'calories'}),
    note: Flags.string({char: 'n', description: 'legacy alias of --title'}),
    title: Flags.string({char: 't', description: 'optional title'}),
  }

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(AddLunch)
    if (flags.calories !== undefined && flags.calories < 0) {
      this.error('--calories must be >= 0')
    }

    const dbPath = path.join(this.config.dataDir, 'diet.db')
    const mealAt = this.parseMealAt(flags.at)

    const result = addLunchRecord(dbPath, {
      calories: flags.calories,
      food: args.food,
      mealAt,
      note: flags.note,
      title: flags.title ?? flags.note,
    })

    this.log(`Added lunch record #${result.id}`)
    this.log(`food: ${args.food}`)
    this.log(`eat_at: ${mealAt.toISOString()}`)
  }

  private parseMealAt(input?: string): Date {
    if (!input) {
      return new Date()
    }

    const normalized = input.includes(' ') ? input.replace(' ', 'T') : input
    const parsed = new Date(normalized)
    if (Number.isNaN(parsed.getTime())) {
      this.error(`invalid --at value: ${input}`)
    }

    return parsed
  }
}
