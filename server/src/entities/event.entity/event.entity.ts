import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import Event_Eventcategory from '../event_eventCategory.entity';
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

  @OneToMany(
    () => Event_Eventcategory,
    (event_Category) => event_Category.event,
  )
  eventCategories: string[];

  @OneToMany(() => Booking, (booking) => booking.event, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  bookings: string[];

  @OneToMany(() => Seat, (seat) => seat.event, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  seats: string[];

  @OneToMany(() => SeatType, (seatType) => seatType.event, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  seatTypes: string[];
}
