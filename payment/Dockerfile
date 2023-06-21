FROM node:16-alpine

ENV FRONT_PAGE=http://localhost:3000

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5001

CMD [ "npm", "start" ]
