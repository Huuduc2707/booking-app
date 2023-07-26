import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DB_CONFIG } from '../config';
const TypeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: DB_CONFIG.DB_HOST,
  port: DB_CONFIG.DB_PORT,
  username: DB_CONFIG.DB_USERNAME,
  password: DB_CONFIG.DB_PASSWORD,
  database: DB_CONFIG.DB_NAME,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: DB_CONFIG.DB_SYNCHRONIZE,
};
export default TypeOrmConfig;
