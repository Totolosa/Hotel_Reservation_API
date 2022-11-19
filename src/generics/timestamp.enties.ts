/* eslint-disable @typescript-eslint/no-unused-vars */
import { CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

export default class TimestampEntites {
	@CreateDateColumn({
		update: false,
	})
	createdAt: Date;

	@UpdateDateColumn({
		nullable: true,
	})
	updatedAt: Date;

	@DeleteDateColumn({
		update: false,
		nullable: true,
	})
	deletedAt: Date;
}
