import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity("clients")
export class Client {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 15, unique: true })
  rutEmpresa!: string;

  @Column({ type: "varchar", length: 100 })
  rubro!: string;

  @Column({ type: "varchar", length: 150 })
  razonSocial!: string;

  @Column({ type: "varchar", length: 20 })
  telefono!: string;

  @Column({ type: "varchar", length: 200 })
  direccion!: string;

  @Column({ type: "varchar", length: 100 })
  nombreContacto!: string;

  @Column({ type: "varchar", length: 100 })
  emailContacto!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
