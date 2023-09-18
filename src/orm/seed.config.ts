import { DataSource, DataSourceOptions } from "typeorm";

import { Amenity, Reservation } from "../modules/reservation/entities";
import { SeedAmenities1695051909455, SeedReservations1695051946602 } from "../modules/reservation/seeds";
import { getDatabaseConfig } from "./database.config";

const options: DataSourceOptions = {
  type: "postgres",
  entities: [Amenity, Reservation],
  migrations: [SeedAmenities1695051909455, SeedReservations1695051946602],
  ...getDatabaseConfig(),
};

export default new DataSource(options);
