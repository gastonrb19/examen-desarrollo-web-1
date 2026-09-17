import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity("products")
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 50, unique: true })
  sku!: string;

  @Column({ type: "varchar", length: 100 })
  nombre!: string;

  @Column({ type: "varchar", length: 255 })
  descCorta!: string;

  @Column({ type: "text" })
  descLarga!: string;

  @Column({ type: "varchar", length: 255 })
  imagen!: string;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  precioNeto!: number;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  precioVenta!: number;

  @Column({ type: "int" })
  stockActual!: number;

  @Column({ type: "int" })
  stockMinimo!: number;

  @Column({ type: "int" })
  stockBajo!: number;

  @Column({ type: "int" })
  stockAlto!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
