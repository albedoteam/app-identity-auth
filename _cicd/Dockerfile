# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY ./ /app/
ARG ENV
RUN npm run build -- --output-path=./dist/out --configuration $ENV --output-hashing=all

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:alpine
COPY --from=build-stage /app/dist/out/ /usr/share/nginx/html
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf
