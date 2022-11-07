import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsers1590521920167 implements MigrationInterface {
    name = 'CreateUsers1590521920167';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "schedules" ("id" SERIAL NOT NULL, "staff_id" INT NOT NULL, "date" TIMESTAMP NOT NULL, "length" INT NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "FK_fe0bb3f6520ee0469504521e710" FOREIGN KEY ("staff_id") references users(id), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7434" PRIMARY KEY ("id"))`,
            undefined,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "schedules"`, undefined);
    }
}
