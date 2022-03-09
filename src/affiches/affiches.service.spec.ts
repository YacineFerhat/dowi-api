import { Test, TestingModule } from '@nestjs/testing';
import { AffichesService } from './affiches.service';

describe('AffichesService', () => {
  let service: AffichesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AffichesService],
    }).compile();

    service = module.get<AffichesService>(AffichesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
