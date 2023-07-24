import { Module } from '@nestjs/common';
import { SeatTypeService } from './seat-type.service';
import { SeatTypeController } from './seat-type.controller';

@Module({
  providers: [SeatTypeService],
  controllers: [SeatTypeController],
})
export class SeatTypeModule {}
