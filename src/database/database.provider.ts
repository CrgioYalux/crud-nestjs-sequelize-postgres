import { AppConstant } from "src/app.constant";
import { Sequelize } from 'sequelize-typescript';
import { Config } from './database.config';

export const databaseProvider = [
    {
        provide: AppConstant.SEQUELIZE,
        useFactory: async () => {
            const config = Config();
            const sequelize = new Sequelize(
                {
                  dialect: 'postgres',
                  host: config.DB.HOST,
                  port: config.DB.PORT,
                  database: config.DB.NAME,
                  username: config.DB.USER.NAME,
                  password: config.DB.USER.PASS,
                  define: {
                    freezeTableName: true
                  }
                }
            );

            sequelize.addModels([]);

            await sequelize.sync();

            return sequelize;
        }
    }
];