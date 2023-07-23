import { TypeOrmModuleOptions } from '@nestjs/typeorm';
const TypeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'bookingapp',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
};
export default TypeOrmConfig;
