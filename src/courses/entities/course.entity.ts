import { Enrollment } from 'src/enrollment/entities/enrollment.entity';
import { Modules } from 'src/module/entities/module.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column('decimal')
  price: number;

  @Column()
  teacher: string;

  @Column()
  category: string;

  @Column()
  level: string;

  @OneToMany(() => Enrollment, enrollment => enrollment.course, { onDelete: 'CASCADE' })
  enrollments: Enrollment[];

  @OneToMany(() => Modules, (module) => module.course, { onDelete: 'CASCADE' })
  modules: Modules[];
}
