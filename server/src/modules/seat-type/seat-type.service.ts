import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import EventInfo from '../event/event.dto';
import SeatType from '../../entities/seat-type.entity/seat-type.entity';
import * as util from '../../utility';

@Injectable()
export class SeatTypeService {
  constructor(
    @InjectRepository(SeatType)
    private readonly seatTypeRepo: Repository<SeatType>,
  ) {}

  async AddSeatType(eventInfo: EventInfo, eventId: string) {
    const { seatType } = eventInfo;
    const seatTypeId: string[] = [];
    for (const ele of seatType) {
      ele.id = util.IdGenerator('ST');
      ele.event = eventId;
      seatTypeId.push(ele.id);
    }
    await this.seatTypeRepo.save(seatType);
    return seatTypeId;
  }
}
