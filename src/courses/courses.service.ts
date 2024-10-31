import { Injectable, InternalServerErrorException, Module, NotFoundException } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { Repository } from 'typeorm';
import { Modules } from 'src/module/entities/module.entity';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
    @InjectRepository(Modules)
    private moduleRepository: Repository<Modules>
  ) {}

  async create(createCourseDto: CreateCourseDto): Promise<Course> {
    const course = this.courseRepository.create(createCourseDto);
    return this.courseRepository.save(course);
  }

  async findAll(): Promise<Course[]> {
    return await this.courseRepository.find();
}

async findByCategory(category: string): Promise<Course[]> {
    return await this.courseRepository.createQueryBuilder('course')
        .where('course.category = :category', { category })
        .getMany();
}

async findBySearch(search: string): Promise<Course[]> {
    return await this.courseRepository.createQueryBuilder('course')
        .where('course.name LIKE :search', { search: `%${search}%` })
        .getMany();
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

  async getModulesByCourseId(courseId: number): Promise<{ course: Course }> {
    const course = await this.courseRepository.findOne({
      where: { id: courseId },
      relations: ['modules'],
    });

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    return {
      course,
    };
  }

  
}
