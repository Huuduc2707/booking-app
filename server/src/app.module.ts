import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import TypeOrmConfig from './database/typeorm.config';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './database/health.controller';

@Module({
  imports: [TypeOrmModule.forRoot(TypeOrmConfig), TerminusModule],
  controllers: [AppController, HealthController],
  providers: [AppService],
})
export class AppModule {}
