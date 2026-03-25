# Experiment 3.2.1 - Docker React App

## Aim
To containerize a React application using Docker multi-stage build.

## Features
- Multi-stage build (Node + Nginx)
- Optimized image size
- Production-ready server
- Gzip enabled

## Run Commands

### Build Image
docker build -t react-docker-app .

### Run Container
docker run -p 8080:8080 react-docker-app

## Output
App runs on http://localhost:8080
