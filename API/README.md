# sockets-service

## Description

API gateway for routing client's requests\
Part of astra-storage microservices-based system

## Installation

Firstly install docker\
Then run in project directory

```bash
$ docker build --tag as_api_gateway .
```

## Running the microservice

```bash
$ docker run as_api_gateway
```

## Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

