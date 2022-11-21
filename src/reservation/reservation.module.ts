import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApartmentService } from '../apartment/apartment.service';
import { ApartmentEntity } from '../apartment/entities/apartment.entity';
import { ClientService } from '../client/client.service';
import { ClientEntity } from '../client/entities/client.entity';
import { RoomEntity } from '../room/entities/room.entity';
import { RoomService } from '../room/room.service';
import { ReservationController } from './reservation.controller';
import { ReservationService } from './reservation.service';

@Module({
  imports: [
		TypeOrmModule.forFeature([
			RoomEntity, 
			ClientEntity,
      ApartmentEntity,
		]),
	],
  controllers: [ReservationController],
  providers: [ReservationService, ClientService, RoomService, ApartmentService]
})
export class ReservationModule {}
