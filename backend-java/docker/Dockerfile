# multistage build
FROM gradle:6.8.3-jdk11 AS build
COPY --chown=gradle:gradle . /home/gradle/src
WORKDIR /home/gradle/src
RUN gradle build --no-daemon

# Consider best practices: https://docs.docker.com/develop/develop-images/dockerfile_best-practices/
FROM adoptopenjdk:11-jre-hotspot
RUN mkdir /opt/app
RUN groupadd -r spring && useradd --no-log-init -r -g spring spring
USER spring:spring
COPY --from=build /home/gradle/src/build/libs/*.jar /opt/app/app.jar
ENTRYPOINT ["java", "-Dkeycloak.auth-server-url=${KEYCLOAK_SERVER_AUTH_URL}", "-jar", "/opt/app/app.jar"]