#!/bin/sh
ROOT_PATH=$PWD

sh $ROOT_PATH/stop.sh

# key cloak is an image so nothing to build here.
cd $ROOT_PATH/keycloak
docker-compose up -d --remove-orphans

# build and start
cd $ROOT_PATH/backend/docker
docker-compose build --quiet
docker-compose up -d --remove-orphans


