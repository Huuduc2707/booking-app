import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import BookingInfo from './booking.dto';
import Booking from '../../entities/booking.entity/booking.entity';
import * as util from '../../utility';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepo: Repository<Booking>,
  ) {}

  async AddBooking(bookingInfo: BookingInfo) {
    const bookingId = util.IdGenerator('B');
    const booking = this.bookingRepo.create({
      id: bookingId,
      fullName: bookingInfo.fullName,
      phone: bookingInfo.phone,
      email: bookingInfo.email,
      totalPayment: bookingInfo.totalPayment,
      event: bookingInfo.event,
      seats: bookingInfo.seatIds,
    });
    await this.bookingRepo.save(booking);
    return bookingId;
  }

  async GetBooking(email: string) {
    return await this.bookingRepo
      .createQueryBuilder('booking')
      .select([])
      .addSelect('booking.id', 'id')
      .addSelect('booking.fullName', 'fullName')
      .addSelect('booking.phone', 'phone')
      .addSelect('booking.email', 'email')
      .addSelect('booking.totalPayment', 'totalPayment')
      .addSelect('booking.eventId', 'eventId')
      .where('booking.email=:email', { email: email })
      .getRawMany();
  }
}
