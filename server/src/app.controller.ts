import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { EventService } from './modules/event/event.service';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly eventService: EventService,
  ) {}

  @Get()
  async GetEventList(@Res() response: Response) {
    const eventList = await this.eventService.GetEventList();
    response.status(200).json(eventList);
  }
}
