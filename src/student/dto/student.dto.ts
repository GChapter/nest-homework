import { Field, InputType } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Matches,
  MaxLength,
} from 'class-validator';

@InputType()
export class CreateStudentDto {
  @Field()
  @IsNotEmpty({ message: 'Student name is required' })
  @MaxLength(50, { message: 'Student name is too long' })
  @Matches(/^[\p{L}\s]*$/u, {
    message: 'Student name must contain characters only',
  })
  private studentName: string;

  @Field()
  @IsNotEmpty({ message: 'Class id is required' })
  private className: string;

  getStudentName(): string {
    return this.studentName;
  }

  getClassName(): string {
    return this.className;
  }
}

@InputType()
export class UpdateStudentDto {
  @Field()
  @IsNotEmpty()
  @IsNumber()
  private id: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsNotEmpty({ message: 'Student name is required' })
  @MaxLength(50, { message: 'Student name is too long' })
  @Matches(/^[\p{L}\s]*$/u, {
    message: 'Student name must contain characters only',
  })
  private studentName?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsNotEmpty({ message: 'Class name is required' })
  private className?: string;

  getId(): number {
    return this.id;
  }

  getStudentName(): string {
    return this.studentName;
  }

  getClassName(): string {
    return this.className;
  }
}
