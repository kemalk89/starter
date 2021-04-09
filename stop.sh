#!/bin/sh
ROOT_PATH=$PWD

cd $ROOT_PATH/keycloak
docker-compose stop

cd $ROOT_PATH/backend/docker
docker-compose stop
