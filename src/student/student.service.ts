import { Injectable } from '@nestjs/common';
import { CreateStudentDto, UpdateStudentDto } from './dto/student.dto';

@Injectable()
export class StudentService {
  private students: { id: number; [key: string]: any }[] = [];
  create(createStudentDto: CreateStudentDto) {
    const maxId =
      this.students.length > 0
        ? Math.max(...this.students.map((student) => student.id))
        : 0;
    this.students.push({
      id: maxId + 1,
      ...createStudentDto,
    });
    return 'Created';
  }

  findAll() {
    return this.students;
  }

  findOne(id: number) {
    const student = this.findStudentById(id);
    if (student) {
      return student;
    } else {
      return 'Student ID not found';
    }
  }

  update(updateStudentDto: UpdateStudentDto) {
    const id = updateStudentDto.getId();
    const studentIndex = this.findStudentIndexById(id);
    if (studentIndex !== -1) {
      this.students[studentIndex] = {
        ...this.students[studentIndex],
        ...updateStudentDto,
        id: this.students[studentIndex].id,
      };
      return 'Updated';
    }
    return 'Student ID not found';
  }

  delete(id: number) {
    const studentIndex = this.findStudentIndexById(id);
    if (studentIndex !== -1) {
      this.students.splice(studentIndex, 1);
      return 'Deleted';
    }
    return 'Student ID not found';
  }

  findStudentById(id: number) {
    return this.students.find((student) => student.id === id);
  }

  findStudentIndexById(id: number) {
    return this.students.findIndex((student) => student.id === id);
  }

  findStudentByName(studentName: string) {
    return this.students.find((student) =>
      student.studentName.toLowerCase().includes(studentName.toLowerCase()),
    );
  }

  findStudentByClassName(className: string) {
    return this.students.filter(
      (student) => student.className.toLowerCase() === className.toLowerCase(),
    );
  }

  updateStudentClassName(className: string, newClassName: string) {
    const students = this.findStudentByClassName(className);
    if (students.length > 0) {
      students.forEach((student) => {
        student.className = newClassName;
      });
      return 'Updated';
    }
  }
}
