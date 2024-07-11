import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { GeoInfoService } from './geo-info.service';
import { GeoInfoDto } from './dto/geo-info.dto';
import { Auth } from '../auth/auth-decorator';
import { User } from '@prisma/client';
import { AuthGuard } from '../auth/auth.guard';

@Controller('api/geo-info')
export class GeoInfoController {
    constructor(private readonly geoInfoService: GeoInfoService) { }

    @Post()
    @UseGuards(AuthGuard)
    async create(@Body() body: GeoInfoDto, @Auth() user: User) {
        return await this.geoInfoService.create(user.id, body.ip)
    }

    @Get()
    @UseGuards(AuthGuard)
    async find(@Auth() user: User) {
        return await this.geoInfoService.find(user.id)
    }

    @Get(':id')
    @UseGuards(AuthGuard)
    async finOne(@Param('id') id: string) {
        return await this.geoInfoService.findOne(id)
    }

    @Delete()
    @UseGuards(AuthGuard)
    async remove(@Query('ids') ids: string) {
        const selectedIds = ids.split(',').map(id => id.trim());
        return await this.geoInfoService.remove(selectedIds)
    }
}
