import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) { }

    async findOne(username: string): Promise<User | undefined> {
        return await this.prisma.user.findUnique({
            where: { username }
        })
    }
}
