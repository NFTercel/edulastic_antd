# Seed Data

If you need to seed data run `yarn seed`

Specify DB_HOST, DB_PORT, DB_NAME in .env if needed.

## Seed Standards

1. Parse csv file
   * `node parse.js` will generate `output.json` file. If need to load new curriculum csv file: change constants in db-seed/constants.js
   * You can reformat `output.json` file (Alt+Cmd+L in WebStorm)
2. `yarn seed`
