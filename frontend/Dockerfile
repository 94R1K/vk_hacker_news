FROM node:20.12-buster-slim as build

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .

EXPOSE 3000

CMD cp -r build result_build

CMD ["yarn", "start"]