import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1735811635410 implements MigrationInterface {
  name = 'Migration1735811635410';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "class" ("id" SERIAL NOT NULL, "className" character varying NOT NULL, CONSTRAINT "PK_0b9024d21bdfba8b1bd1c300eae" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "student" ("id" SERIAL NOT NULL, "studentName" character varying NOT NULL, "classId" integer NOT NULL, CONSTRAINT "PK_3d8016e1cb58429474a3c041904" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "student" ADD CONSTRAINT "FK_bd5c8f2ef67394162384a484ba1" FOREIGN KEY ("classId") REFERENCES "class"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "student" DROP CONSTRAINT "FK_bd5c8f2ef67394162384a484ba1"`,
    );
    await queryRunner.query(`DROP TABLE "student"`);
    await queryRunner.query(`DROP TABLE "class"`);
  }
}
