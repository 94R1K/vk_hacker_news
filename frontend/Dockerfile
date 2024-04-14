FROM node:20.7-slim as build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD cp -r build result_build

ENV NODE_ENV=production

CMD ["yarn", "start"]
