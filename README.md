

## Description

API for Chez Nestor reservation Hotel, build with [Nest](https://nestjs.com/) (9.1.5) and [Mysql](https://www.mysql.com/fr/) (8.0.31)


## Installation

0) Install Nest and Mysql if you don't have th
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
- POST : http://localhost:3000/client/
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
- PATCH : http://localhost:3000/client/
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
- DELETE : http://localhost:3000/client/:email
  - Delete the client with the email sent in the URL Parameters (:email)
  - Return the client deleted

## Contact

- Author - [Thomas Daydé](https://github.com/Totolosa)
