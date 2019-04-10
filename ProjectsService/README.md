# projects-service

## Description

Service for management projects and storages data\
Part of astra-storage microservices-based system


## Installation

Firstly install docker\
Then run in project directory

```bash
$ docker pull postgres
$ docker build --tag as_projects_service .
```

## Running the microservice

```bash
$ docker run -h projects_service_db -t postgres -p 5632:5432
$ docker run as_projects_service
```

## Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

