import { Controller, Put, Body, Res, ValidationPipe } from '@nestjs/common';
import { BookingService } from './booking.service';
import { SeatService } from '../seat/seat.service';
import BookingInfo from './booking.dto';
import { Response } from 'express';

@Controller('booking')
export class BookingController {
  constructor(
    private readonly bookingService: BookingService,
    private readonly seatService: SeatService,
  ) {}

  @Put('add')
  async AddBooking(
    @Body(ValidationPipe) bookingInfo: BookingInfo,
    @Res() response: Response,
  ) {
    if (await this.seatService.CheckBookingStatus(bookingInfo)) {
      const bookingId = await this.bookingService.AddBooking(bookingInfo);
      await this.seatService.UpdateBookingStatus(bookingInfo, bookingId);
      response.status(200).json({ message: 'Successful' });
    } else response.status(400).json({ error: 'Invalid booking' });
  }
}
