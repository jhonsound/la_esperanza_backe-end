// src/example/example.service.ts
import { Injectable, Inject } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_CLIENT } from 'src/constants/supabase';

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
}
