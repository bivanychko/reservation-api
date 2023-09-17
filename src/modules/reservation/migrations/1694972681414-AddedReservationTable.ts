import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedReservationTable1694972681414 implements MigrationInterface {
  public name = "AddedReservationTable1694972681414";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "reservation" ("id" BIGSERIAL NOT NULL, "userId" bigint NOT NULL, "date" bigint NOT NULL, "startTime" integer NOT NULL, "endTime" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "amenityId" bigint, CONSTRAINT "PK_48b1f9922368359ab88e8bfa525" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "reservation" ADD CONSTRAINT "FK_76588699c8b3502288baa1ac1cf" FOREIGN KEY ("amenityId") REFERENCES "amenity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "reservation" DROP CONSTRAINT "FK_76588699c8b3502288baa1ac1cf"`);
    await queryRunner.query(`DROP TABLE "reservation"`);
  }
}
