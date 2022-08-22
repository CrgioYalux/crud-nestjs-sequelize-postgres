import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AuthorModule } from './author/author.module';
@Module({
  imports: [DatabaseModule, AuthorModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
