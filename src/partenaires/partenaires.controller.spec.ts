import { Test, TestingModule } from '@nestjs/testing';
import { PartenairesController } from './partenaires.controller';
import { PartenairesService } from './partenaires.service';

describe('PartenairesController', () => {
  let controller: PartenairesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PartenairesController],
      providers: [PartenairesService],
    }).compile();

    controller = module.get<PartenairesController>(PartenairesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
