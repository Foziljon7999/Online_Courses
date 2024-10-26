import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Course } from 'src/courses/entities/course.entity';
import { Lesson } from 'src/lesson/entities/lesson.entity';


@Entity()
export class Modules {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Course, (course) => course.modules)
  course: Course;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => Lesson, (lesson) => lesson.module)
  lessons: Lesson[];
}
