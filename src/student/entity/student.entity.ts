import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Class } from '../../class/entity/class.entity';
import { ObjectType, Field, Int } from '@nestjs/graphql';
@Entity()
@ObjectType()
export class Student {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field({ nullable: false })
  studentName: string;

  @ManyToOne(() => Class, (classObj) => classObj.students, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'classId' })
  @Field(() => Class)
  class: Class;
}
