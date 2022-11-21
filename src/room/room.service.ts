import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoomEntity } from './entities/room.entity';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { ApartmentService } from '../apartment/apartment.service';

@Injectable()
export class RoomService {
	constructor(
		@InjectRepository(RoomEntity)
		private roomRepository: Repository<RoomEntity>,
    private apartmentService: ApartmentService,
	) {}

  async getAllRooms() {
    return await this.roomRepository.find();
  }

  async getRoom(id : number) {
    let room = await this.getRoomById(id);
    if (!room) {
      console.log(`GetRoom : Room with id ${id} do not exist`);
      throw new NotFoundException("No room found with this id", {cause: new Error(), description: 'No room found' });
    }
    return room; 
  }

  async createRoom(data : CreateRoomDto) {
    let apartment = await this.apartmentService.getApartmentById(data.idApartment, {rooms: true});
    if (!apartment) {
      console.log(`CreateRoom : Apartment with id ${data.idApartment} do not exist`);
      throw new NotFoundException("No Apartment found with this id", {cause: new Error(), description: 'No apartment found' });
    }
    if (apartment.rooms.map(r => r.number).includes(data.number)) {
      console.log(`CreateRoom : Apartment with room number ${data.number} already exist`);
      throw new ConflictException("The room number already exist in this apartment", {cause: new Error(), description: 'Duplicate room number' })
    }
    let newRoom = this.roomRepository.create({
      number: data.number,
      area: data.area,
      price: data.price
    });
    newRoom.apart = apartment;
    return await this.roomRepository.save(newRoom);
  }

  async updateRoom(data: UpdateRoomDto) {
    let room = await this.getRoomById(data.id, {apart: {rooms: true}});
    if (!room)
      throw new NotFoundException("No room found with this id", {cause: new Error(), description: 'No room found' });
    if (room.apart.rooms.map(r => r.number).includes(data.number)) {
      console.log(`UpdateRoom : Apartment with room qnumber ${data.number} already exist`);
      throw new ConflictException("The room number already exist in this apartment", {cause: new Error(), description: 'Duplicate room number' })
    }
    if (data.number)
      room.number = data.number;
    if (data.area)
      room.area = data.area;
    if (data.price)
      room.price = data.price;
    return await this.roomRepository.save(room);
  }
  
  async deleteRoom(id: number) {
    let room = await this.getRoomById(id);
    if (!room)
      throw new NotFoundException("No room found with this id", {cause: new Error(), description: 'No room found' });
    return await this.roomRepository.remove(room);
  }

  async getRoomById(id: number, relations?: any) {
    let params:  any;
		if (relations) 
      params = { where: { id: id }, relations: relations };
		else 
      params = { where: { id: id } };
    let room = await this.roomRepository.findOne(params);
    if (!room)
      return null;
    return room;
  }
}