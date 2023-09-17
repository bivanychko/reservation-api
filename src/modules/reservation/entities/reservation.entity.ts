import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import { Amenity } from "../entities/amenity.entity";

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn("increment", { type: "bigint" })
  public id: string;

  @Column({ type: "bigint" })
  public userId: string;

  @Column({ type: "bigint" })
  public date: string;

  @Column({ type: "integer" })
  public startTime: number;

  @Column({ type: "integer" })
  public endTime: number;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @ManyToOne(() => Amenity)
  @JoinColumn({ name: "amenityId" })
  public amenity: Amenity;
}
