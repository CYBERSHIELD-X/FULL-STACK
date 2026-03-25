# Experiment 3.3.1 - Microservices Architecture

## Aim
To implement basic microservices architecture.

## Services
- User Service (Port 5001)
- Product Service (Port 5002)
- API Gateway (Port 5000)

## Features
- Independent services
- API Gateway integration
- Service communication via HTTP

## Run

cd user-service && npm install && node server.js
cd product-service && npm install && node server.js
cd gateway && npm install && node server.js

## Output
http://localhost:5000/api/data
