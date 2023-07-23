import { Test, TestingModule } from '@nestjs/testing';
import { SeatTypeService } from './seat-type.service';

describe('SeatTypeService', () => {
  let service: SeatTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SeatTypeService],
    }).compile();

    service = module.get<SeatTypeService>(SeatTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
