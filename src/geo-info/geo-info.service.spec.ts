import { Test, TestingModule } from '@nestjs/testing';
import { GeoInfoService } from './geo-info.service';

describe('GeoInfoService', () => {
  let service: GeoInfoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GeoInfoService],
    }).compile();

    service = module.get<GeoInfoService>(GeoInfoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
