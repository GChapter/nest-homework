import { Module } from '@nestjs/common';
import { ClassService } from './class.service';
import { ClassController } from './class.controller';
import { Student } from 'src/student/entity/student.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Class } from './entity/class.entity';
import { StudentModule } from 'src/student/student.module';

@Module({
  imports: [TypeOrmModule.forFeature([Class, Student]), StudentModule],
  controllers: [ClassController],
  providers: [ClassService],
  exports: [ClassService],
})
export class ClassModule {}
