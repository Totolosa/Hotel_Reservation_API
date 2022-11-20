import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import TimestampEntites from "../../generics/timestamp.enties";
import { RoomEntity } from "../../room/entities/room.entity";

@Entity('apartment')
export class ApartmentEntity extends TimestampEntites {
  @PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	street: string;

	@Column()
	zipCode: number;

	@Column()
	city: string;

	@OneToMany((type) => RoomEntity, (room) => room.apart)
	rooms: RoomEntity[];
}