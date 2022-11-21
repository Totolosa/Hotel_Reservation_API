import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ClientModule } from './client/client.module';
import { ApartmentModule } from './apartment/apartment.module';
import { RoomModule } from './room/room.module';
import { ReservationModule } from './reservation/reservation.module';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity.{js,ts}'],
      synchronize: true,
    }),
    ClientModule,
    ApartmentModule,
    RoomModule,
    ReservationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

