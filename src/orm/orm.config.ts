import { TypeOrmModuleOptions } from "@nestjs/typeorm";

import { Amenity } from "../modules/reservation/entities/amenity.entity";
import { getDatabaseConfig } from "./database.config";

export const initOrmConfig = (): TypeOrmModuleOptions => {
  return {
    type: "postgres",
    entities: [Amenity],
    ...getDatabaseConfig(),
  };
};
