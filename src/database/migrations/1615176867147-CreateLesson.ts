import {MigrationInterface, QueryRunner} from "typeorm";

export default class CreateLesson1615176867147 implements MigrationInterface {
    name = 'CreateLesson1615176867147'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "lesson" ("idAula" int NOT NULL IDENTITY(1,1), "description" varchar(255) NOT NULL, CONSTRAINT "PK_aedb92377a845335bc4d9f30d22" PRIMARY KEY ("idAula"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "lesson"`);
    }

}
