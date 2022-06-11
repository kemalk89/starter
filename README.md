# About
This repository is basically a skeleton project providing some preconfigurations to
getting quickly started with a react frontend and a spring boot backend.

# Differentiation to JHipster
Work in progress
- This is not a generator but skeleton
- You can use any backend technology (e.g. PHP, C#, Java, NodeJs, ...)
- You only get a skeleton, the rest is up to you

# Technology stack
The spring boot backend is connected to a mariadb.
We are using keycloak for identity and access management. Keycloak is connected to a postgresql database.

## Frontend
|Dependency|Version|
|---|---|
|React|17.0.1|
|Typescript|4.1.2|

## Backend
|Dependency|Version|
|---|---|
|Java|11|
|Spring Boot|2.4.3|
|MariaDB|10.5.9|
|Gradle|6.8.3|

## Keycloak as Identity and Access Management 
|Dependency|Version|
|---|---|
|Keycloak|12.0.4|
|PostgreSQL|13.2|

# Getting started
## Start all
Simply run the following commands to get started:

0. Install and start docker
1. ``cd scripts``
2. ``sh bootstrap.sh``
3. ``cd prepare-keycloak``, ``npm install`` and finally ``node index.js`` (this will init keycloak)
4. In your browser go to ``localhost:3000``
## Keycloak
The script ``prepare-keycloak`` will init keycloak. It will create...
- 2 users (max.mustermann@test.de, tom.tischler@test.de, pw for both is 123456)
- 1 client for the web UI
- 1 client for the backend services
- roles ADMIN and USER
