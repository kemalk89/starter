#!/bin/sh
ROOT_PATH=$PWD/..

cd $ROOT_PATH/keycloak
docker-compose stop

cd $ROOT_PATH/backend-java/docker
docker-compose stop

cd $ROOT_PATH/frontend/docker
docker-compose stop
