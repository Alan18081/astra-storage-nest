#!/usr/bin/env bash
MICROSERVICES=(
    API
    AuthService
    UsersService
    ProjectsService
    DataService
    EmailsService
    SocketsService
    SDK
)

for i in ${MICROSERVICES[@]}; do
    cd ../${i}
    rm -rf node_modules
    yarn
    rm -rf dist
done