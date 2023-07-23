import { Entity, Column, PrimaryColumn, ManyToOne, OneToMany } from 'typeorm';
import Event from '../event.entity/event.entity';
import Seat from '../seat.entity/seat.entity';

@Entity()
export default class SeatType {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  price: number;

  @ManyToOne(() => Event, (event) => event.seatTypes)
  event: Event;

  @OneToMany(() => Seat, (seat) => seat.seatType)
  seats: Seat[];
}
