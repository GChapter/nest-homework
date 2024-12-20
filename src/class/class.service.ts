import { Injectable } from '@nestjs/common';
import { CreateClassDto, UpdateClassDto } from './dto/class.dto';
import { StudentService } from 'src/student/student.service';

@Injectable()
export class ClassService {
  private classes: { id: number; className: string }[] = [];
  constructor(private readonly studentService: StudentService) {}
  create(createClassDto: CreateClassDto) {
    const maxId =
      this.classes.length > 0
        ? Math.max(...this.classes.map((classObj) => classObj.id))
        : 0;
    this.classes.push({
      id: maxId + 1,
      className: createClassDto.getClassName(),
    });
    return 'Created';
  }

  findAll() {
    return this.classes;
  }

  findOne(id: number) {
    if (this.findClassById(id)) {
      return this.findClassById(id);
    }
    return 'Class ID not found';
  }

  update(updateClassDto: UpdateClassDto) {
    const id = updateClassDto.getId();
    const classIndex = this.findClassIndexById(id);
    if (classIndex !== -1) {
      this.studentService.updateStudentClassName(
        this.classes[classIndex].className,
        updateClassDto.getClassName(),
      );
      this.classes[classIndex] = {
        id: updateClassDto.getId(),
        className: updateClassDto.getClassName(),
      };

      return 'Updated';
    }
  }

  delete(id: number) {
    const classIndex = this.findClassIndexById(id);
    if (classIndex !== -1) {
      this.classes.splice(classIndex, 1);
      return 'Deleted';
    }
  }

  findClassById(id: number) {
    console.log(typeof id);
    console.log(this.classes);
    return this.classes.find((classObj) => classObj.id === id);
  }

  findClassIndexById(id: number) {
    return this.classes.findIndex((classObj) => classObj.id === id);
  }

  checkClassExist(className: string) {
    return this.classes.some((classObj) => classObj.className === className);
  }
}
