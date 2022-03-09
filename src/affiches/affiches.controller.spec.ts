import { Test, TestingModule } from '@nestjs/testing';
import { AffichesController } from './affiches.controller';
import { AffichesService } from './affiches.service';

describe('AffichesController', () => {
  let controller: AffichesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AffichesController],
      providers: [AffichesService],
    }).compile();

    controller = module.get<AffichesController>(AffichesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
