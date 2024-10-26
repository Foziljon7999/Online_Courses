import { PartialType } from '@nestjs/mapped-types';
import { CreateModuleDto } from './create-module.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateModuleDto extends PartialType(CreateModuleDto) {
@IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  courseId?: number;
}
