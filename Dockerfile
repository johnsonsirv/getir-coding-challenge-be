FROM node:alpine

WORKDIR /usr/src/my_app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "start"]