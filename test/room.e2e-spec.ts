import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { ValidationPipe } from '@nestjs/common';
import { send } from 'process';
import { endWith } from 'rxjs';

describe('room', () => {
  let app: INestApplication;
  let apartId: number;
  let roomId1: number;
  let roomId2: number;

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

  it('(POST) /apartment --> 200', async () => {
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

  it('(POST) /room --> Error 400 : ValidationPipe', () => {
    return request(app.getHttpServer())
      .post('/api/room')
      .send({
        number: 'not a number',
        area: 'not a number',
        price: 'not a number',
        idApartment: 'not a number',
        test: 'not required variable'
      })
      .expect(400)
  });

  it('(POST) /room --> Error 404 : Not found', () => {
    return request(app.getHttpServer())
      .post('/api/room')
      .send({
        number: 1,
        area: 100,
        price: 999,
        idApartment: apartId + 100,
      })
      .expect(404)
  });

  it('(POST) /room 1 --> 200', async () => {
      const response = await request(app.getHttpServer())
      .post('/api/room')
      .send({
        number: 1,
        area: 100,
        price: 999,
        idApartment: apartId,
      });
      roomId1 = parseInt(response.body.id);
      expect(response.status).toEqual(201);
  });

  it('(POST) /room 2 --> 200', async () => {
      const response = await request(app.getHttpServer())
      .post('/api/room')
      .send({
        number: 2,
        area: 666,
        price: 666,
        idApartment: apartId,
      });
      roomId2 = parseInt(response.body.id);
      expect(response.status).toEqual(201);
  });

  it('(POST) /room --> Error 409 --> Conflict', () => {
    return request(app.getHttpServer())
      .post('/api/room')
      .send({
        number: 1,
        area: 200,
        price: 666666,
        idApartment: apartId,
      })
      .expect(409)
  });

  // --------- GET ---------

  it(`(GET) /room/${roomId1} --> 200`, () => {
    return request(app.getHttpServer())
      .get(`/api/room/${roomId1}`)
      .expect(200)
  });

  it('(GET) /room/all --> 200', () => {
    return request(app.getHttpServer())
      .get('/api/room/all')
      .expect(200)
  });

    it(`(GET) /room/${roomId1 + 100} --> Error 404 : Not found`, () => {    return request(app.getHttpServer())
      .get(`/api/room/${roomId1 + 100}`)
      .expect(404)
  });

  // --------- PATCH ---------

  it('(PATCH) /room --> Error 400 : ValidationPipe', () => {
    
    return request(app.getHttpServer())
      .patch('/api/room/')
      .send({
        id: 'not a number',
        number: 'not a number',
        area: 'not a number',
        price: 'not a number',
      })
      .expect(400)
  });

  it('(PATCH) /room --> Error 404 : Not found', () => {
    return request(app.getHttpServer())
      .patch('/api/room/')
      .send({
        id: roomId1 + 100,
        number: 1,
        area: 1000,
        price: 100000,
      })
      .expect(404)
  });

  it('(PATCH) /room --> Error 409 --> Conflict', () => {
    return request(app.getHttpServer())
      .patch('/api/room/')
      .send({
        id: roomId1,
        number: 2,
        area: 1000,
        price: 100000,
      })
      .expect(409)
  });

  it('(PATCH) /room --> 200', () => {
    return request(app.getHttpServer())
      .patch('/api/room/')
      .send({
        id: roomId1,
        number: 10,
        area: 1000,
        price: 100000,
      })
      .expect(200)
  });

    // --------- DELETE ---------
  
  it(`(DELETE) /room/${roomId1 + 100} --> Error 404 : Not found`, () => {
    return request(app.getHttpServer())
      .delete(`/api/room/${roomId1+ 100}`)
      .expect(404)
  });
  
  it(`(DELETE) /room/${roomId1} --> 200`, () => {
    return request(app.getHttpServer())
      .delete(`/api/room/${roomId1}`)
      .expect(200)
  });
  
  it(`(DELETE) /room/${roomId2} --> 200`, () => {
    return request(app.getHttpServer())
      .delete(`/api/room/${roomId2}`)
      .expect(200)
  });
  
  it(`(DELETE) /apartment/${apartId} --> 200`, () => {
    return request(app.getHttpServer())
      .delete(`/api/apartment/${apartId}`)
      .expect(200)
  });
});
