#!/bin/sh
ROOT_PATH=$PWD/..

cd $ROOT_PATH/keycloak
docker-compose stop

cd $ROOT_PATH/product-service/docker
docker-compose stop

cd $ROOT_PATH/order-service/docker
docker-compose stop

cd $ROOT_PATH/reverseproxy
docker-compose stop

cd $ROOT_PATH/frontend/docker
docker-compose stop
