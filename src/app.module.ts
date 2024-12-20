import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule } from './student/student.module';
import { APP_GUARD } from '@nestjs/core';
import { RoleGuard } from './guard/role.guard';
import { ClassModule } from './class/class.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    StudentModule,
    ClassModule,
    JwtModule.register({
      secret: 'anhhenempickleballtavonnhaupickleball',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
})
export class AppModule {}
