

## Description

API for Chez Nestor reservation Hotel, build with [Nest](https://nestjs.com/) and [Mysql](https://www.mysql.com/fr/)


## Installation

```bash
$ npm install
```

## Running the app

```bash
$ npm run start
```

## API Endpoints

### Client :
- GET : http://localhost:3000/client/:email 
  - Get the client infos with the email sent in the URL Parameters (:email)
  - 'email' parameter equal to the client email requested
- POST : http://localhost:3000/client/
  - Create a new client
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
  - The email of the client requestor is needed + all the infos that need to be updated (firstname, lastname...)
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

## Contact

- Author - [Thomas Daydé](https://github.com/Totolosa)
