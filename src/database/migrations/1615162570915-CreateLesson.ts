import {MigrationInterface, QueryRunner, Table} from 'typeorm';

export default class CreateLesson1615162570915 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({ 
                name: 'lesson',
                columns: [
                    {
                        name: 'idAula',
                        type: 'bigint',
                        isPrimary: true,
                        generationStrategy: 'increment'
                    },
                    {
                        name: 'description',
                        type: 'varchar(255)'
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('lesson')
    }

}
