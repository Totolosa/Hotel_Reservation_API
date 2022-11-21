import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApartmentService } from '../apartment/apartment.service';
import { ApartmentEntity } from '../apartment/entities/apartment.entity';
import { RoomEntity } from './entities/room.entity';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';

@Module({
  imports: [
		TypeOrmModule.forFeature([
			RoomEntity, 
			ApartmentEntity,
		]),
	],
  controllers: [RoomController],
  providers: [RoomService, ApartmentService]
})
export class RoomModule {}
