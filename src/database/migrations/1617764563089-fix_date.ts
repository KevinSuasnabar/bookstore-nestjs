import {MigrationInterface, QueryRunner} from "typeorm";

export class fixDate1617764563089 implements MigrationInterface {
    name = 'fixDate1617764563089'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_details" ALTER COLUMN "create_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user_details" ALTER COLUMN "update_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "create_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "update_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "roles" ALTER COLUMN "create_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "roles" ALTER COLUMN "update_at" SET DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "roles" ALTER COLUMN "update_at" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "roles" ALTER COLUMN "create_at" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "update_at" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "create_at" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user_details" ALTER COLUMN "update_at" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user_details" ALTER COLUMN "create_at" DROP DEFAULT`);
    }

}
