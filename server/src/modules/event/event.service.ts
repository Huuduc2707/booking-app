import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import EventInfo from './event.dto';
import Event from '../../entities/event.entity/event.entity';
import * as util from '../../utility';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepo: Repository<Event>,
  ) {}

  ValidateEvent(eventInfo: EventInfo) {
    if (eventInfo.seatType.length > 3)
      return { error: 'Maximum 3 types of seat' };
    for (const ele of eventInfo.seatType) {
      if (ele.quantity > 40)
        return { error: 'Maximum quantity of seats for each type is 40' };
    }
  }

  async AddEvent(eventInfo: EventInfo) {
    const { title, date, location, image, seatType, category } = eventInfo;
    const minPrice = seatType.reduce((min, seatType) => {
      return seatType.price < min ? seatType.price : min;
    }, seatType[0].price);
    const eventId = util.IdGenerator('E');
    const newEvent = this.eventRepo.create({
      id: eventId,
      title: title,
      date: date,
      location: location,
      price: minPrice,
      imageUrl: image,
      eventCategories: category,
    });
    await this.eventRepo.save(newEvent);
    return eventId;
  }

  GetEventDetails(eventId: string) {
    return this.eventRepo.findOne({
      where: { id: eventId },
    });
  }

  async GetEventList() {
    const eventList = await this.eventRepo.find();
    return new Promise((resolve) => {
      resolve(
        eventList.map((ele) => ({
          ...ele,
          available: new Date() >= new Date(ele.date) ? false : true,
        })),
      );
    });
  }
}
