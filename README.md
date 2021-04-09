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

# Start all components
Simply run the following commands to get started:

0. Install and start docker
1. ``sh bootstrap.sh``

# Getting started
## Backend
Simply run the following commands to get started:

0. Install and start docker
1. ``cd backend/docker``
2. ``docker-compose up app_db iam`` > This will start all the infrastructure
3. In your IDE run the application with dev config (VM arguments ``-Dspring.profiles.active=dev``)
4. Open browser and call ``http://localhost:8081/hello``

## Keycloak
Please create users in keycloak and assign them roles (ROLE_ADMIN, ROLE_USER). For that open your
browser and call ``http://localhost:8080``, login with user ``admin``, password ``admin`` and switch to
realm ``app``.

## Frontend
Simply run the following commands to get started:
1. ``cd frontend``
2. ``yarn start``
3. Open browser and call ``http://localhost:3000``
