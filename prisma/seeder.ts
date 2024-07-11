import { PrismaClient } from "@prisma/client";
import { Hash } from "../src/utils/hash";

const prisma = new PrismaClient()

async function main() {
    const user = await prisma.user.upsert({
        where: { username: 'user@dev' },
        update: {},
        create: {
            username: 'user@dev',
            password: await Hash.password('asdqwe123'),
        }
    })
    console.log(user)
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })