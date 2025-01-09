import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

@InputType()
export class CreateClassDto {
  @Field()
  @IsNotEmpty({ message: 'Class name is required' })
  @IsString()
  @MaxLength(50, { message: 'Class name is too long' })
  private className: string;

  public getClassName(): string {
    return this.className;
  }
}

@InputType()
export class UpdateClassDto {
  @Field()
  @IsNotEmpty()
  @IsNumber()
  private id: number;

  @Field()
  @IsNotEmpty({ message: 'Class name is required' })
  @IsString()
  @MaxLength(50, { message: 'Class name is too long' })
  private className: string;

  public getId(): number {
    return this.id;
  }

  public getClassName(): string {
    return this.className;
  }
}
