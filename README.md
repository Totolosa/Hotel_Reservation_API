

## Description

API for Chez Nestor reservation Hotel, build with [Nest](https://nestjs.com/) (9.1.5) and [Mysql](https://www.mysql.com/fr/) (8.0.31)


## Installation

0) Pre-requisites : Install Node and Mysql
1) Create a Mysql DB
2) Modify the .env file with your values.
3) Run:
```bash
$ npm install
```

## Running the app

```bash
$ npm run start
```

## Testing E2E

First, make sure to use a empty database before start testing. If you create a new DB then modify the .env file with the new DB infos.

Tests are in /test/... and run with Jest.

```bash
$ npm run test:e2e
```

## API Endpoints

### Client :
- GET : /api/client/all
  - Get all client infos
  - Return an array with all clients
- GET : /api/client/:email 
  - Get the client infos with the email sent in the URL Parameters (:email)
  - Return the client object
- POST : /api/client/
  - Create a new client
  - Return the client created
  - DTO the use in the Body of request:
```
    "firstName": string,
    "lastName": string,
    "email": string,
    "phone": string, optional
    "birthDate": string, optional
    "nationality": string optional
```
- PATCH : /api/client/
  - Update client infos
  - Return the client updated
  - DTO the use in the Body of request:
```
    "emailRequestor": string,
    "firstName": string, optional
    "lastName": string, optional
    "email": string, optional
    "phone": string, optional
    "birthDate": string, optional
    "nationality": string optional
```
- DELETE : /api/client/:email
  - Delete the client with the email sent in the URL Parameters (:email)
  - Return the client deleted

### Apartment :
- GET : /api/apartment/all
  - Get all apartment infos
  - Return an array with all apartments
- GET : /api/apartment/:id 
  - Get the apartment infos with the id sent in the URL Parameters (:id)
  - Return the apartment object
- POST : /api/apartment/
  - Create a new apartment
  - Return the apartment created
  - DTO the use in the Body of request:
```
    "name": string,
    "street": string, 
    "zipCode": number, 
    "city": string,
```
- PATCH : /api/apartment/
  - Update apartment infos
  - Return the apartment updated
  - DTO the use in the Body of request:
```
    "id": number,
    "name": string, optional
    "street": string, optional
    "zipCode": number, optional
    "city": string, optional
```
- DELETE : /api/apartment/:id
  - Delete the apartment with the id sent in the URL Parameters (:id)
  - Return the apartment deleted

### Room :
- GET : /api/room/all
  - Get all rooms infos
  - Return an array with all rooms
- GET : /api/room/:id 
  - Get the room infos with the id sent in the URL Parameters (:id)
  - Return the room object
- POST : /api/room/
  - Create a new room
  - Return the room created
  - DTO the use in the Body of request:
```
    "number": number,
    "area": number, 
    "price": number, 
    "idApartment": number, id of the apartment were is the room
```
- PATCH : /api/room/
  - Update room infos
  - Return the room updated
  - DTO the use in the Body of request:
```
    "id": number,
    "number": number, optional
    "area": number, optional
    "price": number, optional
```
- DELETE : /api/room/:id
  - Delete the room with the id sent in the URL Parameters (:id)
  - Return the room deleted
  
### Reservation :
- GET : /api/reservation/all
  - Get all reservations infos
  - Return an array with all reservations : client + room
- GET : /api/reservation/client/:email
  - Get the reservation infos with the client email sent in the URL Parameters (:email) 
  - Return the reservation object : client + room
- GET : /api/reservation/room/:id
  - Get the reservation infos with the room id sent in the URL Parameters (:id) 
  - Return the reservation object : client + room
- POST : /api/reservation/
  - Create a new reservation
  - Return the reservation created : client + room
  - DTO the use in the Body of request:
```
    "clientEmail": number, the client email
    "roomId": number, the id of the room
```
- DELETE : /api/reservation/client/:email
  - Delete the reservation with the client email sent in the URL Parameters (:email)
  - Return the client with the room reservation deleted
- DELETE : /api/reservation/room/:id
  - Delete the reservation with the room id sent in the URL Parameters (:id)
  - Return the room with the client reservation deleted

## Contact

- Author - [Thomas Dayd??](https://github.com/Totolosa)
