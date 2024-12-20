import { IsNotEmpty, IsNumber, IsOptional, Matches } from 'class-validator';

export class CreateStudentDto {
  @IsNotEmpty({ message: 'Student name is required' })
  @Matches(/^[\p{L}\s]*$/u, {
    message: 'Student name must contain characters only',
  })
  private studentName: string;

  @IsNotEmpty({ message: 'Class name is required' })
  private className: string;
}

export class UpdateStudentDto {
  @IsNotEmpty()
  @IsNumber()
  private id: number;

  @IsOptional()
  @IsNotEmpty({ message: 'Student name is required' })
  @Matches(/^[\p{L}\s]*$/u, {
    message: 'Student name must contain characters only',
  })
  private studentName: string;

  @IsOptional()
  @IsNotEmpty({ message: 'Class name is required' })
  private className: string;

  getId(): number {
    return this.id;
  }
}
