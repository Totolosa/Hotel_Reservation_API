import { IsDateString, IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString } from "class-validator";

export class CreateClientDto {
	@IsString()
	@IsNotEmpty()
	firstName: string;

	@IsString()
	@IsNotEmpty()
	lastName: string;
	
	@IsEmail()
	@IsNotEmpty()
	email: string;
	
	@IsPhoneNumber('FR')
	@IsOptional()
	phone?: string;
	
	@IsDateString()
	@IsOptional()
	birthDate?: string;
	
	@IsString()
	@IsOptional()
	nationality?: string;
}