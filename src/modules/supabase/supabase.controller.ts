// src/storage/storage.controller.ts
import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { SupabaseService } from './supabase.service';

@Controller('storage')
export class SupabaseController {
  constructor(private readonly storageService: SupabaseService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.MulterFile) {
    console.log('🚀 ~ SupabaseController ~ uploadFile ~ file:', file);
    const bucket = 'school-esperanza';
    return this.storageService.uploadFile(file, bucket);
  }
}
