import { HttpStatus, INestApplication } from "@nestjs/common";
import * as supertest from "supertest";
import { DataSource, Repository } from "typeorm";

import { Headers, Versions } from "../../../common/constants";
import { createTestingApp } from "../../../testing/testing.app";
import { clearDatabase, disconnectAndClearDatabase } from "../../../testing/testing.utils";
import { Amenity, Reservation } from "../entities";

describe("AppController (e2e)", () => {
  let app: INestApplication;
  let agent: supertest.SuperAgentTest;
  let ds: DataSource;
  let amenityRepo: Repository<Amenity>;
  let reservationRepo: Repository<Reservation>;

  beforeAll(async () => {
    app = await createTestingApp();
    agent = supertest.agent(app.getHttpServer());

    ds = app.get(DataSource);
    amenityRepo = ds.getRepository(Amenity);
    reservationRepo = ds.getRepository(Reservation);
  });

  beforeEach(() => clearDatabase(ds));

  afterAll(async () => {
    await disconnectAndClearDatabase(ds);
    await app.close();
  });

  describe("GET /reservations", () => {
    it("should return reservations", async () => {
      agent.set(Headers.VERSION, Versions.V1);

      const amenity = await amenityRepo.save({
        name: "Test Amenity",
      });
      const reservation = await reservationRepo.save({
        amenity,
        userId: "1",
        startTime: 600,
        endTime: 1020,
        date: "1590105600000",
      });

      const { body, statusCode } = await agent.get(`/api/reservations?amenityId=${amenity.id}&day=${reservation.date}`);

      expect(statusCode).toBe(HttpStatus.OK);
      expect(body.items).toEqual([
        {
          id: reservation.id,
          userId: reservation.userId,
          amenityName: amenity.name,
          startTime: "10:00",
          duration: 420,
          date: reservation.date,
        },
      ]);
    });

    it("should return BadRequest", async () => {
      agent.set(Headers.VERSION, Versions.V1);

      const { body, statusCode } = await agent.get("/api/reservations?day=1590105600000");

      expect(statusCode).toBe(HttpStatus.BAD_REQUEST);
      expect(body).toEqual({
        message: [
          "amenityId must be a positive number",
          "amenityId should not be empty",
          "amenityId must be a number conforming to the specified constraints",
        ],
        error: "Bad Request",
        statusCode: 400,
      });
    });
  });
});
