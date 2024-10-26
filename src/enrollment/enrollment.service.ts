import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Enrollment } from './entities/enrollment.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Course } from 'src/courses/entities/course.entity';
import { CoursesService } from 'src/courses/courses.service';

@Injectable()
export class EnrollmentService {
  constructor(
    @InjectRepository(Enrollment)
    private enrollmentRepository: Repository<Enrollment>,
    private courseService: CoursesService
  ) {}

  async enrollUser(user: User, course: Course): Promise<Enrollment> {
    const enrollment = new Enrollment();
    enrollment.user = user;
    enrollment.course = course;

    return this.enrollmentRepository.save(enrollment);
  }

  async findUserEnrollments(userId: number): Promise<Enrollment[]> {
    return this.enrollmentRepository.find({ where: { user: { id: userId } }, relations: ['course'] });
  }

  async findCourseById(courseId: number): Promise<Course> {
    const course = await this.courseService.findOneById(courseId);
    if (!course) {
      throw new NotFoundException(`Course with ID ${courseId} not found`);
    }
    return course;
  }
}
