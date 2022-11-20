import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApartmentController } from './apartment.controller';
import { ApartmentService } from './apartment.service';
import { ApartmentEntity } from './entities/apartment.entity';

@Module({
  imports: [
		TypeOrmModule.forFeature([
			ApartmentEntity
		]),
	],
  controllers: [ApartmentController],
  providers: [ApartmentService]
})
export class ApartmentModule {}
