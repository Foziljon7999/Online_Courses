import { Get, Injectable, NotFoundException, Query } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
  ) {}

  async create(createCourseDto: CreateCourseDto): Promise<Course> {
    const course = this.courseRepository.create(createCourseDto);
    return this.courseRepository.save(course);
  }

  async findAll(category?: string, search?: string): Promise<Course[]> {
    const query = this.courseRepository.createQueryBuilder('course');

    if (category) {
      query.andWhere('course.category = :category', { category });
    }

    if (search) {
      query.andWhere('course.name LIKE :search', { search: `%${search}%` });
    }

    return await query.getMany();
  }

  async findOneById(id: number): Promise<Course> {
    const course = await this.courseRepository.findOne({ where: { id } });
    if (!course) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }
    return course;
  }

  async update(id: number, updateCourseDto: Partial<CreateCourseDto>): Promise<Course> {
    await this.courseRepository.update(id, updateCourseDto);
    return this.findOneById(id);
  }

  async remove(id: number): Promise<string> {
    const result = await this.courseRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }
    return `Course with ID ${id} successfully deleted`
  }
}
