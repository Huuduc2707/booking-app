import { Controller, Get, Res } from '@nestjs/common';
import { EventCategoryService } from './event-category.service';
import { Response } from 'express';

@Controller('category')
export class EventCategoryController {
  constructor(private readonly eventCategoryService: EventCategoryService) {}

  @Get()
  GetCategoryList(@Res() response: Response) {
    this.eventCategoryService
      .GetCategoryList()
      .then((res) => response.status(200).json(res))
      .catch((err) => response.status(400).json(err));
  }
}
