import { MigrationInterface, QueryRunner } from "typeorm";

import { Amenity } from "../entities";

const amenities = [
  { id: "1", name: "Mitel Networks Corporation" },
  { id: "2", name: "Navios Maritime Partners LP" },
  { id: "3", name: "Coherent, Inc." },
  { id: "4", name: "AmTrust Financial Services, Inc." },
  { id: "5", name: "Tetra Technologies, Inc." },
  { id: "6", name: "Advanced Drainage Systems, Inc." },
  { id: "7", name: "Caesars Entertainment Corporation" },
  { id: "8", name: "First Trust International Multi-Asset Diversified Income Index" },
  { id: "9", name: "Mylan N.V." },
  { id: "10", name: "Blackrock Municipal Income Quality Trust" },
];

export class SeedAmenities1695051909455 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await Promise.all(
      amenities.map(amenity => {
        return queryRunner.manager.save(Amenity, amenity);
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await Promise.all(
      amenities.map(amenity => {
        return queryRunner.manager.delete(Amenity, { id: amenity.id });
      }),
    );
  }
}
