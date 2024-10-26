import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards, UnauthorizedException } from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';
import { User } from 'src/users/entities/user.entity';
import { Course } from 'src/courses/entities/course.entity';
import { Enrollment } from './entities/enrollment.entity';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('enrollment')
export class EnrollmentController {
  constructor(private readonly enrollmentService: EnrollmentService) {}

  @UseGuards(AuthGuard)
  @Post('enroll')
  async enrollUser(@Request() req, @Body() body: { courseId: number }): Promise<string> {
    const user: User = req.user; 
    const course: Course = await this.enrollmentService.findCourseById(body.courseId);
    
    await this.enrollmentService.enrollUser(user, course);
    return `You have successfully enrolled in the course: ${course.name}`;
  }

  @UseGuards(AuthGuard)
  @Get('my-courses')
  async getUserEnrollments(@Request() req): Promise<Enrollment[]> {
    const user: User = req.user;
    if (!user) {
      throw new UnauthorizedException('User not authenticated'); 
    }
    return this.enrollmentService.findUserEnrollments(user.id);
  }
}
