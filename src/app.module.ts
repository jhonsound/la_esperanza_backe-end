import { Module } from '@nestjs/common';
import { DatabaseModule } from './modules/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { MissionsModule } from './modules/missions/missions.module';
import { RolesModule } from './modules/roles/roles.module';
import { LevelsModule } from './modules/levels/levels.module';
import { UsersModule } from './modules/users/users.module';
import { ExercisesModule } from './modules/exercises/exercises.module';
import { ClansModule } from './modules/clans/clans.module';
import { SupabaseModule } from './modules/supabase/supabase.module';
import configuration from './modules/database/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration] }),
    DatabaseModule,
    AuthModule,
    RolesModule,
    MissionsModule,
    LevelsModule,
    UsersModule,
    ExercisesModule,
    ClansModule,
    /* SupabaseModule, */
  ],
})
export class AppModule {}
