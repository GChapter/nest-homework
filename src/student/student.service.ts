import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateStudentDto, UpdateStudentDto } from './dto/student.dto';
import { Student } from './entity/student.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, Not } from 'typeorm';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student) private studentsRepository: Repository<Student>,
  ) {}

  async create(createStudentDto: CreateStudentDto) {
    const newStudent = this.studentsRepository.create({
      studentName: createStudentDto.getStudentName(),
      className: createStudentDto.getClassName(),
    });
    await this.studentsRepository.save(newStudent);
    return 'Created';
  }

  findAll() {
    return this.studentsRepository.find();
  }

  async findOne(id: number) {
    const student = await this.studentsRepository.findOneBy({ id });
    if (!student) {
      throw new NotFoundException('Student ID not found');
    }
    return student;
  }

  async update(updateStudentDto: UpdateStudentDto) {
    const studentUpdate = await this.studentsRepository.findOneBy({
      id: updateStudentDto.getId(),
    });
    if (!studentUpdate) {
      throw new NotFoundException('Student ID not found');
    }
    studentUpdate.studentName = updateStudentDto.getStudentName();
    studentUpdate.className = updateStudentDto.getClassName();
    await this.studentsRepository.save(studentUpdate);
    return 'Updated';
  }

  async delete(id: number) {
    const studentDelete = await this.studentsRepository.findOneBy({ id });
    if (!studentDelete) {
      return 'Student ID not found';
    }
    await this.studentsRepository.remove(studentDelete);
    return 'Deleted';
  }

  findStudentByName(studentName: string) {
    return this.studentsRepository.find({
      where: { studentName: Like(`%${studentName}%`) },
    });
  }

  async checkStudentNameExist(
    studentName: string,
    studentId: number,
  ): Promise<boolean> {
    if (studentId == null) {
      throw new BadRequestException('Invalid studentId');
    }

    const student = await this.studentsRepository.findOne({
      where: { studentName, id: Not(studentId) },
    });
    console.log('Query result:', !!student);
    return !!student;
  }

  async checkNoChangesDetected(
    studentName: string,
    className: string,
    studentId: number,
  ) {
    const student = await this.studentsRepository.findOneBy({ id: studentId });
    if (!student) {
      return 'Student ID not found';
    }
    return (
      studentName === student.studentName && className === student.className
    );
  }

  findStudentByClassName(className: string) {
    return this.studentsRepository.find({
      where: { className },
    });
  }

  async updateStudentClassName(className: string, newClassName: string) {
    const students = await this.studentsRepository.find({
      where: { className },
    });
    if (students.length > 0) {
      students.forEach((student) => {
        student.className = newClassName;
      });
      await this.studentsRepository.save(students);
      return 'Updated';
    }
    return 'No students found';
  }
}
