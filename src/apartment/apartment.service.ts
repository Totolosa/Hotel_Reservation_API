import { ConflictException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { ApartmentEntity } from './entities/apartment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateApartmentDto } from './dto/create-apartment.dto';
import { UpdateApartmentDto } from './dto/update-apartment.dto';

@Injectable()
export class ApartmentService {
	constructor(
		@InjectRepository(ApartmentEntity)
		private apartRepository: Repository<ApartmentEntity>,
	) {}

  async getAllApartments() {
    return await this.apartRepository.find();
  }
  
  async getApartment(id : number) {
    let apartment = await this.getApartmentById(id);
    if (!apartment) {
      console.log(`GetApartment : Apartment with id ${id} do not exist`);
      throw new NotFoundException("No apartment found with this id", {cause: new Error(), description: 'No apartment found' });
    }
    return apartment; 
  }

  async createApartment(data : CreateApartmentDto) {
    return await this.apartRepository.save(data);
  }

  async updateApartment(data: UpdateApartmentDto) {
    let apartment = await this.getApartmentById(data.id);
    if (!apartment) {
      console.log(`UpdateApartment : Apartment with id ${data.id} do not exist`);
      throw new NotFoundException("No apartment found with this id", {cause: new Error(), description: 'No apartment found' });
    }   
    if (data.name)
      apartment.name = data.name;
    if (data.street)
      apartment.street = data.street;
    if (data.zipCode)
      apartment.zipCode = data.zipCode;
    if (data.city)
      apartment.city = data.city;
    return await this.apartRepository.save(apartment);
  }
  
  async deleteApartment(id: number) {
    let apartment = await this.getApartmentById(id);
    if (!apartment)
      throw new NotFoundException("No apartment found with this id", {cause: new Error(), description: 'No apartment found' });
    return await this.apartRepository.remove(apartment);
  }

  async getApartmentById(id: number, relations? : any) {
    let params:  any;
		if (relations) 
      params = { where: { id: id }, relations: relations };
		else 
      params = { where: { id: id } };
    let apartment = await this.apartRepository.findOne(params);
    if (!apartment)
      return null;
    return apartment;
  }
}