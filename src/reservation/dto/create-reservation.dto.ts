import { IsEmail, IsNotEmpty, IsNumber } from "class-validator";
import { Type } from "class-transformer";

export class CreateReservationDto {
	@IsEmail()
	@IsNotEmpty()
	clientEmail: string;
	
	@IsNumber()
	@IsNotEmpty()
	@Type(() => Number)
	roomId: number;
}