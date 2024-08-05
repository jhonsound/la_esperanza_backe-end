// src/example/example.service.ts
import { Injectable, Inject } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_CLIENT } from 'src/constants/supabase';
import * as multer from 'multer';
@Injectable()
export class SupabaseService {
  constructor(
    @Inject(SUPABASE_CLIENT) private readonly supabase: SupabaseClient,
  ) {}

  async getData() {
    const { data, error } = await this.supabase.from('your_table').select('*');
    if (error) {
      throw new Error(error.message);
    }
    return data;
  }

  /*   async uploadFile(file: Express.Multer.File, bucket: string): Promise<any> {
    const { originalname, buffer } = file;
    const fileName = `${uuidv4()}-${originalname}`; // Genera un nombre único para el archivo

    const { data, error } = await this.supabase.storage
      .from(bucket)
      .upload(fileName, buffer);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } */
}
