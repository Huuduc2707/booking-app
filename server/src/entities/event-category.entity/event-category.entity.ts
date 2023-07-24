import { Entity, Column, PrimaryColumn, ManyToMany } from 'typeorm';
import Event from '../event.entity/event.entity';

@Entity()
export default class EventCategory {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @ManyToMany(() => Event, (event) => event.eventCategories)
  events: string[];
}
