import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    console.log(`Salut gros`)
    return 'Hello Mr Nestor!';
  }
}
