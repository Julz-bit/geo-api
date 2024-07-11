import { Test, TestingModule } from '@nestjs/testing';
import { GeoInfoController } from './geo-info.controller';

describe('GeoInfoController', () => {
  let controller: GeoInfoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GeoInfoController],
    }).compile();

    controller = module.get<GeoInfoController>(GeoInfoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
