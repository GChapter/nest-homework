import { DataSource } from 'typeorm';
import { Student } from './src/student/entity/student.entity';
import { Class } from './src/class/entity/class.entity';
import * as dotenv from 'dotenv';

dotenv.config();

export const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Student, Class],
  migrations: ['./src/migrations/*.ts'],
});
