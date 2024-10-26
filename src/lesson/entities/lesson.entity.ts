import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Modules } from 'src/module/entities/module.entity';

@Entity()
export class Lesson {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  content: string;

  @Column()
  contentType: 'video' | 'text'; 

  @ManyToOne(() => Modules, (module) => module.lessons)
  module: Modules;
}
