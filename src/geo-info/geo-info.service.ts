import { HttpService } from '@nestjs/axios';
import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { firstValueFrom } from 'rxjs';
import { GeoInfo } from '@prisma/client';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GeoInfoService {
    constructor(
        private readonly configService: ConfigService,
        private readonly httpService: HttpService,
        private readonly prisma: PrismaService
    ) { }

    async create(userId: string, ip: string) {
        const httpEndPoint = ip === '127.0.0.1' ?
            `${this.configService.get<string>('IP_INFO_ENDPOINT')}/json?token=${this.configService.get<string>('IP_INFO_TOKEN')}` :
            `${this.configService.get<string>('IP_INFO_ENDPOINT')}/${ip}?token=${this.configService.get<string>('IP_INFO_TOKEN')}`;
        try {
            const response = await firstValueFrom(this.httpService.get(httpEndPoint))
            const payload = response.data
            console.log(payload)
            const { hostname, ...rest } = payload
            return await this.prisma.geoInfo.create({
                data: {
                    userId: userId,
                    ...rest
                }
            })
        } catch (error) {
            console.log(error)
            throw new UnprocessableEntityException('something went wrong')
        }
    }

    async find(userId: string): Promise<GeoInfo[] | []> {
        return await this.prisma.geoInfo.findMany({
            where: { userId }
        })
    }

    async findOne(id: string): Promise<GeoInfo> {
        const geoInfo = await this.prisma.geoInfo.findUnique({
            where: { id }
        })
        if (!geoInfo) throw new NotFoundException('Geo Info not found!')
        return geoInfo
    }

    async remove(ids: string[]) {
        return await this.prisma.geoInfo.deleteMany({
            where: {
                id: {
                    in: ids
                }
            }
        })
    }
}
