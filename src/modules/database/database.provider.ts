import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
export const dataBaseProvider = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async (configService: ConfigService) => {
      const database = configService.get('database');

      const dataSource = new DataSource(database);

      return dataSource.initialize();
    },
    inject: [ConfigService],
  },
];
