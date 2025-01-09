import {
  Args,
  Int,
  Query,
  Resolver,
  ResolveField,
  Parent,
  Mutation,
} from '@nestjs/graphql';
import { Student } from './entity/student.entity';
import { Class } from '../class/entity/class.entity';
import { StudentService } from './student.service';
import { ClassService } from 'src/class/class.service';
import { CreateStudentDto, UpdateStudentDto } from './dto/student.dto';

@Resolver(() => Student)
export class StudentResolver {
  constructor(
    private readonly studentService: StudentService,
    private readonly classService: ClassService,
  ) {}

  @Mutation(() => String)
  async createStudent(
    @Args('createStudentDto') createStudentDto: CreateStudentDto,
  ): Promise<string> {
    return this.studentService.create(createStudentDto);
  }

  @Mutation(() => String)
  async updateStudent(
    @Args('updateStudentDto') updateStudentDto: UpdateStudentDto,
  ): Promise<string> {
    return this.studentService.update(updateStudentDto);
  }

  @Mutation(() => String)
  async deleteStudent(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<string> {
    return this.studentService.delete(id);
  }

  @Query(() => Student)
  async student(@Args('id', { type: () => Int }) id: number) {
    return this.studentService.findOne(id);
  }

  @Query(() => [Student])
  async students() {
    return this.studentService.findAll();
  }

  @ResolveField(() => Class)
  async class(@Parent() student: Student) {
    return this.classService.findOne(student.class.id);
  }
}
