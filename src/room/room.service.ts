import { ConflictException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { RoomEntity } from './entities/room.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

@Injectable()
export class RoomService {
	constructor(
		@InjectRepository(RoomEntity)
		private roomRepository: Repository<RoomEntity>,
	) {}

  // async getRoom(id : string) {
  //   let client = await this.getRoomByEmail(id);
  //   if (!client) {
  //     console.log(`GetRoom : Room with id ${id} do not exist`);
  //     throw new NotFoundException("No room found with this id", {cause: new Error(), description: 'No room found' });
  //   }
  //   return client; 
  // }

  // async createRoom(data : CreateRoomDto) {
  //   let exist = await this.getRoomByEmail(data.email);
  //   if (exist) {
  //     console.log(`Room ${exist.firstName} ${exist.lastName}, with email '${exist.email}' already exist`);
  //     throw new ConflictException("This email already exist", {cause: new Error(), description: 'Duplicate e-mail' })
  //   }
  //   return await this.clientRepository.save(data);
  // }

  // async updateRoom(data: UpdateRoomDto) {
  //   let client = await this.getRoomByEmail(data.emailRequestor);
  //   if (!client)
  //     throw new NotFoundException("No room found with this email", {cause: new Error(), description: 'No room found' });
  //   if (data.email && data.email != data.emailRequestor && await this.getRoomByEmail(data.email)) {
  //     console.log(`Email '${data.email}' already exist`);
  //     throw new ConflictException("This email already exist", {cause: new Error(), description: 'e-mail already exist' })
  //   }
  //   if (data.firstName)
  //     client.firstName = data.firstName;
  //   if (data.lastName)
  //     client.lastName = data.lastName;
  //   if (data.email)
  //     client.email = data.email;
  //   if (data.phone)
  //     client.phone = data.phone;
  //   if (data.birthDate)
  //     client.birthDate = data.birthDate;
  //   if (data.nationality)
  //     client.nationality = data.nationality;
  //   return await this.clientRepository.save(client);
  // }
  
  // async deleteRoom(emailRoom: string) {
  //   let client = await this.getRoomByEmail(emailRoom);
  //   if (!client)
  //     throw new NotFoundException("No room found with this email", {cause: new Error(), description: 'No room found' });
  //   return await this.clientRepository.remove(client);
  // }

  // async getRoomByEmail(email: string) {
  //   let client = await this.clientRepository.findOne({
  //     where: { email: email }
  //   });
  //   if (!client)
  //     return null;
  //   return client;
  // }


}