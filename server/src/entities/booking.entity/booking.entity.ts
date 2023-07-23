import { Entity, Column, PrimaryColumn, ManyToOne, OneToMany } from 'typeorm';
import Event from '../event.entity/event.entity';
import Seat from '../seat.entity/seat.entity';

@Entity()
export default class Booking {
  @PrimaryColumn()
  id: string;

  @Column()
  fullName: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  totalPayment: number;

  @ManyToOne(() => Event, (event) => event.bookings, { onDelete: 'CASCADE' })
  event: Event;

  @OneToMany(() => Seat, (seat) => seat.booking)
  seats: Seat[];
}
