FROM node:10

WORKDIR /usr/work_home

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8080

CMD [ "npm", "start" ]