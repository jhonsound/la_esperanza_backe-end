import { Module } from '@nestjs/common';
import { dataBaseProvider } from './database.provider';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [...dataBaseProvider],
  exports: [...dataBaseProvider],
})
export class DatabaseModule {}
