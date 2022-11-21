import { Type } from "class-transformer";
import {IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateApartmentDto {
	@IsNumber()
	@IsNotEmpty()
	@Type(() => Number)
	id: number;
	
	@IsString()
	@IsOptional()
	name: string;

	@IsString()
	@IsOptional()
	street: string;
	
	@IsNumber()
	@IsOptional()
	@Type(() => Number)
	zipCode: number;
	
	@IsString()
	@IsOptional()
	city: string;
}