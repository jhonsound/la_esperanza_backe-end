// src/modules/supabase/supabase.service.ts
import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class SupabaseService {
  constructor(
    @Inject('SUPABASE_CLIENT') private readonly supabase: SupabaseClient,
  ) {}

  async uploadFile(file: Express.MulterFile, bucket: string): Promise<any> {
    try {
      const { originalname, buffer } = file;

      // Sanear el nombre del archivo
      let sanitizedFileName = originalname
        .replace(/[^a-zA-Z0-9.]/g, '_') // Reemplaza caracteres especiales por guiones bajos
        .replace(/\s+/g, '_'); // Reemplaza espacios por guiones bajos

      // Acortar el nombre del archivo si es demasiado largo
      const maxLength = 100; // Ajusta según las restricciones del servicio
      if (sanitizedFileName.length > maxLength) {
        sanitizedFileName = sanitizedFileName.substring(0, maxLength);
      }

      const fileName = `${uuidv4()}-${sanitizedFileName}`;

      console.log("🚀 ~ SupabaseService ~ uploadFile ~ fileName:", fileName)
      const { data, error } = await this.supabase.storage
        .from(bucket)
        .upload(fileName, buffer);

      if (error) {
        console.log('🚀 ~ SupabaseService ~ uploadFile ~ error:', error);
        throw new Error(error.message);
      }

      return data;
    } catch (error) {
      console.log('🚀 ~ SupabaseService ~ uploadFile ~ error:', error);
      throw new NotFoundException(error.message);
    }
  }
}
