import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { ValidationPipe } from '@nestjs/common';
import { send } from 'process';

describe('apartment', () => {
  let app: INestApplication;

  const createApartmentDtoWrong = {
    name: 'Le Prestige',
    street: 'Capitole',
    zipCode: 'not a number',
    city: 'Toulouse',
    test: 'not required variable'
  }
  const createApartmentDto1 = {
    name: 'Le Prestige',
    street: 'Capitole',
    zipCode: '31000',
    city: 'Toulouse',
  }
  const createApartmentDto2 = {
    name: 'Le Pouilleux',
    street: 'Replublique',
    zipCode: '69001',
    city: 'Lyon',
  }
  let idApart1: number;
  let idApart2: number;

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

  it('(POST) /apartment --> Error 400 : ValidationPipe', () => {
    return request(app.getHttpServer())
      .post('/api/apartment')
      .send(createApartmentDtoWrong)
      .expect(400)
  });

  it('(POST) /apartment 1 --> 201', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/apartment')
      .send(createApartmentDto1);
      idApart1 = parseInt(response.body.id);
      expect(response.status).toEqual(201);
  });

  it('(POST) /apartment 2 --> 201', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/apartment')
      .send(createApartmentDto2);
      idApart2 = parseInt(response.body.id);
      expect(response.status).toEqual(201);
  });

  // --------- GET ---------

  it(`(GET) /apartment/${idApart1} --> 200`, () => {
    return request(app.getHttpServer())
      .get(`/api/apartment/${idApart1}`)
      .expect(200)
  });

  it('(GET) /apartment/all --> 200', () => {
    return request(app.getHttpServer())
      .get('/api/apartment/all')
      .expect(200)
  });

    it(`(GET) /apartment/${idApart1 + 100} --> Error 404 : Not found`, () => {    return request(app.getHttpServer())
      .get(`/api/apartment/${idApart1 + 100}`)
      .expect(404)
  });

  // --------- PATCH ---------

  it('(PATCH) /apartment --> Error 400 : ValidationPipe', () => {
    
    return request(app.getHttpServer())
      .patch('/api/apartment/')
      .send({
        id: 'not a number',
        name: 'Le Prestige',
        street: 'Capitole',
        zipCode: 'not a number',
        city: 'Toulouse',
      })
      .expect(400)
  });

  it('(PATCH) /apartment --> Error 404 : Not found', () => {
    return request(app.getHttpServer())
      .patch('/api/apartment/')
      .send({
        id: idApart1 + 100,
        name: 'Le Prestige',
        street: 'Capitole',
        zipCode: 99999,
        city: 'Toulouse',
      })
      .expect(404)
  });

  it('(PATCH) /apartment --> 200', () => {
    return request(app.getHttpServer())
      .patch('/api/apartment/')
      .send({
        id: idApart1,
        name: 'Updated',
        street: 'Updated',
        zipCode: 99999,
        city: 'Updated',
      })
      .expect(200)
  });

    // --------- DELETE ---------
  
  it(`(DELETE) /apartment/${idApart1 + 100} --> Error 404 : Not found`, () => {
    return request(app.getHttpServer())
      .delete(`/api/apartment/${idApart1+ 100}`)
      .expect(404)
  });
  
  it(`(DELETE) /apartment/${idApart1} --> 200`, () => {
    return request(app.getHttpServer())
      .delete(`/api/apartment/${idApart1}`)
      .expect(200)
  });
  
  it(`(DELETE) /apartment/${idApart2} --> 200`, () => {
    return request(app.getHttpServer())
      .delete(`/api/apartment/${idApart2}`)
      .expect(200)
  });
});
