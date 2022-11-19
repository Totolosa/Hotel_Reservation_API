import { IsDateString, IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString } from "class-validator";

export class UpdateClientDto {
	@IsEmail()
	@IsNotEmpty()
	emailRequestor: string;
	
	@IsString()
	@IsOptional()
	firstName: string;

	@IsString()
	@IsOptional()
	lastName: string;
	
	@IsEmail()
	@IsOptional()
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