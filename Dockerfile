FROM node:latest
WORKDIR /usr/app

COPY package.json package.json
RUN npm install -g npm@7.8.0
RUN npm install -g --save-dev nodemon
RUN npm install

COPY src src
COPY public public

CMD ["npm", "run", "debug"]