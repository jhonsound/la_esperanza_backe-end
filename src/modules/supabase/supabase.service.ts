// src/modules/supabase/supabase.service.ts
import { Injectable, Inject } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class SupabaseService {
  constructor(
    @Inject('SUPABASE_CLIENT') private readonly supabase: SupabaseClient,
  ) {}

  async uploadFile(file: Express.MulterFile, bucket: string): Promise<any> {
    const { originalname, buffer } = file;
    const fileName = `${uuidv4()}-${originalname}`;

    const { data, error } = await this.supabase.storage
      .from(bucket)
      .upload(fileName, buffer);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }
}
