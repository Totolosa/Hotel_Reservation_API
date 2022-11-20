import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateRoomDto {
	@IsNumber()
	@IsNotEmpty()
	number: string;

	@IsNumber()
	@IsNotEmpty()
	area: string;
	
	@IsNumber()
	@IsNotEmpty()
	price: string;
}