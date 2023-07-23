import { Test, TestingModule } from '@nestjs/testing';
import { SeatTypeController } from './seat-type.controller';

describe('SeatTypeController', () => {
  let controller: SeatTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SeatTypeController],
    }).compile();

    controller = module.get<SeatTypeController>(SeatTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
