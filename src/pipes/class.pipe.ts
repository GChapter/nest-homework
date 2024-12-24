import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { ClassService } from 'src/class/class.service';
import { StudentService } from 'src/student/student.service';

@Injectable()
export class CreateClassPipe implements PipeTransform<{ className: string }> {
  constructor(private readonly classService: ClassService) {}

  async transform(
    value: { className: string },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    metadata: ArgumentMetadata,
  ) {
    if (value.className === undefined) {
      throw new BadRequestException('Please provide className');
    }
    if (await this.classService.checkClassExist(value.className)) {
      throw new BadRequestException('Class name already exists');
    }
    return value;
  }
}

@Injectable()
export class DeleteClassPipe implements PipeTransform<number> {
  constructor(
    private readonly studentService: StudentService,
    private readonly classService: ClassService,
  ) {}

  async transform(
    id: number,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    metadata: ArgumentMetadata,
  ) {
    const classObj = await this.classService.findOne(+id);
    if (!classObj) {
      throw new BadRequestException('Class ID not found');
    }
    const students = await this.studentService.findStudentByClassName(
      classObj.className,
    );
    if (students.length > 0) {
      throw new BadRequestException('There are students in this class');
    }
    return id;
  }
}
