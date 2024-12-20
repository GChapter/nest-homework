import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { ClassService } from 'src/class/class.service';
import { StudentService } from 'src/student/student.service';

@Injectable()
export class CreateStudentPipe
  implements PipeTransform<{ studentName: string; className: string }>
{
  constructor(
    private readonly studentService: StudentService,
    private readonly classService: ClassService,
  ) {}

  transform(
    value: { studentName: string; className: string },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    metadata: ArgumentMetadata,
  ) {
    if (this.studentService.findStudentByName(value.studentName)) {
      throw new BadRequestException('Student already exists');
    }
    if (!this.classService.checkClassExist(value.className)) {
      throw new BadRequestException(
        "Class doesn't exist. Please create class first",
      );
    }
    return value;
  }
}

@Injectable()
export class UpdateStudentPipe
  implements PipeTransform<{ studentName: string; className: string }>
{
  constructor(
    private readonly studentService: StudentService,
    private readonly classService: ClassService,
  ) {}

  transform(
    value: { studentName: string; className: string },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    metadata: ArgumentMetadata,
  ) {
    if (!value.studentName && !value.className) {
      throw new BadRequestException(
        'Please provide at least one of the following: studentName, className',
      );
    }
    if (
      value.studentName &&
      this.studentService.findStudentByName(value.studentName)
    ) {
      throw new BadRequestException('Student already exists');
    }
    if (
      value.className &&
      !this.classService.checkClassExist(value.className)
    ) {
      throw new BadRequestException(
        "Class doesn't exist. Please create class first",
      );
    }
    return value;
  }
}
