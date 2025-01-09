import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateStudentDto, UpdateStudentDto } from './dto/student.dto';
import { Student } from './entity/student.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, Not } from 'typeorm';
import { Class } from 'src/class/entity/class.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student) private studentsRepository: Repository<Student>,
    @InjectRepository(Class) private classesRepository: Repository<Class>,
  ) {}

  async create(createStudentDto: CreateStudentDto) {
    const student = await this.studentsRepository.findOneBy({
      studentName: createStudentDto.getStudentName(),
    });
    if (student) {
      throw new BadRequestException('Student name already exists');
    }
    const classObj = await this.classesRepository.findOneBy({
      className: createStudentDto.getClassName(),
    });
    if (!classObj) {
      throw new BadRequestException('Class not found');
    }
    const newStudent = this.studentsRepository.create({
      studentName: createStudentDto.getStudentName(),
      class: classObj,
    });
    await this.studentsRepository.save(newStudent);
    return 'Created';
  }

  findAll() {
    return this.studentsRepository.find({ relations: ['class'] });
  }

  async findOne(id: number) {
    const student = await this.studentsRepository.findOne({
      where: { id },
      relations: ['class'],
    });
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
    } else if (
      updateStudentDto.getStudentName() === studentUpdate.studentName &&
      updateStudentDto.getClassName() === studentUpdate.class.className
    ) {
      return 'No changes detected';
    }
    if (updateStudentDto.getStudentName()) {
      if (
        await this.checkStudentNameExist(
          updateStudentDto.getStudentName(),
          studentUpdate.id,
        )
      ) {
        throw new BadRequestException('Student name already exists');
      }
      studentUpdate.studentName = updateStudentDto.getStudentName();
    }

    if (updateStudentDto.getClassName()) {
      const classObj = await this.classesRepository.findOneBy({
        className: updateStudentDto.getClassName(),
      });
      if (!classObj) {
        throw new BadRequestException('Class not found');
      }
      studentUpdate.class = classObj;
    }

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
    // Lowercase
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
      studentName === student.studentName &&
      className === student.class.className
    );
  }

  findStudentByClassName(className: string) {
    return this.studentsRepository.find({
      where: { class: { className } },
      relations: ['class'],
    });
  }

  async updateStudentClassName(className: string, newClassName: string) {
    const classObj = await this.classesRepository.findOne({
      where: { className },
      relations: ['students'],
    });
    classObj.students.forEach((student) => {
      student.class.className = newClassName;
    });
  }
}
