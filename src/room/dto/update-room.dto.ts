import { IsNotEmpty, IsNumber, IsEmail, IsOptional } from "class-validator";
import { Type } from "class-transformer";
export class UpdateRoomDto {
	@IsNumber()
	@IsNotEmpty()
	@Type(() => Number)
	id: number;
	
	@IsNumber()
	@IsOptional()
	@Type(() => Number)
	number: number;
	
	@IsNumber()
	@IsOptional()
	@Type(() => Number)
	area: number;
	
	@IsNumber()
	@IsOptional()
	@Type(() => Number)
	price: number;
}