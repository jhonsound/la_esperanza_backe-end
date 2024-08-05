import { SUPABASE_CLIENT } from 'src/constants/supabase';
import { createClient } from '@supabase/supabase-js';
import { ConfigService } from '@nestjs/config';

export const supabaseProvider = [
  {
    provide: SUPABASE_CLIENT,
    useFactory: async (configService: ConfigService) => {
      const supabaseUrl = configService.get('supabaseUrl');
      const supabaseKey = configService.get('supabaseKey');
      return createClient(supabaseUrl, supabaseKey);
    },
    inject: [ConfigService],
  },
];