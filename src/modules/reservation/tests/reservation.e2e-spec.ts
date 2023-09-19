import { INestApplication } from "@nestjs/common";
import * as supertest from "supertest";
import { DataSource } from "typeorm";

import { createTestingApp } from "../../../testing/testing.app";
import { clearDatabase, disconnectAndClearDatabase } from "../../../testing/testing.utils";

describe("AppController (e2e)", () => {
  let app: INestApplication;
  let agent: supertest.SuperAgentTest;
  let ds: DataSource;

  beforeAll(async () => {
    app = await createTestingApp();
    agent = supertest.agent(app.getHttpServer());

    ds = app.get(DataSource);
  });

  beforeEach(() => clearDatabase(ds));

  afterAll(async () => {
    await disconnectAndClearDatabase(ds);
    await app.close();
  });
});
