import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateClass1614027434846 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'class',
        columns: [
          {
            name: 'id',
            type: 'bigint',
            isPrimary: true,
            generationStrategy: 'increment',
            default: 'bigint',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'duration',
            type: 'integer',
          },
          {
            name: 'created_At',
            type: 'datetime',
            default: 'getDate()',
          },
          {
            name: 'update_At',
            type: 'datetime',
            default: 'getDate()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropTable('class');
  }
}
