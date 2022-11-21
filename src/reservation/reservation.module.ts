import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientEntity } from 'src/client/entities/client.entity';
import { RoomEntity } from 'src/room/entities/room.entity';
import { ReservationController } from './reservation.controller';
import { ReservationService } from './reservation.service';

@Module({
  imports: [
		TypeOrmModule.forFeature([
			RoomEntity, 
			ClientEntity,
		]),
	],
  controllers: [ReservationController],
  providers: [ReservationService]
})
export class ReservationModule {}
