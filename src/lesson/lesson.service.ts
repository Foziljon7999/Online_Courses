import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Lesson } from './entities/lesson.entity';
import { Repository } from 'typeorm';
import { Modules } from 'src/module/entities/module.entity';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson)
    private lessonRepository: Repository<Lesson>,
    @InjectRepository(Modules)
    private moduleRepository: Repository<Modules>
  ) {}

  async create(createLessonDto: CreateLessonDto): Promise<Lesson> {
    
    const lesson = new Lesson();
    lesson.title = createLessonDto.title;
    lesson.content = createLessonDto.content;
    lesson.contentType = createLessonDto.contentType;
    const module = await this.moduleRepository.findOne({
      where: { id: createLessonDto.moduleId },
    });

    if (!module) {
      throw new NotFoundException(`Module with ID ${createLessonDto.moduleId} not found`);
    }
    lesson.module = module;

    return this.lessonRepository.save(lesson);
  }

  async findAll(): Promise<Lesson[]> {
    return this.lessonRepository.find();
  }

  async findOne(id: number): Promise<Lesson> {
    const lesson = await this.lessonRepository.findOne({ where: { id } });
    if (!lesson) {
      throw new NotFoundException(`Lesson with ID ${id} not found`);
    }
    return lesson;
  }

  async update(id: number, updateLessonDto: UpdateLessonDto): Promise<Lesson> {
    await this.findOne(id); 
    await this.lessonRepository.update(id, updateLessonDto);
    return this.findOne(id); 
  }

  async remove(id: number): Promise<void> {
    const lesson = await this.findOne(id);
    await this.lessonRepository.remove(lesson);
  }
}
