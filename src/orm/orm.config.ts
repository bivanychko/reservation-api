import { TypeOrmModuleOptions } from "@nestjs/typeorm";

import { Amenity, Reservation } from "../modules/reservation/entities";
import { getDatabaseConfig } from "./database.config";

export const initOrmConfig = (): TypeOrmModuleOptions => {
  return {
    type: "postgres",
    entities: [Amenity, Reservation],
    ...getDatabaseConfig(),
  };
};
