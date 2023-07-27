import { Entity, PrimaryColumn, ManyToOne } from 'typeorm';
import Event from './event.entity/event.entity';
import EventCategory from './event-category.entity/event-category.entity';

@Entity()
export default class Event_Eventcategory {
  @PrimaryColumn()
  id: string;

  @ManyToOne(() => Event, (event) => event.eventCategories)
  event: string;

  @ManyToOne(
    () => EventCategory,
    (eventCategory) => eventCategory.eventCategories,
  )
  category: string;
}
