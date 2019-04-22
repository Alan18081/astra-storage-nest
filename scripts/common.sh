#!/bin/bash

set -e

cd ../Common
rm -rf node_modules
yarn
rm -rf dist
yarn build
bit add dist/*
bit export alan18081.astra-storage

MICROSERVICES=(
    API
    UsersServiceOld
    AuthService
    ProjectsService
    DataService
    EmailsService
    SocketsService
    SDK
)

for i in ${MICROSERVICES[@]}; do
    echo "Transpiling ${i}"
    cd ../${i}
    npm i @bit/alan18081.astra-storage.common.dist
    rm -rf dist
done