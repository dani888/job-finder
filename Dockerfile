FROM node:latest
WORKDIR /usr/app

COPY package.json package.json
RUN npm install

COPY src src
COPY public public

CMD ["npm", "start"]