import { Controller, Post, Body, Patch, Get, Param, Delete } from '@nestjs/common';
import { ApartmentService } from './apartment.service';
// import { CreateRoomDto } from './dto/create-room.dto';
// import { UpdateRoomDto } from './dto/update-room.dto';
// import { RoomService } from './room.service';

@Controller('apartment')
export class ApartmentController {
  constructor(private readonly roomService: ApartmentService) {}

	// @Get('/:id')
	// async getRoom(@Param('email') email: string) {
	// 	return await this.roomService.getRoom(email);
	// }

	// @Post()
	// async createRoom(@Body() data: CreateRoomDto) {
	// 	return await this.roomService.createRoom(data);
	// }

	// @Patch()
	// async updateRoom(@Body() data: UpdateRoomDto) {
	// 	return await this.roomService.updateRoom(data);
	// }
	
	// @Delete('/:id')
	// async deleteRoom(@Param('email') email: string) {
	// 	return await this.roomService.deleteRoom(email);
	// }
}