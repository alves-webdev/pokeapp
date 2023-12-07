import "reflect-metadata"
import { DataSource } from "typeorm"
import { Treinador } from "./entity/Treinador"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "pokeapp",
    synchronize: true,
    logging: false,
    entities: [Treinador],
    migrations: [],
    subscribers: [],
})
