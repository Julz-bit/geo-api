import { Module } from '@nestjs/common';
import { GeoInfoService } from './geo-info.service';
import { GeoInfoController } from './geo-info.controller';
import { PrismaService } from '../prisma.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [
    GeoInfoService,
    PrismaService
  ],
  controllers: [GeoInfoController],
  exports: [GeoInfoService]
})
export class GeoInfoModule { }
