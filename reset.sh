#!/bin/sh
ROOT_PATH=$PWD

cd $ROOT_PATH/keycloak
docker-compose down -v

cd $ROOT_PATH/backend/docker
docker-compose down -v