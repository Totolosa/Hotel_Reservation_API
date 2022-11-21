import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import { RoomEntity } from '../room/entities/room.entity';
import { ClientEntity } from '../client/entities/client.entity';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { RoomService } from '../room/room.service';
import { ClientService } from '../client/client.service';


@Injectable()
export class ReservationService {
	constructor(
		@InjectRepository(RoomEntity)
		private roomRepository: Repository<RoomEntity>,
		@InjectRepository(ClientEntity)
		private clientRepository: Repository<ClientEntity>,
    private roomService: RoomService,
    private clientService: ClientService,
	) {}

  async getAllReservations() {
    return  await this.roomRepository.find({
      relations: {
        reservation: true,
      },
      where: {
        reservation: Not(IsNull())
      }
    });
  }

  async getReservationByClient(email : string) {
    let client = await this.clientRepository.findOne({
      relations: {
        reservation: true
      },
      where: {
        email: email,
      }
    });
    if (!client) {
      console.log(`GetReservationByClient : Client with email ${email} do not exist`);
      throw new NotFoundException("No client with this email", {cause: new Error(), description: 'No client found' });
    }
    if (!client.reservation) {
      console.log(`GetReservationByClient : Client with email ${email} do not have reservation`);
      throw new BadRequestException("This client do not have reservation", {cause: new Error(), description: 'No reservation found' });
    }
    return client; 
  }

  async getReservationByRoom(id : number) {
    let room = await this.roomRepository.findOne({
      relations: {
        reservation: true
      },
      where: {
        id: id,
      }
    });
    if (!room) {
      console.log(`GetReservationByRoom : Room with id ${id} do not exist`);
      throw new NotFoundException("No room with this id", {cause: new Error(), description: 'No room found' });
    }
    if (!room.reservation) {
      console.log(`GetReservationByRoom : Room with id ${id} do not have reservation`);
      throw new BadRequestException("This room do not have reservation", {cause: new Error(), description: 'No reservation found' });
    }
    return room; 
  }

  async createReservation(data : CreateReservationDto) {
    let room = await this.roomService.getRoomById(data.roomId, {reservation: true});
    if (!room) {
      console.log(`createReservation : Room with id ${data.roomId} do not exist`);
      throw new NotFoundException("No room found with this id", {cause: new Error(), description: 'No room found' });
    }
    let client = await this.clientService.getClientByEmail(data.clientEmail, {reservation: true});
    if (!client) {
      console.log(`createReservation : Client with email ${data.clientEmail} do not exist`);
      throw new NotFoundException("No client found with this email", {cause: new Error(), description: 'No client found' });
    }
    if (room.reservation) {
      console.log(`Room with id ${room.id} already have reservation`);
      throw new ConflictException("This room already have reservation", {cause: new Error(), description: 'Conflict reservation' })
    }
    if (client.reservation) {
      console.log(`Client with email ${client.email} already have reservation`);
      throw new ConflictException("This client already have reservation", {cause: new Error(), description: 'Conflict reservation' })
    }
    client.reservation = room;
    return await this.clientRepository.save(client);
  }
  

  async deleteReservationByClient(email : string) {
    let client = await this.clientRepository.findOne({
      relations: {
        reservation: true
      },
      where: {
        email: email,
      }
    });
    if (!client) {
      console.log(`GetReservationByClient : Client with email ${email} do not exist`);
      throw new NotFoundException("No client with this email", {cause: new Error(), description: 'No client found' });
    }
    if (!client.reservation) {
      console.log(`GetReservationByClient : Client with email ${email} do not have reservation`);
      throw new BadRequestException("This client do not have reservation", {cause: new Error(), description: 'No reservation found' });
    }
    client.reservation = null;
    return await this.clientRepository.save(client);
  }

  async deleteReservationByRoom(id : number) {
    let room = await this.roomRepository.findOne({
      relations: {
        reservation: true
      },
      where: {
        id: id,
      }
    });
    if (!room) {
      console.log(`GetReservationByRoom : Room with id ${id} do not exist`);
      throw new NotFoundException("No room with this id", {cause: new Error(), description: 'No room found' });
    }
    if (!room.reservation) {
      console.log(`GetReservationByRoom : Room with id ${id} do not have reservation`);
      throw new BadRequestException("This room do not have reservation", {cause: new Error(), description: 'No reservation found' });
    }
    room.reservation.reservation = null;
    await this.clientRepository.save(room.reservation);
    room.reservation = null;
    return await this.roomRepository.save(room);
  }
}