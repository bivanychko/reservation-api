import { DataSource, DataSourceOptions } from "typeorm";

import { Amenity, Reservation } from "../modules/reservation/entities";
import { AddedAmenityTable1694963767467, AddedReservationTable1694972681414 } from "../modules/reservation/migrations";
import { getDatabaseConfig } from "./database.config";

const options: DataSourceOptions = {
  type: "postgres",
  entities: [Amenity, Reservation],
  migrations: [AddedAmenityTable1694963767467, AddedReservationTable1694972681414],
  ...getDatabaseConfig(),
};

export default new DataSource(options);
