import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import Event_Eventcategory from '../event_eventCategory.entity';

@Entity()
export default class EventCategory {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @OneToMany(
    () => Event_Eventcategory,
    (eventCategories) => eventCategories.category,
  )
  eventCategories: string[];
}
