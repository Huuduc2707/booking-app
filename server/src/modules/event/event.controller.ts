import {
  Controller,
  Get,
  Put,
  Body,
  Res,
  ValidationPipe,
  Query,
} from '@nestjs/common';
import { EventService } from './event.service';
import { SeatTypeService } from '../seat-type/seat-type.service';
import { SeatService } from '../seat/seat.service';
import EventInfo from './event.dto';
import { Response } from 'express';

@Controller('event')
export class EventController {
  constructor(
    private readonly eventService: EventService,
    private readonly seatTypeService: SeatTypeService,
    private readonly seatService: SeatService,
  ) {}

  @Put('add')
  async AddEvent(
    @Body(ValidationPipe) eventInfo: EventInfo,
    @Res() response: Response,
  ) {
    const error = this.eventService.ValidateEvent(eventInfo);
    if (error) response.status(400).json(error);
    else {
      const eventId = await this.eventService.AddEvent(eventInfo);
      const seatTypeId = await this.seatTypeService.AddSeatType(
        eventInfo,
        eventId,
      );
      await this.seatService.AddSeat(eventInfo, eventId, seatTypeId);
      response.status(201).json({ message: 'successful' });
    }
  }

  @Get('detail')
  async GetEventDetails(
    @Query('eventId') eventId: string,
    @Res() response: Response,
  ) {
    const event = await this.eventService.GetEventDetails(eventId);
    const seats = await this.seatService.GetSeat(eventId);
    const available = new Date().toDateString() >= event.date ? false : true;
    response
      .status(200)
      .json({ event: event, seats: seats, available: available });
  }
}
