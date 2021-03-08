import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

@Entity()
export default class Class {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column({ length: 255, type: "varchar" })
    name: string;

    @Column({ type: "integer" })
    duration: number;

    @CreateDateColumn({ name: "created_At", type: "datetime" })
    createdAt: Date;

    @UpdateDateColumn({ name: "update_At", type: "datetime" })
    updateAt: Date;
}
