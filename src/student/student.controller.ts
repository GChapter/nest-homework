import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto, UpdateStudentDto } from './dto/student.dto';
import { Roles } from 'src/decorators/role.decorator';
import { CreateStudentPipe, UpdateStudentPipe } from 'src/pipes/student.pipe';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  @Roles('teacher')
  @UsePipes(CreateStudentPipe)
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.create(createStudentDto);
  }

  @Get()
  @Roles('teacher', 'principal')
  findAll() {
    return this.studentService.findAll();
  }

  @Get('id/:id')
  @Roles('teacher', 'principal')
  findOne(@Param('id') id: string) {
    return this.studentService.findOne(+id);
  }

  @Get('name/:name')
  @Roles('teacher', 'principal')
  findStudentByName(@Param('name') name: string) {
    return this.studentService.findStudentByName(name);
  }

  @Patch()
  @Roles('teacher')
  @UsePipes(UpdateStudentPipe)
  update(@Body() updateStudentDto: UpdateStudentDto) {
    return this.studentService.update(updateStudentDto);
  }

  @Delete(':id')
  @Roles('teacher')
  remove(@Param('id') id: string) {
    return this.studentService.delete(+id);
  }
}
