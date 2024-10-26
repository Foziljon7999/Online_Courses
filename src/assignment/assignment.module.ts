import { Module } from '@nestjs/common';
import { AssignmentService } from './assignment.service';
import { AssignmentController } from './assignment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Assignment } from './entities/assignment.entity';
import { Result } from 'src/results/entities/result.entity';
import { ResultsModule } from 'src/results/results.module';
import { User } from 'src/users/entities/user.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Assignment, Result, User]),
ResultsModule, UsersModule
],
  controllers: [AssignmentController],
  providers: [AssignmentService],
})
export class AssignmentModule {}
