import { Module } from '@nestjs/common';
import { EventCategoryService } from './event-category.service';
import { EventCategoryController } from './event-category.controller';

@Module({
  providers: [EventCategoryService],
  controllers: [EventCategoryController]
})
export class EventCategoryModule {}
