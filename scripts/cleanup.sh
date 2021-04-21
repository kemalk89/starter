#!/bin/sh
ROOT_PATH=$PWD/..

sh $PWD/stop.sh

docker network rm backend-network

cd $ROOT_PATH/keycloak
docker-compose down -v

cd $ROOT_PATH/product-service/docker
docker-compose down -v

cd $ROOT_PATH/order-service/docker
docker-compose down -v

cd $ROOT_PATH/reverseproxy
docker-compose down -v

cd $ROOT_PATH/frontend/docker
docker-compose down -v