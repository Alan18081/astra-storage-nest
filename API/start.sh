#!/bin/bash

if [[ "$NODE_ENV" = "local" ]]; then
    npm run start:dev
else
    npm run start:prod
fi