#!/bin/bash

set -e

cd ../Common
rm -rf node_modules
yarn
rm -rf dist
yarn build

MICROSERVICES=(
    API
    UsersService
    AuthService
    ProjectsService
    #DataService
)

for i in ${MICROSERVICES[@]}; do
    echo "Transpiling ${i}"
    cd ../${i}
    rm -rf node_modules
    yarn
    rm -rf dist
done