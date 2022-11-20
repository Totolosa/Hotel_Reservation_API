import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { ValidationPipe } from '@nestjs/common';
import { send } from 'process';

describe('client', () => {
  let app: INestApplication;

  const createClientDtoWrong = {
    firstName: 'Chez',
    lastName: 'Nestor',
    email: 'not a email',
    phone: 'not a number',
    birthDate: 'not a date',
    nationality: 'FR',
    test: 'not a required variable'
  }
  const createClientDto1 = {
    firstName: 'Chez',
    lastName: 'Nestor',
    email: 'chez.nestor@gmail.com',
    phone: '0606060606',
    birthDate: '1900-01-01',
    nationality: 'FR',
  }
  const createClientDto2 = {
    firstName: 'Toto',
    lastName: 'Tata',
    email: 'toto.tata@gmail.com',
    phone: '0707070707',
    birthDate: '2000-12-12',
    nationality: 'ES',
  }
  const updateClientDtoWrong1 = {
    emailRequestor: 'not a email',
    firstName: 'Chez',
    lastName: 'Nestor',
    email: 'not a email',
    phone: 'not a number',
    birthDate: 'not a date',
    nationality: 'FR',
    test: 'not a required variable'
  }
  const updateClientDtoWrong2 = {
    emailRequestor: 'chez.gaspar@gmail.com',
    firstName: 'Gaspar',
  }
  const updateClientDtoWrong3 = {
    emailRequestor: 'chez.nestor@gmail.com',
    email: 'toto.tata@gmail.com',
  }
  const updateClientDto = {
    emailRequestor: 'chez.nestor@gmail.com',
    firstName: 'Une',
    lastName: 'Update',
    email: 'update@gmail.com',
    phone: '0808080808',
    birthDate: '1993-12-10',
    nationality: 'FR',
  }


  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }));
    app.setGlobalPrefix('api');
    await app.init();
  });

    // --------- POST ---------

  it('(POST) /client --> Error 400 : ValidationPipe', () => {
    return request(app.getHttpServer())
      .post('/api/client')
      .send(createClientDtoWrong)
      .expect(400)
  });

  it('(POST) /client 1 --> 201', () => {
    return request(app.getHttpServer())
      .post('/api/client')
      .send(createClientDto1)
      .expect(201)
  });

  it('(POST) /client 2 --> 201', () => {
    return request(app.getHttpServer())
      .post('/api/client')
      .send(createClientDto2)
      .expect(201)
  });

  it('(POST) /client --> Error 409 : Conflict', () => {
    return request(app.getHttpServer())
      .post('/api/client')
      .send(createClientDto1)
      .expect(409)
  });

  // --------- GET ---------

  it('(GET) /client/chez.nestor@gmail.com --> 200', () => {
    return request(app.getHttpServer())
      .get('/api/client/chez.nestor@gmail.com')
      .expect(200)
  });

  it('(GET) /client/all --> 200', () => {
    return request(app.getHttpServer())
      .get('/api/client/all')
      .expect(200)
  });

  it('(GET) /client/chez.gaspar@gmail.com --> Error 404 : Not found', () => {
    return request(app.getHttpServer())
      .get('/api/client/chez.gaspar@gmail.com')
      .expect(404)
  });

  // --------- PATCH ---------

  it('(PATCH) /client --> Error 400 : ValidationPipe', () => {
    return request(app.getHttpServer())
      .patch('/api/client/')
      .send(updateClientDtoWrong1)
      .expect(400)
  });

  it('(PATCH) /client --> Error 404 : Not found', () => {
    return request(app.getHttpServer())
      .patch('/api/client/')
      .send(updateClientDtoWrong2)
      .expect(404)
  });

  it('(PATCH) /client --> Error 409 : Conflict', () => {
    return request(app.getHttpServer())
      .patch('/api/client/')
      .send(updateClientDtoWrong3)
      .expect(409)
  });

  it('(PATCH) /client --> 200', () => {
    return request(app.getHttpServer())
      .patch('/api/client/')
      .send(updateClientDto)
      .expect(200)
  });

    // --------- DELETE ---------
  
  it('(DELETE) /client/chez.nestor@gmail.com --> Error 404 : Not found', () => {
    return request(app.getHttpServer())
      .delete('/api/client/chez.nestor@gmail.com')
      .expect(404)
  });

  it('(DELETE) /client/update@gmail.com 1 --> 200', () => {
    return request(app.getHttpServer())
      .delete('/api/client/update@gmail.com')
      .expect(200)
  });

  it('(DELETE) /client/toto.tata@gmail.com 2 --> 200', () => {
    return request(app.getHttpServer())
      .delete('/api/client/toto.tata@gmail.com')
      .expect(200)
  });
});
