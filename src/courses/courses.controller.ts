import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, BadRequestException, NotFoundException } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { ModuleService } from 'src/module/module.service';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService,
    private readonly modulesService:  ModuleService
  ) {}
  
  @UseGuards(AuthGuard, RolesGuard)
  @Post()
  async create(@Body() createCourseDto: CreateCourseDto): Promise<Course> {
    return this.coursesService.create(createCourseDto);
  }

  @Get()
  async findAll(): Promise<Course[]> {
    return this.coursesService.findAll();
  }

  @Get('filter')
  async findByCategory(@Query('category') category: string): Promise<Course[]> {
    if (!category) {
      throw new NotFoundException('Category query parameter is required');
    }
    const courses = await this.coursesService.findByCategory(category);
    if (courses.length === 0) {
      throw new NotFoundException(`No courses found in category: ${category}`);
    }
    return courses;
  }

  @Get('search')
  async findBySearch(@Query('search') search: string): Promise<Course[]> {
    if (!search) {
      throw new NotFoundException('Search query parameter is required');
    }
    const courses = await this.coursesService.findBySearch(search);
    if (courses.length === 0) {
      throw new NotFoundException(`No courses found with search term: ${search}`);
    }
    return courses;
  }

  @Get(':id')
  async findOneById(@Param('id') id: number): Promise<Course> {
    return this.coursesService.findOneById(id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateCourseDto: Partial<CreateCourseDto>): Promise<Course> {
    return this.coursesService.update(id, updateCourseDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<string> {
    return this.coursesService.remove(id);
  }

  @Get(':courseId/modules')
  async getModulesByCourseId(@Param('courseId') courseId: number) {
    return this.coursesService.getModulesByCourseId(courseId);
  }
}
