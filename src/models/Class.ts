import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

@Entity()
export default class Class {
    @PrimaryGeneratedColumn("uuid")
    id: number;

    @Column({ length: 255, type: "varchar" })
    name: string;

    @Column({ type: "integer" })
    duration: number;

    @CreateDateColumn({ type: "datetime" })
    created_At: Date;

    @UpdateDateColumn({ type: "datetime" })
    update_At: Date;
}
