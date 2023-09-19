import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ReservationModule } from "../modules/reservation/reservation.module";
import { UploadModule } from "../modules/upload/upload.module";
import { initOrmConfig } from "../orm/orm.config";
import { setGlobalSettings } from "../utils/global.settings";

/**
 * Creates testing app
 *
 * @returns {INestApplication} - Instance of Nest application
 */
export const createTestingApp = async (): Promise<INestApplication> => {
  const module: TestingModule = await Test.createTestingModule({
    imports: [
      TypeOrmModule.forRootAsync({
        useFactory: initOrmConfig,
      }),
      ReservationModule,
      UploadModule,
    ],
  }).compile();

  const app = module.createNestApplication();

  setGlobalSettings(app);

  return app.init();
};
