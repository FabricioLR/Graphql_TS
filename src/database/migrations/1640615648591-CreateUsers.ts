import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUsers1640615648591 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "users",
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
                        name: "email",
                        type: "text",
                        isNullable: false,
                        isUnique: true
                    },
                    {
                        name: "senha",
                        type: "text",
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
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users")
    }

}
