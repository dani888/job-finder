FROM node:latest
WORKDIR /usr/app

COPY package.json package.json
RUN npm install --force

COPY src src
COPY public public

CMD ["npm", "run", "debug"]