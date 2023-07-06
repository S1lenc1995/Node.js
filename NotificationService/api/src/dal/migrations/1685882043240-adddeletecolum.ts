import { MigrationInterface, QueryRunner } from "typeorm"

export class Adddeletecolum1685882043240 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" ADD "delete" character varying NOT NULL DEFAULT 'false'`);
        await queryRunner.query(`ALTER TABLE "user" ADD "delete" character varying NOT NULL DEFAULT 'false'`);
        await queryRunner.renameColumn("post", "title", "header");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "delete"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "delete"`);
        await queryRunner.renameColumn("post", "header", "title"); 
    }
}
