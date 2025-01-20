# 1. Build Stage: Builder Image
FROM eclipse-temurin:21 as BUILDER

WORKDIR /app

# Copy only the necessary files for the build
COPY .mvn/ .mvn
COPY mvnw pom.xml ./

# Download dependencies (cache this layer)
RUN ./mvnw dependency:go-offline

# Copy the source code
COPY src ./src

# Build the application
RUN ./mvnw clean package -DskipTests

# 2. Runtime Stage: Final Image
FROM eclipse-temurin:21

WORKDIR /app

# Copy only the built JAR from the build stage
COPY --from=BUILDER /app/target/backend-0.0.1-SNAPSHOT.jar app.jar

# Expose the application port
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]