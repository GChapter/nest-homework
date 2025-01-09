import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  UseGuards,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto, UpdateStudentDto } from './dto/student.dto';
import { Roles } from 'src/decorators/role.decorator';
import { RoleGuard } from 'src/guard/role.guard';
import { UpdateStudentPipe } from 'src/pipes/student.pipe';

@Controller('student')
@UseGuards(RoleGuard)
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  @Roles('Teacher')
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.create(createStudentDto);
  }

  @Get()
  findAll() {
    return this.studentService.findAll();
  }

  @Get('id/:id')
  findOne(@Param('id') id: string) {
    return this.studentService.findOne(+id);
  }

  @Get('name/:name')
  findStudentByName(@Param('name') name: string) {
    return this.studentService.findStudentByName(name);
  }

  @Get('class/:className')
  findStudentByClassName(@Param('className') className: string) {
    return this.studentService.findStudentByClassName(className);
  }

  @Patch()
  @Roles('Teacher')
  @UsePipes(UpdateStudentPipe)
  update(@Body() updateStudentDto: UpdateStudentDto) {
    return this.studentService.update(updateStudentDto);
  }

  @Delete(':id')
  @Roles('Teacher')
  remove(@Param('id') id: string) {
    return this.studentService.delete(+id);
  }
}
