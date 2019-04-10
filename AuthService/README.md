# sockets-service

## Description

Auth service for authentication users and projects\
Part of astra-storage microservices-based system

## Installation

Firstly install docker\
Then run in project directory

```bash
$ docker pull postgres
$ docker build --tag as_auth_service .
```

## Running the microservice

```bash
$ docker run -h auth_service_db -t postgres -p 5532:5432
$ docker run as_auth_service
```

## Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

