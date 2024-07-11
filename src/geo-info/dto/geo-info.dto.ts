import { IsIP, IsNotEmpty } from "class-validator";

export class GeoInfoDto {
    @IsNotEmpty()
    @IsIP()
    ip: string;
}