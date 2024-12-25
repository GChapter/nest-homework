import { MigrationInterface, QueryRunner } from 'typeorm';

export class First1735111665958 implements MigrationInterface {
  name = 'First1735111665958';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "student" ("id" SERIAL NOT NULL, "studentName" character varying NOT NULL, "className" character varying NOT NULL, CONSTRAINT "PK_3d8016e1cb58429474a3c041904" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "class" ("id" SERIAL NOT NULL, "className" character varying NOT NULL, CONSTRAINT "PK_0b9024d21bdfba8b1bd1c300eae" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "class"`);
    await queryRunner.query(`DROP TABLE "student"`);
  }
}
