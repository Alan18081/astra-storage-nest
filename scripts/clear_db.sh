#!/usr/bin/env bash

PGPASSWORD=qwerty1 psql -h localhost -U postgres < as_users.sql

mongo < clear_mongo.js