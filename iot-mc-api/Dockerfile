FROM eclipse-temurin:21 AS build
RUN apt-get update && apt-get install -y maven && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

FROM eclipse-temurin:21
WORKDIR /app
COPY --from=build /app/target/*.jar /app/api-iot.jar
ENTRYPOINT ["java", "-jar", "api-iot.jar"]