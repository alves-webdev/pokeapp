import { DataSource } from "typeorm"

export const myDataSource = new DataSource({
    type: "postgres",
    host: "db",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "postgres",
    entities: ["src/entity/*.ts"],
    logging: true,
    synchronize: true,
})