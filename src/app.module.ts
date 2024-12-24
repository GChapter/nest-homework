import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule } from './student/student.module';
import { APP_GUARD } from '@nestjs/core';
import { RoleGuard } from './guard/role.guard';
import { ClassModule } from './class/class.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './student/entity/student.entity';
import { Class } from './class/entity/class.entity';

@Module({
  imports: [
    StudentModule,
    ClassModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5431,
      username: 'postgres',
      password: 'password',
      database: 'postgres',
      synchronize: true,
      entities: [Student, Class],
      logging: true,
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
})
export class AppModule {}
