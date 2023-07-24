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
      ...bookingInfo,
    });
    await this.bookingRepo.save(booking);
    return bookingId;
  }
}
