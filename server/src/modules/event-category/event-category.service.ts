import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import EventCategory from '../../entities/event-category.entity/event-category.entity';

@Injectable()
export class EventCategoryService {
  constructor(
    @InjectRepository(EventCategory)
    private readonly eventCategoryRepo: Repository<EventCategory>,
  ) {}

  async GetCategoryList() {
    return await this.eventCategoryRepo.find();
  }

  async GetCategoryListForEvent(eventId: string) {
    return this.eventCategoryRepo
      .createQueryBuilder('eventCategory')
      .select('eventCategory.*')
      .innerJoin(
        'event_eventcategory',
        'event_eventcategory',
        'event_eventcategory.categoryId=eventCategory.id',
      )
      .where('event_eventcategory.eventId=:eventId', { eventId: eventId })
      .getRawMany();
  }
}
