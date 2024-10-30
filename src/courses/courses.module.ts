import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { Modules } from 'src/module/entities/module.entity';
import { ModuleService } from 'src/module/module.service';

@Module({
  imports: [TypeOrmModule.forFeature([Course, Modules])],
  controllers: [CoursesController],
  providers: [CoursesService, ModuleService],
  exports: [CoursesService]
})
export class CoursesModule {}
