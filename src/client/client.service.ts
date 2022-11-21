import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { ClientEntity } from './entities/client.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientService {
	constructor(
		@InjectRepository(ClientEntity)
		private clientRepository: Repository<ClientEntity>,
	) {}

  async getAllClient() {
    return await this.clientRepository.find();
  }
  
  async getClient(email : string) {
    let client = await this.getClientByEmail(email);
    if (!client) {
      console.log(`GetClient : Client with email ${email} do not exist`);
      throw new NotFoundException("No client found with this email", {cause: new Error(), description: 'No client found' });
    }
    return client; 
  }

  async createClient(data : CreateClientDto) {
    let exist = await this.getClientByEmail(data.email);
    if (exist) {
      console.log(`CLient ${exist.firstName} ${exist.lastName}, with email '${exist.email}' already exist`);
      throw new ConflictException("This email already exist", {cause: new Error(), description: 'Duplicate e-mail' })
    }
    return await this.clientRepository.save(data);
  }

  async updateClient(data: UpdateClientDto) {
    let client = await this.getClientByEmail(data.emailRequestor);
    if (!client)
      throw new NotFoundException("No client found with this email", {cause: new Error(), description: 'No client found' });
    if (data.email && data.email != data.emailRequestor && await this.getClientByEmail(data.email)) {
      console.log(`Email '${data.email}' already exist`);
      throw new ConflictException("This email already exist", {cause: new Error(), description: 'e-mail already exist' })
    }
    if (data.firstName)
      client.firstName = data.firstName;
    if (data.lastName)
      client.lastName = data.lastName;
    if (data.email)
      client.email = data.email;
    if (data.phone)
      client.phone = data.phone;
    if (data.birthDate)
      client.birthDate = data.birthDate;
    if (data.nationality)
      client.nationality = data.nationality;
    return await this.clientRepository.save(client);
  }
  
  async deleteClient(emailClient: string) {
    let client = await this.getClientByEmail(emailClient);
    if (!client)
      throw new NotFoundException("No client found with this email", {cause: new Error(), description: 'No client found' });
    return await this.clientRepository.remove(client);
  }

  async getClientByEmail(email: string, relations?: any) {
    let params:  any;
		if (relations) 
      params = { where: { email: email }, relations: relations };
		else 
      params = { where: { email: email } };
    let client = await this.clientRepository.findOne(params);
    if (!client)
      return null;
    return client;
  }
}