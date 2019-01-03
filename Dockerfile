FROM node:alpine

WORKDIR /usr/src/app

COPY package.json package.json

RUN npm install

COPY . .
EXPOSE 8080
# CMD ["npm","run","dev"]
CMD ["npm","start"]