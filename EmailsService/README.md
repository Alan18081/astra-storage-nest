# Data-service

## Description

Service for sending emails\
Part of astra-storage microservices-based system

## Installation

Firstly install docker\
Then run in project directory

```bash
$ docker build --tag as_emails_service .
```

## Running the microservice

```bash
$ docker run as_emails_service
```

## Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

