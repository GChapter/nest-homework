import { forwardRef, Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { ClassModule } from 'src/class/class.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entity/student.entity';

@Module({
  imports: [forwardRef(() => ClassModule), TypeOrmModule.forFeature([Student])],
  controllers: [StudentController],
  providers: [StudentService],
  exports: [StudentService, TypeOrmModule],
})
export class StudentModule {}
