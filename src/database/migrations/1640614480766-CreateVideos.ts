import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateVideos1640614480766 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "videos",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isNullable: false,
                        isUnique: true,
                        isGenerated: true,
                        generationStrategy: "increment"
                    },
                    {
                        name: "nome",
                        type: "text",
                        isNullable: false,
                    },
                    {
                        name: "url",
                        type: "text",
                        isNullable: false,
                    },
                    {
                        name: "owner",
                        type: "int",
                        isNullable: false,
                    },
                    {
                        name: "visualizacoes",
                        type: "int",
                        isNullable: false,
                    },
                    {
                        name: "like",
                        type: "int",
                        isNullable: false,
                    },
                    {
                        name: "deslike",
                        type: "int",
                        isNullable: false,
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()"
                    },
                ],
                
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("videos")
    }

}
