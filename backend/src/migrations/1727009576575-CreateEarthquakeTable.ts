import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateEarthquakeTable1727009576575 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);

    await queryRunner.createTable(
      new Table({
        name: 'earthquakes',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isUnique: true,
            generationStrategy: 'uuid',
            default: `uuid_generate_v4()`,
          },
          {
            name: 'location',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'magnitude',
            type: 'float',
            isNullable: false,
          },
          {
            name: 'date',
            type: 'timestamp',
            isNullable: false,
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('earthquakes');
  }
}
