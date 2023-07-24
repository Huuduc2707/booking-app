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
}
