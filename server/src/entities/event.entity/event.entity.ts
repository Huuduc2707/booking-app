import { Entity, Column, PrimaryColumn, ManyToMany, OneToMany } from 'typeorm';
import EventCategory from '../event-category.entity/event-category.entity';
import Booking from '../booking.entity/booking.entity';
import Seat from '../seat.entity/seat.entity';
import SeatType from '../seat-type.entity/seat-type.entity';

@Entity()
export default class Event {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  date: string;

  @Column()
  location: string;

  @Column()
  price: number;

  @Column()
  imageUrl: string;

  @ManyToMany(() => EventCategory, (eventCategory) => eventCategory.events)
  eventCategories: string[];

  @OneToMany(() => Booking, (booking) => booking.event)
  bookings: string[];

  @OneToMany(() => Seat, (seat) => seat.event)
  seats: string[];

  @OneToMany(() => SeatType, (seatType) => seatType.event)
  seatTypes: string[];
}
