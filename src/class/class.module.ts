import { forwardRef, Module } from '@nestjs/common';
import { ClassService } from './class.service';
import { ClassController } from './class.controller';
import { StudentModule } from 'src/student/student.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Class } from './entity/class.entity';

@Module({
  imports: [forwardRef(() => StudentModule), TypeOrmModule.forFeature([Class])],
  controllers: [ClassController],
  providers: [ClassService],
  exports: [ClassService, TypeOrmModule],
})
export class ClassModule {}
