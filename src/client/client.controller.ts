import { Controller, Post, Body, Patch, Get, Param, Delete } from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

	@Get('/:email')
	async getClient(@Param('email') email: string) {
		return await this.clientService.getClient(email);
	}

	@Post()
	async createClient(@Body() data: CreateClientDto) {
		return await this.clientService.createClient(data);
	}

	@Patch()
	async updateClient(@Body() data: UpdateClientDto) {
		return await this.clientService.updateClient(data);
	}
	
	@Delete('/:email')
	async deleteClient(@Param('email') email: string) {
		return await this.clientService.deleteClient(email);
	}
}
