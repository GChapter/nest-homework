import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class CreateClassPipe implements PipeTransform<{ className: string }> {
  async transform(value: { className: string }) {
    if (value.className === undefined) {
      throw new BadRequestException('Please provide className');
    }
    return value;
  }
}
