import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const getTypeOrmConfig = async (): Promise<TypeOrmModuleOptions> => ({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_NAME,
  synchronize: true,
  autoLoadEntities: true,
});
