import { Entity, Column, PrimaryColumn, ManyToOne } from 'typeorm';
import Booking from '../booking.entity/booking.entity';
import Event from '../event.entity/event.entity';
import SeatType from '../seat-type.entity/seat-type.entity';

@Entity()
export default class Seat {
  @PrimaryColumn()
  id: string;

  @Column()
  status: string;

  @ManyToOne(() => Event, (event) => event.seats)
  event: Event;

  @ManyToOne(() => Booking, (booking) => booking.seats)
  booking: Booking;

  @ManyToOne(() => SeatType, (seatType) => seatType.seats)
  seatType: SeatType;
}
