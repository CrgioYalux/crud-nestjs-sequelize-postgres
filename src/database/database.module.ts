import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Config } from './database.config';
import { databaseProvider } from './database.provider';

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [Config]
        })
    ],
    providers: [...databaseProvider],
    exports: [...databaseProvider]
})
export class DatabaseModule {};
