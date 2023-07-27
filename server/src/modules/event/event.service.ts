import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import EventInfo from './event.dto';
import Event from '../../entities/event.entity/event.entity';
import Event_Eventcategory from '../../entities/event_eventCategory.entity';
import * as util from '../../utility';
import { EventCategoryService } from '../event-category/event-category.service';

@Injectable()
export class EventService {
  constructor(
    private readonly eventCategoryService: EventCategoryService,
    @InjectRepository(Event)
    private readonly eventRepo: Repository<Event>,
    @InjectRepository(Event_Eventcategory)
    private readonly event_eventCategoryRepo: Repository<Event_Eventcategory>,
  ) {}

  async AddEvent(eventInfo: EventInfo) {
    const { title, date, location, image, seatType, category } = eventInfo;
    const minPrice = seatType.reduce((min, seatType) => {
      return seatType.price < min ? seatType.price : min;
    }, seatType[0].price);
    const eventId = util.IdGenerator('E');
    const newEC: Event_Eventcategory[] = [];
    for (const ec of category) {
      newEC.push(
        this.event_eventCategoryRepo.create({
          id: util.IdGenerator('EEC'),
          event: eventId,
          category: ec,
        }),
      );
      const newEvent = this.eventRepo.create({
        id: eventId,
        title: title,
        date: date,
        location: location,
        price: minPrice,
        imageUrl: image,
      });
      await this.eventRepo.save(newEvent);
      await this.event_eventCategoryRepo.save(newEC);
    }
    return eventId;
  }

  async GetEventDetails(eventId: string) {
    return await this.eventRepo.findOne({
      where: { id: eventId },
    });
  }

  async GetEventList() {
    const eventList = await this.eventRepo.find();
    return await this.AddInfoToEventList(eventList);
  }

  async SearchEvent(eventName: string) {
    const res = await this.eventRepo.find({
      where: { title: Like(`%${eventName}%`) },
    });
    if (res.length) return await this.AddInfoToEventList(res);
    else return null;
  }

  async GetEventNum() {
    return await this.eventRepo.count();
  }

  async GetMostBookedEvents() {
    return await this.eventRepo
      .createQueryBuilder('event')
      .select('event.*')
      .addSelect('COUNT(booking.id)', 'bookingNum')
      .addSelect('SUM(booking.totalPayment)', 'revenue')
      .innerJoin('booking', 'booking', 'booking.eventId=event.id')
      .groupBy('event.id')
      .orderBy('bookingNum', 'DESC')
      .limit(5)
      .getRawMany();
  }

  async GetHighestRevenueEvents() {
    return await this.eventRepo
      .createQueryBuilder('event')
      .select('event.*')
      .addSelect('COUNT(booking.id)', 'bookingNum')
      .addSelect('SUM(booking.totalPayment)', 'revenue')
      .innerJoin('booking', 'booking', 'booking.eventId=event.id')
      .groupBy('event.id')
      .orderBy('revenue', 'DESC')
      .limit(5)
      .getRawMany();
  }

  async GetEventDetailList() {
    return await this.eventRepo
      .createQueryBuilder('event')
      .select('event.*')
      .addSelect('COUNT(booking.id)', 'bookingNum')
      .addSelect('SUM(booking.totalPayment)', 'revenue')
      .leftJoin('booking', 'booking', 'booking.eventId=event.id')
      .groupBy('event.id')
      .orderBy('event.title', 'ASC')
      .getRawMany();
  }

  async AddInfoToEventList(eventList: Event[]) {
    const category = [];
    for (const event of eventList)
      category.push(
        await this.eventCategoryService.GetCategoryListForEvent(event.id),
      );
    return eventList.map((event, index) => ({
      ...event,
      available: new Date() >= new Date(event.date) ? false : true,
      category: category[index],
    }));
  }

  async SummaryEvent() {
    const eventNum = await this.GetEventNum();
    const mostBookedEvents = await this.GetMostBookedEvents();
    const highestRevenueEvents = await this.GetHighestRevenueEvents();
    const eventDetailList = await this.GetEventDetailList();
    return {
      evenNum: eventNum,
      mostBooked: await this.AddInfoToEventList(mostBookedEvents),
      highestRevenue: await this.AddInfoToEventList(highestRevenueEvents),
      detail: await this.AddInfoToEventList(eventDetailList),
    };
  }
}
