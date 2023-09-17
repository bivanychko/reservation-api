import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

import { config } from "../config/index";

export function getDatabaseConfig(): Partial<PostgresConnectionOptions> {
  const options: Partial<PostgresConnectionOptions> = {};

  Object.assign(options, {
    host: config.DB_HOST,
    port: config.DB_PORT,
    username: config.DB_USERNAME,
    password: config.DB_PASSWORD,
    database: config.DB_NAME,
  });

  return options;
}
