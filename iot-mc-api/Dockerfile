<<<<<<< HEAD
FROM maven:3.9.9-eclipse-temurin-21 AS build
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline

COPY src ./src
RUN mvn clean package -DskipTests

FROM eclipse-temurin:21
WORKDIR /app
COPY --from=build /app/target/iot-mc-api-0.0.1-SNAPSHOT.jar /app/api-iot.jar

ENTRYPOINT ["java", "-jar", "api-iot.jar"]
=======
FROM eclipse-temurin:21 AS build

RUN apt-get update && apt-get install -y maven && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY . .

RUN mvn clean package -DskipTests

FROM eclipse-temurin:21

WORKDIR /app

COPY --from=build /app/target/*.jar /app/api-iot.jar

ENTRYPOINT ["java", "-jar", "api-iot.jar"]
>>>>>>> b31ed0432de9fe969d05c46ce94b56a3e84122db
