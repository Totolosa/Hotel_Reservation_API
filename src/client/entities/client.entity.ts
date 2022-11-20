import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import TimestampEntites from "../../generics/timestamp.enties";
import { RoomEntity } from "../../room/entities/room.entity";


@Entity('client')
export class ClientEntity extends TimestampEntites {
  @PrimaryGeneratedColumn()
	id: number;

	@Column()
	firstName: string;

	@Column()
	lastName: string;

	@Column({
    unique: true
  })
	email: string;

	@Column( {
		nullable: true,
	})
	phone: string;

	@Column({
		nullable: true,
	})
	birthDate: string;

	@Column({
		nullable: true,
	})
	nationality: string;

	@OneToOne((type) => RoomEntity, (room) => room.reservation)
	reservation: RoomEntity;
}