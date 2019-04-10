# Users-service

## Description

Service for managing users data\
Part of astra-storage microservices-based system

## Installation

Firstly install docker\
Then run in project directory

```bash
$ docker pull postgres
$ docker build --tag as_users_service .
```

## Running the microservice

```bash
$ docker run -h users_service_db -t postgres -p 5732:5432
$ docker run as_users_service
```

## Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

