import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AuthorModule } from './author/author.module';
import { TaskModule } from './task/task.module';
@Module({
  imports: [DatabaseModule, AuthorModule, TaskModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
