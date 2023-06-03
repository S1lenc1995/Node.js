import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "underwater",
    database: "newDB",
    entities: ["src/dal/entity/*.ts"],
    synchronize: false,
    migrations: ["src/dal/migrations/*.ts"],
});
