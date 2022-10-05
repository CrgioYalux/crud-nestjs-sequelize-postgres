import { AppConstant } from "src/app.constant";
import { Sequelize } from 'sequelize-typescript';
import { Config } from './database.config';
import { Author } from '../author/author.model';
import { Task } from '../task/task.model';

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

            sequelize.addModels([Author, Task]);

            Task.belongsTo(Author, {
              as: 'author'
            });

            // await sequelize.sync({ force: true });
            await sequelize.sync();

            return sequelize;
        }
    }
];
