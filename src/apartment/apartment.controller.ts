import { Controller, Post, Body, Patch, Get, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ApartmentService } from './apartment.service';
import { CreateApartmentDto } from './dto/create-apartment.dto';
import { UpdateApartmentDto } from './dto/update-apartment.dto';

@Controller('apartment')
export class ApartmentController {
  constructor(private readonly apartService: ApartmentService) {}

	@Get('/all')
	async getAllApartments() {
		return await this.apartService.getAllApartments();
	}

	@Get('/:id')
	async getApartment(@Param('id', ParseIntPipe) id: number) {
		return await this.apartService.getApartment(id);
	}

	@Post()
	async createApartment(@Body() data: CreateApartmentDto) {
		return await this.apartService.createApartment(data);
	}

	@Patch()
	async updateApartment(@Body() data: UpdateApartmentDto) {
		return await this.apartService.updateApartment(data);
	}
	
	@Delete('/:id')
	async deleteApartment(@Param('id', ParseIntPipe) id: number) {
		return await this.apartService.deleteApartment(id);
	}
}