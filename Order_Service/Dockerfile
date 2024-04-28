FROM node

WORKDIR /usr/app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8002

CMD ["node", "index.js"]