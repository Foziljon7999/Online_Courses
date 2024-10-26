import { Module } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { LessonController } from './lesson.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lesson } from './entities/lesson.entity';
import { Modules } from 'src/module/entities/module.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Lesson, Modules])],
  controllers: [LessonController],
  providers: [LessonService],
})
export class LessonModule {}
