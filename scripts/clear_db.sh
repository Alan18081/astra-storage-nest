#!/usr/bin/env bash

PGPASSWORD=qwerty1 psql -h localhost -U postgres < clear_db.sql

mongo < clear_mongo.js