import { DataSource } from "typeorm";
import { Record } from "./entity/record/record.entity";


export const databaseProviders = [
    {
        provide: "DATA_SOURCE",
        useFactory: async () =>{
            const dataSource = new DataSource({
                type: 'postgres',
                url: 'postgres://yqkwfrbl:RMEkeofq78TvKEmaGkWbFsEKpR7Zqi5e@abul.db.elephantsql.com/yqkwfrbl',
                synchronize: true,
                logging: true,
                entities: [Record],
                subscribers: [],
                migrations: [],
            })
            return dataSource.initialize()
        }
    }
]