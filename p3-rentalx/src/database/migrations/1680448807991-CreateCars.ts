import { type MigrationInterface, type QueryRunner, Table } from "typeorm";

export class CreateCars1680448807991 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "cars",

                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                    },

                    {
                        name: "name",
                        type: "varchar",
                    },

                    {
                        name: "description",
                        type: "varchar",
                    },

                    {
                        name: "daily_fee",
                        type: "numeric",
                    },

                    {
                        name: "is_available",
                        type: "boolean",
                        default: true,
                    },

                    {
                        name: "license_plate",
                        type: "varchar",
                    },

                    {
                        name: "fine_amount",
                        type: "numeric",
                    },

                    {
                        name: "carmaker",
                        type: "varchar",
                    },

                    {
                        name: "category_id",
                        type: "uuid",
                        isNullable: false,
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                    },
                ],
                foreignKeys: [
                    {
                        name: "FKCategoryCar",
                        referencedTableName: "categories",
                        referencedColumnNames: ["id"],
                        columnNames: ["category_id"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL",
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("cars");
    }
}
