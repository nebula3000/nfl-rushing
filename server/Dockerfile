FROM node:17.4.0-alpine3.14
WORKDIR /app
COPY . .
RUN yarn install
CMD [ "node", "server.js" ]
EXPOSE 9000
