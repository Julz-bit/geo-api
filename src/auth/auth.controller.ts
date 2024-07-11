import { Body, Controller, Ip, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('api/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('signin')
    async signin(@Body() body: AuthDto, @Ip() ip: string) {
        if (ip === '::1') {
            ip = '127.0.0.1';
        }
        return await this.authService.signIn(body, ip);
    }
}
