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
      .then((res) => {
        if (res.length) response.status(200).json(res);
        else response.status(404).json({ error: 'Empty category list' });
      })
      .catch((err) => response.status(400).json(err));
  }
}
