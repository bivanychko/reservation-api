import { DataSource, DataSourceOptions } from "typeorm";

import { Amenity } from "../modules/reservation/entities/amenity.entity";
import { getDatabaseConfig } from "./database.config";

import { AddedAmenityTable1694963767467 } from "../modules/reservation/migrations/1694963767467-AddedAmenityTable";

const options: DataSourceOptions = {
  type: "postgres",
  entities: [Amenity],
  migrations: [AddedAmenityTable1694963767467],
  ...getDatabaseConfig(),
};

export default new DataSource(options);
