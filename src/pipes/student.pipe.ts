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

  async transform(
    value: { studentName: string; className: string },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    metadata: ArgumentMetadata,
  ) {
    if (
      await this.studentService.checkStudentNameExist(value.studentName, -1)
    ) {
      throw new BadRequestException('Student already exists');
    }
    if (!(await this.classService.checkClassExist(value.className))) {
      throw new BadRequestException(
        "Class doesn't exist. Please create class first",
      );
    }
    return value;
  }
}

@Injectable()
export class UpdateStudentPipe
  implements
    PipeTransform<{ id: number; studentName: string; className: string }>
{
  constructor(
    private readonly studentService: StudentService,
    private readonly classService: ClassService,
  ) {}

  async transform(
    value: { id: number; studentName: string; className: string },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    metadata: ArgumentMetadata,
  ) {
    if (!value.studentName && !value.className) {
      throw new BadRequestException(
        'Please provide at least one of the following: studentName, className',
      );
    }
    if (
      await this.studentService.checkNoChangesDetected(
        value.studentName,
        value.className,
        value.id,
      )
    ) {
      throw new BadRequestException('No changes detected');
    }
    if (
      value.studentName &&
      (await this.studentService.checkStudentNameExist(
        value.studentName,
        value.id,
      ))
    ) {
      throw new BadRequestException('Student already exists');
    }
    if (
      value.className &&
      !(await this.classService.checkClassExist(value.className))
    ) {
      throw new BadRequestException(
        "Class doesn't exist. Please create class first",
      );
    }
    return value;
  }
}
