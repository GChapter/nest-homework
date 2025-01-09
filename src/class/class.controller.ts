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
import { ClassService } from './class.service';
import { CreateClassDto, UpdateClassDto } from './dto/class.dto';
import { Roles } from 'src/decorators/role.decorator';
import { RoleGuard } from 'src/guard/role.guard';
import { CreateClassPipe } from 'src/pipes/class.pipe';

@Controller('class')
@UseGuards(RoleGuard)
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @Post()
  @Roles('Principal')
  @UsePipes(CreateClassPipe)
  create(@Body() createClassDto: CreateClassDto) {
    return this.classService.create(createClassDto);
  }

  @Get()
  findAll() {
    return this.classService.findAll();
  }

  @Get('id/:id')
  findOne(@Param('id') id: string) {
    return this.classService.findOne(+id);
  }

  @Patch()
  @Roles('Principal')
  update(@Body() updateClassDto: UpdateClassDto) {
    return this.classService.update(updateClassDto);
  }

  @Delete(':id')
  @Roles('Principal')
  remove(@Param('id') id: string) {
    return this.classService.delete(+id);
  }
}
