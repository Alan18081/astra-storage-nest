# Data-service

## Description

Service for storing records created by users\
Part of astra-storage microservices-based system

## Installation

Firstly install docker\
Then run in project directory

```bash
$ docker pull mongo
$ docker build --tag as_data_service .
```

## Running the microservice

```bash
$ docker run -h data_service_db -t mongo -p 27017:27017
$ docker run as_data_service
```

## Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

