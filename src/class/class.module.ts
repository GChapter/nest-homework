import { forwardRef, Module } from '@nestjs/common';
import { ClassService } from './class.service';
import { ClassController } from './class.controller';
import { StudentModule } from 'src/student/student.module';

@Module({
  imports: [forwardRef(() => StudentModule)],
  controllers: [ClassController],
  providers: [ClassService],
  exports: [ClassService],
})
export class ClassModule {}
