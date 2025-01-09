import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateClassDto, UpdateClassDto } from './dto/class.dto';
import { StudentService } from 'src/student/student.service';
import { Repository } from 'typeorm';
import { Class } from './entity/class.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ClassService {
  constructor(
    private readonly studentService: StudentService,
    @InjectRepository(Class) private classesRepository: Repository<Class>,
  ) {}

  async create(createClassDto: CreateClassDto) {
    const newClass = this.classesRepository.create({
      className: createClassDto.getClassName(),
    });
    await this.classesRepository.save(newClass);
    return 'Created';
  }

  findAll() {
    return this.classesRepository.find();
  }

  async findOne(id: number): Promise<Class> {
    const classEntity = await this.classesRepository.findOneBy({ id });
    if (!classEntity) {
      throw new NotFoundException('Class ID not found');
    }
    return classEntity;
  }

  // Nên dùng transaction để đảm bảo mọi update sẽ đồng bộ
  async update(updateClassDto: UpdateClassDto) {
    const classUpdate = await this.classesRepository.findOneBy({
      id: updateClassDto.getId(),
    });
    if (!classUpdate) {
      throw new NotFoundException('Class ID not found');
    }
    this.studentService.updateStudentClassName(
      classUpdate.className,
      updateClassDto.getClassName(),
    );
    classUpdate.className = updateClassDto.getClassName();
    await this.classesRepository.save(classUpdate);
    return 'Updated';
  }

  async delete(id: number) {
    const classDelete = await this.classesRepository.findOneBy({ id });
    if (!classDelete) {
      throw new NotFoundException('Class ID not found');
    }
    if (this.studentService.findStudentByClassName(classDelete.className)) {
      throw new BadRequestException('Class has students');
    }
    await this.classesRepository.remove(classDelete);
    return 'Deleted';
  }

  async findClassByName(className: string) {
    const classObj = await this.classesRepository.findOneBy({ className });
    if (!classObj) {
      throw new NotFoundException('Class name not found');
    }
    return classObj;
  }

  async checkClassExist(className: string) {
    const classObj = await this.classesRepository.findOneBy({ className });
    console.log('classObj', classObj);
    return !!classObj;
  }
}
