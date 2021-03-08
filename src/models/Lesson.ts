import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export default class Lesson {
    @PrimaryGeneratedColumn()
    idAula: number;

    @Column({ length: 255, type: "varchar"})
    description: string;
}
