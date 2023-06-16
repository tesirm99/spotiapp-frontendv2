FROM node:18-alpine as build

# Create app directory

WORKDIR /usr/src/app

# Install app dependencies

COPY package*.json ./

RUN npm install -g ionic
RUN npm install

# Bundle app source

COPY . .
RUN ionic build --prod

FROM nginx:1.21.1-alpine
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /usr/src/app/www /usr/share/nginx/html