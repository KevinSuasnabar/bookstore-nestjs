import {MigrationInterface, QueryRunner} from "typeorm";

export class userFixPasswordVarchar1618634888445 implements MigrationInterface {
    name = 'userFixPasswordVarchar1618634888445'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "password" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "password" text NOT NULL`);
    }

}
