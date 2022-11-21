import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { ValidationPipe } from '@nestjs/common';

describe('reservation', () => {
  let app: INestApplication;
  let apartId: number;
  let roomId: number;

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

  it('(POST) /apartment --> 201', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/apartment')
      .send({
        name: 'Le Prestige',
        street: 'Capitole',
        zipCode: '31000',
        city: 'Toulouse',
      });
      apartId = parseInt(response.body.id);
      expect(response.status).toEqual(201);
  });

  it('(POST) /room --> 201', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/room')
      .send({
        number: 1,
        area: 100,
        price: 999,
        idApartment: apartId,
      });
    roomId = parseInt(response.body.id);
    expect(response.status).toEqual(201);

  });

  it('(POST) /client --> 201', async () => {
    await request(app.getHttpServer())
      .post('/api/client')
      .send({
        firstName: 'Chez',
        lastName: 'Nestor',
        email: 'chez.nestor@gmail.com',
        phone: '0606060606',
        birthDate: '1900-01-01',
        nationality: 'FR',
      })
      .expect(201)
  });

  it('(POST) /reservation --> Error 400 : ValidationPipe', () => {
    return request(app.getHttpServer())
      .post('/api/reservation')
      .send({
        clientEmail: 'not an email',
        roomId: 'not a number',
      })
      .expect(400)
  });

  it('(POST) /reservation --> Error 404 : Not found', () => {
    return request(app.getHttpServer())
      .post('/api/reservation')
      .send({
        clientEmail: 'chez.gaspar@gmail.com',
        roomId: roomId,
      })
      .expect(404)
  });

  it('(POST) /reservation --> Error 404 : Not found', () => {
    return request(app.getHttpServer())
      .post('/api/reservation')
      .send({
        clientEmail: 'chez.nestor@gmail.com',
        roomId: roomId + 100,
      })
      .expect(404)
  });

  it('(POST) /reservation --> 201', () => {
    return request(app.getHttpServer())
      .post('/api/reservation')
      .send({
        clientEmail: 'chez.nestor@gmail.com',
        roomId: roomId,
      })
      .expect(201)
  });


  it('(POST) /reservation --> Error 409 --> Conflict', () => {
    return request(app.getHttpServer())
      .post('/api/reservation')
      .send({
        clientEmail: 'chez.nestor@gmail.com',
        roomId: roomId,
      })
      .expect(409)
  });

  // // --------- GET ---------

  it(`(GET) /reservation/client/chez.gaspar@gmail.com --> Error 404 : Not found`, () => {
    return request(app.getHttpServer())
      .get(`/api/reservation/client/chez.gaspar@gmail.com`)
      .expect(404)
  });
  
  it(`(GET) /reservation/room/${roomId + 100} --> Error 404 : Not found`, () => {    
    return request(app.getHttpServer())
      .get(`/api/reservation/room/${roomId + 100}`)
      .expect(404)
  });

  it(`(GET) /reservation/client/chez.nestor@gmail.com --> 200`, () => {
    return request(app.getHttpServer())
      .get(`/api/reservation/client/chez.nestor@gmail.com`)
      .expect(200)
  });
  
  it(`(GET) /reservation/room/${roomId} --> 200`, () => {    
    return request(app.getHttpServer())
      .get(`/api/reservation/room/${roomId}`)
      .expect(200)
  });

  it('(GET) /reservation/client/all --> 200', () => {
    return request(app.getHttpServer())
      .get('/api/reservation/all')
      .expect(200)
  });

    // --------- DELETE ---------
  
  it(`(DELETE) /reservation/client/chez.gaspar@hmail.com --> Error 404 : Not found`, () => {
    return request(app.getHttpServer())
      .delete(`/api/reservation/client/chez.gaspar@hmail.com`)
      .expect(404)
  });
  
  it(`(DELETE) /reservation/room/${roomId + 100} --> Error 404 : Not found`, () => {
    return request(app.getHttpServer())
      .delete(`/api/reservation/client/${roomId+ 100}`)
      .expect(404)
  });
  
  it(`(DELETE) /reservation/room/${roomId} --> 200`, () => {
    return request(app.getHttpServer())
      .delete(`/api/reservation/room/${roomId}`)
      .expect(200)
  });
  
  it(`(DELETE) /reservation/room/${roomId} --> Error 400, Bad request`, () => {
    return request(app.getHttpServer())
      .delete(`/api/reservation/room/${roomId}`)
      .expect(400)
  });

  it('(DELETE) /client/chez.nestor@gmail.com --> 200', () => {
    return request(app.getHttpServer())
      .delete('/api/client/chez.nestor@gmail.com')
      .expect(200)
  });
  
  it(`(DELETE) /apartment/${apartId} --> 200`, () => {
    return request(app.getHttpServer())
      .delete(`/api/apartment/${apartId}`)
      .expect(200)
  });
});
