import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { CoursesModule } from './courses/courses.module';
import { Course } from './courses/entities/course.entity';
import { EnrollmentModule } from './enrollment/enrollment.module';
import { Enrollment } from './enrollment/entities/enrollment.entity';
import { LessonModule } from './lesson/lesson.module';
import { Lesson } from './lesson/entities/lesson.entity';
import { Modules } from './module/entities/module.entity';
import { ModulesModule } from './module/module.module';
import { AssignmentModule } from './assignment/assignment.module';
import { Assignment } from './assignment/entities/assignment.entity';
import { ResultsModule } from './results/results.module';
import { Result } from './results/entities/result.entity';



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'postgres',
      port: +process.env.DB_PORT || 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || '1111',
      database: process.env.DB_DATABASE || 'exam',
      entities: [User, Course, Enrollment, Lesson, Modules, Assignment, Result],
      synchronize: true,
      // logging: true
    }),
    UsersModule,
    AuthModule,
    CoursesModule,
    EnrollmentModule,
    LessonModule,
    ModulesModule,
    AssignmentModule,
    ResultsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
