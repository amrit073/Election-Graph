# syntax=docker/dockerfile:1

FROM node:12-alpine
RUN apk add npm
WORKDIR app/
COPY . .
RUN npm install
ENTRYPOINT ["node", "app.js"]
EXPOSE 8000
