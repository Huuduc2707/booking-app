import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import EventInfo from '../event/event.dto';
import BookingInfo from '../booking/booking.dto';
import Seat from '../../entities/seat.entity/seat.entity';
import * as util from '../../utility';

@Injectable()
export class SeatService {
  constructor(
    @InjectRepository(Seat)
    private readonly seatRepo: Repository<Seat>,
  ) {}

  async AddSeat(evenInfo: EventInfo, eventId: string, seatTypeId: string[]) {
    const { seatType } = evenInfo;
    const seats: Seat[] = [];
    let index = 0;
    for (const ele of seatType) {
      for (let i = 0; i < ele.quantity; i++) {
        seats.push(
          this.seatRepo.create({
            id: util.IdGenerator('S'),
            status: 'Available',
            event: eventId,
            seatType: seatTypeId[index],
          }),
        );
      }
      ++index;
    }
    await this.seatRepo.save(seats);
  }

  GetSeat(eventId: string) {
    return this.seatRepo
      .createQueryBuilder('seat')
      .select(['seat.id', 'seat.status', 'seatType.name', 'seatType.price'])
      .leftJoin('seat.event', 'event')
      .leftJoin('seat.seatType', 'seatType')
      .where('event.id=:id', { id: eventId })
      .getMany();
  }

  async CheckBookingStatus(bookingInfo: BookingInfo) {
    const { event, seats } = bookingInfo;
    const isBookedCounter = await this.seatRepo
      .createQueryBuilder('seat')
      .select('bookingId')
      .where(
        'id IN (:...seats) AND (bookingId IS NOT NULL OR eventId != :event)',
        {
          seats: [...seats],
          event: event,
        },
      )
      .getCount();
    return isBookedCounter === 0;
  }

  async UpdateBookingStatus(bookingInfo: BookingInfo, bookingId: string) {
    const { seats } = bookingInfo;
    await this.seatRepo
      .createQueryBuilder()
      .update('seat')
      .set({ status: 'Booked', booking: bookingId })
      .where('id IN (:...seats)', { seats: [...seats] })
      .execute();
  }
}
