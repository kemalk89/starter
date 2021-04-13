#!/bin/sh
ROOT_PATH=$PWD/..

sh $PWD/stop.sh

# key cloak is an image so nothing to build here.
cd $ROOT_PATH/keycloak
docker-compose up -d --remove-orphans

# build and start backend service
cd $ROOT_PATH/product-service/docker
docker-compose build --quiet
docker-compose up -d --remove-orphans

# start reverse proxy
cd $ROOT_PATH/reverseproxy
docker-compose up -d --remove-orphans

# build and start frontend service
cd $ROOT_PATH/frontend/docker
docker-compose build --quiet
docker-compose up -d --remove-orphans


