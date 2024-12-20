import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateClassDto {
  @IsNotEmpty({ message: 'Class name is required' })
  @IsString()
  private className: string;

  public getClassName(): string {
    return this.className;
  }
}

export class UpdateClassDto {
  @IsNotEmpty()
  @IsNumber()
  private id: number;

  @IsNotEmpty()
  @IsString()
  private className: string;

  public getId(): number {
    return this.id;
  }

  public getClassName(): string {
    return this.className;
  }
}
