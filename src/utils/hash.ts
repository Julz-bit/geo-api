import * as bcrypt from 'bcrypt';

export class Hash {
    private static async generateSalt(rounds: number): Promise<string> {
        return bcrypt.genSalt(rounds);
    }

    static async password(rawPassword: string): Promise<string> {
        const salt = await this.generateSalt(10);
        return bcrypt.hash(rawPassword, salt);
    }

    static async compare(rawPassword: string, password: string): Promise<Boolean> {
        return await bcrypt.compare(rawPassword, password);
    }
}