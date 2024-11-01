import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Course } from 'src/courses/entities/course.entity';
import { Lesson } from 'src/lesson/entities/lesson.entity';
import { Assignment } from 'src/assignment/entities/assignment.entity';


@Entity()
export class Modules {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Course, (course) => course.modules, { onDelete: 'CASCADE' })
  course: Course;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => Lesson, (lesson) => lesson.module, { onDelete: 'CASCADE' })
  lessons: Lesson[];

  @OneToMany(() => Assignment, (assignment) => assignment.module, { onDelete: 'CASCADE' })
  assignments: Assignment[];

}
