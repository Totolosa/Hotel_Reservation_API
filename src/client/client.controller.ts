import { Controller, Post, Body, Patch } from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

	@Post('register')
	async createClient(@Body() data: CreateClientDto) {
		return await this.clientService.createClient(data);
	}

	@Patch('update')
	async updateClient(@Body() data: UpdateClientDto) {
		return await this.clientService.updateClient(data);
	}
}
