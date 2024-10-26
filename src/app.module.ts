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
import { ModuleModule } from './module/module.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1111',
      database: 'exam',
      entities: [User, Course, Enrollment],
      synchronize: true,
      // logging: true
    }),
    UsersModule,
    AuthModule,
    CoursesModule,
    EnrollmentModule,
    ModuleModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
