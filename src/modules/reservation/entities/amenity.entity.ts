import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Amenity {
  @PrimaryGeneratedColumn("increment", { type: "bigint" })
  public id: string;

  @Column({ type: "varchar" })
  public name: string;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;
}
