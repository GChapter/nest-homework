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
import { ClassService } from './class.service';
import { CreateClassDto, UpdateClassDto } from './dto/class.dto';
import { Roles } from 'src/decorators/role.decorator';
import { CreateClassPipe, DeleteClassPipe } from 'src/pipes/class.pipe';

@Controller('class')
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @Post()
  @Roles('principal')
  @UsePipes(CreateClassPipe)
  create(@Body() createClassDto: CreateClassDto) {
    return this.classService.create(createClassDto);
  }

  @Get()
  @Roles('principal', 'teacher')
  findAll() {
    return this.classService.findAll();
  }

  @Get('id/:id')
  @Roles('principal', 'teacher')
  findOne(@Param('id') id: string) {
    return this.classService.findOne(+id);
  }

  @Patch()
  @Roles('principal')
  update(@Body() updateClassDto: UpdateClassDto) {
    return this.classService.update(updateClassDto);
  }

  @Delete(':id')
  @Roles('principal')
  @UsePipes(DeleteClassPipe)
  remove(@Param('id') id: string) {
    return this.classService.delete(+id);
  }
}
