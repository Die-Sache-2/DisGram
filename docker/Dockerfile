FROM node:16

RUN mkdir -p /opt/app

WORKDIR /opt/app

COPY package*.json .

RUN npm install

COPY .. .

CMD ["node", "index.mjs"]