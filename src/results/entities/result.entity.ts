import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Assignment } from 'src/assignment/entities/assignment.entity';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class Result {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Assignment, (assignment) => assignment.results, { onDelete: 'CASCADE' })
  assignment: Assignment;

  @ManyToOne(() => User, (user) => user.results, { onDelete: 'CASCADE' })
  user: User;

  @Column()
  score: number; 

  @Column()
  submittedAt: Date; 

  @Column({ default: false })
  isGraded: boolean; 
}
