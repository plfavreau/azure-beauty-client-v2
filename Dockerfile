FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npm install -g next

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]