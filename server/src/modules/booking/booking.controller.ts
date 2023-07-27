import {
  Controller,
  Put,
  Get,
  Body,
  Res,
  ValidationPipe,
  Param,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { SeatService } from '../seat/seat.service';
import { EmailService } from '../../utility';
import { EventService } from '../event/event.service';
import BookingInfo from './booking.dto';
import { Response } from 'express';

@Controller('booking')
export class BookingController {
  constructor(
    private readonly bookingService: BookingService,
    private readonly seatService: SeatService,
    private readonly emailService: EmailService,
    private readonly eventService: EventService,
  ) {}

  @Put('add')
  async AddBooking(
    @Body(ValidationPipe) bookingInfo: BookingInfo,
    @Res() response: Response,
  ) {
    if (await this.seatService.CheckBookingStatus(bookingInfo)) {
      const bookingId = await this.bookingService.AddBooking(bookingInfo);
      await this.seatService.UpdateBookingStatus(bookingInfo, bookingId);
      await this.emailService.sendEmail(bookingInfo, bookingId);
      response.status(200).json({ message: 'Successful' });
    } else response.status(400).json({ error: 'Invalid booking' });
  }

  @Get('history/:email')
  async GetBooking(@Param('email') email: string, @Res() response: Response) {
    const bookingList = await this.bookingService.GetBooking(email);
    if (bookingList.length === 0) {
      response.status(404).json({ error: 'No booking found with this email' });
      return;
    }
    const rawEventList = [];
    const seatList = [];
    for (const booking of bookingList) {
      rawEventList.push(
        await this.eventService.GetEventDetails(booking.eventId),
      );
      seatList.push(await this.seatService.GetBookedSeat(booking.id));
    }
    const eventList = await this.eventService.AddInfoToEventList(rawEventList);
    response.status(200).json(
      bookingList.map((booking, index) => ({
        booking: booking,
        event: eventList[index],
        seat: seatList[index],
      })),
    );
  }
}
