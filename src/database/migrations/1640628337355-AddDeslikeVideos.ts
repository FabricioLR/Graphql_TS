import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddDeslikeVideos1640628337355 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("videos", new TableColumn({
            name: "deslike",
            type: "int",
            isNullable: false
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("videos", "deslike")
    }

}
