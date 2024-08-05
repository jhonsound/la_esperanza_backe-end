// src/supabase/supabase.module.ts
import { Module, Global } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';
import { SUPABASE_CLIENT } from 'src/constants/supabase';
import { SupabaseService } from './supabase.service';
import { supabaseProvider } from './supabase.provider';
import { ConfigModule } from '@nestjs/config';
import { SupabaseController } from './supabase.controller';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [SupabaseService, ...supabaseProvider],
  controllers: [SupabaseController],
  exports: [SUPABASE_CLIENT],
})
export class SupabaseModule {}
