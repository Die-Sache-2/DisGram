FROM node:16

RUN mkdir -p /opt/app

WORKDIR /opt/app

COPY package*.json .

RUN npm install

COPY .. .

#RUN npx wait-port db:5432

#RUN npm run db:migrate:up

CMD ["node", "index.mjs"]