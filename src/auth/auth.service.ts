import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { GeoInfoService } from '../geo-info/geo-info.service';
import { AuthDto } from './dto/auth.dto';
import { Hash } from '../utils/hash';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UsersService,
        private readonly geoInfoService: GeoInfoService
    ) { }

    async signIn(authDto: AuthDto, ip: string): Promise<{ token: string, message: string }> {
        //validate user
        const user = await this.userService.findOne(authDto.username)
        //validate creds
        if (!user || !(await Hash.compare(authDto.password, user.password))) throw new BadRequestException('Invalid Credentials')
        //destructure user get only needed properties
        const { id, created_at, updated_at, ...rest } = user
        const payload = { sub: id, ...rest }
        const token = await this.jwtService.signAsync(payload)
        await this.geoInfoService.create(user.id, ip)
        return { token, message: 'Login Succes' }
    }
}