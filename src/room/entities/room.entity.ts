import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToOne, JoinColumn } from "typeorm";
import TimestampEntites from "../../generics/timestamp.enties";
import { ClientEntity } from "../../client/entities/client.entity";
import { ApartmentEntity } from "../../apartment/entities/apartment.entity";

@Entity('room')
export class RoomEntity extends TimestampEntites {
  @PrimaryGeneratedColumn()
	id: number;

	@Column()
	number: number;

	@Column()
	area: number;

	@Column()
	price: number;

	@OneToOne((type) => ClientEntity, (client) => client.reservation, {
		nullable: true,
		onDelete: 'SET NULL',
	})
	reservation: ClientEntity;

	@ManyToOne((type) => ApartmentEntity, (apart) => apart.rooms, {
		cascade: true,
		onDelete: 'CASCADE',
	})
  @JoinColumn()
	apart: ApartmentEntity;
}