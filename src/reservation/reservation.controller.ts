import { Controller, Post, Body, Patch, Get, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { ReservationService } from './reservation.service';

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

	@Get('/all')
	async getAllReservations() {
		return await this.reservationService.getAllReservations();
	}

	@Get('/client/:email')
	async getReservationByClient(@Param('email') email: string) {
		return await this.reservationService.getReservationByClient(email);
	}

	@Get('/room/:id')
	async getReservationByRoom(@Param('id', ParseIntPipe) id: number) {
		return await this.reservationService.getReservationByRoom(id);
	}

	@Post()
	async createReservation(@Body() data: CreateReservationDto) {
		return await this.reservationService.createReservation(data);
	}

	@Delete('/client/:email')
	async deleteReservationByClient(@Param('email') email: string) {
		return await this.reservationService.deleteReservationByClient(email);
	}

	@Delete('/room/:id')
	async deleteReservationByRoom(@Param('id', ParseIntPipe) id: number) {
		return await this.reservationService.deleteReservationByRoom(id);
	}
}