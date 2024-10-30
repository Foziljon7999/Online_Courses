import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Modules } from 'src/module/entities/module.entity';

@Entity('lesson')
export class Lesson {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  content: string;

  @Column()
  contentType:  'text'; 

  @ManyToOne(() => Modules, (module) => module.lesson)
  @JoinColumn({ name: 'moduleId'})
  module: Modules;
}
