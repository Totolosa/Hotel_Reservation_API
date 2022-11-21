import { Type } from "class-transformer";
import {IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateApartmentDto {
	@IsString()
	@IsNotEmpty()
	name: string;

	@IsString()
	@IsNotEmpty()
	street: string;
	
	@IsNumber()
	@IsNotEmpty()
	@Type(() => Number)
	zipCode: number;
	
	@IsString()
	@IsNotEmpty()
	city: string;
}