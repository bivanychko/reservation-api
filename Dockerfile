# Base images
FROM node:18

RUN apt-get update && apt-get upgrade -y && apt-get install -y npm

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

ENV DB_HOST=host.docker.internal

# Run migrations
RUN npm run migration:run

# Insert seeds
RUN npm run seed:run

# Run app
RUN npm run start
