import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class UpdateStudentPipe
  implements
    PipeTransform<{ id: number; studentName: string; className: string }>
{
  async transform(value: {
    id: number;
    studentName: string;
    className: string;
  }) {
    if (!value.studentName && !value.className) {
      throw new BadRequestException(
        'Please provide at least one of the following: studentName, className',
      );
    }
    return value;
  }
}
