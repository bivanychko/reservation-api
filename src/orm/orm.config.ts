import { TypeOrmModuleOptions } from "@nestjs/typeorm";

import { getDatabaseConfig } from "./database.config";

import { Amenity } from "../modules/reservation/entities/amenity.entity";

export const initOrmConfig = (): TypeOrmModuleOptions => {
  return {
    type: "postgres",
    entities: [Amenity],
    ...getDatabaseConfig(),
  };
};
