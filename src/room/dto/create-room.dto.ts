import { IsNotEmpty, IsNumber } from "class-validator";
import { Type } from "class-transformer";

export class CreateRoomDto {
	@IsNumber()
	@IsNotEmpty()
	@Type(() => Number)
	number: number;
	
	@IsNumber()
	@IsNotEmpty()
	@Type(() => Number)
	area: number;
	
	@IsNumber()
	@IsNotEmpty()
	@Type(() => Number)
	price: number;
	
	@IsNumber()
	@IsNotEmpty()
	@Type(() => Number)
	idApartment: number;
}