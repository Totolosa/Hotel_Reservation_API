import { IsNotEmpty, IsNumber, IsEmail, IsOptional } from "class-validator";
export class UpdateRoomDto {
	@IsEmail()
	@IsNotEmpty()
	emailRequestor: string;
	
	@IsNumber()
	@IsOptional()
	number: string;

	@IsNumber()
	@IsOptional()
	area: string;
	
	@IsNumber()
	@IsOptional()
	price: string;
}