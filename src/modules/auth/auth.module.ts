import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { DatabaseModule } from '../database/database.module';
import { userProvider } from '../users/users.provider';
import { roleProvider } from '../roles/role.provider';
import { clansProvider } from '../clans/clans.provider';
import { ClansService } from '../clans/clans.service';
import { missionProvider } from '../missions/missions.provider';
import { studentExercisesProvider } from '../users/student-exercises.provider';
import { studentLevelsProvider } from '../users/student-levels.provider';
import { studentMissionProvider } from '../users/student-mission.provider';

@Module({
  imports: [
    JwtModule.register({
      secret: 'secret',
    }),
    DatabaseModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UsersService,
    ClansService,
    ...userProvider,
    ...roleProvider,
    ...clansProvider,
    ...missionProvider,
    ...studentMissionProvider,
    ...studentLevelsProvider,
    ...studentExercisesProvider,
  ],
})
export class AuthModule {}
