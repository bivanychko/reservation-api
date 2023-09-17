import { TypeOrmModuleOptions } from "@nestjs/typeorm";

import { getDatabaseConfig } from "./database.config";

export const initOrmConfig = (): TypeOrmModuleOptions => {
  return {
    type: "postgres",
    entities: [],
    ...getDatabaseConfig(),
  };
};
