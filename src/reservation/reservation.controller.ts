import { Controller, Post, Body, Patch, Get, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { RoomService } from './room.service';

@Controller('reservation')
export class ReservationController {
  constructor(private readonly roomService: RoomService) {}

	@Get('/all')
	async getAllRooms() {
		return await this.roomService.getAllRooms();
	}

	@Get('/:id')
	async getRoom(@Param('id', ParseIntPipe) id: number) {
		return await this.roomService.getRoom(id);
	}

	@Post()
	async createRoom(@Body() data: CreateRoomDto) {
		return await this.roomService.createRoom(data);
	}

	@Patch()
	async updateRoom(@Body() data: UpdateRoomDto) {
		return await this.roomService.updateRoom(data);
	}
	
	@Delete('/:id')
	async deleteRoom(@Param('id', ParseIntPipe) id: number) {
		return await this.roomService.deleteRoom(id);
	}
}