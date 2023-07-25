import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import EventInfo from './event.dto';
import Event from '../../entities/event.entity/event.entity';
import * as util from '../../utility';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepo: Repository<Event>,
  ) {}

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

  async SearchEvent(eventName: string) {
    const res = await this.eventRepo.find({
      where: { title: Like(`%${eventName}%`) },
    });
    if (res.length) return res;
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

  async SummaryEvent() {
    const eventNum = await this.GetEventNum();
    const mostBookedEvents = await this.GetMostBookedEvents();
    const highestRevenueEvents = await this.GetHighestRevenueEvents();
    const eventDetailList = await this.GetEventDetailList();
    return {
      evenNum: eventNum,
      mostBooked: mostBookedEvents,
      highestRevenue: highestRevenueEvents,
      detail: eventDetailList,
    };
  }
}
