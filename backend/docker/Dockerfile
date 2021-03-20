# Consider best practices: https://docs.docker.com/develop/develop-images/dockerfile_best-practices/
FROM adoptopenjdk:11-jre-hotspot
RUN mkdir /opt/app
RUN groupadd -r spring && useradd --no-log-init -r -g spring spring
USER spring:spring
COPY build/libs/demo-0.0.1-SNAPSHOT.jar /opt/app/app.jar
ENTRYPOINT ["java", "-Dkeycloak.auth-server-url=${KEYCLOAK_SERVER_AUTH_URL}", "-jar", "/opt/app/app.jar"]