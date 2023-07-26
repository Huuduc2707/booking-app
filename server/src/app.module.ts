import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import TypeOrmConfig from './database/typeorm.config';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './database/health.controller';
import { EventController } from './modules/event/event.controller';
import { EventCategoryController } from './modules/event-category/event-category.controller';
import { BookingController } from './modules/booking/booking.controller';
import { EventService } from './modules/event/event.service';
import { EventCategoryService } from './modules/event-category/event-category.service';
import { SeatTypeService } from './modules/seat-type/seat-type.service';
import { SeatService } from './modules/seat/seat.service';
import { BookingService } from './modules/booking/booking.service';
import Event from './entities/event.entity/event.entity';
import EventCategory from './entities/event-category.entity/event-category.entity';
import Booking from './entities/booking.entity/booking.entity';
import Seat from './entities/seat.entity/seat.entity';
import SeatType from './entities/seat-type.entity/seat-type.entity';
import { EmailService } from './utility';

@Module({
  imports: [
    TypeOrmModule.forRoot(TypeOrmConfig),
    TerminusModule,
    TypeOrmModule.forFeature([Event, EventCategory, Booking, Seat, SeatType]),
  ],
  controllers: [
    AppController,
    HealthController,
    EventController,
    EventCategoryController,
    BookingController,
  ],
  providers: [
    AppService,
    EventService,
    EventCategoryService,
    SeatTypeService,
    SeatService,
    BookingService,
    EmailService,
  ],
})
export class AppModule {}
