# Use the official Node image.
FROM node:14

# Install netcat
RUN apt-get update && apt-get install -y netcat

ENV APP_HOME /app

WORKDIR $APP_HOME

# Copy files into the container image.
COPY . .

# Install dependencies.
RUN npm install

# Run the web service on container startup.
EXPOSE 8080
