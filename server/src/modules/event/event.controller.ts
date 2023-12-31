import {
  Controller,
  Get,
  Put,
  Body,
  Res,
  ValidationPipe,
  Param,
} from '@nestjs/common';
import { EventService } from './event.service';
import { EventCategoryService } from '../event-category/event-category.service';
import { SeatTypeService } from '../seat-type/seat-type.service';
import { SeatService } from '../seat/seat.service';
import EventInfo from './event.dto';
import { Response } from 'express';

@Controller('event')
export class EventController {
  constructor(
    private readonly eventService: EventService,
    private readonly eventCategoryService: EventCategoryService,
    private readonly seatTypeService: SeatTypeService,
    private readonly seatService: SeatService,
  ) {}

  @Put('add')
  async AddEvent(
    @Body(ValidationPipe) eventInfo: EventInfo,
    @Res() response: Response,
  ) {
    const eventId = await this.eventService.AddEvent(eventInfo);
    const seatTypeId = await this.seatTypeService.AddSeatType(
      eventInfo,
      eventId,
    );
    await this.seatService.AddSeat(eventInfo, eventId, seatTypeId);
    response.status(201).json({ message: 'successful' });
  }

  @Get('detail/:eventId')
  async GetEventDetails(
    @Param('eventId') eventId: string,
    @Res() response: Response,
  ) {
    const event = await this.eventService.GetEventDetails(eventId);
    const category = await this.eventCategoryService.GetCategoryListForEvent(
      eventId,
    );
    const seats = await this.seatService.GetSeat(eventId);
    const available = new Date() >= new Date(event.date) ? false : true;
    response.status(200).json({
      event: { ...event, available: available, category: category },
      seats: seats,
    });
  }

  @Get('search/:eventName')
  async SearchEvent(
    @Param('eventName') eventName: string,
    @Res() response: Response,
  ) {
    const res = await this.eventService.SearchEvent(eventName);
    if (res)
      response
        .status(200)
        .json(await this.eventService.AddInfoToEventList(res));
    else response.status(404).json({ error: 'Event not found' });
  }

  @Get('summary')
  async SummaryEvent(@Res() response: Response) {
    const eventSummary = await this.eventService.SummaryEvent();
    return response.status(200).json(eventSummary);
  }
}
