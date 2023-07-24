import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import EventInfo from '../event/event.dto';
import Seat from '../../entities/seat.entity/seat.entity';
import * as util from '../../utility';

@Injectable()
export class SeatService {
  constructor(
    @InjectRepository(Seat)
    private readonly seatRepo: Repository<Seat>,
  ) {}

  async AddSeat(evenInfo: EventInfo, eventId: string, seatTypeId: string[]) {
    const { seatType } = evenInfo;
    const seats: Seat[] = [];
    let index = 0;
    for (const ele of seatType) {
      for (let i = 0; i < ele.quantity; i++) {
        seats.push(
          this.seatRepo.create({
            id: util.IdGenerator('S'),
            status: 'available',
            event: eventId,
            seatType: seatTypeId[index],
          }),
        );
      }
      ++index;
    }
    await this.seatRepo.save(seats);
  }
}
