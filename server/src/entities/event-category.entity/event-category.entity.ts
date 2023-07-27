import { Entity, Column, PrimaryColumn, ManyToOne } from 'typeorm';
import Event_Eventcategory from '../event_eventCategory.entity';

@Entity()
export default class EventCategory {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @ManyToOne(
    () => Event_Eventcategory,
    (eventCategories) => eventCategories.category,
  )
  eventCategories: string[];
}
